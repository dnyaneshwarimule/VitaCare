import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from './context/AppContext'
import { assets } from './assets/assets'
import RelatedDoctors from './components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
  const { docId } = useParams()
  const navigate = useNavigate()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const doc = doctors.find((doc) => doc._id === docId)
    if (doc) {
      setDocInfo({ ...doc, slots_booked: doc.slots_booked || {} })
    }
  }

  const getAvailableSlots = () => {
    if (!docInfo) return
    setDocSlots([])

    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      const endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      const timeSlots = []

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })

        const day = currentDate.getDate()
        const month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear()
        const slotDate = `${day}_${month}_${year}`
        const slotTime = formattedTime

        const isSlotAvailable =
          !docInfo?.slots_booked?.[slotDate] ||
          !docInfo.slots_booked[slotDate].includes(slotTime)

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots((prev) => [...prev, timeSlots])
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Login to book appointment')
      return navigate('/login')
    }

    if (!slotTime) {
      toast.warning('Please select an available time slot')
      return
    }

    const date = docSlots[slotIndex][0].datetime
  
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    const slotDate = day + "_" + month + "_" + year

    try {
      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo()
    }
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots()
    }
  }, [docInfo])

  return (
    docInfo && (
      <div className='max-w-7xl mx-auto px-6 md:px-10 py-10'>
        
        {/* Doctor Profile Header Card */}
        <div className='bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10 mb-12'>
          
          {/* Left: Doctor Portrait */}
          <div className='lg:col-span-4 flex flex-col items-center justify-center bg-emerald-50 rounded-2xl p-6 relative overflow-hidden'>
            <div className='absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-200/50 rounded-full blur-2xl'></div>
            <img className='w-full max-h-80 object-cover rounded-xl shadow-md z-10' src={docInfo.image} alt={docInfo.name} />
          </div>

          {/* Right: Doctor Info & Details */}
          <div className='lg:col-span-8 flex flex-col justify-between gap-6'>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-wrap items-center justify-between gap-4'>
                <div className='flex items-center gap-2.5'>
                  <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>{docInfo.name}</h1>
                  <img className='w-6 h-6' src={assets.verified_icon} alt="Verified" />
                </div>
                <span className='bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider'>
                  {docInfo.experience} Experience
                </span>
              </div>

              <p className='text-emerald-600 font-semibold text-base'>{docInfo.degree} - {docInfo.speciality}</p>

              <div className='mt-2'>
                <div className='flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2'>
                  <img className='w-4 h-4' src={assets.info_icon} alt="Info" />
                  About Specialist
                </div>
                <p className='text-gray-600 text-sm leading-relaxed'>{docInfo.about}</p>
              </div>
            </div>

            <div className='pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4'>
              <div>
                <p className='text-xs text-gray-400 font-semibold uppercase tracking-wider'>Consultation Fee</p>
                <p className='text-2xl font-bold text-gray-800 mt-0.5'>{currencySymbol} {docInfo.fees}</p>
              </div>
              <div className='flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200'>
                <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse'></span>
                Instant Booking Available
              </div>
            </div>
          </div>
        </div>

        {/* Booking Dashboard Section */}
        <div className='bg-white border border-gray-100 rounded-3xl shadow-xl p-6 md:p-10 mb-16'>
          <div className='mb-8'>
            <h2 className='text-xl md:text-2xl font-bold text-gray-800'>Book Consultation Slot</h2>
            <p className='text-sm text-gray-500 mt-1'>Select a preferred day and time slot below to secure your appointment.</p>
          </div>

          {/* Days Scroll / Selector */}
          <div className='mb-8'>
            <p className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-4'>Select Date (Next 7 Days)</p>
            <div className='flex gap-4 items-center w-full overflow-x-auto pb-2 no-scrollbar'>
              {docSlots.length > 0 &&
                docSlots.map((item, index) => (
                  <div
                    onClick={() => {
                      setSlotIndex(index)
                      setSlotTime('')
                    }}
                    key={index}
                    className={`flex flex-col items-center justify-center py-5 px-6 min-w-[90px] rounded-2xl cursor-pointer transition-all duration-300 ${
                      slotIndex === index 
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105' 
                        : 'border border-gray-200 bg-gray-50 text-gray-600 hover:border-emerald-500'
                    }`}
                  >
                    <p className='text-xs font-bold tracking-wider'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                    <p className='text-xl font-bold mt-1'>{item[0] && item[0].datetime.getDate()}</p>
                  </div>
                ))}
            </div>
          </div>

          {/* Time Slots Grid */}
          <div className='mb-8'>
            <p className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-4'>Available Time Slots</p>
            {docSlots[slotIndex] && docSlots[slotIndex].length === 0 ? (
              <p className='text-sm text-gray-500 py-6 bg-gray-50 rounded-2xl text-center border border-gray-100'>No slots available for this date. Please select another day.</p>
            ) : (
              <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3'>
                {docSlots.length > 0 &&
                  docSlots[slotIndex] &&
                  docSlots[slotIndex].map((item, index) => (
                    <button
                      type='button'
                      onClick={() => setSlotTime(item.time)}
                      key={index}
                      className={`text-sm font-medium py-3 px-4 rounded-xl cursor-pointer transition-all duration-300 text-center ${
                        item.time === slotTime
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-gray-50 border border-gray-200 text-gray-700 hover:border-emerald-500 hover:bg-emerald-50/50'
                      }`}
                    >
                      {item.time.toLowerCase()}
                    </button>
                  ))}
              </div>
            )}
          </div>

          {/* Booking Summary & Action Bar */}
          <div className='pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6'>
            <div className='text-center sm:text-left'>
              <p className='text-xs font-bold text-gray-400 uppercase tracking-wider'>Selected Slot</p>
              <p className='text-base font-bold text-gray-800 mt-1'>
                {slotTime ? `${slotTime} on Selected Date` : <span className='text-amber-600 font-normal'>Please select a time slot above</span>}
              </p>
            </div>

            <button
              onClick={bookAppointment}
              disabled={!slotTime}
              className={`w-full sm:w-auto px-12 py-4 rounded-2xl text-base font-bold transition-all shadow-lg ${
                slotTime 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30 hover:scale-105 cursor-pointer' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Confirm Appointment
            </button>
          </div>
        </div>

        {/* Related Doctors */}
        <div className='mt-20'>
          <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
      </div>
    )
  )
}

export default Appointment