import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prisma-client";
import { compare, hashSync } from "bcrypt";
import { UserRole } from "@prisma/client";

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name || profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: "USER" as UserRole
                };
            }
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
        },
        async signIn({ user, account }) {
            try {
                if (account?.provider === "credentials") {
                    return true;
                }

                if (!user.email) {
                    return false;
                }

                const findUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { provider: account?.provider, providerId: account?.providerAccountId },
                            { email: user.email }
                        ]
                    }
                });

                if (findUser) {
                    await prisma.user.update({
                        where: {
                            id: findUser.id
                        },
                        data: {
                            provider: account?.provider,
                            providerId: account?.providerAccountId
                        }
                    });

                    return true;
                }

                await prisma.user.create({
                    data: {
                        email: user.email,
                        fullName: user.name || "User # " + user.id,
                        provider: account?.provider,
                        providerId: account?.providerAccountId,
                        password: hashSync(user.id.toString(), 10),
                        verified: new Date()
                    }
                });

                return true;
            } catch (e) {
                console.log(e);
                return false;
            }
        }
    }
};

const handle = NextAuth(authOptions);

export { handle as GET, handle as POST };
