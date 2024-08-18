'use client';
import React, { useEffect, useState } from 'react';

import Editor from '../../../components/client/Editer/Editer';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';

function AddBlogPage() {
    const [text, setText] = useState('');
    return (
        <div className="flex flex-col  lg:px-48 lg:py-11">
            <h2 className="text-xl uppercase mb-4 text-left">Thêm bài viết</h2>
            <input
                type="text"
                placeholder="Your Title"
                className="mb-2 rounded-lg border-zinc-300 h-10 p-2"
            ></input>

            <Editor value={text} onChange={setText} />
            <div className="pt-4 text-left">
                <ButtonPrimary
                    size={'large'}
                    label={'Thêm bài viết'}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                />
            </div>
        </div>
    );
}

export default AddBlogPage;
