/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const MyAppointments = () => {
    const { token } = useContext(AppContext)
    const [appointments, setAppointments] = useState([])
    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('-')
        return dateArray[0] + ' ' + months[Number(dateArray[1])] + ' ' + dateArray[2]
    }

    const loadAppointments = () => {
        const stored = JSON.parse(localStorage.getItem('appointments') || '[]')
        setAppointments(stored)
    }

    const cancelAppointment = (appointmentId) => {
        const stored = JSON.parse(localStorage.getItem('appointments') || '[]')
        const updated = stored.map(a => a._id === appointmentId ? { ...a, cancelled: true } : a)
        localStorage.setItem('appointments', JSON.stringify(updated))
        toast.success('Appointment cancelled successfully')
        loadAppointments()
    }

    useEffect(() => {
        if (token) loadAppointments()
    }, [token])

    return (
        <div className='mb-20'>
            <p className='pb-3 mt-12 mb-6 font-bold text-4xl text-black uppercase border-b-4 border-black'>My appointments</p>
            <div>
                {appointments.length === 0 && (
                    <p className='text-gray-500 mt-6 text-center'>No appointments yet. <a href='/doctors' className='text-primary underline'>Book one now!</a></p>
                )}
                {appointments.map((item, index) => (
                    <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 p-4 border-4 border-black bg-white shadow-neo mb-6' key={index}>
                        <div>
                            <img className='w-40 bg-neo-pink border-2 border-black' src={item.docData.image} alt="doctor_img" />
                        </div>
                        <div className='flex-1 text-sm text-black font-bold uppercase'>
                            <p className='text-3xl'>{item.docData.name}</p>
                            <p className='bg-neo-cyan inline-block px-2 border-2 border-black mt-2 mb-4'>{item.docData.speciality}</p>
                            <p className='text-black font-bold mt-1'>Address: </p>
                            <p className='text-sm'>{item.docData.address.line1}</p>
                            <p className='text-sm'>{item.docData.address.line2}</p>
                            <p className='text-sm mt-4 bg-neo-yellow inline-block px-2 border-2 border-black'>
                                <span className='text-black font-bold uppercase'>Date & Time: </span>
                                {slotDateFormat(item.slotDate)} | {item.slotTime}
                            </p>
                        </div>
                        <div></div>
                        <div className='flex flex-col gap-3 justify-end'>
                            {!item.cancelled && !item.isCompleted && (
                                <button
                                    onClick={() => cancelAppointment(item._id)}
                                    className='neo-btn text-sm bg-white hover:bg-neo-pink text-center sm:min-w-48 py-3'
                                >
                                    Cancel appointment
                                </button>
                            )}
                            {item.cancelled && !item.isCompleted && (
                                <button className='font-bold uppercase text-xl text-black bg-neo-pink text-center sm:min-w-48 py-2 border-2 border-black shadow-neo'>
                                    Cancelled
                                </button>
                            )}
                            {item.isCompleted && (
                                <button className='font-bold uppercase text-xl text-black bg-neo-green text-center sm:min-w-48 py-2 border-2 border-black shadow-neo'>
                                    Completed
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