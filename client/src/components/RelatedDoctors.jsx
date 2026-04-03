import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ docId, speciality }) => {

    // Access doctors data from global context
    const { doctors } = useContext(AppContext)

    // Hook to navigate between pages
    const navigate = useNavigate()

    // State to store related doctors list
    const [relDoc, setRelDocs] = useState([])

    // Effect to filter doctors with same speciality except current one
    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter(doc => doc.speciality === speciality && doc._id !== docId)
            setRelDocs(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-black md:mx-10'>
            {/* Section Header */}
            <h1 className='text-4xl font-bold uppercase tracking-wide bg-neo-yellow px-4 border-2 border-black shadow-neo'>Related Doctors</h1>
            <p className='sm:w-1/3 text-center text-lg font-bold bg-white px-2 border-2 border-black'>
                Simply browse through our extensive list of trusted doctors.
            </p>

            {/* Related Doctors Grid */}
            <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {relDoc.slice(0, 5).map((item, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            navigate(`/appointment/${item._id}`)
                            scrollTo(0, 0)
                        }}
                        className='neo-card overflow-hidden cursor-pointer hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300'
                    >
                        {/* Doctor Image */}
                        <img className='bg-neo-cyan border-b-2 border-black' src={item.image} alt="doctor" />

                        {/* Doctor Details */}
                        <div className='p-4 bg-white'>
                            {/* Availability Indicator */}
                            <div className={`flex items-center gap-2 text-sm text-center font-bold uppercase tracking-wide ${item.available ? 'text-black' : 'text-gray-500'}`}>
                                <p className={`w-3 h-3 border-2 border-black ${item.available ? 'bg-neo-green' : 'bg-gray-400'}`}></p>
                                <p>{item.available ? 'Available' : 'Not Available'}</p>
                            </div>

                            {/* Doctor Name & Speciality */}
                            <p className='text-black text-xl font-bold mt-2 uppercase'>{item.name}</p>
                            <p className='text-black font-bold bg-neo-pink inline-block px-2 border-2 border-black mt-1'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedDoctors
