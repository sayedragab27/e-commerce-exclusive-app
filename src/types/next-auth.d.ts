import NextAuth, { DefaultSession } from "next-auth";

// Extend Session.user and JWT
declare module "next-auth" {
  interface User {
    user: {
      name: string;
      email: string;
      role: string;
    };
    token: string;
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: User;
    token?: string;
  }
}
