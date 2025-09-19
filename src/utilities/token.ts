"use server"

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
    try {
        const cookieStore = await cookies();
        
        // Get the NextAuth session token
        const sessionToken = 
            cookieStore.get("next-auth.session-token")?.value ||
            cookieStore.get("__Secure-next-auth.session-token")?.value;
        
        if (!sessionToken) {
            console.log("No session token found in cookies");
            return null;
        }

        // Decode the session token
        const decoded = await decode({
            token: sessionToken,
            secret: process.env.NEXTAUTH_SECRET!
        });
        
        if (!decoded) {
            console.log("Failed to decode session token");
            return null;
        }
        
        // Return the API token that was stored during login
        const apiToken = decoded.token as string;
        
        if (!apiToken) {
            console.log("No API token found in decoded session");
            console.log("Decoded token contents:", decoded);
            return null;
        }
        
        return apiToken;
    } catch (error) {
        console.error("Error getting token:", error);
        return null;
    }
}