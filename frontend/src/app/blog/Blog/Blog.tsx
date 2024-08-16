'use client';
import Image from 'next/image';
import Link from 'next/link';
function Blog() {
    return (
        <>
            <div className="flex flex-row justify-between items-center border-b-[1px] mt-3">
                <div className="w-[11.25rem] h-[6.313rem] flex-1">
                    <Image
                        src="https://study4.com/media/examprep/Post/files/2024/07/11/ielts_speaking_p2_sample_3.png"
                        alt="Picture of the author"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                    />
                </div>
                <div className="pb-5 mb-5 flex-[3] pl-2">
                    <span className="block font-bold text-gray-400">
                        IELTS SPEAKING
                    </span>
                    <Link href="" className="mb-[6px] font-bold text-2xl">
                        Describe a place you visited that has beautiful views -
                        Bài mẫu IELTS Speaking (Cambridge 19 Test 4)
                    </Link>
                    <p className="mb-4 italic">
                        Hãy tham khảo bài mẫu 8.0+ chủ đề “Describe a place you
                        visited that has beautiful views” cho IELTS Speaking
                        Part 2 và 3 nhé!
                    </p>
                    <div className="text-sm">11/07/2024 Kim Thành Lợi</div>
                </div>
            </div>
        </>
    );
}

export default Blog;
