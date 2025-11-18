import Image from 'next/image'

export const UserAvatar = () => {
  return (
    <article className='space-y-3'>
      <Image
        src='https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
        alt='Avatar user'
        width='32'
        height='32'
        className='w-10 md:w-16 rounded-full mx-auto'
      />

      <div>
        <h2 className='font-medium text-lg text-center text-teal-500'>
          Eduard Pantazi
        </h2>

        <p className='text-sm text-gray-500 text-center'>Administrator</p>
      </div>
    </article>
  )
}
