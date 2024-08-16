import Image from 'next/image';
import Courses from '../../components/client/Course/Courses';

function CoureseOnline() {
    return (
        <>
            {/* banner */}
            <div className="pb-4 pt-4">
                <div className="pt-8 px-3">
                    <a href="" className="mb-8 block">
                        <Image
                            src="https://study4.com/static/img/testonline_banner.jpg"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100%', height: 'auto' }}
                            alt="Picture of the author"
                            className=""
                        />
                    </a>

                    <div>
                        <h1 className="mb-4 font-bold text-4xl">
                            Khoá học online
                        </h1>
                        <p className="mb-4">
                            Những khoá học tiếng Anh online chất lượng cao của
                            STUDY4 được thiết kế theo chương trình tiếng Anh
                            chuẩn CEFR (A1-C2) của đại học Cambridge và Oxford
                            (Anh) với hệ thống bài giảng, bài tập phong phú đa
                            dạng. Bạn có thể học thử miễn phí trước khi đặt mua
                            sản phẩm.
                        </p>
                    </div>
                </div>
            </div>
            <div>
                {/* list course online */}
                <Courses title="Combo khoá học đặc biệt" />
              
            </div>
        </>
    );
}

export default CoureseOnline;
