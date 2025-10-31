'use client'

import type { Todo } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createTodo } from '@/services/todos'
import { notify } from '@/utils/notify'
import { TodoFormModal } from '../TodoFormModal'

export const CreateTodoButton = () => {
  const [isModal, setIsModal] = useState(false)
  const router = useRouter()

  const handleCloseModal = () => setIsModal(false)

  const handleCreateTodo = async ({
    description,
    completed,
  }: Pick<Todo, 'description' | 'completed'>) => {
    try {
      const resp = await createTodo({ completed, description })
      handleCloseModal()
      router.refresh()
      notify({ isError: false, message: resp.message })
    } catch (error) {
      if (error instanceof Error) {
        notify({ isError: true, message: error.message })
      }
    }
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
