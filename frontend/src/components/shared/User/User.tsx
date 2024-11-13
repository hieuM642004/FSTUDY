import React from 'react';
import { Badge } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Dropdowns from '@/components/client/Dropdown/Dropdown';


interface UserAvatarDropdownProps {
    user: {
        isLoggedIn: boolean;
        avatar?: string;
    };
    isAdmin: boolean;
    itemsdropdown: any;
}

const User: React.FC<UserAvatarDropdownProps> = ({
    user,
    isAdmin,
    itemsdropdown,
}) => {
    return (
        <div className='mr-4'>
            <Dropdowns
                items={itemsdropdown}
                
                title={
                    user?.avatar ? (
                        <>
                            <Badge count={isAdmin ? <KeyOutlined className='text-amber-500'/> : ''}>
                                <Image
                                    src={user?.avatar}
                                    width={30}
                                    height={30}
                                    alt="User Avatar"
                                    className="mr-2 rounded-full"
                                />
                            </Badge>
                        </>
                    ) : (
                        <>
                            <Badge count={isAdmin ? <KeyOutlined className='text-amber-500'/> : ''}>
                                <Image
                                    src="/images/user_icon.png"
                                    width={30}
                                    height={30}
                                    alt="Default Avatar"
                                    className="mr-2 rounded-full"
                                />
                            </Badge>
                        </>
                    )
                }
                stylecss=" text-normal"
            />
        </div>
    );
};

export default User;
