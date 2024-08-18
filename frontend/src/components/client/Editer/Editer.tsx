import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import CSS

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Editor = ({ value, onChange }) => {
    return (
        <ReactQuill
            value={value}
            onChange={onChange}
            theme="snow"
            modules={{
                toolbar: [
                    [{ header: '1' }, { header: '2' }, { font: [] }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ align: [] }],
                    [{ color: [] }, { background: [] }],
                    ['link', 'image'],
                    ['clean'],
                ],
            }}
        />
    );
};

export default Editor;
