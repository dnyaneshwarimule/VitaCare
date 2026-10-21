import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  return (
    <div className='min-h-screen bg-white border-r border-gray-100 py-6'>
      {aToken && (
        <ul className='text-gray-600 flex flex-col gap-1.5'>
          <NavLink 
            to={'/admin-dashboard'} 
            className={({ isActive }) => `flex items-center gap-3.5 py-3.5 px-6 md:px-8 md:min-w-72 cursor-pointer transition-all duration-200 ${isActive ? 'bg-emerald-50 text-emerald-700 font-semibold border-r-4 border-emerald-600 shadow-sm' : 'hover:bg-gray-50'}`}
          >
            <img className='w-5 h-5 object-contain' src={assets.home_icon} alt='' />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>
          <NavLink 
            to={'/all-appointments'} 
            className={({ isActive }) => `flex items-center gap-3.5 py-3.5 px-6 md:px-8 md:min-w-72 cursor-pointer transition-all duration-200 ${isActive ? 'bg-emerald-50 text-emerald-700 font-semibold border-r-4 border-emerald-600 shadow-sm' : 'hover:bg-gray-50'}`}
          >
            <img className='w-5 h-5 object-contain' src={assets.appointment_icon} alt='' />
            <p className='hidden md:block'>Appointments</p>
          </NavLink>
          <NavLink 
            to={'/add-doctor'} 
            className={({ isActive }) => `flex items-center gap-3.5 py-3.5 px-6 md:px-8 md:min-w-72 cursor-pointer transition-all duration-200 ${isActive ? 'bg-emerald-50 text-emerald-700 font-semibold border-r-4 border-emerald-600 shadow-sm' : 'hover:bg-gray-50'}`}
          >
            <img className='w-5 h-5 object-contain' src={assets.add_icon} alt='' />
            <p className='hidden md:block'>Add Doctor</p>
          </NavLink>
          <NavLink 
            to={'/doctor-list'} 
            className={({ isActive }) => `flex items-center gap-3.5 py-3.5 px-6 md:px-8 md:min-w-72 cursor-pointer transition-all duration-200 ${isActive ? 'bg-emerald-50 text-emerald-700 font-semibold border-r-4 border-emerald-600 shadow-sm' : 'hover:bg-gray-50'}`}
          >
            <img className='w-5 h-5 object-contain' src={assets.people_icon} alt='' />
            <p className='hidden md:block'>Doctors List</p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className='text-gray-600 flex flex-col gap-1.5'>
          <NavLink 
            to={'/doctor-dashboard'} 
            className={({ isActive }) => `flex items-center gap-3.5 py-3.5 px-6 md:px-8 md:min-w-72 cursor-pointer transition-all duration-200 ${isActive ? 'bg-emerald-50 text-emerald-700 font-semibold border-r-4 border-emerald-600 shadow-sm' : 'hover:bg-gray-50'}`}
          >
            <img className='w-5 h-5 object-contain' src={assets.home_icon} alt='' />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>
          <NavLink 
            to={'/doctor-appointments'} 
            className={({ isActive }) => `flex items-center gap-3.5 py-3.5 px-6 md:px-8 md:min-w-72 cursor-pointer transition-all duration-200 ${isActive ? 'bg-emerald-50 text-emerald-700 font-semibold border-r-4 border-emerald-600 shadow-sm' : 'hover:bg-gray-50'}`}
          >
            <img className='w-5 h-5 object-contain' src={assets.appointment_icon} alt='' />
            <p className='hidden md:block'>Appointments</p>
          </NavLink>
          <NavLink 
            to={'/doctor-profile'} 
            className={({ isActive }) => `flex items-center gap-3.5 py-3.5 px-6 md:px-8 md:min-w-72 cursor-pointer transition-all duration-200 ${isActive ? 'bg-emerald-50 text-emerald-700 font-semibold border-r-4 border-emerald-600 shadow-sm' : 'hover:bg-gray-50'}`}
          >
            <img className='w-5 h-5 object-contain' src={assets.people_icon} alt='' />
            <p className='hidden md:block'>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  )
}

export default Sidebar