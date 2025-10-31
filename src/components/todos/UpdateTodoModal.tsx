import type { Todo } from '@prisma/client'
import { useActionState } from 'react'

interface Props extends Pick<Todo, 'description' | 'completed'> {
  updateTodo: ({
    completed,
    description,
  }: Pick<Todo, 'completed' | 'description'>) => Promise<void>
  onCloseModal: () => void
}

export const UpdateTodoModal = ({
  description: intialDescription,
  completed: initialCompleted,
  updateTodo,
  onCloseModal,
}: Props) => {
  const handleSubmitTodo = async (_: unknown, formData: FormData) => {
    const description = formData?.get('description') as string
    const completed = formData?.get('completed') as string

    await updateTodo({ completed: !!completed, description })
  }

  const [_, formAction, isLoading] = useActionState(handleSubmitTodo, null)

  return (
    <article className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-hidden'>
      <div className='bg-neutral-900 w-[90%] max-w-md rounded-2xl shadow-lg p-6 sm:p-8'>
        <h2 className='text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100'>
          Actualizar tarea
        </h2>

        <form action={formAction} className='space-y-4'>
          <div>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1'
            >
              Descripción
            </label>

            <textarea
              id='description'
              name='description'
              defaultValue={intialDescription}
              className='w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-gray-100 resize-none'
              rows={3}
            />
          </div>

          <div className='flex items-center gap-2'>
            <input
              id='completed'
              type='checkbox'
              name='completed'
              defaultChecked={initialCompleted}
              className='w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300'
            />

            <label
              htmlFor='completed'
              className='text-sm text-gray-700 dark:text-gray-300'
            >
              Completado
            </label>
          </div>

          <div className='flex justify-end gap-2 mt-6'>
            <button
              onClick={onCloseModal}
              type='button'
              className='px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition'
            >
              Cancelar
            </button>

            <button
              type='submit'
              disabled={isLoading}
              className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed'
            >
              {isLoading ? 'Guardando..' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </article>
  )
}
