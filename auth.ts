import { PrismaAdapter } from '@auth/prisma-adapter'
import type { DefaultSession } from 'next-auth'
import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import { verifyEmail } from '@/actions/auth'
import prisma from '@/libs/prisma'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      rol: string[]
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    rol: string[]
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: {
          type: 'email',
          label: 'Email',
          placeholder: 'johndoe@gmail.com',
        },
        password: {
          type: 'password',
          label: 'Password',
          placeholder: '*****',
        },
      },
      authorize: async credentials => {
        const { email, password } = credentials
        if (!email || !password) return null

        const user = await verifyEmail({
          email: email as string,
          password: password as string,
        })

        return user
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email! },
      })

      token.rol = dbUser?.rol!
      token.id = dbUser?.id!
      return token
    },
    async session({ token, session }) {
      if (session.user) {
        session.user.id = token.id
        session.user.rol = token.rol
      }

      return session
    },
  },
})
