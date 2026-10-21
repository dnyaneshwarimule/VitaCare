import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='max-w-7xl mx-auto px-6 md:px-10 py-10'>

      {/* About Us Heading */}
      <div className='text-center text-2xl pt-5 text-gray-600'>
        <p>ABOUT <span className='text-emerald-600 font-semibold'>US</span></p>
      </div>

      {/* About Section Main Content */}
      <div className='my-12 flex flex-col md:flex-row gap-12 items-center'>
        <img className='w-full md:max-w-[360px] rounded-2xl shadow-md object-cover' src={assets.about_image} alt="About VitaCare" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600 leading-relaxed'>
          <p>
            Welcome to <strong className='text-gray-800'>VitaCare</strong>, your trusted partner in managing your healthcare needs conveniently and efficiently. At VitaCare, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p>
            VitaCare is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, VitaCare is here to support you every step of the way.
          </p>
          <b className='text-gray-800 text-base'>Our Vision</b>
          <p>
            Our vision at VitaCare is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </p>
        </div>
      </div>

      {/* Why Choose Us Heading */}
      <div className='text-xl my-8 text-center md:text-left'>
        <p>WHY <span className='text-emerald-600 font-semibold'>CHOOSE US</span></p>
      </div>

      {/* Why Choose Us Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-20'>
        <div className='border border-gray-100 hover:border-emerald-600 rounded-2xl px-8 py-10 flex flex-col gap-4 text-[15px] bg-white shadow-sm hover:shadow-xl hover:bg-emerald-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer group'>
          <b className='text-gray-800 group-hover:text-white text-base tracking-wide'>EFFICIENCY:</b>
          <p className='leading-relaxed'>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border border-gray-100 hover:border-emerald-600 rounded-2xl px-8 py-10 flex flex-col gap-4 text-[15px] bg-white shadow-sm hover:shadow-xl hover:bg-emerald-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer group'>
          <b className='text-gray-800 group-hover:text-white text-base tracking-wide'>CONVENIENCE:</b>
          <p className='leading-relaxed'>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border border-gray-100 hover:border-emerald-600 rounded-2xl px-8 py-10 flex flex-col gap-4 text-[15px] bg-white shadow-sm hover:shadow-xl hover:bg-emerald-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer group'>
          <b className='text-gray-800 group-hover:text-white text-base tracking-wide'>PERSONALIZATION:</b>
          <p className='leading-relaxed'>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>

    </div>
  )
}

export default About