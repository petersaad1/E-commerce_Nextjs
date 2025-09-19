import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

interface CustomSession {
  user?: {
    name?: string;
    email?: string;
    role?: string;
  };
  token?: string; // Add token to session
}

interface CustomToken {
  user?: {
    name?: string;
    email?: string;
    role?: string;
  };
  token?: string;
}

interface CustomUser {
  id: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as const,
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false, // Set to true in production with HTTPS
      }
    }
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter Your Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const payload = await res.json();

        if (payload.message === "success") {
          const decoded: { id?: string; userId?: string; [key: string]: unknown } = jwtDecode(payload.token);

          return {
            id: decoded.id || decoded.userId || payload.user._id,
            user: payload.user,
            token: payload.token,
          };
        }

        throw new Error(payload.message || "Something went wrong!");
      },
    }),
  ],

  callbacks: {
    async session({ session, token }: { session: CustomSession; token: CustomToken }) {
      if (token) {
        session.user = token.user;
        session.token = token.token; // Include API token in session
      }
      return session;
    },
    async jwt({ token, user }: { token: CustomToken; user?: CustomUser }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    }
  }
};
