'use client'

import type { Todo } from '@prisma/client'
import { deleteTodo } from '@/actions/actions-todo'
import { TrashIcon } from '@/components/icons'
import { notify } from '@/utils/notify'

interface Props {
  todoId: Todo['id']
}

export const DeleteTodoButton = ({ todoId }: Props) => {
  const handleDeleteTodo = async () => {
    const { isError, message } = await deleteTodo({ id: todoId })
    notify({ isError, message })
  }

  return (
    <button
      onClick={() => handleDeleteTodo()}
      className='cursor-pointer hover:scale-125 transition-transform'
      type='button'
    >
      <TrashIcon className='size-6 text-[#FD8A8A]' />
    </button>
  )
}
