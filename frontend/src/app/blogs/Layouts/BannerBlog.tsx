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

                <Image
                    src="https://study4.com/static/img/testonline_banner.jpg"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    alt="Picture of the author"
                    className="mb-8 block"
                />
            </div>
        </>
    );
}

export default BannerBlog;
