'use client';
import { useEffect, useRef, useState } from 'react';
import { Carousel, Dropdown, MenuProps, message, Spin } from 'antd';
import './FlashCard.scss';
import FlashCardService from '@/services/FlashCardService';
import FlashCardInterface from '@/types/FlashCard';
import Link from 'next/link';
import { MoreOutlined } from '@ant-design/icons';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';

function FlashCard({ id }: { id: string }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [flashCard, setFlashCard] = useState<FlashCardInterface | null>(null);
    const [results, setResults] = useState<{ [key: number]: boolean | null }>({});
    const [isPracticeMode, setIsPracticeMode] = useState(false); 
    const [isFinished, setIsFinished] = useState(false); 
    const [reviewDataList, setReviewDataList] = useState<any[]>([]); 
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const carouselRef = useRef<any>(null); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const response = await FlashCardService.getAllFlashCardById(id);
                    setFlashCard(response);
                }
            } catch (error) {
                console.error('Error fetching flashcards:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleCardClick = (audioUrl: string) => {
        setIsFlipped(!isFlipped);
        if (audioRef.current) {
            audioRef.current.src = audioUrl;
            audioRef.current.play();
        }
    };

    const handleAnswer = (index: number, answer: boolean) => {
        setResults((prevResults) => ({
            ...prevResults,
            [index]: answer,
        }));

        const now = new Date();
        const reviewData = {
            reviewCount: flashCard?.words[index].reviewCount + 1 || 1, 
            reviewInterval: calculateNextInterval(flashCard?.words[index].reviewCount || 0), 
            lastReviewed: now,
            nextReviewDate: new Date(now.getTime() + (flashCard?.words[index].reviewInterval || 1) * 24 * 60 * 60 * 1000), 
        };

      
        setReviewDataList((prevData) => [
            ...prevData,
            { wordIndex: index, ...reviewData },
        ]);

        
        if (answer) {
            message.success('Bạn đã nhớ từ này!');
        } else {
            message.error('Bạn chưa nhớ từ này!');
        }

        setTimeout(() => {
            if (flashCard && flashCard.words) {
                if (carouselRef.current && index + 1 < flashCard.words.length) {
                    carouselRef.current.goTo(index + 1); 
                } else {
                    setIsFinished(true); 
                }
            }
        }, 1000); 
    };

   
    const calculateNextInterval = (reviewCount: number): number => {
        switch (reviewCount) {
            case 0:
                return 1; 
            case 1:
                return 3; 
            case 2:
                return 7; 
            default:
                return Math.min(reviewCount * 2, 30); 
        }
    };

    
    useEffect(() => {
        if (isFinished && reviewDataList.length > 0) {
            sendAllReviewData();
        }
    }, [isFinished, reviewDataList]);

    
    const sendAllReviewData = async () => {
        try {
            for (let i = 0; i < reviewDataList.length; i++) {
                const { wordIndex, ...reviewData } = reviewDataList[i];
                await FlashCardService.updateWordReview(flashCard?._id as string, wordIndex, reviewData);
            }
            message.success('Cập nhật ôn tập cho tất cả các từ thành công!');
        } catch (error) {
            message.error('Lỗi khi cập nhật dữ liệu ôn tập!');
        }
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link href={`/flashcard/${flashCard?._id}/video`}>Học qua video</Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link href={`/flashcard/${flashCard?._id}/multiple-choice`} className="ml-4">
                    Kiểm tra
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link href={`/flashcard/${flashCard?._id}/practice-reading`} className="ml-4">
                    Luyện đọc
                </Link>
            ),
        },
        {
            key: '4',
            label: (
                <button className="px-4 py-2 rounded-md" onClick={() => setIsPracticeMode(true)}>
                    Bắt đầu chế độ luyện tập
                </button>
            ),
        },
    ];

    const countRememberedWords = () => {
        return Object.values(results).filter((result) => result === true).length;
    };

    const countNotRememberedWords = () => {
        return Object.values(results).filter((result) => result === false).length;
    };

    return (
        <div className='p-10'>
            <div className="pt-7 flex justify-around ">
                <span>
                    <h2 className="text-start text-3xl font-bold">
                        FlashCard: {flashCard ? flashCard.nameCard : <Spin/>}
                    </h2>
                </span>
                <div className="flex justify-center">
                    <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                        <button className="bg-gray-300 rounded-md p-2">
                            <MoreOutlined />
                        </button>
                    </Dropdown>
                </div>
            </div>

            {flashCard && !isFinished && (
                <Carousel
                    className="shadow-md bg-transparent mx-auto mt-2 mb-6 w-2/3 h-96"
                    arrows={!isPracticeMode} 
                    infinite={false}
                    ref={carouselRef} 
                >
                    {flashCard.words.map((word, index) => (
                        <div key={index}>
                            <div
                                className={`relative w-full h-96 bg-white shadow-lg rounded-lg cursor-pointer transform transition-transform duration-500 ${
                                    isFlipped ? 'rotate-y-180' : ''
                                }`}
                                onClick={() => handleCardClick(word.audioUrl)}
                            >
                                <div
                                    className={`absolute inset-0 flex items-center justify-center p-4 backface-hidden ${
                                        isFlipped ? 'opacity-0' : 'opacity-100'
                                    }`}
                                >
                                    <p className="text-lg font-semibold front">
                                        {word.word}
                                    </p>
                                </div>
                                <div
                                    className={`back absolute inset-0 p-4 backface-hidden transform rotate-y-180 ${
                                        isFlipped ? 'opacity-100' : 'opacity-0'
                                    }`}
                                >
                                    <div className="flex flex-col lg:flex-row justify-center items-center lg:mx-5 space-y-4 lg:space-y-0 lg:space-x-4">
                                        <img
                                            className="w-48 md:w-64 lg:w-80"
                                            src={word && word?.image}
                                            alt=""
                                        />
                                        <p className="text-sm md:text-base lg:text-lg font-semibold select-none max-w-2xl text-center lg:text-left text-balance ml-0 lg:ml-4">
                                            {word?.definition}
                                        </p>
                                    </div>
                                </div>
                            </div>

                           
                            {isPracticeMode && (
                                <div className="flex justify-center mt-4">
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-md mx-2"
                                        onClick={() => handleAnswer(index, false)}
                                    >
                                        Chưa nhớ
                                    </button>
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded-md mx-2"
                                        onClick={() => handleAnswer(index, true)}
                                    >
                                        Đã nhớ
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </Carousel>
            )}

          
            {isFinished && (
                <div className="text-center mt-10 shadow-md p-10">
                    <h2 className="text-2xl font-bold mb-4">Hết </h2>
                    <p className="text-lg">Số từ bạn đã nhớ: {countRememberedWords()}</p>
                    <p className="text-lg">Số từ bạn chưa nhớ: {countNotRememberedWords()}</p>
                    <ButtonPrimary to="/flashcard" className="mt-4" label='Trở về flashcard'/>
                </div>
            )}

            <audio ref={audioRef} preload="auto"></audio>
        </div>
    );
}

export default FlashCard;
