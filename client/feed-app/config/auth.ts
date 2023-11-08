import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { userApi } from "@/app/api/userApi";
import { RequestInternal } from "next-auth";
interface Credentials {
  username: string;
  password: string;
}
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
export const autchConfig: any = {
  providers: [
    GoogleProvider({
      clientId:
        "504866879944-rirlmrg85mn93n59ccbf2t161giv9u03.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    Credentials({
      credentials: {
        email: { label: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true },
      },

      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
      ): Promise<any | null> {
        if (credentials !== undefined) {
          const credentialsEmail = credentials.email;
          const password = credentials.password;
          const user = await userApi.login(credentialsEmail, password);

          if (user && user.data && user.data.data && user.data.data.user) {
            const { email, id, displayName: name, role } = user.data.data.user;
            const userData = { id, name, email, role };
            return userData;
          }
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },
};
