'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ReactNode, Suspense, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/redux/store';
import Loading from './loading';

const ClientLayout = dynamic(
    () => import('../layouts/ClientLayout/ClientLayout'),
    {
        ssr: false,
        loading: () => <Loading />,
    },
);

const AdminLayout = dynamic(
    () => import('../layouts/AdminLayout/AdminLayout'),
    {
        ssr: false,
        loading: () => <Loading />,
    },
);

interface LayoutWrapperProps {
    children: ReactNode;
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const Layout = pathname.startsWith('/admin') ? AdminLayout : ClientLayout;

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <Loading />;
    }

    return (
        <Provider store={store}>
            <Layout>
                <Suspense fallback={<Loading />}>{children}</Suspense>
            </Layout>
        </Provider>
    );
};

export default LayoutWrapper;
