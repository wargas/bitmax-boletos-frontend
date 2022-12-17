import { CaretDown } from 'phosphor-react'
import useAppStore from '../stores/app-store'
import UserMenu from './user-menu'

export default function Header() {
  const user = useAppStore(s => s.user)
  return (
    <div className="h-header flex absolute top-0 right-0 left-0 border-b bg-white">
      <div className="ml-auto">
        <UserMenu>
          <button className="h-full text-gray-700 px-4 flex items-center hover:bg-gray-50 gap-2 text-base">
            {user?.name} <CaretDown size={10} />{' '}
          </button>
        </UserMenu>
      </div>
    </div>
  )
}
