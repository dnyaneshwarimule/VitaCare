import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error('Image Not Selected');
      }

      const formData = new FormData();

      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      const response = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
        headers: { aToken }
      })
      const data = response.data;
      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      console.error(error);
    }
  }

  return (
    <div className='max-w-5xl mx-auto px-6 md:px-10 py-10'>
      
      {/* Page Header */}
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-800 tracking-tight'>Add New Specialist</h1>
        <p className='text-gray-500 text-sm mt-1'>Register a new doctor to the VitaCare platform with credentials and availability details.</p>
      </div>

      <form onSubmit={onSubmitHandler} className='bg-white border border-gray-100 rounded-3xl shadow-xl p-8 md:p-10'>
        
        {/* Upload Image Section */}
        <div className='flex items-center gap-6 mb-10 pb-8 border-b border-gray-100'>
          <label htmlFor="doc-img" className='cursor-pointer group relative'>
            <div className='w-24 h-24 rounded-2xl bg-emerald-50 border-2 border-dashed border-emerald-300 flex items-center justify-center overflow-hidden group-hover:border-emerald-500 transition-all shadow-sm'>
              <img className={`w-full h-full object-cover ${docImg ? 'opacity-100' : 'w-10 h-10 opacity-60'}`} src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="Upload" />
            </div>
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <div>
            <p className='font-bold text-gray-800 text-base'>Doctor Profile Picture</p>
            <p className='text-xs text-gray-400 mt-0.5'>Upload a professional portrait image (PNG, JPG)</p>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-600'>

          {/* Left Column */}
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
              <p className='font-medium text-gray-700 text-sm'>Full Name</p>
              <input onChange={e => setName(e.target.value)} value={name} className='border border-gray-200 focus:border-emerald-500 outline-none rounded-xl px-4 py-3 bg-gray-50/50 text-sm transition-all' type="text" placeholder='Dr. Jane Doe' required />
            </div>

            <div className='flex flex-col gap-2'>
              <p className='font-medium text-gray-700 text-sm'>Email Address</p>
              <input onChange={e => setEmail(e.target.value)} value={email} className='border border-gray-200 focus:border-emerald-500 outline-none rounded-xl px-4 py-3 bg-gray-50/50 text-sm transition-all' type="email" placeholder='doctor@vitacare.in' required />
            </div>

            <div className='flex flex-col gap-2'>
              <p className='font-medium text-gray-700 text-sm'>Password</p>
              <input onChange={e => setPassword(e.target.value)} value={password} className='border border-gray-200 focus:border-emerald-500 outline-none rounded-xl px-4 py-3 bg-gray-50/50 text-sm transition-all' type="password" placeholder='••••••••' required />
            </div>

            <div className='flex flex-col gap-2'>
              <p className='font-medium text-gray-700 text-sm'>Experience</p>
              <select onChange={e => setExperience(e.target.value)} value={experience} className='border border-gray-200 focus:border-emerald-500 outline-none rounded-xl px-4 py-3 bg-gray-50/50 text-sm transition-all'>
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Years</option>
                <option value="3 Year">3 Years</option>
                <option value="4 Year">4 Years</option>
                <option value="5 Year">5 Years</option>
                <option value="6 Year">6 Years</option>
                <option value="8 Year">8 Years</option>
                <option value="9 Year">9 Years</option>
                <option value="10 Year">10+ Years</option>
              </select>
            </div>

            <div className='flex flex-col gap-2'>
              <p className='font-medium text-gray-700 text-sm'>Consultation Fees</p>
              <input onChange={e => setFees(e.target.value)} value={fees} className='border border-gray-200 focus:border-emerald-500 outline-none rounded-xl px-4 py-3 bg-gray-50/50 text-sm transition-all' type="number" placeholder='100' required />
            </div>
          </div>

          {/* Right Column */}
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
              <p className='font-medium text-gray-700 text-sm'>Speciality</p>
              <select onChange={e => setSpeciality(e.target.value)} value={speciality} className='border border-gray-200 focus:border-emerald-500 outline-none rounded-xl px-4 py-3 bg-gray-50/50 text-sm transition-all'>
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className='flex flex-col gap-2'>
              <p className='font-medium text-gray-700 text-sm'>Degree / Qualifications</p>
              <input onChange={e => setDegree(e.target.value)} value={degree} className='border border-gray-200 focus:border-emerald-500 outline-none rounded-xl px-4 py-3 bg-gray-50/50 text-sm transition-all' type="text" placeholder='MBBS, MD' required />
            </div>

            <div className='flex flex-col gap-2'>
              <p className='font-medium text-gray-700 text-sm'>Clinic Address</p>
              <input onChange={e => setAddress1(e.target.value)} value={address1} className='border border-gray-200 focus:border-emerald-500 outline-none rounded-xl px-4 py-3 bg-gray-50/50 text-sm transition-all mb-2' type="text" placeholder='Address Line 1' required />
              <input onChange={e => setAddress2(e.target.value)} value={address2} className='border border-gray-200 focus:border-emerald-500 outline-none rounded-xl px-4 py-3 bg-gray-50/50 text-sm transition-all' type="text" placeholder='Address Line 2' required />
            </div>
          </div>

        </div>

        {/* About Section */}
        <div className='mt-8 flex flex-col gap-2'>
          <p className='font-medium text-gray-700 text-sm'>About Doctor</p>
          <textarea onChange={e => setAbout(e.target.value)} value={about} className='w-full border border-gray-200 focus:border-emerald-500 outline-none rounded-xl p-4 bg-gray-50/50 text-sm transition-all' rows={5} placeholder='Write a brief overview about the doctor background, expertise, and patient care philosophy...' required></textarea>
        </div>

        {/* Submit Button */}
        <div className='mt-10 flex justify-end'>
          <button 
            type='submit' 
            className='bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-12 py-4 rounded-xl transition-all shadow-lg shadow-emerald-600/30 cursor-pointer'
          >
            Add Specialist Doctor
          </button>
        </div>

      </form>

    </div>
  )
}

export default AddDoctor