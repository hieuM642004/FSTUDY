'use client';
import { UpOutlined } from '@ant-design/icons';
import { Popover, PopoverProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';

function SiteElevator() {
    const [arrow, setArrow] = useState<'Show' | 'Hide' | 'Center'>('Show');
    const [isSticky, setSticky] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    const mergedArrow = useMemo<PopoverProps['arrow']>(() => {
        if (arrow === 'Hide') {
            return false;
        }

        if (arrow === 'Show') {
            return true;
        }

        return {
            pointAtCenter: true,
        };
    }, [arrow]);

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
        if (header) {
            var headerPosition = header.offsetTop;
            window.scrollTo({ top: headerPosition, behavior: 'smooth' });
        }
    };

    const loadScript = () => {
        if (scriptLoaded) return;

        const script = document.createElement('script');
        script.src = 'https://stc-laban.zdn.vn/dictionary/js/plugin/lbdictplugin.frame.min.js';
        script.onload = () => {
            const lbDictPluginFrame = (window as any).lbDictPluginFrame;
            const dictElement = document.getElementById('lbdict_plugin_frame');
            if (lbDictPluginFrame && dictElement) {
                lbDictPluginFrame.init({
                    s: 'https://dict.laban.vn',
                    w: 260,
                    h: 260,
                    hl: 2,
                    th: 3,
                });
            }
            setScriptLoaded(true);
        };
        document.body.appendChild(script);
    };

    const handlePopoverClick = () => {
        loadScript();
    };

    return (
        <>
            <div style={{ position: 'fixed', top: '45%', right: '20px', zIndex: 100 }}>
                <div className="bg-white flex flex-col items-center w-11 shadow-2xl rounded-l-lg cursor-pointer py-[5px]">
                    <Popover
                        placement="leftTop"
                        title={'Từ điển'}
                        content={
                            <div>
                                <div id="lbdict_plugin_frame" className='w-[260px] h-[260px] fixed top-3/4'></div>
                            </div>
                        }
                        arrow={mergedArrow}
                        trigger="click"
                        onOpenChange={handlePopoverClick}
                    >
                        <p className="text-sm text-center">Từ điển</p>
                    </Popover>

                    <div className="mt-1 border-t block w-[60%] text-center" onClick={handleScrollTop}>
                        {isSticky && <UpOutlined />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SiteElevator;
