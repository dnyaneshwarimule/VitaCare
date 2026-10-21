import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()

  const [relDoc, setRelDoc] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      )
      setRelDoc(doctorsData)
    }
  }, [doctors, speciality, docId])

  if (relDoc.length === 0) return null

  return (
    <div className='flex flex-col items-center gap-4 my-20 text-gray-800 max-w-7xl mx-auto px-6 md:px-10'>
      <div className='inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border border-emerald-200'>
        Similar Specialists
      </div>

      <h1 className='text-3xl md:text-4xl font-bold tracking-tight text-center'>Related Doctors</h1>
      
      <p className='sm:w-1/2 text-center text-sm text-gray-500 leading-relaxed'>
        Simply browse through our extensive list of trusted doctors in this specialty.
      </p>

      <div className='w-full grid grid-cols-auto gap-6 pt-8 px-3 sm:px-0'>
        {relDoc.map((item, index) => (
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
        ))}
      </div>
    </div>
  )
}

export default RelatedDoctors