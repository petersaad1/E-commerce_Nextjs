"use client"

import { getSession } from 'next-auth/react';
import axios from 'axios';
import { wish } from '@/types/wish.type';

export async function getClientUserWish(): Promise<wish | null> {
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

    const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
      headers: {
        token: token
      }
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      // No wishlist found, return empty wishlist structure
      return {
        status: "success",
        count: 0,
        data: []
      };
    }
    console.error('Error fetching wishlist:', error);
    throw error;
  }
}