import { useEffect, useState } from 'react'
import Loading from 'react-loading'
import { Outlet, useNavigate } from 'react-router-dom'
import { useReadLocalStorage } from 'usehooks-ts'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import Api from '../libs/Api'
import useAppStore, { User } from '../stores/app-store'

export default function AdminPage() {
  const navigate = useNavigate()
  const token = useReadLocalStorage<string>('auth_token')
  const setUser = useAppStore((s) => s.setUser)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    if (!token) {
      navigate('/login')
    } else {
      Api.get<User>('/me')
        .then(({ data }) => {
          if ('id' in data) {
            setUser(data)
          }
        })
        .catch(() => navigate('/login'))
        .finally(() => {
          setLoading(false)
        })
    }
  }, [token])

  if (loading)
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Loading type="bars" width={40} height={40} color="green" />
      </div>
    )

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="absolute overflow-hidden overflow-y-auto  right-0 top-16 bottom-0 left-sidebar bg-[#f0f2f5]">
        <Outlet />
      </div>
    </div>
  )
}
