import { Roboto } from 'next/font/google';
import './globals.scss';
import StyledComponentsRegistry from '../lib/AntdRegistry';
import LayoutWrapper from './LayoutWrapper';
import LiveChatScript from '@/components/client/ChatAI/ChatAI';
import { Suspense } from 'react';

const roboto = Roboto({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
});

export const metadata = {
    title: 'FSTUDY',
    description: 'Generated by create next app',
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <StyledComponentsRegistry>
                    <LayoutWrapper>
                        {children}
                        <LiveChatScript />
                    </LayoutWrapper>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
};

export default RootLayout;
