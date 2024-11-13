import Link from 'next/link';
import Image from 'next/image';

function BannerBlog({ breadcrumb, props }: any) {
    return (
        <>
            <div>
                <div className="mb-2">
                    {breadcrumb ? (
                        breadcrumb.map((item: string, index: number) => {
                            const isLastItem = index === breadcrumb.length - 1;
                            return (
                                <>
                                    <Link
                                        className={`hover:text-black  ${
                                            isLastItem
                                                ? 'text-[#35509a] font-bold'
                                                : 'text-[#595d68]'
                                        }`}
                                        href="/blogs/"
                                        key={index}
                                    >
                                        {item}
                                    </Link>
                                    {isLastItem ? '' : <>&nbsp; / &nbsp;</>}
                                </>
                            );
                        })
                    ) : (
                        <>
                            <Link
                                className="hover:text-black text-[#595d68]"
                                href="/"
                            >
                                Trang chủ
                            </Link>
                            &nbsp; / &nbsp;
                            <Link
                                className="hover:text-black text-[#35509a] font-bold"
                                href="/blogs"
                            >
                                Bài viết
                            </Link>
                        </>
                    )}
                </div>

                <img
                    src="/images/blog-banner.png"
                    alt="Picture of the author"
                    className="mb-8 w-full h-96 object-cover rounded-md shadow-md"
                />
            </div>
        </>
    );
}

export default BannerBlog;
