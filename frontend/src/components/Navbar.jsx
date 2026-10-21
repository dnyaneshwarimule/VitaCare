import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 border-b border-b-gray-200'>
      {/* Brand / Logo */}
      <div onClick={() => navigate('/')} className='flex items-center gap-2 cursor-pointer'>
        <div className='bg-emerald-600 text-white p-2 rounded-xl flex items-center justify-center shadow-sm'>
          <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4v16m8-8H4'></path>
          </svg>
        </div>
        <span className='text-xl font-bold tracking-tight text-gray-800'>
          Vita<span className='text-emerald-600'>Care</span>
        </span>
      </div>

      <ul className='hidden md:flex items-start gap-8 font-medium text-gray-600'>
        <li className='pb-0.5'>
          <NavLink to='/' className={({ isActive }) => isActive ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1' : 'hover:text-emerald-600 transition-colors'}>HOME</NavLink>
        </li>
        <li className='pb-0.5'>
          <NavLink to='/doctors' className={({ isActive }) => isActive ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1' : 'hover:text-emerald-600 transition-colors'}>ALL DOCTORS</NavLink>
        </li>
        <li className='pb-0.5'>
          <NavLink to='/about' className={({ isActive }) => isActive ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1' : 'hover:text-emerald-600 transition-colors'}>ABOUT</NavLink>
        </li>
        <li className='pb-0.5'>
          <NavLink to='/contact' className={({ isActive }) => isActive ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1' : 'hover:text-emerald-600 transition-colors'}>CONTACT</NavLink>
        </li>
      </ul>

      <div className='flex items-center gap-4'>

        {/* Admin Panel Button - show only on home page */}
        {location.pathname === '/' && (
          <button
           onClick={() => window.open('http://localhost:5174', '_blank')}
            className='bg-gray-100 text-gray-700 border border-gray-300 text-xs px-4 py-2 rounded-full hover:bg-gray-200 transition-all hidden md:block font-medium'
          >
            Admin Panel
          </button>
        )}

        {token && userData ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-10 h-10 rounded-full object-cover border border-emerald-500' src={userData.image || '/fallback-user.png'} alt="profile" />
            <img className='w-2.5' src={assets.dropdown_icon || '/fallback-icon.png'} alt="dropdown" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-white shadow-lg border border-gray-100 rounded-xl flex flex-col gap-3 p-4'>
                <p onClick={() => navigate('my-profile')} className='hover:text-emerald-600 cursor-pointer transition-colors'>My Profile</p>
                <p onClick={() => navigate('my-appointments')} className='hover:text-emerald-600 cursor-pointer transition-colors'>My Appointments</p>
                <p onClick={logout} className='hover:text-red-600 cursor-pointer transition-colors'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-sm hidden md:block'
          >
            Create Account
          </button>
        )}

        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt="menu" />

        {/* ---- Mobile Menu ---- */}
        <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all shadow-2xl`}>
          <div className='flex items-center justify-between px-5 py-6 border-b border-gray-100'>
            <div className='flex items-center gap-2'>
              <div className='bg-emerald-600 text-white p-1.5 rounded-lg'>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4v16m8-8H4'></path>
                </svg>
              </div>
              <span className='text-lg font-bold text-gray-800'>Vita<span className='text-emerald-600'>Care</span></span>
            </div>
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7 cursor-pointer' alt="close" />
          </div>
          <ul className='flex flex-col items-center gap-4 mt-8 px-5 text-lg font-medium text-gray-700'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors'>CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar