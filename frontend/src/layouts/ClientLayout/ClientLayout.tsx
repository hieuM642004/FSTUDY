'use client';

import { ReactNode } from 'react';
import { Layout } from 'antd';
import Header from '@/components/client/Header/Header';
import FooterComponent from '@/components/client/Footer/Footer';
import SiteElevator from '@/components/client/SiteElevator/SiteElevator';

const { Content } = Layout;

const ClientLayout = ({ children }: { children: ReactNode }) => {
    return (
           <>
                <Header />
                <Content style={{ padding: '0 24px' }}>
                    <div className='pt-10'>
                      {children}
                        <SiteElevator />
                    </div>
                </Content>
                <FooterComponent />
           </>
    );
};

export default ClientLayout;
