import { signOut } from 'next-auth/react'
import { LogoutIcon } from '@/components/icons'

export const LogoutButton = () => {
  const onLogout = async () => {
    await signOut()
  }

  return (
    <button
      onClick={onLogout}
      className='flex w-full items-center gap-2 bg-black text-white px-4 py-3 rounded-xl cursor-pointer'
      type='button'
    >
      <LogoutIcon />
      <span>Cerrar sesión</span>
    </button>
  )
}
