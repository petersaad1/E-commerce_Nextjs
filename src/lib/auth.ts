import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
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
          const decoded: any = jwtDecode(payload.token);

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
    async session({ session, token }) {
      if (token) {
        session.user = token?.user 
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user?.user
        token.token = user?.token
      }
      return token
    }
  }
};
