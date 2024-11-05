'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, Dropdown, Button, Modal, message } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

import { nestApiInstance } from '../../../constant/api';
import { isArray } from 'lodash';

function Blog({ data, onChange }: { data: any[]; onChange: () => void }) {
    const router = useRouter();

    return (
        <div className="flex flex-col-reverse border-b-[1px] mt-3 w-full">
            {data &&
                data?.map((item: any) => (
                    <div key={item._id} className="flex border-b mb-4">
                        <div className="w-[11.25rem] h-[6.313rem] flex">
                            <Image
                                src={item.avatar}
                                alt={item.title}
                                width={300}
                                height={300}
                            />
                        </div>
                        <div className="pb-5 mb-5 flex-[3] pl-2">
                            <Link
                                href={`/blogs/${item.slug}`}
                                className="mb-[6px] font-bold text-2xl"
                            >
                                {item.title}
                            </Link>
                            <p
                                className="mb-4 italic"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        item.content.length > 50
                                            ? `${item.content.substring(
                                                  0,
                                                  50,
                                              )}...`
                                            : item.content,
                                }}
                            />
                            <div className="text-sm">
                                {item.date.slice(0, 10)} | {item.user?.fullname}
                            </div>
                        </div>
                        {/* <div>
                            <Dropdown
                                overlay={getMenu(item._id)}
                                trigger={['hover']}
                                placement="bottomRight"
                            >
                                <Button type="text" icon={<MoreOutlined />} />
                            </Dropdown>
                        </div> */}
                    </div>
                ))}
        </div>
    );
}

export default Blog;
