import Image from 'next/image'
import { getUserSessionServer } from '@/actions/user'

export const UserCard = async () => {
  const user = await getUserSessionServer()

  return (
    <article className='bg-gray-200 shadow-2xl w-full max-w-sm aspect-square rounded-lg'>
      <header className='flex p-2 gap-1'>
        <span className='bg-blue-500 inline-block center w-3 h-3 rounded-full'></span>
        <span className='bg-purple-500 inline-block center w-3 h-3 rounded-full'></span>
        <span className='bg-pink-500 box inline-block center w-3 h-3 rounded-full'></span>
      </header>

      <section className='space-y-8'>
        <figure>
          <Image
            className='w-36 block mx-auto rounded-full'
            src={user!.image}
            width={80}
            height={80}
            alt='Foto de perfíl'
          />
        </figure>

        <div className='space-y-3 flex gap-1 flex-col items-center'>
          <h1 className='text-xl font-bold text-[#b19451] mb-0'>
            {user!.name}
          </h1>

          <p className='text-[#453C67] font-bold'>{user!.email}</p>

          <span className='capitalize'>{user?.rol?.join(', ')}</span>
        </div>
      </section>
    </article>
  )
}
