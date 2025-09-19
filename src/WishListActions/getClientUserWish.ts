"use client"

import { getClientToken } from '@/utilities/clientToken';
import axios from 'axios';
import { wish } from '@/types/wish.type';

export async function getClientUserWish(): Promise<wish | null> {
  try {
    const token = await getClientToken();
    
    if (!token) {
      throw new Error("Login First");
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