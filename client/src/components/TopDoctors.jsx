import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import Loading from './Loading';

const TopDoctors = () => {

    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-black md:mx-10'>
            <h1 className='text-4xl font-bold uppercase tracking-wide bg-neo-yellow px-4 border-2 border-black shadow-neo'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-lg font-bold bg-white px-2 border-2 border-black'>
                Simply browse through our extensive list of trusted doctors.
            </p>

            {doctors.length !== 0  ? (
                <>
                    <div className='w-full grid grid-cols-auto gap-6 pt-5 px-3 sm:px-0 mt-8'>
                        {doctors.slice(0, 10).map((item, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    navigate(`/appointment/${item._id}`);
                                    scrollTo(0, 0);
                                }}
                                className='neo-card overflow-hidden cursor-pointer hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300'
                            >
                                <img className='bg-neo-cyan border-b-2 border-black' src={item.image} alt="doctor" />
                                <div className='p-4 bg-white'>
                                    <div className={`flex items-center gap-2 text-sm text-center font-bold uppercase tracking-wide ${item.available ? 'text-black' : 'text-gray-500'}`}>
                                        <p className={`w-3 h-3 border-2 border-black ${item.available ? 'bg-neo-green' : 'bg-gray-400'}`}></p>
                                        <p>{item.available ? 'Available' : 'Not Available'}</p>
                                    </div>
                                    <p className='text-black text-xl font-bold mt-2 uppercase'>{item.name}</p>
                                    <p className='text-black font-bold bg-neo-pink inline-block px-2 border-2 border-black mt-1'>{item.speciality}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            navigate('/doctors');
                            scrollTo(0, 0);
                        }}
                        className='neo-btn px-12 py-3 mt-10 bg-white'
                    >
                        More
                    </button>
                </>
            ) : (
                <Loading />
            )}
        </div>
    )
}

export default TopDoctors
