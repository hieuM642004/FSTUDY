'use client';
import type { TabsProps } from 'antd';

import WapperItemCard from '@/components/client/WapperItemCard/WapperItemCard';
import UserInfo from './Labels/UserInfo';
import ChangePass from './Labels/ChangePass';
import Tab from '@/components/client/Tabs/Tabs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Thông tin cơ bản',
        children: <UserInfo />,
    },
    {
        key: '2',
        label: 'Quyền riêng tư',
        children: 'Vui lòng đọc điều khoản bảo mật và điều khoản sử dụng.',
    },
    {
        key: '3',
        label: 'Đổi mật khẩu',
        children: <ChangePass />,
    },
];
function Settings() {
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (isLoggedIn === false) {
            router.push('/login');
        }
    }, []);
    return (
        <>
            <div className="w-full pt-[2rem] pb-[3rem] ">
                <WapperItemCard stylecss="m-auto max-w-[31.25rem] mb-[0]">
                    <h3 className="mb-4 text-3xl font-bold">
                        Cập nhật thông tin cá nhân
                    </h3>
                    <Tab items={items} />
                </WapperItemCard>
            </div>
        </>
    );
}

export default Settings;
