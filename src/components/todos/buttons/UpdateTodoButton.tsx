'use client'

import type { Todo } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { EditIcon } from '@/components/icons'
import { updateTodo } from '@/services/todos'
import { notify } from '@/utils/notify'
import { UpdateTodoModal } from '../UpdateTodoModal'

interface Props extends Pick<Todo, 'id' | 'description' | 'completed'> {}

export const UpdateTodoButton = ({
  id: todoId,
  description: initialDescription,
  completed: initialCompleted,
}: Props) => {
  const [isModal, setIsModal] = useState(false)
  const router = useRouter()

  const handleCloseModal = () => setIsModal(false)

  const handleUpdateTodo = async ({
    completed,
    description,
  }: Omit<Props, 'id'>) => {
    try {
      const rest = await updateTodo({ id: todoId, completed, description })
      handleCloseModal()
      router.refresh()
      notify({ isError: false, message: rest.message })
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
        className='cursor-pointer hover:scale-125 transition-transform'
        type='button'
      >
        <EditIcon className='size-6 text-[#9BB4C0] ml-4' />
      </button>

      {isModal && (
        <UpdateTodoModal
          description={initialDescription}
          completed={initialCompleted}
          updateTodo={handleUpdateTodo}
          onCloseModal={handleCloseModal}
        />
      )}
    </>
  )
}
