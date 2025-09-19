"use client"

import { getSession } from 'next-auth/react';
import axios from 'axios';
import { cart } from '@/types/cart.type';

export async function getClientUserCart(): Promise<cart | null> {
  try {
    const session = await getSession();
    
    if (!session) {
      throw new Error("Login First");
    }

    // Get token from session
    const sessionWithToken = session as (typeof session & { token: string });
    const token = sessionWithToken.token;

    if (!token) {
      console.log("No API token found in session");
      console.log("Session contents:", session);
      throw new Error("No authentication token found");
    }

    const response = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: token
      }
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      // No cart found, return empty cart structure
      return {
        status: "success",
        numOfCartItems: 0,
        cartId: "",
        data: {
          _id: "",
          cartOwner: "",
          products: [],
          createdAt: "",
          updatedAt: "",
          __v: 0,
          totalCartPrice: 0
        }
      };
    }
    console.error('Error fetching cart:', error);
    throw error;
  }
}