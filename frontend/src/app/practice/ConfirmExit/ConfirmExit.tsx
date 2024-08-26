import { useEffect } from 'react';

function ConfirmExit() {
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue =
                'Rời khỏi trang web? (Các thay đổi bạn đã thực hiện có thể không được lưu.)';
        };

        const handlePopState = () => {
            const shouldExit = confirm(
                'Bạn có chắc chắn muốn rời khỏi trang này? (Các thay đổi bạn đã thực hiện có thể không được lưu.)'
            );
            if (!shouldExit) {
                
                history.pushState(null, '', window.location.href);
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const handleExitClick = () => {
        const shouldExit = confirm(
            'Rời khỏi trang web? (Các thay đổi bạn đã thực hiện có thể không được lưu.)'
        );

        if (shouldExit) {
            window.location.href = 'http://localhost:3000/tests'; 
        }
    };

    return (
        <button
            className="hover:bg-[#35509a] ml-1 hover:text-[#e8f2ff] text-[#35509a] bg-[#e8f2ff] font-bold border border-[#283c74] px-2 py-1 rounded-lg"
            onClick={handleExitClick}
        >
            Thoát
        </button>
    );
}

export default ConfirmExit;
