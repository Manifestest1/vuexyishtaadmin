'use client';
import { createContext, useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import axios from '../utils/axios';  // Import the configured Axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token)
        {
            axios.get('/admin_user')
                .then(response => {
                    setUser(response.data.user);
                    console.log(response.data.user,"Admin user Api");
                    setLoading(false);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    setLoading(false);
                });
        }
        else
        {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const response = await axios.post('/admin_login', { email, password });

        console.log(response,"Admnn login api");
        const token = response.data.authorisation;

        localStorage.setItem('token', token);
        setUser(response.data.admin);
        router.push('/en/dashboards/crm');
    };

    const logout = async () => {
        const response = await axios.post('/logout');

        console.log(response,"Check Logout Api");
        localStorage.removeItem('token');
        setUser(null);

        // router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
