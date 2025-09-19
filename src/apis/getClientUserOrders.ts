"use client"

import { getClientToken } from '@/utilities/clientToken';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { OrdersResponse } from '@/types/order.type';

export async function getClientUserOrders(): Promise<OrdersResponse | null> {
  try {
    const token = await getClientToken();
    
    if (!token) {
      throw new Error("Login First");
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