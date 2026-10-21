import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
    const { currency } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {
        try {
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div className='max-w-7xl mx-auto px-6 md:px-10 py-10'>
            
            {/* Page Header */}
            <div className='mb-8'>
                <h1 className='text-2xl md:text-3xl font-bold text-gray-800 tracking-tight'>Doctor Profile</h1>
                <p className='text-gray-500 text-sm mt-1'>Manage your professional consultation fees, clinic address, and availability status.</p>
            </div>

            <div className='bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden max-w-4xl p-8 md:p-10'>
                
                {/* Profile Header Info */}
                <div className='flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-8 pb-8 border-b border-gray-100'>
                    <div className='w-40 h-40 rounded-2xl overflow-hidden bg-emerald-50 border-2 border-emerald-100 shadow-md flex-shrink-0'>
                        <img className='w-full h-full object-cover' src={profileData.image} alt={profileData.name} />
                    </div>
                    
                    <div className='flex-1 text-center sm:text-left'>
                        <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-2'>{profileData.name}</h2>
                        <p className='text-emerald-600 font-semibold text-base mb-3'>{profileData.degree} - {profileData.speciality}</p>
                        <span className='inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider'>
                            {profileData.experience} Experience
                        </span>
                    </div>
                </div>

                {/* Profile Details & Form */}
                <div className='space-y-6 text-gray-600'>
                    
                    {/* About Section */}
                    <div>
                        <p className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-2'>About Specialist</p>
                        {isEdit ? (
                            <textarea 
                                onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} 
                                className='w-full border border-gray-200 focus:border-emerald-500 outline-none rounded-xl p-4 bg-gray-50/50 text-sm transition-all' 
                                rows={6} 
                                value={profileData.about} 
                            />
                        ) : (
                            <p className='text-sm text-gray-600 leading-relaxed bg-gray-50/50 p-4 rounded-2xl border border-gray-100'>
                                {profileData.about}
                            </p>
                        )}
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                        
                        {/* Consultation Fee */}
                        <div>
                            <p className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-2'>Appointment Fee</p>
                            {isEdit ? (
                                <input 
                                    type='number' 
                                    onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} 
                                    value={profileData.fees} 
                                    className='border border-gray-200 focus:border-emerald-500 outline-none rounded-xl px-4 py-3 bg-gray-50/50 text-sm w-full transition-all font-bold text-gray-800'
                                />
                            ) : (
                                <p className='text-xl font-bold text-gray-800'>{currency} {profileData.fees}</p>
                            )}
                        </div>

                        {/* Availability Toggle */}
                        <div>
                            <p className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-2'>Availability Status</p>
                            <div className='flex items-center gap-3 pt-2'>
                                <input 
                                    type="checkbox" 
                                    onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} 
                                    checked={profileData.available} 
                                    disabled={!isEdit}
                                    className='w-5 h-5 accent-emerald-600 cursor-pointer'
                                />
                                <span className={`text-sm font-semibold ${profileData.available ? 'text-emerald-600' : 'text-gray-400'}`}>
                                    {profileData.available ? 'Available for Bookings' : 'Offline'}
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* Address Section */}
                    <div>
                        <p className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-2'>Clinic Address</p>
                        {isEdit ? (
                            <div className='space-y-3'>
                                <input 
                                    type='text' 
                                    onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                    value={profileData.address.line1} 
                                    className='border border-gray-200 focus:border-emerald-500 outline-none rounded-xl px-4 py-3 bg-gray-50/50 text-sm w-full transition-all'
                                    placeholder='Address Line 1'
                                />
                                <input 
                                    type='text' 
                                    onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                    value={profileData.address.line2} 
                                    className='border border-gray-200 focus:border-emerald-500 outline-none rounded-xl px-4 py-3 bg-gray-50/50 text-sm w-full transition-all'
                                    placeholder='Address Line 2'
                                />
                            </div>
                        ) : (
                            <p className='text-sm text-gray-700 bg-gray-50/50 p-4 rounded-2xl border border-gray-100 leading-relaxed'>
                                {profileData.address.line1}<br />
                                {profileData.address.line2}
                            </p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className='pt-6 border-t border-gray-100 flex justify-end gap-4'>
                        {isEdit ? (
                            <button 
                                onClick={updateProfile} 
                                className='bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-600/30 cursor-pointer'
                            >
                                Save Information
                            </button>
                        ) : (
                            <button 
                                onClick={() => setIsEdit(prev => !prev)} 
                                className='border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-bold px-8 py-3.5 rounded-xl transition-all shadow-sm cursor-pointer'
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default DoctorProfile