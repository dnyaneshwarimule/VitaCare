import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='flex flex-col items-center gap-4 py-20 text-gray-800 max-w-7xl mx-auto px-6 md:px-10'>
            <div className='inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border border-emerald-200'>
                Medical Specialties
            </div>
            
            <h1 className='text-3xl md:text-4xl font-bold tracking-tight text-center'>Find by Specialty</h1>
            
            <p className='sm:w-1/2 text-center text-sm text-gray-500 leading-relaxed'>
                Simply browse through our extensive list of trusted doctors, and schedule your appointment hassle-free.
            </p>

            <div className='flex sm:justify-center gap-6 pt-8 w-full overflow-x-auto no-scrollbar pb-4'>
                {specialityData.map((item, index) => (
                    <Link 
                        to={`/doctors/${item.speciality}`} 
                        onClick={() => scrollTo(0, 0)} 
                        className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 bg-white border border-gray-100 hover:border-emerald-500 shadow-sm hover:shadow-lg rounded-2xl p-5 w-32 sm:w-40 hover:-translate-y-2 transition-all duration-300 group' 
                        key={index}
                    >
                        {/* Circular/Rounded soft container for the icon */}
                        <div className='w-20 sm:w-24 h-20 sm:h-24 mb-3 bg-emerald-50/80 rounded-2xl flex items-center justify-center p-3 group-hover:bg-emerald-100/80 transition-colors overflow-hidden border border-emerald-100/50 shadow-inner'>
                            <img className='w-full h-full object-contain group-hover:scale-110 transition-transform duration-300' src={item.image} alt={item.speciality} />
                        </div>
                        <p className='font-semibold text-gray-700 text-center text-xs sm:text-sm group-hover:text-emerald-600 transition-colors mt-1'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu