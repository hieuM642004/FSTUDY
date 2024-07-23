'use client';

import { Col, Row } from 'antd';
import type { TabsProps } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Input, Radio, Space } from 'antd';
import { useRef } from 'react';
import type { MenuProps } from 'antd';

import CountDown from './CountDown';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import Dropdowns from '../../components/client/Dropdown/Dropdown';
import Tab from '@/components/client/Tabs/Tabs';
import WapperItemCard from '@/components/client/WapperItemCard/WapperItemCard';
function Recording({ CurrrentRef, dataselection }: any) {
    // input selection
    const [valueSelection, setValueSelection] = useState(null);

    const onChange = (e: RadioChangeEvent) => {
        setValueSelection(e.target.value);
        dataselection(e.target.value);
    };
    return (
        <div className="flex flex-wrap justify-around 	">
            {/* reading */}
            <div className="">
                <div className="w-full">làm bài văn</div>
            </div>
            {/* fild input */}
            <div className="">
                <div>
                    {/* input nhập */}
                    <div className=" flex items-center justify-center mb-6">
                        <div className="size-8 bg-[#e8f2ff] mr-4 border rounded-full flex justify-center items-center font-bold text-[#35509a]">
                            2
                        </div>
                        <Input
                            placeholder=""
                            className=" "
                            ref={CurrrentRef}
                            id="question-2"
                        />
                    </div>

                    {/* check radio */}
                    <div className=" flex mb-6 justify-center">
                        <div className="size-8 bg-[#e8f2ff] mr-4 border rounded-full flex justify-center items-center font-bold text-[#35509a]">
                            3
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="">what your name</label>
                            <Radio.Group
                                onChange={onChange}
                                value={valueSelection}
                                id="question-3"
                            >
                                <Space direction="vertical">
                                    <Radio value={1}>
                                        C. at the back of the hall.
                                    </Radio>
                                    <Radio value={2}>B. in the lobby.</Radio>
                                    <Radio value={3}>
                                        A. at the front counter.
                                    </Radio>
                                </Space>
                            </Radio.Group>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TakeTheTest() {
    // handle filed input active has data
    const [dataselection, setDataselection] = useState('');
    const [ActiveQuesiton, setActiveQuesiton] = useState<number | string>('');
    // ${dataselection && ActiveQuesiton === index + 1 ? 'bg-[#35509a] text-white' : 'hover:text-white hover:bg-[#35509a]'}
    const handleDataselection = (data: string) => {
        setDataselection(data);
    };
    const questionRef: any = useRef(null);

    const items: TabsProps['items'] | any = [
        {
            key: '1',
            label: 'Recording 1',
            children: (
                <Recording
                    CurrrentRef={questionRef}
                    dataselection={handleDataselection}
                />
            ),
        },
        {
            key: '2',
            label: 'Recording 2',
            children: '2',
        },
        {
            key: '3',
            label: 'Recording 3',
            children: '3',
        },
    ];
    // handle next tab
    const [activeKey, setActiveKey] = useState('1');

    const onChange = (key: string) => {
        setActiveKey(key);
    };

    const nextTab = () => {
        const currentIndex: any = items?.findIndex(
            (item: any) => item.key === activeKey,
        );
        const nextIndex = (currentIndex + 1) % items.length;
        setActiveKey(items[nextIndex].key);
    };
    const onTimeup = () => {
        alert('Hết thời gian làm bài');
    };
    // list Recording
    const ListRecording = [
        {
            key: '1',
        },
        {
            key: '2',
        },
        {
            key: '3',
        },
        {
            key: '4',
        },
        {
            key: '5',
        },
        {
            key: '6',
        },
        {
            key: '7',
        },
        {
            key: '8',
        },
        {
            key: '9',
        },
        {
            key: '10',
        },
    ];
    // handle active question
    function scrollToId(id: string) {
        const element = document.getElementById(id);

        if (element) {
            const topOffset = 150;
            const targetPosition =
                element.getBoundingClientRect().top +
                window.pageYOffset -
                topOffset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            if (questionRef) {
                questionRef.current.focus();
            }
        }
    }

    const itemsdropdown: MenuProps['items'] = [
        {
            label: (
                <div
                    onClick={() => {
                        if (
                            confirm(
                                'Are you sure? (Nếu bị lỗi mạng và không nộp được bài, click vào đây để khôi phục bài làm gần nhất.)',
                            )
                        ) {
                            //    xóa
                        } else {
                            //    hủy
                        }
                    }}
                    className="text-red-500"
                >
                    khôi phục
                </div>
            ),
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <div
                    onClick={() => {
                        if (
                            confirm(
                                'Are you sure? (Nếu bạn chưa muốn nộp bài nhưng vẫn muốn lưu.)',
                            )
                        ) {
                            //    xóa
                        } else {
                            //    hủy
                        }
                    }}
                    className="text-blue-600"
                >
                    Lưu bài làm
                </div>
            ),
            key: '1',
        },
    ];

    return (
        <div className="pt-8 ">
            <div className="mb-2 flex items-center justify-center">
                <h4 className="font-bold">
                    IELTS Simulation Listening test 1{' '}
                </h4>
                <button
                    className="hover:bg-[#35509a] ml-1 hover:text-[#e8f2ff] text-[#35509a] bg-[#e8f2ff] font-bold border border-[#283c74] px-2 py-1 rounded-lg"
                    onClick={() => {
                        if (
                            confirm(
                                'Rời khỏi trang web? (Các thay đổi bạn đã thực hiện có thể không được lưu.)',
                            )
                        ) {
                            //    xóa
                        } else {
                            //    hủy
                        }
                    }}
                >
                    Thoát
                </button>
            </div>
            {/* container */}
            <Row>
                <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                    <WapperItemCard stylecss="lg:w-full min-h-[700px]">
                        <div className="p-[10px]">đây là Radio</div>
                        <Tab
                            items={items}
                            activeKey={activeKey}
                            onChange={onChange}
                        />
                        <div className="flex items-end justify-end">
                            <button
                                className=" mt-12 uppercase text-[#35509a] text-xl"
                                onClick={() => {
                                    nextTab();
                                }}
                            >
                                Tiếp theo <RightOutlined />
                            </button>
                        </div>
                    </WapperItemCard>
                </Col>

                <Col xs={24} sm={24} md={8} lg={8} xl={4}>
                    <div
                        className={`bg-white rounded-lg p-4 shadow-lg border-2 
                     mb-10 md:w-[16%] ml-3   md:fixed block min-h-[463px]  bottom-0 top-[126px] right-2 
                     
                  `}
                    >
                        <div className="mb-4 ">
                            <p className="text-lg">
                                Thời gian còn lại:{' '}
                                <span>
                                    <CountDown
                                        timeStart={1000}
                                        onTimeup={onTimeup}
                                    />
                                </span>
                            </p>
                        </div>
                        <ButtonPrimary
                            htmlType="button"
                            onClick={() => {
                                if (confirm('Xác nhận nộp bài')) {
                                    //    xóa
                                } else {
                                    //    hủy
                                }
                            }}
                            size="large"
                            label="Nộp bài"
                            className="w-full  flex justify-center mb-3 "
                        />
                        <div className="mb-3">
                            <Dropdowns
                                items={itemsdropdown}
                                title={'Khôi phục/lưu làm bài'}
                                stylecss="text-red-600 text-normal"
                            />
                        </div>
                        <p className="mb-4 text-[#ffad3b] font-bold italic">
                            Chú ý: bạn có thể click vào số thứ tự câu hỏi trong
                            bài để đánh dấu review
                        </p>
                        {/* list Recording  */}
                        <div className="w-full md:h-[45%]  overflow-auto">
                            <div className="mb-2">
                                <p className="font-bold mb-4 text-xl">
                                    Recording 1
                                </p>
                                <div className="flex flex-wrap p-1">
                                    {ListRecording.map(
                                        (item: any, index: number) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={`mr-1 mb-2 border-black font-normal border
                                                 rounded-lg inline-block py-1 px-2 hover:cursor-pointer hover:text-white hover:bg-[#35509a] 
                                                 ${
                                                     ActiveQuesiton ===
                                                     index + 1
                                                         ? 'bg-[#35509a] text-white'
                                                         : 'hover:text-white hover:bg-[#35509a]'
                                                 }
                                                 `}
                                                    onClick={() => {
                                                        scrollToId(
                                                            `question-${
                                                                index + 1
                                                            }`,
                                                        );
                                                        setActiveQuesiton(
                                                            index + 1,
                                                        );
                                                    }}
                                                >
                                                    {item.key}
                                                </div>
                                            );
                                        },
                                    )}
                                </div>
                            </div>
                            <div className="mb-2">
                                <p className="font-bold mb-4 text-xl">
                                    Recording 1
                                </p>
                                <div className="flex flex-wrap p-1">
                                    {ListRecording.map(
                                        (item: any, index: number) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={`mr-1 mb-2 border-black font-normal border
                                                 rounded-lg inline-block py-1 px-2 hover:cursor-pointer hover:text-white hover:bg-[#35509a] 
                                                 ${
                                                     ActiveQuesiton ===
                                                     index + 1
                                                         ? 'bg-[#35509a] text-white'
                                                         : 'hover:text-white hover:bg-[#35509a]'
                                                 }
                                                 `}
                                                    onClick={() => {
                                                        scrollToId(
                                                            `question-${
                                                                index + 1
                                                            }`,
                                                        );
                                                        setActiveQuesiton(
                                                            index + 1,
                                                        );
                                                    }}
                                                >
                                                    {item.key}
                                                </div>
                                            );
                                        },
                                    )}
                                </div>
                            </div>
                            <div className="mb-2">
                                <p className="font-bold mb-4 text-xl">
                                    Recording 1
                                </p>
                                <div className="flex flex-wrap p-1">
                                    {ListRecording.map(
                                        (item: any, index: number) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={`mr-1 mb-2 border-black font-normal border
                                                 rounded-lg inline-block py-1 px-2 hover:cursor-pointer hover:text-white hover:bg-[#35509a] 
                                                 ${
                                                     ActiveQuesiton ===
                                                     index + 1
                                                         ? 'bg-[#35509a] text-white'
                                                         : 'hover:text-white hover:bg-[#35509a]'
                                                 }
                                                 `}
                                                    onClick={() => {
                                                        scrollToId(
                                                            `question-${
                                                                index + 1
                                                            }`,
                                                        );
                                                        setActiveQuesiton(
                                                            index + 1,
                                                        );
                                                    }}
                                                >
                                                    {item.key}
                                                </div>
                                            );
                                        },
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default TakeTheTest;
