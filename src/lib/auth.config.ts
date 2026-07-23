import type { NextAuthConfig } from "next-auth";

// Edge-compatible auth config (no Prisma / Node-only imports)
export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: {
    // Middleware only protects /admin — send unauthorized users to admin login
    signIn: "/admin/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "CUSTOMER";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) ?? "CUSTOMER";
      }
      return session;
    },
    authorized({ auth, request }) {
      const isAdminRoute =
        request.nextUrl.pathname.startsWith("/admin") &&
        !request.nextUrl.pathname.startsWith("/admin/login");
      if (isAdminRoute) {
        return !!auth?.user && auth.user.role === "ADMIN";
      }
      return true;
    },
  },
};
