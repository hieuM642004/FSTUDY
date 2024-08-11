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
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [incorrectAnswersCount, setIncorrectAnswersCount] = useState<number>(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

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

  const handleOptionClick = (index: number) => {
    if (!isSubmitted) {
      setSelectedOptionId(index);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (selectedOptionId === currentQuestionIndex) {
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
  const options = flashCard.words.map((word, index) => ({
    id: index,
    text: word.word,
  }));

  const totalQuestions = flashCard.words.length;
  const percentageCorrect = totalQuestions > 0 ? (correctAnswersCount / totalQuestions) * 100 : 0;

  return (
    <div className="mx-auto my-12 shadow-md rounded-md w-2/3 h-2/3 p-4">
      {isQuizFinished ? (
        <div className="quiz-results">
          <h2 className="text-xl font-bold text-center">Quiz Results</h2>
          <p className='text-center mt-2'>Tổng đáp án đúng: <span className='text-green-500 font-bold'>{correctAnswersCount}</span></p>
          <p className='text-center'>Tổng đáp án sai:<span className='text-red-500 font-bold'> {incorrectAnswersCount}</span></p>
          <p className='text-center'>Tỷ lệ đúng: <span className='text-blue-500 font-bold'>{percentageCorrect.toFixed(2)}%</span></p>
          <span className='flex justify-center mt-3'>
            <ButtonPrimary
              label="Trở về Flashcard"
              to='/flashcard'
              className=''
            />
          </span>
        </div>
      ) : (
        <>
          <h3 className="text-slate-500">Định nghĩa</h3>
          <div className="definition">{currentWord.definition}</div>
          <div className="options">
            {options.map((option) => {
              let optionClass = 'option';
              if (isSubmitted) {
                if (selectedOptionId === option.id) {
                  optionClass += selectedOptionId === currentQuestionIndex ? ' correct' : ' incorrect';
                }
              } else if (selectedOptionId === option.id) {
                optionClass += ' selected';
              }
              return (
                <div
                  key={option.id}
                  className={optionClass}
                  onClick={() => handleOptionClick(option.id)}
                >
                  {option.text}
                </div>
              );
            })}
          </div>
          <div className="flex justify-center">
            <ButtonPrimary
              label="Submit"
              onClick={handleSubmit}
              className="submit-button mr-2"
              disabled={selectedOptionId === null}
            />
            {isSubmitted && (
              <ButtonPrimary
                label="Next"
                onClick={handleNextQuestion}
                className="next-button"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MultipleChoiceQuestion;
