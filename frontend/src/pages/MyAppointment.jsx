import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const [payment, setPayment] = useState('')

  const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split('_')
    return `${day} ${months[Number(month)]} ${year}`
  }

  // Getting User Appointments Data Using API
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      setAppointments(data.appointments.reverse())
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // Function to cancel appointment Using API
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        try {
          const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
          if (data.success) {
            navigate('/my-appointments')
            getUserAppointments()
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  // Function to make payment using razorpay
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) {
        initPay(data.order)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  // Generate appointment data from doctors if needed for fallback preview
  useEffect(() => {
    if (doctors.length && appointments.length === 0) {
      const generatedAppointments = doctors.slice(0, 3).map((doc, idx) => ({
        _id: `appointment_${idx}`,
        docData: {
          name: doc.name,
          speciality: doc.speciality,
          image: doc.image,
          address: doc.address || { line1: "Street X", line2: "City Y" }
        },
        slotDate: `12_0${idx + 1}_2026`,
        slotTime: `${10 + idx}:00 AM`,
        payment: idx === 1,
        isCompleted: idx === 2,
        cancelled: false
      }))
      setAppointments(generatedAppointments)
    }
  }, [doctors])

  return (
    <div className='max-w-7xl mx-auto px-6 md:px-10 py-10'>
      
      {/* Page Header */}
      <div className='pb-4 mb-8 border-b border-gray-200'>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-800 tracking-tight'>My Appointments</h1>
        <p className='text-gray-500 text-sm mt-1'>View, manage, and track your scheduled visits with doctors.</p>
      </div>

      <div className='flex flex-col gap-6'>
        {appointments.map((item, index) => (
          <div key={index} className='bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between transition-all hover:shadow-md'>
            
            {/* Left: Doctor Image & Details */}
            <div className='flex flex-col sm:flex-row gap-6 items-start w-full md:w-auto'>
              <div className='w-32 h-32 rounded-xl bg-emerald-50 overflow-hidden flex-shrink-0'>
                <img className='w-full h-full object-cover' src={item.docData.image} alt={item.docData.name} />
              </div>
              
              <div className='flex flex-col gap-1.5 text-sm'>
                <p className='text-gray-800 text-lg font-bold'>{item.docData.name}</p>
                <p className='text-emerald-600 font-medium'>{item.docData.speciality}</p>
                
                <p className='text-gray-700 font-medium mt-1'>Address:</p>
                <p className='text-gray-500 text-xs leading-relaxed'>
                  {item.docData.address.line1} <br />
                  {item.docData.address.line2}
                </p>
                
                <p className='text-xs font-medium text-gray-700 mt-2 bg-gray-50 px-3 py-1.5 rounded-lg inline-block border border-gray-100'>
                  <span className='font-semibold text-gray-800'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
            </div>

            {/* Right: Actions & Status Buttons */}
            <div className='flex flex-col gap-2.5 justify-center w-full md:w-56 flex-shrink-0'>
              {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                <button 
                  onClick={() => setPayment(item._id)} 
                  className='w-full py-2.5 px-4 rounded-xl border border-emerald-600 text-emerald-600 font-medium text-sm hover:bg-emerald-600 hover:text-white transition-all shadow-sm'
                >
                  Pay Online
                </button>
              )}
              
              {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                <button 
                  onClick={() => appointmentRazorpay(item._id)} 
                  className='w-full py-2 px-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all flex items-center justify-center'
                >
                  <img className='max-w-24 max-h-6 object-contain' src={assets.razorpay_logo} alt="Razorpay" />
                </button>
              )}
              
              {!item.cancelled && item.payment && !item.isCompleted && (
                <button className='w-full py-2.5 px-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 font-semibold text-sm cursor-default'>
                  Paid
                </button>
              )}

              {item.isCompleted && (
                <button className='w-full py-2.5 px-4 rounded-xl border border-emerald-500 bg-emerald-50 text-emerald-700 font-semibold text-sm cursor-default'>
                  Completed
                </button>
              )}

              {!item.cancelled && !item.isCompleted && (
                <button 
                  onClick={() => cancelAppointment(item._id)} 
                  className='w-full py-2.5 px-4 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm hover:border-red-500 hover:bg-red-50 hover:text-red-600 transition-all'
                >
                  Cancel appointment
                </button>
              )}

              {item.cancelled && !item.isCompleted && (
                <button className='w-full py-2.5 px-4 rounded-xl border border-red-200 bg-red-50 text-red-600 font-semibold text-sm cursor-default'>
                  Appointment Cancelled
                </button>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments