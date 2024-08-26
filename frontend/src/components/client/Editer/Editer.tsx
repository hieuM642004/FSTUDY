import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';

const registerImageHandler = (
    quill: Quill,
    onImageUpload: (file: File) => void,
) => {
    const toolbar: any = quill.getModule('toolbar');
    toolbar.addHandler('image', () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.addEventListener('change', async (event) => {
            const target = event.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const range = quill.getSelection();
                    const imageUrl = reader.result as string;
                    quill.insertEmbed(range.index, 'image', imageUrl);
                    quill.setSelection(range.index + 1);
                };
                reader.readAsDataURL(file);
                onImageUpload(file);
            }
        });
        input.click();
    });
};

type EditorProps = {
    value: string;
    onChange: (value: string) => void;
    onImageUpload: (file: File) => void;
};

const Editor: React.FC<EditorProps> = ({ value, onChange, onImageUpload }) => {
    const quillRef = useRef<ReactQuill>(null);

    useEffect(() => {
        if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            registerImageHandler(quill, onImageUpload);
        }
    }, [quillRef, onImageUpload]);

    const handleChange = (content: string) => {
        // Remove image elements from the content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const images = tempDiv.querySelectorAll('img');
        images.forEach((img) => img.remove());

        onChange(tempDiv.innerHTML); // Pass only the text content to onChange
    };

    return (
        <ReactQuill
            ref={quillRef}
            theme="snow"
            value={value}
            onChange={handleChange}
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
