/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";
import { doctors as staticDoctors } from '../assets/assets';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '$';

    const [doctors, setDoctors] = useState(
        staticDoctors.map(d => ({ ...d, available: true, slots_booked: {} }))
    );
    const [token, setToken] = useState(
        localStorage.getItem('token') ? localStorage.getItem('token') : false
    );
    const [userData, setUserData] = useState(false);

    const getDoctorsData = () => {
        setDoctors(staticDoctors.map(d => ({ ...d, available: true, slots_booked: {} })));
    };

    const loadUserProfileData = () => {
        const stored = localStorage.getItem('userData');
        if (stored) setUserData(JSON.parse(stored));
    };

    const value = {
        doctors, getDoctorsData,
        currencySymbol,
        token, setToken,
        backendUrl: '',
        userData, setUserData,
        loadUserProfileData
    };

    useEffect(() => { getDoctorsData(); }, []);

    useEffect(() => {
        if (token) loadUserProfileData();
        else setUserData(false);
    }, [token]);

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;