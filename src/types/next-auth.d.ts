import { DefaultSession } from "next-auth"

declare module "next-auth" {

  interface User {
    token: string,
    user: {
      name: string,
      email: string ,
      role: string
    }
  }
  
  interface Session extends DefaultSession {
    user: User["user"]
    token: string
  }
}