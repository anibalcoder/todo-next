import type { Todo } from '@prisma/client'
import {
  CompletedTodoButton,
  DeleteTodoButton,
  UpdateTodoButton,
} from '@/components/todos/buttons'

interface Props {
  todo: Todo
}

export const TodoItem = ({ todo }: Props) => {
  return (
    <article className='w-full shadow-md rounded-lg overflow-hidden bg-zinc-900'>
      <header className='flex justify-between items-center px-6 py-4'>
        <div className='flex items-center'>
          {todo.completed ? (
            <CompletedTodoButton isCompeted />
          ) : (
            <CompletedTodoButton isCompeted={false} />
          )}
        </div>

        <div className='flex items-center gap-2'>
          <UpdateTodoButton
            id={todo.id}
            description={todo.description}
            completed={todo.completed}
          />

          <DeleteTodoButton todoId={todo.id} />
        </div>
      </header>

      <p className='px-6 py-4 text-white'>{todo.description}</p>
    </article>
  )
}
