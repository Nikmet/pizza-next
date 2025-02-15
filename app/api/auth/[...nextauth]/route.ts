import { authOptions } from "@/shared/constants/next-auth-options";
import NextAuth from "next-auth";

const handle = NextAuth(authOptions);

export { handle as GET, handle as POST };
