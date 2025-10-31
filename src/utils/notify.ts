import toast from 'react-hot-toast'

interface Props {
  message: string
  isError: boolean
}

export const notify = ({ isError, message }: Props) => {
  if (isError) {
    return toast.error(message, {
      style: {
        backgroundColor: '#BF092F',
        color: '#FFF',
      },
    })
  }

  return toast.success(message, {
    style: {
      backgroundColor: '#FFF58A',
      color: '#000',
    },
  })
}
