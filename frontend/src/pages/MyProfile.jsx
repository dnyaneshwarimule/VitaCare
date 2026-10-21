import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData()
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)
            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return userData ? (
        <div className='max-w-3xl mx-auto px-6 md:px-10 py-10'>
            <div className='bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col gap-6'>
                
                {/* Profile Image & Name Section */}
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-6'>
                    {isEdit ? (
                        <label htmlFor='image' className='cursor-pointer group relative'>
                            <div className='w-32 h-32 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-sm relative'>
                                <img className='w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity' src={image ? URL.createObjectURL(image) : userData.image} alt="Profile" />
                                <div className='absolute inset-0 flex items-center justify-center bg-black/30'>
                                    <img className='w-8 h-8 filter brightness-200' src={assets.upload_icon || ''} alt="Upload" />
                                </div>
                            </div>
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                        </label>
                    ) : (
                        <div className='w-32 h-32 rounded-2xl overflow-hidden border border-gray-200 shadow-sm'>
                            <img className='w-full h-full object-cover' src={userData.image} alt="Profile" />
                        </div>
                    )}

                    <div className='flex flex-col gap-2 flex-1 w-full'>
                        {isEdit ? (
                            <input 
                                className='border border-gray-200 focus:border-emerald-500 outline-none rounded-xl p-3 text-xl font-bold bg-gray-50 w-full max-w-md' 
                                type="text"
                                onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                                value={userData.name}
                            />
                        ) : (
                            <p className='font-bold text-2xl md:text-3xl text-gray-800'>{userData.name}</p>
                        )}
                        <p className='text-xs font-semibold uppercase tracking-wider text-emerald-600'>Patient Profile</p>
                    </div>
                </div>

                <hr className='border-gray-100' />

                {/* Contact Information */}
                <div>
                    <p className='text-xs font-bold text-gray-400 tracking-wider uppercase mb-4'>Contact Information</p>
                    <div className='grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-4 gap-x-2 text-sm text-gray-600 items-center'>
                        <p className='font-medium text-gray-700'>Email id:</p>
                        <p className='text-emerald-600 font-medium break-all'>{userData.email}</p>

                        <p className='font-medium text-gray-700'>Phone:</p>
                        {isEdit ? (
                            <input 
                                className='border border-gray-200 focus:border-emerald-500 outline-none rounded-xl p-3 bg-gray-50 max-w-xs w-full' 
                                type="text"
                                onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                                value={userData.phone}
                            />
                        ) : (
                            <p className='text-gray-700 font-medium'>{userData.phone}</p>
                        )}

                        <p className='font-medium text-gray-700 self-start pt-1'>Address:</p>
                        {isEdit ? (
                            <div className='flex flex-col gap-2 max-w-md w-full'>
                                <input 
                                    className='border border-gray-200 focus:border-emerald-500 outline-none rounded-xl p-3 bg-gray-50 w-full' 
                                    type="text"
                                    placeholder="Address Line 1"
                                    onChange={(e) => setUserData(prev => ({
                                        ...prev,
                                        address: { ...(prev.address || {}), line1: e.target.value }
                                    }))}
                                    value={userData.address?.line1 || ''}
                                />
                                <input 
                                    className='border border-gray-200 focus:border-emerald-500 outline-none rounded-xl p-3 bg-gray-50 w-full' 
                                    type="text"
                                    placeholder="Address Line 2"
                                    onChange={(e) => setUserData(prev => ({
                                        ...prev,
                                        address: { ...(prev.address || {}), line2: e.target.value }
                                    }))}
                                    value={userData.address?.line2 || ''}
                                />
                            </div>
                        ) : (
                            <p className='text-gray-500 leading-relaxed'>
                                {userData.address?.line1} <br /> {userData.address?.line2}
                            </p>
                        )}
                    </div>
                </div>

                <hr className='border-gray-100' />

                {/* Basic Information */}
                <div>
                    <p className='text-xs font-bold text-gray-400 tracking-wider uppercase mb-4'>Basic Information</p>
                    <div className='grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-4 gap-x-2 text-sm text-gray-600 items-center'>
                        <p className='font-medium text-gray-700'>Gender:</p>
                        {isEdit ? (
                            <select 
                                className='border border-gray-200 focus:border-emerald-500 outline-none rounded-xl p-3 bg-gray-50 max-w-xs w-full'
                                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                value={userData.gender}
                            >
                                <option value="Not Selected">Not Selected</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        ) : (
                            <p className='text-gray-700 font-medium'>{userData.gender}</p>
                        )}

                        <p className='font-medium text-gray-700'>Birthday:</p>
                        {isEdit ? (
                            <input 
                                className='border border-gray-200 focus:border-emerald-500 outline-none rounded-xl p-3 bg-gray-50 max-w-xs w-full' 
                                type='date'
                                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                                value={userData.dob}
                            />
                        ) : (
                            <p className='text-gray-700 font-medium'>{userData.dob}</p>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className='pt-4 flex justify-end'>
                    {isEdit ? (
                        <button 
                            onClick={updateUserProfileData} 
                            className='bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-sm'
                        >
                            Save Information
                        </button>
                    ) : (
                        <button 
                            onClick={() => setIsEdit(true)} 
                            className='border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-sm'
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

            </div>
        </div>
    ) : null
}

export default MyProfile