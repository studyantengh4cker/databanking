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
            id: response.data.user.id,
            email: response.data.user.email,
            name: response.data.user.name,
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
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.api_token = user.api_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.role = token.role as string;
      session.user.api_token = token.api_token as string;
      return session;
    },
  },
});
