import ButtonOutline from '@/components/shared/ButtonPrimary/ButtonOutline';

import ItemComment from './ItemComment';

function Comment() {
    return (
        <>
            <ItemComment />
            <ItemComment />
            <ItemComment />
            <ItemComment />
            <ItemComment />
            <ButtonOutline
                size="large"
                label="Xem thêm"
                className="w-full  mt-2 text-[#35509a] hover:bg-[#35509a]"
            />
        </>
    );
}

export default Comment;
