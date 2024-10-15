import React, { useState, useEffect, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Select } from 'antd';
import FlashCardService from '@/services/FlashCardService';
import FormFlashCard from '../FormFlashCard/FormFlashCard.';
import FlashCardInterface from '@/types/FlashCard';

function TextSelectorWrapper({ children }:{children:React.ReactNode}) {
    const [showButton, setShowButton] = useState(false);
    const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
    const [selectedText, setSelectedText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [flashCards, setFlashCards] = useState<FlashCardInterface[]>([]);
    const [selectedFlashCardId, setSelectedFlashCardId] = useState<string | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

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

    const handleDoubleClick = (text: string) => {
        if (text && text.length > 0) {
            setSelectedText(text);
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    useEffect(() => {
        document.addEventListener('dblclick', handleMouseUp);
        return () => {
            document.removeEventListener('dblclick', handleMouseUp);
        };
    }, []);

    const handleMouseUp = () => {
        const selection = window.getSelection();
        const text = selection?.toString();

        if (selection && text && text.length > 0) {
            try {
                const range = selection.getRangeAt(0);
                const rect = range?.getBoundingClientRect();

                if (rect) {
                    setButtonPosition({
                        top: rect.bottom + window.scrollY + 10, 
                        left: rect.left + window.scrollX, 
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

    const handleButtonClick = () => {
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

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
