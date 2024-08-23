'use client';
import { deleteCookie, getCookie } from 'cookies-next';
import React, { createContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

import AuthService from '@/services/auth/AuthService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }: any) => {
    const [userInfo, setUserInfo] = useState(undefined);
    const [user, setUser] = useState(undefined);
    const router = useRouter();
    // check user has login ?
    const login = (newdata: any) => {
        // contain accesstoken and refreshtoken
        setUser(newdata);
        if (user) {
            return user;
        }
    };
    const logout = async () => {
        const getRefreshToken: any | string = getCookie('refreshToken');
        const getToken: any | string = getCookie('token');
        if (getRefreshToken ||  getToken) {
            const response = await AuthService.logout(getRefreshToken);
            if (response) {
                setUser(null);
                deleteCookie('id', { path: '/' });
                deleteCookie('token', { path: '/' });
                deleteCookie('refreshToken', { path: '/' });
                deleteCookie('typeLogin', { path: '/' });              
                router.push('/login');
            }
        } else {
            router.push('/login');
        }
    };
    const getProfileUser = async () => {
        const getToken: any | string = getCookie('token');
        if (getToken) {
            const decoded = jwtDecode(getToken);
            const idUser: string | any = decoded.id;
            const res = await AuthService.getByIdUser(idUser);
            if (res) {
                // listen to user change information
                setUserInfo(res.data);
                return res.data;
            }
        } else {
            await logout();
        }
    };
    return (
        <AuthContext.Provider
            value={{ user, login, logout, getProfileUser, userInfo }}
        >
            {children}
        </AuthContext.Provider>
    );
};
