'use client';

import { ReactNode } from 'react';
import { Breadcrumb, Layout } from 'antd';
import Header from '@/components/client/Header/Header';
import FooterComponent from '@/components/client/Footer/Footer';
import SiteElevator from '@/components/client/SiteElevator/SiteElevator';
import { store } from '../../lib/redux/store';
import { Provider } from 'react-redux';

const { Content } = Layout;

const ClientLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            <Header />
            <Content style={{ padding: '0 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <Provider store={store}>{children}</Provider>
                    <SiteElevator />
                </div>
            </Content>
            <FooterComponent />
        </Provider>
    );
};

export default ClientLayout;
