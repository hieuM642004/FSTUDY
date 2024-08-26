import React, { useEffect, useRef } from 'react';
import Quill from 'quill';

import 'quill/dist/quill.snow.css';

function Editor({ onContentChange } : any) {
    const quillRef : any= useRef(null);
    const editorRef : any= useRef(null);

    useEffect(() => {
        if (quillRef.current) return; // ngăn duliacate thằng quill
        quillRef.current = new Quill(editorRef.current, {
            modules: {
                toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    ['image', 'code-block'],
                ],
            },
            placeholder: 'nhập nội dung bài viết...',
            theme: 'snow',
        });
        quillRef.current.on('text-change', () => {
            if (quillRef.current) {
                const content = quillRef.current.root.innerHTML;
                onContentChange(content);
            }
        });
    }, [onContentChange]);
  
    return (
        <>
            <div ref={editorRef} id="editor"></div>
        </>
    );
}

export default Editor;
