"use client"

import { getSession } from 'next-auth/react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { OrdersResponse } from '@/types/order.type';

export async function getClientUserOrders(): Promise<OrdersResponse | null> {
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

    const decodedToken = jwtDecode(token) as { id: string };
    const userId = decodedToken.id;

    if (!userId) {
      throw new Error("Invalid token: no user ID found");
    }

    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      {
        headers: {
          token: token
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}