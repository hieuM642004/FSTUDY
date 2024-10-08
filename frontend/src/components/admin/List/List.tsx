'use client';
import { useState, useEffect } from 'react';
import { List, Spin, message } from 'antd';

export default function ListComponent({ data }: { data: any }) {
    const [loading, setLoading] = useState(true);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
            <List
                bordered
                dataSource={data}
                renderItem={(item) => <List.Item></List.Item>}
            />
        </div>
    );
}
