'use client'

import type { Todo } from '@prisma/client'
import { useState } from 'react'
import { createTodo } from '@/actions/actions-todo'
import { notify } from '@/utils/notify'
import { TodoFormModal } from '../TodoFormModal'

export const CreateTodoButton = () => {
  const [isModal, setIsModal] = useState(false)

  const handleCloseModal = () => setIsModal(false)

  const handleCreateTodo = async ({
    description,
    completed,
  }: Pick<Todo, 'description' | 'completed'>) => {
    const { isError, message } = await createTodo({ completed, description })
    notify({ isError, message })
  }

  return (
    <>
      <button
        onClick={() => setIsModal(!isModal)}
        type='button'
        className='bg-[#4F1C51] text-white text-sm font-bold px-4 py-2 rounded-md cursor-pointer hover:scale-110 transition-transform'
      >
        Agregar tarea
      </button>

      {isModal && (
        <TodoFormModal
          title='Crear tarea'
          onSubmitTodo={handleCreateTodo}
          onClose={handleCloseModal}
        />
      )}
    </>
  )
}
