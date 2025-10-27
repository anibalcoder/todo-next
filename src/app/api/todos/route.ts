import { type NextRequest, NextResponse } from 'next/server'
import { ValidationError } from 'yup'
import prisma from '@/libs/prisma'
import { createTodoSchema } from '@/schemas/todo.schema'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const skip = Number(searchParams.get('skip'))
    const take = Number(searchParams.get('take') ?? 10)

    if (isNaN(skip) || skip < 0) {
      return NextResponse.json(
        { error: 'skip debe ser un número válido mayor o igual a 0.' },
        { status: 400 },
      )
    }

    if (isNaN(take) || take < 1) {
      return NextResponse.json(
        { error: 'take debe ser un número válido mayor o igual a 1.' },
        { status: 400 },
      )
    }

    const todos = await prisma.todo.findMany({
      skip,
      take,
      orderBy: { createAt: 'asc' },
    })

    return NextResponse.json(todos)
  } catch {
    return NextResponse.json(
      { error: 'Error interno del servidor. Inténtalo más tarde.' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { description, completed } = await createTodoSchema.validate(
      await request.json(),
    )

    await prisma.todo.create({
      data: {
        description,
        completed,
      },
    })

    return NextResponse.json({
      message: 'task added successfully',
    })
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(error.message, { status: 400 })
    }

    return NextResponse.json(
      { error: 'Error interno del servidor. Inténtalo más tarde.' },
      { status: 500 },
    )
  }
}
