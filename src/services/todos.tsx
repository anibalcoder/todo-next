import type { Todo } from '@prisma/client'
import type { deleteTodoResponse, UpdateTodoResponse } from '@/interfaces'

const baseUrlApi = 'http://localhost:3000/api'

export async function getTodos(): Promise<Todo[]> {
  try {
    const res = await fetch(`${baseUrlApi}/todos`)

    if (!res.ok) {
      throw new Error(
        `Error al obtener los todos: ${res.status} ${res.statusText}`,
      )
    }

    const todos = (await res.json()) as Todo[]
    return todos
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Error desconocido al obtener los todos.'

    throw new Error(errorMessage)
  }
}

export async function deleteTodo({
  id,
}: {
  id: Todo['id']
}): Promise<deleteTodoResponse> {
  const res = await fetch(`${baseUrlApi}/todos/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error(`No se pudo eliminar la tarea. Inténtalo nuevamente.`)
  }

  const data = (await res.json()) as deleteTodoResponse
  return data
}

export async function updateTodo({
  id,
  completed,
  description,
}: {
  id: Todo['id']
  completed?: Todo['completed']
  description?: Todo['description']
}): Promise<UpdateTodoResponse> {
  const res = await fetch(`${baseUrlApi}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      completed,
      description,
    }),
  })

  if (res.status === 400) {
    throw new Error(`La descripción debe tener al menos 4 caracteres.`)
  }

  if (!res.ok) {
    throw new Error(`No se pudo eliminar la tarea. Inténtalo nuevamente.`)
  }

  const data = (await res.json()) as UpdateTodoResponse
  return data
}
