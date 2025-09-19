"use client"

import { getSession } from "next-auth/react";

export async function getClientToken() {
    try {
        const session = await getSession();
        
        if (!session) {
            console.log("No session found");
            return null;
        }

        // The API token is stored in the session during login
        const sessionWithToken = session as (typeof session & { token: string });
        const apiToken = sessionWithToken.token;
        
        if (!apiToken) {
            console.log("No API token found in session");
            console.log("Session contents:", session);
            return null;
        }
        
        return apiToken;
    } catch (error) {
        console.error("Error getting client token:", error);
        return null;
    }
}