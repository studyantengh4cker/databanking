// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    api_token: string;
  }

  interface Session {
    user: User;
  }
}
