'use client'

import { useState } from 'react'
import {
  HomeIcon,
  MenuRoundedIcon,
  MenuToCloseIcon,
  TodoListIcon,
} from '@/components/icons'
import { UserAvatar } from '@/components/UserAvatar'
import { Logout } from './Logout'
import { SidebarItem } from './SidebarItem'

const sidebarItems = [
  {
    link: '/dashboard',
    title: 'Home',
    Icon: HomeIcon,
  },
  {
    link: '/dashboard/todos',
    title: 'Tareas',
    Icon: TodoListIcon,
  },
]

export const Sidebar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <div className='fixed w-full sm:w-64'>
      <button
        onClick={() => setToggleMenu(!toggleMenu)}
        className='p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0'
        type='button'
      >
        {toggleMenu ? <MenuToCloseIcon /> : <MenuRoundedIcon />}
      </button>

      <aside
        className={`${toggleMenu ? 'block' : 'hidden'} bg-white min-h-screen shadow-xl px-3 pt-12 pb-6 space-y-10 flex flex-col w-full overflow-x-hidden`}
      >
        <UserAvatar />

        <div className='flex-1 flex flex-col space-y-2'>
          {sidebarItems.map(({ title, link, Icon }) => (
            <SidebarItem key={link} title={title} link={link} Icon={Icon} />
          ))}
        </div>

        <Logout />
      </aside>
    </div>
  )
}
