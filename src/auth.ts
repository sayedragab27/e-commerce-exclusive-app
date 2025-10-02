import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          name: "email",
          type: "email",
          placeholder: "username@domain.com",
        },
        password: {
          name: "password",
          type: "password",
          placeholder: "*********",
        },
      },
      authorize: async (Credentials) => {
        try {
          const res = await fetch(
            `${process.env.NEXTAUTH_API_BASE_URL}/auth/signin `,
            {
              method: "POST",
              body: JSON.stringify({
                email: Credentials?.email,
                password: Credentials?.password,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message);
          }
          const decoded = JSON.parse(atob(data.token.split(".")[1]));
          return {
            id: decoded._id,
            user: data.user,
            token: data.token,
          };
        } catch (error) {
          throw new Error((error as Error).message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      if (trigger === "update") {
        if (session?.user) {
          token.user = session.user;
        }
        if (session?.token) {
          token.token = session.token;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  // session: {
  //   strategy: "jwt",
  //   maxAge: 1 * 60,
  // },
  // jwt: {
  //   maxAge: 1 * 60,
  // },
};
