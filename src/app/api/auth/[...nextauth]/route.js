import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Demo users
        const users = [
          { id: 1, email: "admin@site.com", password: "admin", role: "admin" },
          { id: 2, email: "seller@site.com", password: "seller", role: "seller" },
          { id: 3, email: "buyer@site.com", password: "buyer", role: "buyer" }
        ];
        const user = users.find(
          u => u.email === credentials.email && u.password === credentials.password
        );
        if (user) {
          return user;
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (token?.role) session.user.role = token.role;
      return session;
    }
  },
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  }
});

export { handler as GET, handler as POST };