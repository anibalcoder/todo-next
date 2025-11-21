import { useSession } from 'next-auth/react'

export const useUserInClient = () => {
  const { data: session, status } = useSession()

  const name =
    status === 'loading'
      ? 'Cargando nombre...'
      : (session?.user?.name ?? 'No Username')

  const image =
    status === 'loading'
      ? '/loading.gif'
      : (session?.user?.image ?? '/noProfilePhoto.webp')

  const email =
    status === 'loading'
      ? 'Cargando Email...'
      : (session?.user?.email ?? 'No email')

  const rol =
    status === 'loading' ? ['Rol...'] : (session?.user?.rol ?? ['No role'])

  return {
    name,
    image,
    email,
    status,
    rol,
  }
}
