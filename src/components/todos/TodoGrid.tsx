import { TodoItem } from '@/components/todos'
import { getTodos } from '@/services/todos'

export const TodoGrid = async () => {
  const todos = await getTodos()

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
