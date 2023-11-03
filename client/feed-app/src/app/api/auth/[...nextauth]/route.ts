import NextAutch from "next-auth";
import { autchConfig } from "../../../../../config/auth";
console.log("🚀 ~ file: route.ts:3 ~ autchConfig:", autchConfig)

const heandler = NextAutch(autchConfig);

export { heandler as GET, heandler as POST };
