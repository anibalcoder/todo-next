import type { Todo } from '@prisma/client'
import { getTodos } from '@/actions/actions-todo'
import { TodoItem } from '@/components/todos'

export const TodoGrid = async () => {
  const todos = (await getTodos({ skip: 0, take: 10 })) as Todo[]

  return (
    <section>
      <ul className='todoGrid'>
        {todos.map(todo => (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
    </section>
  )
}
