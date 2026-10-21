import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className='max-w-7xl mx-auto px-6 md:px-10 py-10'>
      
      {/* Page Header */}
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-800 tracking-tight'>All Specialists</h1>
        <p className='text-gray-500 text-sm mt-1'>Manage registered doctors, view their profiles, and toggle availability status.</p>
      </div>

      {/* Doctors Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {doctors.length === 0 ? (
          <div className='col-span-full py-16 text-center text-gray-500 text-sm bg-white border border-gray-100 rounded-3xl shadow-sm'>
            No doctors registered yet.
          </div>
        ) : (
          doctors.map((item, index) => (
            <div 
              className='bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col' 
              key={index}
            >
              {/* Doctor Image Container */}
              <div className='w-full h-56 bg-emerald-50 overflow-hidden relative'>
                <img 
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' 
                  src={item.image} 
                  alt={item.name} 
                />
                <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1.5'>
                  <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></span>
                  <span className={item.available ? 'text-emerald-700' : 'text-gray-500'}>
                    {item.available ? 'Active' : 'Offline'}
                  </span>
                </div>
              </div>

              {/* Doctor Info */}
              <div className='p-5 flex flex-col flex-1 justify-between gap-4'>
                <div>
                  <p className='text-gray-800 text-lg font-bold group-hover:text-emerald-600 transition-colors'>{item.name}</p>
                  <p className='text-emerald-600 font-medium text-sm mt-0.5'>{item.speciality}</p>
                </div>

                {/* Availability Toggle Switch */}
                <div className='pt-3 border-t border-gray-100 flex items-center justify-between'>
                  <span className='text-xs font-bold text-gray-400 uppercase tracking-wider'>Availability</span>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input 
                      type="checkbox" 
                      onChange={() => changeAvailability(item._id)} 
                      checked={item.available} 
                      className='sr-only peer'
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default DoctorsList