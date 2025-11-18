import Link from 'next/link'
import type { JSX } from 'react'

interface Props {
  title: string
  link: string
  Icon: () => JSX.Element
}

export const SidebarItem = ({ title, link, Icon }: Props) => {
  return (
    <Link
      href={link}
      className='flex items-center gap-2 text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out'
    >
      <Icon />
      <span>{title}</span>
    </Link>
  )
}
