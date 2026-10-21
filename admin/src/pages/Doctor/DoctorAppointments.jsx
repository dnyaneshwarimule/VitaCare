import React from 'react'
import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className='max-w-7xl mx-auto px-6 md:px-10 py-10'>
      
      {/* Page Header */}
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-800 tracking-tight'>Patient Appointments</h1>
        <p className='text-gray-500 text-sm mt-1'>Review scheduled patient visits, verify payment modes, and manage visit statuses.</p>
      </div>

      <div className='bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden'>
        
        {/* Table Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] py-4 px-6 border-b border-gray-100 bg-gray-50/50 text-xs font-bold text-gray-400 uppercase tracking-wider items-center'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p className='text-center'>Action</p>
        </div>

        {/* Table Body */}
        <div className='divide-y divide-gray-100 max-h-[70vh] overflow-y-auto'>
          {appointments.length === 0 ? (
            <div className='py-16 text-center text-gray-500 text-sm'>
              No appointments assigned yet.
            </div>
          ) : (
            appointments.map((item, index) => (
              <div 
                className='flex flex-col sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] items-start sm:items-center gap-4 sm:gap-0 py-4 px-6 hover:bg-emerald-50/20 transition-colors text-sm text-gray-600' 
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

                {/* Payment Badge */}
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block border ${
                    item.payment 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {item.payment ? 'Online' : 'CASH'}
                  </span>
                </div>

                <p className='hidden sm:block font-medium text-gray-600'>{calculateAge(item.userData.dob)}</p>
                
                {/* Date & Time */}
                <div>
                  <p className='font-medium text-gray-800'>{slotDateFormat(item.slotDate)}</p>
                  <p className='text-xs text-gray-400'>{item.slotTime}</p>
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
                    <div className='flex items-center gap-2'>
                      <button 
                        onClick={() => cancelAppointment(item._id)} 
                        className='p-2 rounded-xl border border-gray-200 hover:border-red-500 hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all shadow-sm cursor-pointer'
                        title="Cancel Appointment"
                      >
                        <img className='w-4 h-4' src={assets.cancel_icon} alt="Cancel" />
                      </button>
                      <button 
                        onClick={() => completeAppointment(item._id)} 
                        className='p-2 rounded-xl border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 transition-all shadow-sm cursor-pointer'
                        title="Complete Appointment"
                      >
                        <img className='w-4 h-4' src={assets.tick_icon} alt="Complete" />
                      </button>
                    </div>
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

export default DoctorAppointments