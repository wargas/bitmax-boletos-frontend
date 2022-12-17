import { ChartBar, UploadSimple, UserList, Barcode } from 'phosphor-react'
import { NavLink, Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div id='sidebar'>
        <div className='flex items-center border-b h-header text-primary-700 text-4xl font-extrabold justify-center '>
            <Link to="/">BIT<span className='text-black'>MAX</span></Link>
        </div>
      <ul className='main-menu'>
        <li>
          <NavLink to="/dashboard">
           <ChartBar /> <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/remessas">
           <UploadSimple /> <span>Remessas</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/clientes">
           <UserList /> <span>Clientes</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/boletos">
           <Barcode /> <span>Boletos</span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
