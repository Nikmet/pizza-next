import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prisma-client";
import { compare } from "bcrypt";

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }

                const values = {
                    email: credentials.email,
                    password: credentials.password
                };

                const user = await prisma.user.findFirst({
                    where: {
                        email: values.email
                    }
                });

                if (!user) {
                    return null;
                }

                const isPasswordValid = await compare(credentials.password, user.password);

                if (!isPasswordValid) {
                    return null;
                }

                if (!user.verified) {
                    return null;
                }

                return {
                    id: String(user.id),
                    email: user.email,
                    name: user.fullName,
                    role: user.role
                };
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token }) {
            const user = await prisma.user.findFirst({
                where: {
                    email: token.email
                }
            });

            if (user) {
                token.id = String(user.id);
                token.name = user.fullName;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    }
};

const handle = NextAuth(authOptions);

export { handle as GET, handle as POST };
