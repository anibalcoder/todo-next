'use server'

import type { Todo } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { ValidationError } from 'yup'
import type { TodoResponse } from '@/interfaces/todoResponse'
import prisma from '@/libs/prisma'
import { createTodoSchema } from '@/schemas/todo.schema'

export const getTodos = async ({
  skip,
  take = 10,
}: {
  skip: number
  take: number
}): Promise<string | Todo[]> => {
  try {
    if (isNaN(skip) || skip < 0) {
      throw new Error('skip debe ser un número válido mayor o igual a 0')
    }

    if (isNaN(take) || take < 1) {
      throw new Error('take debe ser un número válido mayor o igual a 1')
    }

    const todos = await prisma.todo.findMany({
      skip,
      take,
      orderBy: { createAt: 'asc' },
    })

    return todos
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Error interno del servidor. Inténtalo más tarde'

    return errorMessage
  }
}

export const createTodo = async ({
  description,
  completed,
}: {
  description: Todo['description']
  completed: Todo['completed']
}): Promise<TodoResponse> => {
  try {
    const validatedData = await createTodoSchema.validate({
      description,
      completed,
    })

    await prisma.todo.create({
      data: validatedData,
    })

    revalidatePath('/')

    return {
      isError: false,
      message: 'Tarea agregada exitosamente',
    }
  } catch (error) {
    const errorMessage =
      error instanceof ValidationError
        ? error.message
        : 'Error interno del servidor. Inténtalo más tarde'

    return {
      isError: true,
      message: errorMessage,
    }
  }
}

export const updateTodo = async ({
  id,
  description,
  completed,
}: {
  id: Todo['id']
  description: Todo['description']
  completed: Todo['completed']
}): Promise<TodoResponse> => {
  try {
    const todo = await prisma.todo.findUnique({
      where: { id },
    })

    if (!todo) throw new Error('La tarea no existe')

    await prisma.todo.update({
      where: { id },
      data: {
        description,
        completed,
      },
    })

    revalidatePath('/')

    return {
      isError: false,
      message: 'Tarea actualizada correctamente',
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Error interno del servidor. Inténtalo más tarde'

    return {
      isError: true,
      message: errorMessage,
    }
  }
}

export const deleteTodo = async ({
  id,
}: {
  id: Todo['id']
}): Promise<TodoResponse> => {
  try {
    const todo = await prisma.todo.findFirst({ where: { id } })

    if (!todo) throw 'La tarea no existe'

    await prisma.todo.delete({ where: { id } })

    revalidatePath('/')

    return {
      isError: false,
      message: 'Tarea eliminado correctamente',
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Error interno del servidor. Inténtalo más tarde'

    return {
      isError: true,
      message: errorMessage,
    }
  }
}
