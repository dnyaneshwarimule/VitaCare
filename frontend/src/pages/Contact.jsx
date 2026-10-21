import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='max-w-7xl mx-auto px-6 md:px-10 py-10'>

      {/* Heading */}
      <div className='text-center text-2xl pt-5 text-gray-600'>
        <p>CONTACT <span className='text-emerald-600 font-semibold'>US</span></p>
      </div>

      {/* Content Section */}
      <div className='my-12 flex flex-col justify-center md:flex-row gap-12 items-center mb-28 text-sm'>
        <img className='w-full md:max-w-[360px] rounded-2xl shadow-md object-cover' src={assets.contact_image} alt="Contact VitaCare" />
        
        <div className='flex flex-col justify-center items-start gap-6 bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm w-full md:w-auto'>
          
          <div className='flex flex-col gap-2'>
            <p className='font-bold text-base text-gray-800 tracking-wide uppercase'>Our Office</p>
            <p className='text-gray-500 leading-relaxed'>54709 Willms Station <br /> Suite 350, Washington, USA</p>
            <p className='text-gray-500 leading-relaxed mt-1'>
              Tel: <span className='text-gray-700 font-medium'>(415) 555-0132</span> <br /> 
              Email: <span className='text-emerald-600 font-medium'>support@vitacare.in</span>
            </p>
          </div>

          <hr className='w-full border-gray-100' />

          <div className='flex flex-col gap-2'>
            <p className='font-bold text-base text-gray-800 tracking-wide uppercase'>Careers at VitaCare</p>
            <p className='text-gray-500 leading-relaxed'>Learn more about our teams and exciting job openings.</p>
          </div>

          <button 
            onClick={() => alert("Thank you for your interest in careers at VitaCare! Please check back soon for job openings.")}
            className='border border-emerald-600 text-emerald-600 px-8 py-3.5 rounded-full text-sm font-medium hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-sm'
          >
            Explore Jobs
          </button>
        </div>
      </div>

    </div>
  )
}

export default Contact