"use server"

import { getMyToken } from "@/utilities/token"
import axios from "axios"

export async function clearCartItemAction() {

    const token = await getMyToken()

    if(!token){
        throw Error("Login First")
    }

    const {data} = await axios.delete(" https://ecommerce.routemisr.com/api/v1/cart" , {
        headers: {
            token: token as string
        }
    })

    return data
    
}