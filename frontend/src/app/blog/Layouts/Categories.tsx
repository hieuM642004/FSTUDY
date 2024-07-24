import Link from 'next/link';

function Categories() {
    return (
        <>
            <div className="flex-none w-[11rem]  md:block  px-3">
                {' '}
                <h4 className="text-xl font-bold mb-4">Chuyên mục</h4>
                {/* list cate */}
                <div>
                    <p className="font-semibold text-base my-2">
                        Tìm hiểu về FSTUDY
                    </p>
                    <div>
                        <div className="ml-6 mb-3 text-sm">
                            <Link href="">Tính năng trên FSTUDY</Link>
                        </div>
                        <div className="ml-6 mb-3 text-sm">
                            <Link href="">Tính năng trên FSTUDY</Link>
                        </div>
                    </div>
                    <p className="font-semibold text-base my-2">
                        Tìm hiểu về FSTUDY
                    </p>
                    <div>
                        <div className="ml-6 mb-3 text-sm">
                            <Link href="">Tính năng trên FSTUDY</Link>
                        </div>
                        <div className="ml-6 mb-3 text-sm">
                            <Link href="">Tính năng trên FSTUDY</Link>
                        </div>
                    </div>
                    <p className="font-semibold text-base my-2">
                        Tìm hiểu về FSTUDY
                    </p>
                    <div>
                        <div className="ml-6 mb-3 text-sm">
                            <Link href="">Tính năng trên FSTUDY</Link>
                        </div>
                        <div className="ml-6 mb-3 text-sm">
                            <Link href="">Tính năng trên FSTUDY</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Categories;
