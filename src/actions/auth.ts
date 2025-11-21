import bcrypt from 'bcryptjs'
import prisma from '@/libs/prisma'

interface CredentialsUser {
  email: string
  password: string
}

export const verifyEmail = async ({ email, password }: CredentialsUser) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  })

  if (!user) {
    const newUser = await createUser({ email, password })
    return newUser
  }

  const duplicateEmail = bcrypt.compareSync(password, user?.password as string)

  if (!duplicateEmail) return null
  return user
}

export const createUser = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  return await prisma.user.create({
    data: {
      email: email as string,
      password: bcrypt.hashSync(password),
      name: email.split('@')[0],
    },
  })
}
