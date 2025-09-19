"use client"

import { getSession, useSession } from "next-auth/react";

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

// Hook-based version for components that can use hooks
export function useClientToken() {
    const { data: session, status } = useSession();
    
    if (status === "loading") {
        return { token: null, loading: true, error: null };
    }
    
    if (status === "unauthenticated" || !session) {
        return { token: null, loading: false, error: "Not authenticated" };
    }
    
    const sessionWithToken = session as (typeof session & { token: string });
    const apiToken = sessionWithToken.token;
    
    if (!apiToken) {
        console.log("No API token found in session");
        console.log("Session contents:", session);
        return { token: null, loading: false, error: "No token in session" };
    }
    
    return { token: apiToken, loading: false, error: null };
}