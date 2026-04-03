import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Loading from '../components/Loading';

const Doctors = () => {
    // Get the 'specialty' parameter from the URL
    const { specialty } = useParams();

    // State to manage filtered doctors and filter visibility
    const [filterDoc, setFilterDoc] = useState([]);
    const [showFilter, setShowFilter] = useState(false);

    // Access global doctors list from context
    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();

    // Function to filter doctors based on selected specialty
    const applyFilter = () => {
        if (specialty) {
            setFilterDoc(
                doctors.filter(
                    (doc) =>
                        doc.speciality.toLowerCase().trim() ===
                        specialty.toLowerCase().trim()
                )
            );
        } else {
            setFilterDoc(doctors);
        }
    };

    // Apply filter whenever doctors or specialty changes
    useEffect(() => {
        applyFilter();
    }, [doctors, specialty]);

    return (
        <div>
            <p className='text-black font-bold uppercase text-lg mb-4 bg-neo-yellow inline-block px-3 border-2 border-black shadow-neo'>Browse through the doctors specialist.</p>

            {/* Mobile filter toggle button */}
            <button
                className={`py-2 px-4 border-2 border-black shadow-neo font-bold uppercase mb-4 text-sm transition-all sm:hidden ${showFilter ? 'bg-black text-white' : 'bg-white text-black'
                    }`}
                onClick={() => {
                    setShowFilter((prev) => !prev);
                }}
            >
                Filters
            </button>

            {/* Main layout: filters + doctor cards */}
            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
                {/* Filter section (visible on mobile when toggled) */}
                <div
                    className={`flex flex-col gap-4 text-sm font-bold uppercase ${showFilter ? 'flex' : 'hidden sm:flex'
                        }`}
                >
                    {/* Specialty filter buttons */}
                    {[
                        'General physician',
                        'Gynecologist',
                        'Dermatologist',
                        'Pediatricians',
                        'Neurologist',
                        'Gastroenterologist'
                    ].map((spec) => (
                        <p
                            key={spec}
                            onClick={() =>
                                specialty === spec
                                    ? navigate('/doctors')
                                    : navigate(`/doctors/${spec}`)
                            }
                            className={`w-[94vw] sm:w-auto px-4 py-2 border-2 border-black shadow-neo transition-all cursor-pointer ${
                                specialty === spec || (specialty === 'Dermatology' && spec === 'Dermatologist')
                                    ? 'bg-black text-white translate-x-1 translate-y-1 shadow-none'
                                    : 'bg-white hover:bg-neo-pink text-black'
                            }`}
                        >
                            {spec}
                        </p>
                    ))}
                </div>

                {doctors.length !== 0 ? (
                    <>
                        {/* Doctors listing section */}
                        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
                            {filterDoc.map((item, index) => (
                                <div
                                    onClick={() => {
                                        navigate(`/appointment/${item._id}`);
                                    }}
                                    className='neo-card overflow-hidden cursor-pointer hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300'
                                    key={index}
                                >
                                    {/* Doctor image */}
                                    <img className='bg-neo-cyan border-b-2 border-black' src={item.image} alt="doctor" />

                                    {/* Doctor details */}
                                    <div className='p-4 bg-white'>
                                        <div
                                            className={`flex items-center gap-2 text-sm text-center font-bold tracking-wide uppercase ${item.available
                                                    ? 'text-black'
                                                    : 'text-gray-500'
                                                }`}
                                        >
                                            <p
                                                className={`w-3 h-3 border-2 border-black ${item.available
                                                        ? 'bg-neo-green'
                                                        : 'bg-gray-400'
                                                    }`}
                                            ></p>
                                            <p>
                                                {item.available
                                                    ? 'Available'
                                                    : 'Not Available'}
                                            </p>
                                        </div>

                                        <p className='text-black text-xl font-bold mt-2 uppercase'>
                                            {item.name}
                                        </p>
                                        <p className='text-black font-bold bg-neo-yellow inline-block px-2 border-2 border-black mt-1'>
                                            {item.speciality}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className='w-full flex justify-center items-center'>
                        <Loading text="Loading all doctors..." />
                    </div>
                )}

            </div>
        </div>
    );
};

export default Doctors;
