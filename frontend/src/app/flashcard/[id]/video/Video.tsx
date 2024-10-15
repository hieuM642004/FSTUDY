'use client';

import { Select, Spin, Alert, Row, Button } from 'antd';
import FlashCardService from '@/services/FlashCardService';
import FlashCardInterface from '@/types/FlashCard';
import { useEffect, useState, useRef } from 'react';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import TextSelectorWrapper from '../../TextSelectorWrapper/TextSelectorWrapper';
const { Option } = Select;

function Video({ id }: { id: string }) {
    const [flashCard, setFlashCard] = useState<FlashCardInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await FlashCardService.getAllFlashCardById(id);
                setFlashCard(response);
            } catch (error) {
                console.error('Error fetching flashcards:', error);
                setError('Error fetching flashcards');
            }
        };

        fetchData();
    }, [id]);


    const handleSelectChange = async (value: string) => {
        setSelectedWord(value);
        setLoading(true);
        setError(null);
        try {
            const response = await FlashCardService.searchVideo(value);
            const results = response.data;
            console.log(results)
            setSearchResults(results);
            setCurrentVideoIndex(0);
        } catch (error) {
            console.error('Error searching video:', error);
            setError('Error searching video');
        } finally {
            setLoading(false);
        }
    };

    const handleNextVideo = () => {
        if (currentVideoIndex < searchResults.length - 1) {
            setCurrentVideoIndex(currentVideoIndex + 1);
        }
    };

    const handlePreviousVideo = () => {
        if (currentVideoIndex > 0) {
            setCurrentVideoIndex(currentVideoIndex - 1);
        }
    };

    const handleWordClick = (videoUrl: any) => {
        const url = new URL(videoUrl);
        const startTime = url.searchParams.get('start');

        if (iframeRef.current && startTime) {
            iframeRef.current.contentWindow?.postMessage(
                JSON.stringify({
                    event: 'command',
                    func: 'seekTo',
                    args: [parseFloat(startTime), true],
                }),
                '*',
            );
        }
    };

    return (
        <>
            <div className="p-10 shadow-md bg-slate-100">
                <h2 className="text-2xl font-bold  mb-4 text-center">
                    Flashcard: {flashCard?.nameCard}
                </h2>
                <div className="flex justify-center">
                    {flashCard && (
                        <Select
                            placeholder="Chọn từ để học cùng với video"
                            className="w-96"
                            onChange={handleSelectChange}
                        >
                            {flashCard.words.map((word) => (
                                <Option key={word.word} value={word.word}>
                                    {word.word}
                                </Option>
                            ))}
                        </Select>
                    )}
                </div>

                {loading && (
                    <div className="flex justify-center mt-4">
                        <Spin tip="Loading..." />
                    </div>
                )}
                {error && <Alert message={error} type="error" />}

                {searchResults.length > 0 && (
                    <>
                        <Row gutter={16} className="my-10">
                            <Button
                                onClick={handlePreviousVideo}
                                disabled={currentVideoIndex === 0}
                            >
                                <DoubleLeftOutlined />
                            </Button>

                            <iframe
                                ref={iframeRef}
                                width="1000"
                                height="400"
                                className="mx-auto"
                                src={`${searchResults[currentVideoIndex].video_url}&enablejsapi=1`} // Current video
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>

                            <Button
                                onClick={handleNextVideo}
                                disabled={
                                    currentVideoIndex ===
                                    searchResults.length - 1
                                }
                            >
                                <DoubleRightOutlined />
                            </Button>
                        </Row>

                        <div className="vocabulary ml-2 mt-4">
    <h3 className="font-bold text-xl">Từ vựng liên quan:</h3>
    <TextSelectorWrapper>
        <div>
            {Object.entries(searchResults[currentVideoIndex].vocabulary).map(
                ([word, videoUrl], i) => (
                    <span
                        key={i}
                        className="bg-slate-300 px-2 my-1 py-1 mx-1 inline-block rounded-md cursor-pointer"
                        onDoubleClick={() => handleWordClick(videoUrl)}
                    >
                        {word}
                    </span>
                ),
            )}
        </div>
    </TextSelectorWrapper>
</div>

                    </>
                )}

                {!loading && selectedWord && searchResults.length === 0 && (
                    <Alert
                        message="Không tìm thấy video liên quan."
                        type="info"
                    />
                )}
            </div>
        </>
    );
}

export default Video;
