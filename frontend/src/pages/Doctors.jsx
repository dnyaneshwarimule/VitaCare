import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {

  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)
  
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className='max-w-7xl mx-auto px-6 md:px-10 py-10'>
      
      {/* Page Header */}
      <div className='text-center md:text-left mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-800 tracking-tight'>Browse Specialists</h1>
        <p className='text-gray-500 text-sm mt-1'>Browse through our extensive list of trusted medical specialists.</p>
      </div>

      <div className='flex flex-col md:flex-row items-start gap-8 mt-5'>
        
        {/* Mobile Filter Toggle */}
        <button 
          onClick={() => setShowFilter(!showFilter)} 
          className={`py-2 px-4 border border-emerald-600 rounded-xl text-sm font-medium transition-all md:hidden ${showFilter ? 'bg-emerald-600 text-white' : 'text-emerald-600 bg-emerald-50'}`}
        >
          {showFilter ? 'Hide Filters' : 'Filter by Specialty'}
        </button>

        {/* Filters Sidebar */}
        <div className={`flex-col gap-3 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden md:flex'} w-full md:w-64 flex-shrink-0`}>
          <p className='font-bold text-gray-800 uppercase tracking-wider text-xs mb-1 hidden md:block'>Specialties</p>
          
          {[
            'General physician',
            'Gynecologist',
            'Dermatologist',
            'Pediatricians',
            'Neurologist',
            'Gastroenterologist'
          ].map((spec, idx) => {
            const isActive = speciality === spec;
            return (
              <p 
                key={idx}
                onClick={() => isActive ? navigate('/doctors') : navigate(`/doctors/${spec}`)} 
                className={`w-full pl-4 py-3 pr-4 border rounded-xl transition-all cursor-pointer font-medium ${
                  isActive 
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-sm' 
                    : 'border-gray-200 bg-white hover:border-emerald-400 text-gray-600'
                }`}
              >
                {spec}
              </p>
            );
          })}
        </div>

        {/* Doctors Grid */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filterDoc.length === 0 ? (
            <div className='col-span-full py-20 text-center text-gray-500'>
              <p className='text-lg font-medium'>No doctors found for this specialty.</p>
              <button onClick={() => navigate('/doctors')} className='mt-4 bg-emerald-600 text-white px-6 py-2 rounded-full text-sm font-medium'>
                View All Doctors
              </button>
            </div>
          ) : (
            filterDoc.map((item, index) => (
              <div 
                onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                className='border border-gray-100 hover:border-emerald-500 rounded-2xl overflow-hidden cursor-pointer bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group' 
                key={index}
              >
                <div className='bg-emerald-50 overflow-hidden'>
                  <img className='w-full object-cover group-hover:scale-105 transition-transform duration-500' src={item.image} alt={item.name} />
                </div>
                <div className='p-5'>
                  <div className={`flex items-center gap-2 text-xs font-medium mb-2 ${item.available ? 'text-emerald-600' : "text-gray-400"}`}>
                    <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-emerald-500 animate-pulse' : "bg-gray-400"}`}></span>
                    <span>{item.available ? 'Available' : "Not Available"}</span>
                  </div>
                  <p className='text-gray-800 text-lg font-bold group-hover:text-emerald-600 transition-colors'>{item.name}</p>
                  <p className='text-gray-500 text-sm font-medium mt-0.5'>{item.speciality}</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default Doctors