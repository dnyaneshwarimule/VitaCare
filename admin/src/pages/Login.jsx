import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Safe fallback to port 4000 if admin .env is missing
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => { 
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          setAToken(data.token)
          localStorage.setItem('aToken', data.token)
          toast.success("Logged in as Admin")
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
          toast.success("Logged in as Doctor")
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center justify-center bg-gray-50/50 px-4'>
      <div className='flex flex-col gap-4 m-auto items-start p-8 sm:p-10 w-full max-w-md bg-white border border-gray-100 rounded-3xl text-gray-600 text-sm shadow-xl'>
        
        {/* Brand Header */}
        <div className='w-full flex flex-col items-center gap-2 mb-2'>
          <span className='text-2xl font-bold tracking-tight text-gray-800'>
            Vita<span className='text-emerald-600'>Care</span>
          </span>
          <span className='border border-emerald-200 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-semibold uppercase tracking-wider text-[11px]'>
            {state} Portal Login
          </span>
        </div>

        <p className='text-2xl font-bold text-gray-800 m-auto'>
          <span className='text-emerald-600'>{state}</span> Login
        </p>

        <div className='w-full'>
          <p className='font-medium text-gray-700 mb-1'>Email</p>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            className='border border-gray-200 focus:border-emerald-500 outline-none rounded-xl w-full p-3.5 bg-gray-50/50 text-sm transition-all' 
            type="email" 
            placeholder={state === 'Admin' ? 'admin@vitacare.com' : 'doctor@vitacare.in'} 
            required 
          />
        </div>

        <div className='w-full'>
          <p className='font-medium text-gray-700 mb-1'>Password</p>
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            className='border border-gray-200 focus:border-emerald-500 outline-none rounded-xl w-full p-3.5 bg-gray-50/50 text-sm transition-all' 
            type="password" 
            placeholder="••••••••" 
            required 
          />
        </div>

        <button className='bg-emerald-600 hover:bg-emerald-700 text-white w-full py-3.5 rounded-xl font-bold text-base shadow-lg shadow-emerald-600/30 transition-all cursor-pointer mt-2'>
          Login
        </button>

        <div className='w-full pt-4 border-t border-gray-100 text-center'>
          {
            state === 'Admin'
              ? <p className='text-gray-500 text-xs'>Doctor Login? <span onClick={() => setState('Doctor')} className='text-emerald-600 font-semibold underline cursor-pointer hover:text-emerald-700'>Click here</span></p>
              : <p className='text-gray-500 text-xs'>Admin Login? <span onClick={() => setState('Admin')} className='text-emerald-600 font-semibold underline cursor-pointer hover:text-emerald-700'>Click here</span></p>
          }
        </div>

      </div>
    </form>
  )
}

export default Login