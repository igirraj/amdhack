import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

const MyProfile = () => {
    const { userData, setUserData, token, loadUserProfileData } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)

    const updateUserProfileData = () => {
        localStorage.setItem('userData', JSON.stringify(userData))
        toast.success('Profile updated successfully!')
        setIsEdit(false)
        setImage(false)
        loadUserProfileData()
    }

    return userData && (
        <div className='max-w-lg flex flex-col gap-3 text-sm'>
            {isEdit ? (
                <label htmlFor="image">
                    <div className="relative inline-block cursor-pointer group">
                        <img
                            className="w-36 h-36 object-cover border-4 border-black shadow-neo transition duration-300 group-hover:opacity-70 bg-neo-pink"
                            src={image ? URL.createObjectURL(image) : userData.image}
                            alt="user_image"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition">
                            <img className="w-10" src={assets.upload_icon} alt="upload_icon" />
                        </div>
                    </div>
                    <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />
                </label>
            ) : (
                <img
                    className="w-36 h-36 object-cover border-4 border-black shadow-neo bg-neo-pink"
                    src={userData.image}
                    alt="user_image"
                />
            )}

            {isEdit
                ? <input className='bg-white border-2 border-black p-2 text-3xl font-bold max-w-60 mt-4 shadow-neo uppercase' value={userData.name} type='text' onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
                : <p className='font-black text-4xl text-black mt-4 uppercase bg-neo-yellow inline-block px-3 py-1 border-4 border-black shadow-neo'>{userData.name}</p>
            }

            <hr className='bg-zinc-400 h-[1px] border-none' />

            <div>
                <p className='text-black font-bold text-xl uppercase mt-8 mb-4 border-b-4 border-black pb-2'>Contact Information</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-4 mt-3 text-black font-bold text-base items-center'>
                    <p className='uppercase'>Email id:</p>
                    <p className='bg-white border-2 border-black p-2 inline-block shadow-neo'>{userData.email}</p>
                    <p className='uppercase'>Phone:</p>
                    {isEdit
                        ? <input className='bg-white border-2 border-black p-2 shadow-neo max-w-52' value={userData.phone} type='text' onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                        : <p className='bg-neo-cyan border-2 border-black p-2 inline-block shadow-neo'>{userData.phone}</p>
                    }
                    <p className='uppercase'>Address: </p>
                    {isEdit
                        ? <div className='flex flex-col gap-2'>
                            <input className='bg-white border-2 border-black p-2 shadow-neo' value={userData.address?.line1 || ""} type='text' onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} />
                            <input className='bg-white border-2 border-black p-2 shadow-neo' value={userData.address?.line2 || ""} type='text' onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} />
                          </div>
                        : <p className='bg-white border-2 border-black p-2 inline-block shadow-neo'>{userData.address?.line1}<br />{userData.address?.line2}</p>
                    }
                </div>
            </div>

            <div>
                <p className='text-black font-bold text-xl uppercase mt-8 mb-4 border-b-4 border-black pb-2'>Basic Information</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-4 mt-3 text-black font-bold text-base items-center'>
                    <p className='uppercase'>Gender: </p>
                    {isEdit
                        ? <select className='max-w-32 bg-white border-2 border-black p-2 shadow-neo font-bold' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        : <p className='bg-neo-pink border-2 border-black p-2 inline-block shadow-neo'>{userData.gender}</p>
                    }
                    <p className='uppercase'>Birthday: </p>
                    {isEdit
                        ? <input className='bg-white border-2 border-black p-2 shadow-neo max-w-40 font-bold' value={userData.dob} type='date' onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))} />
                        : <p className='bg-neo-cyan border-2 border-black p-2 inline-block shadow-neo'>{userData.dob}</p>
                    }
                </div>
            </div>

            <div className='mt-10 mb-20'>
                {isEdit
                    ? <button className='neo-btn px-8 py-3 bg-neo-green font-bold uppercase text-lg' onClick={updateUserProfileData}>Save information</button>
                    : <button className='neo-btn px-12 py-3 bg-neo-yellow font-bold uppercase text-lg' onClick={() => setIsEdit(true)}>Edit Profile</button>
                }
            </div>
        </div>
    )
}

export default MyProfile