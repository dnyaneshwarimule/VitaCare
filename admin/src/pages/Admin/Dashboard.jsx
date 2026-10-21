import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='max-w-7xl mx-auto px-6 md:px-10 py-10'>
      
      {/* Page Header */}
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-800 tracking-tight'>Admin Dashboard</h1>
        <p className='text-gray-500 text-sm mt-1'>Overview of hospital statistics, active doctors, and recent bookings.</p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10'>
        
        {/* Doctors Stat */}
        <div className='flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all duration-300 group'>
          <div className='w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform'>
            <img className='w-8 h-8 object-contain' src={assets.doctor_icon} alt="Doctors" />
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-800'>{dashData.doctors}</p>
            <p className='text-gray-400 text-sm font-medium'>Total Doctors</p>
          </div>
        </div>

        {/* Appointments Stat */}
        <div className='flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all duration-300 group'>
          <div className='w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform'>
            <img className='w-8 h-8 object-contain' src={assets.appointments_icon} alt="Appointments" />
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-800'>{dashData.appointments}</p>
            <p className='text-gray-400 text-sm font-medium'>Total Appointments</p>
          </div>
        </div>

        {/* Patients Stat */}
        <div className='flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all duration-300 group'>
          <div className='w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform'>
            <img className='w-8 h-8 object-contain' src={assets.patients_icon} alt="Patients" />
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-800'>{dashData.patients}</p>
            <p className='text-gray-400 text-sm font-medium'>Total Patients</p>
          </div>
        </div>

      </div>

      {/* Latest Bookings Section */}
      <div className='bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden'>
        
        <div className='flex items-center gap-3 px-6 py-5 border-b border-gray-100 bg-gray-50/50'>
          <img className='w-5 h-5 object-contain' src={assets.list_icon} alt="" />
          <p className='font-bold text-gray-800'>Latest Bookings</p>
        </div>

        <div className='divide-y divide-gray-100'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-6 py-4 gap-4 hover:bg-emerald-50/30 transition-colors' key={index}>
              <div className='w-12 h-12 rounded-full overflow-hidden bg-emerald-50 border border-emerald-100 flex-shrink-0'>
                <img className='w-full h-full object-cover' src={item.docData.image} alt={item.docData.name} />
              </div>
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-bold'>{item.docData.name}</p>
                <p className='text-gray-500 text-xs mt-0.5'>Booking on <span className='font-medium text-gray-700'>{slotDateFormat(item.slotDate)}</span></p>
              </div>
              <div>
                {item.cancelled ? (
                  <span className='bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-full text-xs font-semibold'>
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className='bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-semibold'>
                    Completed
                  </span>
                ) : (
                  <button 
                    onClick={() => cancelAppointment(item._id)} 
                    className='border border-gray-200 hover:border-red-500 hover:bg-red-50 text-gray-500 hover:text-red-600 px-4 py-1.5 rounded-xl text-xs font-medium transition-all shadow-sm flex items-center gap-1.5 cursor-pointer'
                    title="Cancel Appointment"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  )
}

export default Dashboard