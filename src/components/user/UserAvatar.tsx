import Image from 'next/image'
import { useUserInClient } from '@/hooks/useUser'

export const UserAvatar = () => {
  const { name, image, rol } = useUserInClient()

  return (
    <article className='space-y-3'>
      <Image
        src={image}
        alt='Avatar user'
        width='32'
        height='32'
        className='w-16 md:w-16 rounded-full mx-auto'
      />

      <div>
        <h2 className='font-medium text-lg text-center text-teal-500'>
          {name}
        </h2>

        <p className='text-sm text-gray-500 text-center capitalize'>
          {rol.join(', ')}
        </p>
      </div>
    </article>
  )
}
