import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div
            className='flex flex-col items-center gap-4 py-16 text-black bg-neo-pink border-4 border-black px-4 shadow-neo mt-10'
            id='speciality'
        >
            <h1 className='text-4xl font-bold uppercase tracking-wide bg-white px-4 border-2 border-black shadow-neo'>Find by Speciality</h1>
            <p className='sm:w-1/3 text-center text-lg font-bold mt-2 bg-white px-2 border-2 border-black'>
                Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
            </p>
            <div className='flex sm:justify-center gap-6 pt-10 w-full overflow-x-auto pb-6'>
                {specialityData.map((item, index) => (
                    <Link
                        key={index}
                        onClick={() => { scrollTo(0, 0) }}
                        to={`/doctors/${item.speciality}`}
                        className='neo-card flex flex-col items-center justify-center p-4 cursor-pointer flex-shrink-0 hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300 w-36 h-36'
                    >
                        <img className='w-16 sm:w-20 mb-2' src={item.image} alt="speciality-image" />
                        <p className='font-bold text-sm text-center uppercase'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu
