import { TodoGrid } from '@/components/todos'
import { CreateTodoButton } from '@/components/todos/buttons'

export const metadata = {
  title: 'Lista de tareas',
  description: 'Obtendras tus listas de tareas',
}

export default function TodoPage() {
  return (
    <div>
      <header>
        <div className='max-w-7xl w-full mx-auto px-4 py-6 flex items-center justify-end'>
          <CreateTodoButton />
        </div>
      </header>

      <TodoGrid />
    </div>
  )
}
