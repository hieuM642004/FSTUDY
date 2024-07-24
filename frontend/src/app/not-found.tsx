import WapperItemCard from '@/components/client/WapperItemCard/WapperItemCard';

export default async function NotFound() {
    return (
        <>
            <div className="pt-10  px-6 text-center justify-center items-center flex">
                <WapperItemCard stylecss="lg:w-[100%] lg:h-[15rem]  justify-center items-center flex  flex-col">
                    <div className=''>
                        <div className="text-3xl w font-bold mb-3">
                            Không tìm thấy trang
                        </div>
                        <p className="mb-3">
                            Xin lỗi chúng tôi không tìm thấy trang web bạn muốn
                            tới..
                        </p>
                    </div>
                </WapperItemCard>
            </div>
        </>
    );
}
