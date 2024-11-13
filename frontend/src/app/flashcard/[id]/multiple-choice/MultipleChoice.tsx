'use client';
import React, { useState, useEffect } from 'react';
import FlashCardService from '@/services/FlashCardService';
import './PracticeReading.scss';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';

type Word = {
    word: string;
    definition: string;
    audioUrl?: string;
    image?: string;
};

type FlashCard = {
    _id: string;
    nameCard: string;
    words: Word[];
    wordCount: number;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
};

const MultipleChoiceQuestion: React.FC<{ id: string }> = ({ id }) => {
    const [flashCard, setFlashCard] = useState<FlashCard | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedOptionId, setSelectedOptionId] = useState<number | null>(
        null,
    );
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
    const [incorrectAnswersCount, setIncorrectAnswersCount] =
        useState<number>(0);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState<
        { id: number; text: string }[]
    >([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await FlashCardService.getAllFlashCardById(id);
                setFlashCard(response);
            } catch (error) {
                console.error('Error fetching flashcards:', error);
            }
        };
        fetchData();
    }, [id]);

    // Shuffle options each time the question changes
    useEffect(() => {
        if (flashCard) {
            const currentWord = flashCard.words[currentQuestionIndex];
            const otherOptions = flashCard.words
                .filter((word) => word.word !== currentWord.word)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);

            const options = [
                { id: 0, text: currentWord.word },
                ...otherOptions.map((word, index) => ({
                    id: index + 1,
                    text: word.word,
                })),
            ].sort(() => Math.random() - 0.5);

            setShuffledOptions(options);
        }
    }, [flashCard, currentQuestionIndex]);

    const handleOptionClick = (index: number) => {
        if (!isSubmitted) {
            setSelectedOptionId(index);
        }
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        if (
            selectedOptionId ===
            shuffledOptions.findIndex(
                (option) =>
                    option.text === flashCard!.words[currentQuestionIndex].word,
            )
        ) {
            setCorrectAnswersCount(correctAnswersCount + 1);
        } else {
            setIncorrectAnswersCount(incorrectAnswersCount + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex + 1 < (flashCard?.words.length || 0)) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setSelectedOptionId(null);
            setIsSubmitted(false);
        } else {
            setIsQuizFinished(true);
        }
    };

    if (!flashCard) {
        return <div>Loading...</div>;
    }

    const currentWord = flashCard.words[currentQuestionIndex];
    const totalQuestions = flashCard.words.length;
    const percentageCorrect =
        totalQuestions > 0 ? (correctAnswersCount / totalQuestions) * 100 : 0;

    return (
        <div
            className={`mx-auto quiz-results my-12 shadow-md rounded-md w-2/3 h-2/3 ${
                isQuizFinished ? 'p-24' : ''
            }`}
        >
            {isQuizFinished ? (
                <div className="relative max-w-md mx-auto rounded-lg shadow-lg p-6">
                    <div className="title w-40 h-40 mx-auto"></div>
                    <div className="absolute inset-0 bg-gray-800 opacity-20 rounded-lg"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-center text-gray-800">
                            Kết quả
                        </h2>
                        <p className="text-center mt-2">
                            Tổng đáp án đúng:{' '}
                            <span className="text-green-500 font-bold">
                                {correctAnswersCount}
                            </span>
                        </p>
                        <p className="text-center">
                            Tổng đáp án sai:{' '}
                            <span className="text-red-500 font-bold">
                                {incorrectAnswersCount}
                            </span>
                        </p>
                        <p className="text-center">
                            Tỷ lệ đúng:{' '}
                            <span className="text-blue-500 font-bold">
                                {percentageCorrect.toFixed(2)}%
                            </span>
                        </p>
                        <div className="flex justify-center mt-3">
                            <ButtonPrimary
                                label="Trở về Flashcard"
                                to="/flashcard"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="title w-40 h-40 mx-auto"></div>
                    <div className="bg-white rounded-lg shadow-lg p-6 mx-auto">
                        <h3 className="text-slate-500 text-lg font-semibold mb-4">
                            Định nghĩa
                        </h3>
                        <div className="definition text-gray-700 mb-6 text-center">
                            {currentWord.definition}
                        </div>

                        <div className="options grid grid-cols-1 gap-4">
                            {shuffledOptions.map((option, index) => {
                                let optionClass =
                                    'p-3 rounded-lg cursor-pointer text-center font-medium transition-colors duration-200';
                                if (isSubmitted) {
                                    if (selectedOptionId === index) {
                                        optionClass +=
                                            option.text === currentWord.word
                                                ? ' bg-green-200 border border-green-500 text-green-700'
                                                : ' bg-red-200 border border-red-500 text-red-700';
                                    }
                                } else if (selectedOptionId === index) {
                                    optionClass +=
                                        ' bg-blue-200 border border-blue-500 text-blue-700';
                                } else {
                                    optionClass +=
                                        ' bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200';
                                }
                                return (
                                    <div
                                        key={option.id}
                                        className={`${optionClass} option`}
                                        onClick={() => handleOptionClick(index)}
                                    >
                                        {option.text}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex justify-center mt-6 space-x-4">
                            <ButtonPrimary
                                label="Nộp"
                                onClick={handleSubmit}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 shadow-md disabled:bg-gray-300"
                                disabled={selectedOptionId === null}
                            />
                            {isSubmitted && (
                                <ButtonPrimary
                                    label="Tiếp"
                                    onClick={handleNextQuestion}
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 shadow-md"
                                />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MultipleChoiceQuestion;
