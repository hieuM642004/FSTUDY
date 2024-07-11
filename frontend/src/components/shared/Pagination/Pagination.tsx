import Link from 'next/link';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import './Pagination.scss';

function Pagination() {
    return (
        <>
            <div className="rounded-lg  mt-3 ">
                <span className="inline-block px-3 py-2 border text-[#35509a] rounded-l-lg hover:bg-[#eceef0] cursor-pointer">
                    <Link href="" className="block ">
                        {' '}
                        <LeftOutlined />
                    </Link>
                </span>
                <span className="inline-block px-3 py-2 text-[#35509a] activepanation border hover:bg-[#eceef0] cursor-pointer">
                    <Link href="" className="block    ">
                        1
                    </Link>
                </span>
                <span className="inline-block px-3 py-2 text-[#35509a]  border hover:bg-[#eceef0] cursor-pointer">
                    <Link href="" className="block ">
                        2
                    </Link>
                </span>
                <span className="inline-block px-3 py-2 text-[#35509a]  border hover:bg-[#eceef0] cursor-pointer">
                    <Link href="" className="block ">
                        3
                    </Link>
                </span>
                <span className="inline-block px-3 py-2 text-[#35509a]  border hover:bg-[#eceef0] cursor-pointer">
                    <Link href="" className="block ">
                        4
                    </Link>
                </span>
                <span className="inline-block px-3 py-2 text-[#35509a] border rounded-r-lg hover:bg-[#eceef0]	cursor-pointer">
                    <Link href="" className="block ">
                        {' '}
                        <RightOutlined />
                    </Link>
                </span>
            </div>
        </>
    );
}

export default Pagination;
