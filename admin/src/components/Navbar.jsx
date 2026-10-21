import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)
  const navigate = useNavigate()
  const location = useLocation()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  const goToUserPanel = () => {
    // Redirect to VitaCare client application
    window.location.href = '/'
  }

  const isOnDashboard =
    location.pathname === '/admin-dashboard' ||
    location.pathname === '/doctor-dashboard'

  return (
    <div className='flex justify-between items-center px-6 sm:px-10 py-4 border-b border-gray-100 bg-white shadow-sm sticky top-0 z-50'>
      <div className='flex items-center gap-4 text-xs'>

        {/* Logo */}
        <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate('/')}>
          <img
            className='w-32 sm:w-36 object-contain'
            src={assets.admin_logo}
            alt="VitaCare Admin"
          />
        </div>

        {/* Role Label */}
        <span className='border border-emerald-200 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-semibold uppercase tracking-wider text-[11px]'>
          {aToken ? 'Admin Portal' : 'Doctor Portal'}
        </span>

        {/* User Panel Button (visible on both dashboards) */}
        {isOnDashboard && (
          <button
            onClick={goToUserPanel}
            className='ml-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-4 py-1.5 rounded-full font-medium transition-all'
          >
            View Patient Site
          </button>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className='bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-8 py-2.5 rounded-xl transition-all shadow-sm'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar