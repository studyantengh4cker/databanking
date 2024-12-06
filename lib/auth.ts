import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import api from "./api";

export const { signIn, signOut, auth, handlers } = NextAuth({
  trustHost: true,
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
            firstName: response.data.user.first_name,
            lastName: response.data.user.last_name,
            role: response.data.user.role,
            college_id: response.data.user.college_id,
            program_id: response.data.user.program_id,
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
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role;
        token.college_id = user.college_id;
        token.program_id = user.program_id;
        token.api_token = user.api_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.firstName = token.firstName as string;
      session.user.lastName = token.lastName as string;
      session.user.role = token.role as string;
      session.user.college_id = token.college_id as number;
      session.user.program_id = token.program_id as number;
      session.user.api_token = token.api_token as string; 
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 Day
  },
});
