'use client'

import { usePathname } from 'next/navigation'; 
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/redux/store';
const ClientLayout = dynamic(() => import('../layouts/ClientLayout/ClientLayout'));
const AdminLayout = dynamic(() => import('../layouts/AdminLayout/AdminLayout'));

interface LayoutWrapperProps {
    children: ReactNode;
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
    const pathname = usePathname(); 
    const Layout = pathname.startsWith('/admin') ? AdminLayout : ClientLayout;

    return <Provider store={store}><Layout>{children}</Layout></Provider>;
};

export default LayoutWrapper;
