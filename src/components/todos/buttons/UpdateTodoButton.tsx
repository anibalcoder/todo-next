'use client'

import type { Todo } from '@prisma/client'
import { useState } from 'react'
import { updateTodo } from '@/actions/actions-todo'
import { EditIcon } from '@/components/icons'
import { notify } from '@/utils/notify'
import { TodoFormModal } from '../TodoFormModal'

interface Props extends Pick<Todo, 'id' | 'description' | 'completed'> {}

export const UpdateTodoButton = ({
  id: todoId,
  description: initialDescription,
  completed: initialCompleted,
}: Props) => {
  const [isModal, setIsModal] = useState(false)

  const handleCloseModal = () => setIsModal(false)

  const handleUpdateTodo = async ({
    completed,
    description,
  }: Omit<Props, 'id'>) => {
    const { isError, message } = await updateTodo({
      id: todoId,
      completed,
      description,
    })
    notify({ isError, message })
  }

  return (
    <>
      <button
        onClick={() => setIsModal(!isModal)}
        className='cursor-pointer hover:scale-125 transition-transform'
        type='button'
      >
        <EditIcon className='size-6 text-[#9BB4C0] ml-4' />
      </button>

      {isModal && (
        <TodoFormModal
          title='Actualizar tarea'
          description={initialDescription}
          completed={initialCompleted}
          onSubmitTodo={handleUpdateTodo}
          onClose={handleCloseModal}
        />
      )}
    </>
  )
}
