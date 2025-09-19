"use client"

import { getMyToken } from "@/utilities/token"
import axios from "axios"

export async function updateCartItemAction(id:string , count:number) {

    const token = await getMyToken()

    if(!token){
        throw Error("Login First")
    }
     const values ={
        count:count
     }
    const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, values ,{
        headers: {
            token: token as string
        }
    })

    return data
    
}