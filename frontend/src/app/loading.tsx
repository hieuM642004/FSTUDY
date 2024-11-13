'use client';
function Loading() {
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full border-t-4 border-blue-500 border-opacity-50 border-r-4 border-b-4 h-16 w-16 mb-4"></div>
                    <div className="text-xl font-bold text-white mb-2">
                        FSTUDY
                    </div>
                    <div className="text-white text-opacity-80">
                        Đang tải...
                    </div>
                </div>
            </div>
        </>
    );
}

export default Loading;
