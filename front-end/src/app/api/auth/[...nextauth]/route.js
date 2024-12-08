import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { jwtDecode } from "jwt-decode";
import { encrypt } from "../../../../utils/encryption";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      const nowTimeStamp = Math.floor(Date.now() / 1000);
      if (account) {
        token.decode = jwtDecode(account.access_token);
        token.accessToken = account.access_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;

        if (token.decode.realm_access && token.decode.realm_access.roles) {
          token.isAdmin = token.decode.realm_access.roles.includes("admin");
        }

        return token;
      } else if (nowTimeStamp < token.expires_at) {
        return token;
      } else {
        console.log("token expiring");
        return token;
      }
    },
    async session({ session, token }) {
      session.id_token = encrypt(token.id_token);
      session.isAdmin = token.isAdmin || false;
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
