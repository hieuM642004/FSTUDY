import { SearchOutlined, FacebookOutlined } from '@ant-design/icons';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { nestApiInstance } from '../../../constant/api';

function LearnAbout({ onSearch }: any) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setShowSuggestions(true);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(e.target as Node) &&
                e.target !== inputRef.current
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const delay = 500;

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchTerm.trim()) {
                try {
                    const response = await nestApiInstance.post(
                        '/blog/search',
                        { key: searchTerm },
                    );

                    const filteredBlogs = response?.data?.data?.filter(
                        (blog: any) => !blog?.reply || blog?.reply.length === 0,
                    );
                    setSearchResults(filteredBlogs);
                    onSearch(filteredBlogs);
                } catch (error) {
                    console.error('Error searching posts:', error);
                }
            } else {
                setSearchResults([]);
            }
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const highlightMatches = (text: string, match: string) => {
        const parts = text.split(new RegExp(`(${match})`, 'gi'));
        return parts.map((part, index) => (
            <span
                key={index}
                className={
                    part.toLowerCase() === match.toLowerCase()
                        ? 'font-bold'
                        : ''
                }
            >
                {part}
            </span>
        ));
    };

    return (
        <div className="flex-none w-[18.25rem] md:block px-3">
            {/* Search Blog */}
            <div className="mb-4" ref={inputRef}>
                <h4 className="text-xl font-bold mb-4">Tìm kiếm bài viết</h4>
                <div className="relative">
                    <span className="absolute right-4 top-2">
                        <SearchOutlined className="text-2xl" />
                    </span>
                    <form>
                        <input
                            type="search"
                            // name="default-search"
                            id="default-search"
                            value={searchTerm}
                            onChange={handleChange}
                            className="py-[6px] pl-3 pr-12 w-full rounded-md border-2"
                            placeholder="Nhập từ khóa bạn muốn tìm kiếm"
                            required
                            autoComplete="off"
                        />
                        {showSuggestions && searchTerm.trim() && (
                            <div className="absolute">
                                <ul className="bg-white border border-gray-100 min-w-full mt-2 rounded-md shadow-md max-h-60 min-h-20 overflow-y-auto">
                                    {searchResults.length > 0 ? (
                                        searchResults.map((blog: any) => (
                                            <div key={blog._id}>
                                                <Link
                                                    href={`/blogs/${blog.slug}`}
                                                    passHref
                                                >
                                                    <li
                                                        className="rounded-md text-center min-w-48 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-blue-gray-50 hover:text-gray-900"
                                                        onClick={() =>
                                                            setShowSuggestions(
                                                                false,
                                                            )
                                                        }
                                                    >
                                                        {highlightMatches(
                                                            blog.title,
                                                            searchTerm,
                                                        )}
                                                    </li>
                                                </Link>
                                            </div>
                                        ))
                                    ) : (
                                        <li className="rounded-md text-center min-w-48 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-blue-gray-50 hover:text-gray-900">
                                            No results found
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </form>
                </div>
            </div>
            {/* Learn About */}
            <div className="mb-4">
                <h4 className="text-xl font-bold mb-4">Tìm hiểu thêm</h4>
                <div className="flex flex-col rounded-lg">
                    <Link
                        href=""
                        className="border-[1px] px-2 text-sm font-bold text-gray-500 py-1 first:rounded-t-xl hover:bg-[#f7faff]"
                    >
                        🎧 KHÓA HỌC IELTS INTENSIVE LISTENING
                    </Link>
                    <Link
                        href=""
                        className="border-[1px] px-2 text-sm font-bold text-gray-500 py-1 hover:bg-[#f7faff]"
                    >
                        🎧 KHÓA HỌC IELTS INTENSIVE LISTENING
                    </Link>
                    <Link
                        href=""
                        className="border-[1px] px-2 text-sm font-bold text-gray-500 py-1 last:rounded-b-lg hover:bg-[#f7faff]"
                    >
                        🎧 KHÓA HỌC IELTS INTENSIVE LISTENING
                    </Link>
                </div>
            </div>
            {/* Advertisement */}
            <div>
                <Link href="" className="mb-3 block">
                    <Image
                        src="https://study4.com/media/home/HomeBanner/files/2022/07/06/Learning_English_with.jpg"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        alt="Learning English"
                    />
                </Link>
                <Link href="" className="mb-3 block">
                    <Image
                        src="https://study4.com/media/home/HomeBanner/files/2021/12/01/download_extension.png"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        alt="Download Extension"
                    />
                </Link>
                {/* List Group FB */}
                <div>
                    <div className="text-center border mb-3">
                        <Image
                            src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/225605814_137648018518630_1539189158239507292_n.png?stp=dst-png_s370x247&_nc_cat=107&ccb=1-7&_nc_sid=1760b9&_nc_eui2=AeFszJH9ggzus_v2V_9j7D2ULTlQJT_4jnYtOVAlP_iOduYseFkcXbLtiCMMcbcS80tbS97zDf04juzM1WekhLSa&_nc_ohc=KfGV9WukLlgQ7kNvgFtSfF_&_nc_ht=scontent.fsgn5-10.fna&oh=00_AYBUeSJ5ABI62H6dqx-_w5zIdm0YrPPb7LOwHvsD1LY55Q&oe=669536AA"
                            width={500}
                            height={500}
                            alt="Facebook Group 1"
                        />
                        <p className="mx-3 mt-2 mb-1 font-bold text-sm">
                            Chia sẻ kinh nghiệm và tài liệu tự học IELTS 8.0+
                        </p>
                        <p className="text-xs text-gray-500 mb-2">
                            Facebook group · 257,154 members
                        </p>
                        <div className="flex items-center justify-center">
                            <Link
                                target="_blank"
                                href="https://www.facebook.com/groups/study4.ielts/?ref=web_social_plugin"
                                className="bg-[#4267b2] block w-[85%] rounded text-white font-bold mb-2"
                            >
                                <FacebookOutlined /> Visit group
                            </Link>
                        </div>
                    </div>
                    <div className="text-center border mb-3">
                        <Image
                            src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/225605814_137648018518630_1539189158239507292_n.png?stp=dst-png_s370x247&_nc_cat=107&ccb=1-7&_nc_sid=1760b9&_nc_eui2=AeFszJH9ggzus_v2V_9j7D2ULTlQJT_4jnYtOVAlP_iOduYseFkcXbLtiCMMcbcS80tbS97zDf04juzM1WekhLSa&_nc_ohc=KfGV9WukLlgQ7kNvgFtSfF_&_nc_ht=scontent.fsgn5-10.fna&oh=00_AYBUeSJ5ABI62H6dqx-_w5zIdm0YrPPb7LOwHvsD1LY55Q&oe=669536AA"
                            width={500}
                            height={500}
                            alt="Facebook Group 2"
                        />
                        <p className="mx-3 mt-2 mb-1 font-bold text-sm">
                            Chia sẻ kinh nghiệm tự học tiếng Anh cho người đi
                            làm
                        </p>
                        <p className="text-xs text-gray-500 mb-2">
                            Facebook group · 30,424 members
                        </p>
                        <div className="flex items-center justify-center">
                            <Link
                                target="_blank"
                                href="https://www.facebook.com/groups/dilam.hoctienganh/?ref=web_social_plugin"
                                className="bg-[#4267b2] block w-[85%] rounded text-white font-bold mb-2"
                            >
                                <FacebookOutlined /> Visit group
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LearnAbout;
