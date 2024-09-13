import React, { useState, useEffect, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Select } from 'antd';
import FlashCardService from '@/services/FlashCardService';
import FormFlashCard from '../FormFlashCard/FormFlashCard.';
import FlashCardInterface from '@/types/FlashCard';

interface TextSelectorWrapperProps {
    children: React.ReactNode;
    pauseTimer: () => void; // Function to pause the timer
    resumeTimer: () => void; // Function to resume the timer
}

function TextSelectorWrapper({ children, pauseTimer, resumeTimer }: TextSelectorWrapperProps) {
    const [showButton, setShowButton] = useState(false);
    const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
    const [selectedText, setSelectedText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [flashCards, setFlashCards] = useState<FlashCardInterface[]>([]);
    const [selectedFlashCardId, setSelectedFlashCardId] = useState<string | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    // Fetch flashcards data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await FlashCardService.getAllFlashCards();
                setFlashCards(data);
            } catch (error) {
                console.error('Error fetching flashcards:', error);
            }
        };
        fetchData();
    }, []);

    // Handle mouse selection of text
    const handleMouseUp = () => {
        const selection = window.getSelection();
        const text = selection?.toString();

        if (selection && text && text.length > 0) {
            try {
                const range = selection.getRangeAt(0);
                const rect = range?.getBoundingClientRect();

                if (rect) {
                    setButtonPosition({
                        top: rect.top - rect.height - 5,
                        left: rect.left,
                    });
                    setSelectedText(text);
                    setShowButton(true);
                }
            } catch (error) {
                console.error('Error processing selection range or rect:', error);
                setShowButton(false);
            }
        } else {
            setShowButton(false);
        }
    };

    // Handle button click to open modal and pause the timer
    const handleButtonClick = () => {
        setIsModalVisible(true);
        pauseTimer();  // Pause the timer when modal is opened
    };

    // Handle modal close and resume the timer
    const handleModalClose = () => {
        setIsModalVisible(false);
        resumeTimer();  // Resume the timer when modal is closed
    };

    // Handle flashcard selection
    const handleSelectFlashCard = (flashCardId: string) => {
        setSelectedFlashCardId(flashCardId);
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div>
            {children}
            {showButton && (
                <button
                    ref={buttonRef}
                    onClick={handleButtonClick}
                    style={{
                        position: 'absolute',
                        top: `${buttonPosition.top}px`,
                        left: `${buttonPosition.left}px`,
                        zIndex: 1000,
                    }}
                    className="border-none bg-[#000000B3] rounded-md text-white p-1"
                >
                    <PlusOutlined />
                </button>
            )}

            {/* Modal to add the selected text to a flashcard */}
            <Modal
                title="Thêm từ vựng vào flashcard"
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
                className="!w-3/4"
            >
                <p>Từ <strong>{selectedText}</strong></p>
                <p>Chọn flashcard</p>

                <Select
                    showSearch
                    placeholder="Chọn flashcard"
                    optionFilterProp="label"
                    className="w-full mt-2"
                    onChange={handleSelectFlashCard}
                    options={flashCards.map((card) => ({
                        value: card._id,
                        label: card.nameCard,
                    }))}
                />

                {selectedFlashCardId && (
                    <div style={{ marginTop: '20px' }}>
                        <FormFlashCard id={selectedFlashCardId} selectedText={selectedText} />
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default TextSelectorWrapper;
