import React, { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='max-w-7xl mx-auto px-6 md:px-10 py-10'>
      
      {/* Page Header */}
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-800 tracking-tight'>All Appointments</h1>
        <p className='text-gray-500 text-sm mt-1'>Manage and track all scheduled patient appointments across the platform.</p>
      </div>

      <div className='bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden'>
        
        {/* Table Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-4 px-6 border-b border-gray-100 bg-gray-50/50 text-xs font-bold text-gray-400 uppercase tracking-wider'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p className='text-center'>Action</p>
        </div>

        {/* Table Body */}
        <div className='divide-y divide-gray-100 max-h-[70vh] overflow-y-auto'>
          {appointments.length === 0 ? (
            <div className='py-16 text-center text-gray-500 text-sm'>
              No appointments found.
            </div>
          ) : (
            appointments.map((item, index) => (
              <div 
                className='flex flex-col sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-start sm:items-center gap-4 sm:gap-0 py-4 px-6 hover:bg-emerald-50/20 transition-colors text-sm text-gray-600' 
                key={index}
              >
                <p className='hidden sm:block font-medium text-gray-400'>{index + 1}</p>
                
                {/* Patient Info */}
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-full overflow-hidden bg-emerald-50 border border-emerald-100 flex-shrink-0'>
                    <img src={item.userData.image} className='w-full h-full object-cover' alt={item.userData.name} />
                  </div>
                  <p className='font-bold text-gray-800'>{item.userData.name}</p>
                </div>

                <p className='hidden sm:block font-medium text-gray-600'>{calculateAge(item.userData.dob)}</p>
                
                {/* Date & Time */}
                <div>
                  <p className='font-medium text-gray-800'>{slotDateFormat(item.slotDate)}</p>
                  <p className='text-xs text-gray-400'>{item.slotTime}</p>
                </div>

                {/* Doctor Info */}
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-full overflow-hidden bg-emerald-50 border border-emerald-100 flex-shrink-0'>
                    <img src={item.docData.image} className='w-full h-full object-cover' alt={item.docData.name} />
                  </div>
                  <p className='font-medium text-gray-800'>{item.docData.name}</p>
                </div>

                <p className='font-semibold text-gray-800'>{currency}{item.amount}</p>

                {/* Action / Status */}
                <div className='flex justify-start sm:justify-center w-full sm:w-auto'>
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
                      className='border border-gray-200 hover:border-red-500 hover:bg-red-50 text-gray-500 hover:text-red-600 px-4 py-1.5 rounded-xl text-xs font-medium transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer w-full sm:w-auto'
                      title="Cancel Appointment"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  )
}

export default AllAppointments