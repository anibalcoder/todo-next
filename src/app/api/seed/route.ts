import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function GET() {
  await prisma.todo.deleteMany()

  await prisma.todo.createMany({
    data: [
      { description: 'Tarea 1', completed: true },
      { description: 'Tarea 2' },
      { description: 'Tarea 3' },
      { description: 'Tarea 4' },
      { description: 'Tarea 5' },
    ],
  })

  return NextResponse.json({
    message: 'seed executed successfully',
  })
}
