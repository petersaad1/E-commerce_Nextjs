import NextAuth from "next-auth"

declare module "next-auth" {

  interface User {
    token: string,
    user: {
      name: string,
      email: string ,
      role: string
    }
  }
  interface Session {
    user: User.user
  }
}