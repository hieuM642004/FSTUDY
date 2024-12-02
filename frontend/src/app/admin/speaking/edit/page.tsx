import EditSheet from '@/app/speaking/edit/page';

function AdminSpeaking() {
    return (
        <>
            <p className="text-red-500 italic">
                *Lưu ý bạn chỉ thêm dữ liệu từ cột A đến D
            </p>
            <EditSheet />
        </>
    );
}

export default AdminSpeaking;
