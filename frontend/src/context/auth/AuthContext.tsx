'use client';
import { deleteCookie, getCookie } from 'cookies-next';
import React, { createContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";

import AuthService from '@/services/auth/AuthService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState(undefined);
    const router = useRouter();
    // check user has login ?
    const login = (newdata: any) => {
        setUser(newdata);
        if (user) {
            return user;
        }
    };
    const logout = async () => {
        const getRefreshToken: any | string = getCookie('refreshToken');
        const response = await AuthService.logout(getRefreshToken);
        if (response) {
            setUser(null);
            deleteCookie('id', { path: '/' });
            deleteCookie('token', { path: '/' });
            deleteCookie('refreshToken', { path: '/' });
            router.push('/login');
        }
    };
    const getProfileUser = async () =>{
        const getToken : any | string = getCookie('token');
        const decoded = jwtDecode(getToken);
        const idUser : string | any = decoded.id 
        const res =  await AuthService.getByIdUser(idUser)
        if(res){
          
            return res.data
        }
       
    }
    return (
        <AuthContext.Provider value={{ user, login, logout , getProfileUser }}>
            {children}
        </AuthContext.Provider>
    );
};
