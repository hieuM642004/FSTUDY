import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import CSS Quill theme

// Sử dụng dynamic import để chỉ tải khi chạy trên client-side
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const RichTextEditor = ({
    value,
    onChange, // Thêm props onChange
}: {
    value: any;
    onChange: (content: string) => void; // Định nghĩa kiểu cho onChange
}) => {
    return (
        <div>
            <ReactQuill
                value={value}
                onChange={onChange} // Gọi onChange khi giá trị thay đổi
                theme="snow"
                modules={{
                    toolbar: [
                        [{ header: '1' }, { header: '2' }, { font: [] }],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ align: [] }],
                        [{ color: [] }, { background: [] }],
                        ['link'],
                        ['clean'],
                    ],
                }}
                formats={[
                    'header',
                    'bold',
                    'italic',
                    'underline',
                    'strike',
                    'list',
                    'bullet',
                    'link',
                ]}
            />
        </div>
    );
};

export default RichTextEditor;
