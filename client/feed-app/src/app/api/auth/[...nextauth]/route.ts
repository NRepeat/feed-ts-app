import NextAutch from "next-auth";
import { autchConfig } from "../../../../../config/auth";

const heandler = NextAutch(autchConfig);

export { heandler as GET, heandler as POST };
