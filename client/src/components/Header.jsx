import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-neo-pink border-4 border-black shadow-neo px-6 md:px-10 lg:px-20 mt-4'>
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw]'>
                <p className='text-3xl md:text-4xl lg:text-5xl text-black font-bold leading-tight md:leading-tight lg:leading-tight uppercase'>
                    Book Appointment <br /> With Trusted Doctors
                </p>

                <div className='flex flex-col md:flex-row items-center gap-3 text-black text-lg font-bold bg-white border-2 border-black p-3 shadow-neo'>
                    <img className='w-28' src={assets.group_profiles} alt="group_profiles" />
                    <p>
                        Simply browse through our extensive list of trusted doctors, 
                        <br className='hidden sm:block' />
                        schedule your appointment hassle-free.
                    </p>
                </div>

                <a 
                    href="#speciality" 
                    className='neo-btn flex items-center gap-2 px-8 py-3 m-auto md:m-0 mt-4 uppercase'
                >
                    Book appointment 
                    <img className='w-4' src={assets.arrow_icon} alt="arrow_icon" />
                </a>
            </div>

            <div className='md:w-1/2 relative flex justify-end items-end'>
                <img 
                    className='w-full md:absolute bottom-0 h-auto translate-y-4' 
                    src={assets.header_img} 
                    alt="header_img" 
                />
            </div>
        </div>
    )
}

export default Header
