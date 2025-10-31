'use client'

import type { Todo } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { TrashIcon } from '@/components/icons'
import { deleteTodo } from '@/services/todos'
import { notify } from '@/utils/notify'

interface Props {
  todoId: Todo['id']
}

export const DeleteTodoButton = ({ todoId }: Props) => {
  const router = useRouter()

  const handleDeleteTodo = async () => {
    try {
      await deleteTodo({ id: todoId })
      router.refresh()
      notify({ isError: false, message: 'Tarea eliminada correctamente' })
    } catch {
      notify({
        isError: true,
        message: 'No se pudo eliminar la tarea. Inténtalo nuevamente.',
      })
    }
  }

  return (
    <button
      onClick={handleDeleteTodo}
      className='cursor-pointer hover:scale-125 transition-transform'
      type='button'
    >
      <TrashIcon className='size-6 text-[#FD8A8A]' />
    </button>
  )
}
