import { Roboto } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.scss';
import StyledComponentsRegistry from '../lib/AntdRegistry';
import { AuthProvider } from '@/context/auth/AuthContext';

const roboto = Roboto({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
});

const ClientLayout = dynamic(
    () => import('../layouts/ClientLayout/ClientLayout'),
);

export const metadata = {
    title: 'FSTUDY',
    description: 'Generated by create next app',
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
    return (
        <html lang="en">
            <AuthProvider>
            <body className={roboto.className}>
                <StyledComponentsRegistry>
                    <ClientLayout>{children}</ClientLayout>
                </StyledComponentsRegistry>
            </body>
            </AuthProvider>
        </html>
    );
};

export default RootLayout;
