import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center px-4 sm:px-6'>
      <div className='flex flex-col gap-4 m-auto items-start p-8 sm:p-10 w-full max-w-md bg-white border border-gray-100 rounded-2xl text-gray-600 text-sm shadow-xl'>
        
        {/* Brand Header */}
        <div className='w-full flex flex-col items-center gap-2 mb-2'>
          <div className='flex items-center gap-2 cursor-pointer'>
            <div className='bg-emerald-600 text-white p-2 rounded-xl flex items-center justify-center shadow-sm'>
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4v16m8-8H4'></path>
              </svg>
            </div>
            <span className='text-2xl font-bold tracking-tight text-gray-800'>
              Vita<span className='text-emerald-600'>Care</span>
            </span>
          </div>
          <p className='text-xs text-gray-400 font-medium uppercase tracking-wider mt-1'>Patient Portal</p>
        </div>

        <div>
          <p className='text-2xl font-bold text-gray-800'>{state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}</p>
          <p className='text-gray-500 mt-1'>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointments</p>
        </div>

        {state === 'Sign Up' && (
          <div className='w-full'>
            <p className='font-medium text-gray-700 mb-1'>Full Name</p>
            <input 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              className='border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none rounded-xl w-full p-3 transition-all' 
              type="text" 
              placeholder="John Doe" 
              required 
            />
          </div>
        )}

        <div className='w-full'>
          <p className='font-medium text-gray-700 mb-1'>Email</p>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            className='border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none rounded-xl w-full p-3 transition-all' 
            type="email" 
            placeholder="name@example.com" 
            required 
          />
        </div>

        <div className='w-full'>
          <p className='font-medium text-gray-700 mb-1'>Password</p>
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            className='border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none rounded-xl w-full p-3 transition-all' 
            type="password" 
            placeholder="••••••••" 
            required 
          />
        </div>

        <button 
          type='submit' 
          className='bg-emerald-600 hover:bg-emerald-700 text-white w-full py-3.5 my-2 rounded-xl text-base font-semibold shadow-sm transition-all'
        >
          {state === 'Sign Up' ? 'Create account' : 'Login'}
        </button>

        {state === 'Sign Up' ? (
          <p className='text-center w-full text-gray-500'>
            Already have an account?{' '}
            <span onClick={() => setState('Login')} className='text-emerald-600 font-semibold underline cursor-pointer'>
              Login here
            </span>
          </p>
        ) : (
          <p className='text-center w-full text-gray-500'>
            Create a new account?{' '}
            <span onClick={() => setState('Sign Up')} className='text-emerald-600 font-semibold underline cursor-pointer'>
              Click here
            </span>
          </p>
        )}

      </div>
    </form>
  )
}

export default Login