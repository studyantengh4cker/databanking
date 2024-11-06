import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { signIn, signOut, auth, handlers } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials.email != "admin@gmail.com" &&
          credentials.password != "admin123"
        )
          return null;
        return {
          email: "admin@gmail.com",
          role: "admin",
        };
      },
    }),
  ],
});
