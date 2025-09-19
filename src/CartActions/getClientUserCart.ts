"use client"

import { getClientToken } from '@/utilities/clientToken';
import axios from 'axios';
import { cart } from '@/types/cart.type';

export async function getClientUserCart(): Promise<cart | null> {
  try {
    const token = await getClientToken();
    
    if (!token) {
      throw new Error("Login First");
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