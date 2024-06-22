'use client';

import { ReactNode } from 'react';
import { Breadcrumb, Layout } from 'antd';
import Header from '@/components/client/Header/Header';
import FooterComponent from '@/components/client/Footer/Footer';

const { Content } = Layout;

const ClientLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            <Content style={{ padding: '0 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    // style={{
                    //     minHeight: 280,
                    //     padding: 24,
                    // }}
                >
                    {children}
                </div>
            </Content>
            <FooterComponent />
        </>
    );
};

export default ClientLayout;
