import { LogoutIcon } from '@/components/icons'

export const Logout = () => {
  return (
    <button
      className='flex w-full items-center gap-2 bg-black text-white px-4 py-3 rounded-xl cursor-pointer'
      type='button'
    >
      <LogoutIcon />
      <span>Cerrar sesión</span>
    </button>
  )
}
