import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='md:mx-10 mt-20 border-t-4 border-black bg-white shadow-neo pt-10 pb-5 px-5'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 text-sm font-bold'>

                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="logo" />
                    <p className='w-full md:w-2/3 text-black leading-6 border-2 border-black p-4 bg-neo-yellow shadow-neo'>
                        MediBook is a doctor appointment booking platform that helps patients easily find doctors,
                        book appointments, and manage healthcare schedules online. It also provides dedicated
                        dashboards for admins and doctors to manage appointments efficiently.
                    </p>
                </div>

                <div className='border-l-4 border-black pl-5'>
                    <p className='text-xl font-bold mb-5 bg-black text-white px-2 py-1 inline-block'>COMPANY</p>
                    <ul className='flex flex-col gap-3 text-black'>
                        <li className='hover:underline cursor-pointer flex items-center before:content-["👉"] before:mr-2'>Home</li>
                        <li className='hover:underline cursor-pointer flex items-center before:content-["👉"] before:mr-2'>About us</li>
                        <li className='hover:underline cursor-pointer flex items-center before:content-["👉"] before:mr-2'>Contact us</li>
                        <li className='hover:underline cursor-pointer flex items-center before:content-["👉"] before:mr-2'>Privacy policy</li>
                    </ul>
                </div>

                <div className='border-l-4 border-black pl-5'>
                    <p className='text-xl font-bold mb-5 bg-black text-white px-2 py-1 inline-block'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-3 text-black'>
                        <li className='bg-neo-cyan border-2 border-black p-2 inline-block shadow-neo'>+1-212-456-7890</li>
                        <li className='bg-neo-pink border-2 border-black p-2 inline-block shadow-neo'>laxman.thedev@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div className='mt-10 border-t-4 border-black pt-5'>
                <p className='py-5 text-sm text-center font-bold uppercase tracking-wider'>
                    Copyright © 2026 Laxman - All Right Reserved.
                </p>
            </div>
        </div>
    )
}

export default Footer
