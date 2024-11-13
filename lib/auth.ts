import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import api from "./api";

export const { signIn, signOut, auth, handlers } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const response = await api.post("/login", {
          email: credentials.email,
          password: credentials.password,
        });

        const token = response.data.token;

        if (token) {
          return {
            id: "1",
            email: "admin@gmail.com",
            role: "admin",
            api_token: token,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.api_token = user.api_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.api_token = token.api_token as string;
      return session;
    },
  },
});
