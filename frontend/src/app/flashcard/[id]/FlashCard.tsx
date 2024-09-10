'use client';
import { useEffect, useRef, useState } from 'react';
import { Carousel } from 'antd';

import './FlashCard.scss';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import FlashCardService from '@/services/FlashCardService';
import FlashCardInterface from '@/types/FlashCard';
import Link from 'next/link';

function FlashCard({ id }:{id: string}) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [flashCard, setFlashCard] = useState<FlashCardInterface | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const response = await FlashCardService.getAllFlashCardById(
                        id,
                    );
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

    return (
        <>
            <div className="pt-7 flex justify-around ">
                <span>
                    <h2 className="text-start text-3xl font-bold">
                        FlashCard:{' '}
                        {flashCard ? flashCard.nameCard : 'Loading...'}
                    </h2>
                </span>
                <div className="flex justify-center">
                    <ButtonPrimary to={`/flashcard/${flashCard?._id}/video`} label="Học qua video" />
                    <ButtonPrimary to={`/flashcard/${flashCard?._id}/multiple-choice`} className="ml-4"  label="Kiểm tra" />
                    <ButtonPrimary to={`/flashcard/${flashCard?._id}/practice-reading`} className="ml-4" label="Luyện đọc" />
                </div>
            </div>

            {flashCard && (
                <Carousel
                    className="shadow-md bg-transparent mx-auto mt-2 mb-6 w-2/3 h-96"
                    arrows
                    infinite={false}
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
                                    className={`back absolute inset-0 flex items-center justify-center p-4 backface-hidden transform rotate-y-180 ${
                                        isFlipped ? 'opacity-100' : 'opacity-0'
                                    }`}
                                >
                                    <p className="text-lg font-semibold select-none max-w-2xl">
                                        {word.definition}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            )}
             <audio ref={audioRef} preload="auto"></audio>
        </>
    );
}

export default FlashCard;
