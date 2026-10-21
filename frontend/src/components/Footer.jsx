import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 md:px-10 bg-gray-50 border-t border-gray-200 mt-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[3fr_1fr_1fr] gap-12 py-12 text-sm items-start">
        
        {/* Left Section - Brand & Info */}
        <div className="flex flex-col items-start gap-4">
          <div onClick={() => { navigate('/'); scrollTo(0, 0); }} className='flex items-center gap-2 cursor-pointer'>
            <div className='bg-emerald-600 text-white p-2 rounded-xl flex items-center justify-center shadow-sm'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4v16m8-8H4'></path>
              </svg>
            </div>
            <span className='text-xl font-bold tracking-tight text-gray-800'>
              Vita<span className='text-emerald-600'>Care</span>
            </span>
          </div>
          <p className="text-gray-600 leading-6 md:max-w-[80%]">
            <strong>VitaCare – Effortless Healthcare Scheduling</strong> <br />
            Patients can instantly book appointments with trusted doctors—from routine check-ups to specialist care—in just a few clicks. Our smart reminders keep appointments on track, while real-time updates ensure seamless coordination. Designed for modern healthcare, we save time for both patients and providers.
          </p>
        </div>

        {/* Middle Section - Company Links */}
        <div>
          <p className="text-sm font-bold text-gray-800 tracking-wider mb-4 uppercase">Company</p>
          <ul className="flex flex-col gap-2.5 text-gray-600 font-medium">
            <li onClick={() => { navigate('/'); scrollTo(0, 0); }} className="hover:text-emerald-600 cursor-pointer transition-colors">Home</li>
            <li onClick={() => { navigate('/about'); scrollTo(0, 0); }} className="hover:text-emerald-600 cursor-pointer transition-colors">About Us</li>
            <li onClick={() => { navigate('/contact'); scrollTo(0, 0); }} className="hover:text-emerald-600 cursor-pointer transition-colors">Contact Us</li>
            <li className="hover:text-emerald-600 cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section - Get in Touch */}
        <div>
          <p className="text-sm font-bold text-gray-800 tracking-wider mb-4 uppercase">Get in Touch</p>
          <ul className="flex flex-col gap-2.5 text-gray-600">
            <li className="font-medium">+91-90000-90000</li>
            <li className="text-emerald-600 font-medium hover:underline cursor-pointer">support@vitacare.in</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto border-t border-gray-200 py-6">
        <p className="text-xs text-center text-gray-500">
          © 2026 VitaCare. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;