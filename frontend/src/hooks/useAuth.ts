import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import {jwtDecode} from 'jwt-decode';

interface AuthState {
    isLoggedIn: boolean;
    loading: boolean;
}

export const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        isLoggedIn: false,
        loading: true, 
    });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = getCookie('token');
                if (token) {
                    const decoded: any = jwtDecode(token as string);
                    if (decoded.id) {
                 
                        setAuthState({ isLoggedIn: true, loading: false });
                        return;
                    }
                }
            
                setAuthState({ isLoggedIn: false, loading: false });
            } catch (error) {
                
                setAuthState({ isLoggedIn: false, loading: false });
            }
        };

        checkAuth();
    }, []);

    return authState;
};
