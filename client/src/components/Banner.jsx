import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className='flex bg-neo-yellow border-4 border-black shadow-neo px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>
            
            <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
                <div className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black uppercase tracking-tight'>
                    <p>Book Appointment</p>
                    <p className='mt-4 bg-white inline-block px-2 border-2 border-black shadow-neo'>With 100+ Trusted Doctors</p>
                </div>

                <button 
                    onClick={() => { navigate('/login'); scrollTo(0, 0) }} 
                    className='neo-btn text-sm sm:text-base px-8 py-3 mt-10'
                >
                    Create account
                </button>
            </div>

            <div className='hidden md:block md:w-1/2 lg:w-[370px] relative flex items-end'>
                <img 
                    className='w-full absolute bottom-0 right-0 max-w-md translate-y-[20px]' 
                    src={assets.appointment_img} 
                    alt="appointment_img" 
                />
            </div>
        </div>
    )
}

export default Banner
