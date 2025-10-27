import { type NextRequest, NextResponse } from 'next/server'
import { ValidationError } from 'yup'
import prisma from '@/libs/prisma'
import { updateTodoSchema } from '@/schemas/todo.schema'

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params

    const todo = await prisma.todo.findFirst({
      where: { id },
    })

    if (!todo) {
      return NextResponse.json(
        { error: `El Id ${id} no existe` },
        { status: 404 },
      )
    }

    return NextResponse.json(todo)
  } catch {
    return NextResponse.json(
      { error: 'Error interno del servidor. Inténtalo más tarde.' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params

    const todo = await prisma.todo.findFirst({
      where: { id },
    })

    if (!todo) {
      return NextResponse.json(
        { error: `El Id ${id} no existe` },
        { status: 404 },
      )
    }

    await prisma.todo.delete({
      where: { id },
    })

    return NextResponse.json({
      message: `Tarea con id ${id} eliminado correctamente.`,
    })
  } catch {
    return NextResponse.json(
      { error: 'Error interno del servidor. Inténtalo más tarde.' },
      { status: 500 },
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params

    const todo = await prisma.todo.findUnique({
      where: { id },
    })

    if (!todo) {
      return NextResponse.json(
        { error: `El Id ${id} no existe` },
        { status: 404 },
      )
    }

    const { description, completed } = await updateTodoSchema.validate(
      await request.json(),
    )

    const updateTodo = await prisma.todo.update({
      where: { id },
      data: {
        description,
        completed,
      },
    })

    return NextResponse.json({
      message: 'Tarea actualizada correctamente',
      data: updateTodo,
    })
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(
      { error: 'Error interno del servidor. Inténtalo más tarde.' },
      { status: 500 },
    )
  }
}
