import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

function Dropdowns({items , title , stylecss} : any) {
    return (
        <>
            <Dropdown menu={{ items }} trigger={['click']} className={stylecss}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      {title}
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </>
    );
}

export default Dropdowns;
