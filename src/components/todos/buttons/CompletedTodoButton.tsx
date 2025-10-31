import { CompletedIcon, XCircleIcon } from '@/components/icons'

interface Props {
  isCompeted: boolean
}

export const CompletedTodoButton = ({ isCompeted }: Props) => {
  if (isCompeted) {
    return (
      <button
        type='button'
        className='bg-[#FFC69D] px-3 py-1 rounded-md flex items-center gap-2'
      >
        <CompletedIcon className='size-4 text-green-600' />
        <span className='text-black text-sm'>Completado</span>
      </button>
    )
  }

  return (
    <button
      type='button'
      className='bg-[#CD2C58] px-3 py-1 rounded-md flex items-center gap-2'
    >
      <XCircleIcon className='size-5 text-white' />
      <span className='text-white text-sm'>No completado</span>
    </button>
  )
}
