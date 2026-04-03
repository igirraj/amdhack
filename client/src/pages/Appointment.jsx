/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';

const Appointment = () => {
    const { docId } = useParams();
    const { doctors, currencySymbol, token, getDoctorsData } = useContext(AppContext);
    const navigate = useNavigate();
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const [docInfo, setDocInfo] = useState(null);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState("");
    const [docSlots, setDocSlots] = useState([]);

    const getAvailableSlots = () => {
        if (!docInfo) return;
        setDocSlots([]);
        let today = new Date();
        let allSlots = [];
        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);
            let startTime = new Date(currentDate);
            if (i === 0) {
                startTime.setHours(today.getHours() >= 10 ? today.getHours() + 1 : 10);
                startTime.setMinutes(today.getMinutes() > 30 ? 30 : 0);
            } else {
                startTime.setHours(10, 0, 0, 0);
            }
            let endTime = new Date(currentDate);
            endTime.setHours(21, 0, 0, 0);
            let timeSlots = [];
            let slot = new Date(startTime);
            while (slot < endTime) {
                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1;
                let year = currentDate.getFullYear();
                const slotDate = `${day}-${month}-${year}`;
                const formattedTime = slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const bookedSlots = JSON.parse(localStorage.getItem('bookedSlots') || '{}');
                const isSlotAvailable = !(bookedSlots[docId]?.[slotDate]?.includes(formattedTime));
                if (isSlotAvailable) {
                    timeSlots.push({ date: slotDate, time: formattedTime, datetime: new Date(slot) });
                }
                slot.setMinutes(slot.getMinutes() + 30);
            }
            allSlots.push({ date: currentDate.toDateString(), slots: timeSlots });
        }
        setDocSlots(allSlots);
    };

    const bookAppointment = () => {
        if (!token) {
            toast.warn('Login to book an appointment');
            navigate('/login');
            return;
        }
        const selectedDay = docSlots[slotIndex];
        if (!selectedDay || selectedDay.slots.length === 0) {
            toast.error("No slots available for this day");
            return;
        }
        const selectedSlot = selectedDay.slots.find(s => s.time === slotTime);
        if (!selectedSlot) {
            toast.error("Please select a time slot");
            return;
        }
        const date = selectedSlot.datetime;
        const slotDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

        // Save booked slot
        const bookedSlots = JSON.parse(localStorage.getItem('bookedSlots') || '{}');
        if (!bookedSlots[docId]) bookedSlots[docId] = {};
        if (!bookedSlots[docId][slotDate]) bookedSlots[docId][slotDate] = [];
        bookedSlots[docId][slotDate].push(slotTime);
        localStorage.setItem('bookedSlots', JSON.stringify(bookedSlots));

        // Save appointment
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        appointments.unshift({
            _id: 'appt-' + Date.now(),
            docId,
            docData: { ...docInfo },
            slotDate,
            slotTime,
            cancelled: false,
            payment: false,
            isCompleted: false,
            date: Date.now()
        });
        localStorage.setItem('appointments', JSON.stringify(appointments));
        toast.success('Appointment booked successfully!');
        getDoctorsData();
        navigate('/my-appointments');
    };

    useEffect(() => {
        if (doctors?.length) {
            const found = doctors.find((doc) => doc._id === docId);
            setDocInfo(found || null);
        }
    }, [doctors, docId]);

    useEffect(() => {
        if (docInfo) getAvailableSlots();
    }, [docInfo]);

    return (
        <div>
            {!docInfo ? (
                <p>Loading doctor info...</p>
            ) : (
                <>
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <div>
                            <img className="bg-neo-cyan w-full sm:max-w-72 border-4 border-black shadow-neo" src={docInfo.image} alt="doctor_img" />
                        </div>
                        <div className="flex-1 border-4 border-black shadow-neo p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
                            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
                                {docInfo.name}
                                <img className="w-5" src={assets.verified_icon} alt="verify_icon" />
                            </p>
                            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                                <p>{docInfo.degree} - {docInfo.speciality}</p>
                                <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
                            </div>
                            <div>
                                <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                                    About <img src={assets.info_icon} alt="info_icon" />
                                </p>
                                <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
                            </div>
                            <p className="text-gray-500 font-medium mt-4">
                                Appointment fee: <span className="text-gray-600">{currencySymbol}{docInfo.fees}</span>
                            </p>
                        </div>
                    </div>

                    <div className="sm:ml-72 sm:pl-4 mt-8 font-bold text-black uppercase">
                        <p className='bg-neo-yellow inline-block px-3 py-1 border-2 border-black shadow-neo'>Booking slots</p>
                        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
                            {docSlots.length > 0 && docSlots.map((dayItem, index) => (
                                <div
                                    className={`text-center py-4 min-w-20 font-bold border-2 border-black cursor-pointer transition-all uppercase ${slotIndex === index ? "bg-black text-white shadow-none translate-x-[2px] translate-y-[2px]" : "bg-white text-black shadow-neo hover:-translate-y-1 hover:-translate-x-1"}`}
                                    key={index}
                                >
                                    <p>{daysOfWeek[new Date(dayItem.date).getDay()]}</p>
                                    <p>{new Date(dayItem.date).getDate()}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
                            {docSlots.length > 0 && docSlots[slotIndex]?.slots.length > 0 ? (
                                docSlots[slotIndex].slots.map((slotItem, index) => (
                                    <p
                                        onClick={() => setSlotTime(slotItem.time)}
                                        className={`text-sm font-bold flex-shrink-0 px-5 py-2 border-2 border-black cursor-pointer transition-all ${slotTime === slotItem.time ? "bg-black text-white shadow-none translate-x-[2px] translate-y-[2px]" : "bg-white text-black shadow-neo hover:-translate-y-1 hover:-translate-x-1"}`}
                                        key={index}
                                    >
                                        {slotItem.time.toLowerCase()}
                                    </p>
                                ))
                            ) : (
                                <p className="text-gray-500">No slots available</p>
                            )}
                        </div>
                        <button onClick={bookAppointment} className="neo-btn bg-neo-yellow px-14 py-4 uppercase tracking-widest mt-10 mb-6">
                            Book an appointment
                        </button>
                    </div>
                    <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
                </>
            )}
        </div>
    );
};

export default Appointment;