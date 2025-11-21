import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { redirect } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
import { getUserSessionServer } from '@/actions/user'
import { AuthWrapper } from '@/auth/AuthWrapper'
import { Sidebar } from '@/components/sidebar/Sidebar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Todo APP',
  description: 'Lista de tareas con base de datos para almacenar tareas 📄',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUserSessionServer()

  if (!user) {
    redirect('/api/auth/signin')
  }

  return (
    <html lang='es-PE'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-0!`}
      >
        <AuthWrapper>
          <Sidebar />
          {children}
        </AuthWrapper>
        <Toaster position='top-center' reverseOrder />
      </body>
    </html>
  )
}
