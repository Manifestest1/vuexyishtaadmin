'use client'
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const {loading,user } = useContext(AuthContext); 
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) 
        {
            router.push('/en/login');
        }
    }, [loading, user, router]);

    if (loading || !user) 
    {
        return <p>Loading...</p>;
    }

    return children;
};

export default ProtectedRoute;
