import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as {
  prisma?: PrismaClient
}

const prisma =
  // biome-ignore lint/suspicious/noAssignInExpressions: assigning value intentionally inside condition
  globalForPrisma.prisma ?? (globalForPrisma.prisma = new PrismaClient())

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
