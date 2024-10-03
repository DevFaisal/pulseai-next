import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        hospitalCode: {
          label: "H-Code",
          type: "text",
          placeholder: "Enter your H-Code",
        },
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
              Hospital: {
                hospitalCode: credentials.hospitalCode,
              },
            },
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              password: true,
              Hospital: {
                select: {
                  id: true,
                  name: true,
                  hospitalCode: true,
                },
              },
            },
          });

          if (!user) {
            return null;
          }
          if (user.role === "DOCTOR") {
          }
          if (credentials.hospitalCode !== user?.Hospital.hospitalCode) {
            return null;
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValidPassword) {
            return null;
          }
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            hospitalId: user.Hospital.id,
            hospitalName: user.Hospital.name,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.hospitalId = user.hospitalId;
        token.hospitalName = user.hospitalName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.hospitalId = token.hospitalId;
        session.user.hospitalName = token.hospitalName;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
