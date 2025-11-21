import { UserCard } from '@/components/user/UserCard'

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard del usuario para gestionar tareas',
}

export default async function DashboardPage() {
  return (
    <section className='h-screen flex justify-center items-center'>
      <UserCard />
    </section>
  )
}
