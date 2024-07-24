import { BookFilled ,UpOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

function SiteElevator() {
    // handle ScrollTop
    const [isSticky, setSticky] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 300) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleScrollTop = () => { 
        const header = document.querySelector('header'); 
        console.log(header);
        if(header){
            var headerPosition = header.offsetTop; 
            window.scrollTo({ top: headerPosition, behavior: 'smooth' }); 
        }
    }
    return (
        <>
            {/* site-elevator */}
            <div style={{ position: 'fixed', top: '45%', right: '0px'  , zIndex: '100'}}>
                {' '}
                <div className='bg-white   flex flex-col items-center w-11 shadow-2xl rounded-l-lg	cursor-pointer py-[5px]	'>
                    <BookFilled className="text-xl block" />
                    <span className='text-xs mt-2 '>
                        Từ điển
                    </span>
                    <div className='mt-1 border-t block w-[60%] text-center'  onClick={handleScrollTop}>
                    {isSticky && <UpOutlined /> }
                    </div>
                </div>
            </div>
        </>
    );
}

export default SiteElevator;
