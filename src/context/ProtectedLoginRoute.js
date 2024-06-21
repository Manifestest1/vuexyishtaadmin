import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthContext from '../context/AuthContext';

const ProtectedLoginRoute = ({ children }) => {  
    const token = localStorage.getItem('token');   
    const { loading } = useContext(AuthContext); 
    const router = useRouter();

    useEffect(() => {
        if (loading && token) 
        {
            router.push('/en/dashboards/crm');
        }
    }, [loading, token, router]);

    if (loading || token) {
        return <p>Loading...</p>; 
    }

    return children;
};

export default ProtectedLoginRoute;
