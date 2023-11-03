import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const autchConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "504866879944-rirlmrg85mn93n59ccbf2t161giv9u03.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    Credentials({
      credentials: { email: { label: "email", type: "email", required: true },
      password: { label: " password", type: " password", required: true }  },
      async authorize(credentials, req) {
        
      },
    }),
  ],
};
