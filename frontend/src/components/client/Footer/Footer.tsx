import Link from "next/link";

const FooterComponent = () => {
    return (
        <footer className="px-3 pt-4 lg:px-9 border-t-2 bg-gray-50 text-black">
            <div className="grid gap-8 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="sm:col-span-2">
                    <a href="#" className="inline-flex items-center">
                        <span className="ml-2 text-2xl font-bold tracking-wide text-gray-800">
                            FSTUDY
                        </span>
                    </a>
                    <div className="mt-4 lg:max-w-xl">
                        <p className="text-sm text-gray-500">
                            FSTUDY là nền tảng học tiếng Anh trực tuyến hàng
                            đầu, mang đến cho bạn trải nghiệm học tập chất lượng
                            cao, dễ dàng và linh hoạt. Dù bạn là người mới bắt
                            đầu hay đã có nền tảng tiếng Anh, FSTUDY có mọi thứ
                            bạn cần để nâng cao kỹ năng ngôn ngữ của mình.
                        </p>
                    </div>
                    <div className="mt-4 lg:max-w-xl">
                        <p className="text-sm text-gray-500">
                            Công ty giáo dục FSTUDY <br /> Giấy chứng nhận Đăng
                            ký doanh nghiệp số: 0109675459 do Sở Kế hoạch và Đầu
                            tư thành phố Cần Thơ cấp ngày 17/06/2021.
                            <br /> Điện thoại liên hệ/Hotline: 096 369 5525.
                            <br /> Email: fstudy.team@gmail.com. <br /> Địa chỉ
                            trụ sở: Số 15, Quận Ninh Kiều, Thành phố Cần Thơ,
                            Việt Nam.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 text-sm text-gray-500">
                    <p className="text-base font-bold tracking-wide text-gray-900">
                        Khóa học online
                    </p>
                    <a href="#">IELTS Fundamentals</a>
                    <a href="#">IELTS General Reading</a>
                    <a href="#">IELTS Intensive Writing</a>
                    <p className="text-base font-bold tracking-wide text-gray-900">
                        Hỗ trợ
                    </p>
                    <Link href="/buying-guide">Hướng dẫn mua hàng</Link>
                   
                </div>
                <div className="flex flex-col gap-2 text-sm text-gray-500">
                    <p className="text-base font-bold tracking-wide text-gray-900">
                        FSTUDY
                    </p>
                    <a href="#">Về chúng tôi</a>
                    <a href="#">Liên hệ</a>
                    <a href="#">Điều khoản bảo mật</a>
                    <p className="text-base font-bold tracking-wide text-gray-900">
                        Liên hệ
                    </p>
                    <a href="#">Email: fstudy.team@gmail.com</a>
                    <a href="#">Hotline: 096 369 5525</a>
                </div>
            </div>
            <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
                <p className="text-sm text-gray-600">
                    © Copyright {new Date().getFullYear()} FSTUDY. All rights
                    reserved.
                </p>
                <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
                    
                </ul>
            </div>
        </footer>
    );
};

export default FooterComponent;
