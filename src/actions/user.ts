import { auth } from '../../auth'

export async function getUserSessionServer() {
  const session = await auth()

  if (!session?.user) {
    return null
  }

  return {
    id: session.user.id!,
    name: session.user.name ?? 'No Username',
    image: session.user.image ?? '/noProfilePhoto.webp',
    email: session.user.email!,
    rol: session.user.rol!,
  }
}
