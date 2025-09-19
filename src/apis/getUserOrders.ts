"use server";
import { getMyToken } from '@/utilities/token';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  id?: string;
  sub?: string;
  _id?: string;
  userId?: string;
  [key: string]: unknown;
};

export async function getUserOrders() {
  const token = await getMyToken();
  
  if (!token) {
    throw new Error("Login First");
  }

  const decoded = jwtDecode<JwtPayload>(token as string);
  const id = decoded.id ?? decoded.sub ?? decoded._id ?? decoded.userId;

  if (!id) {
    throw new Error("Invalid token: missing user id");
  }

  const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);

  return data;
}