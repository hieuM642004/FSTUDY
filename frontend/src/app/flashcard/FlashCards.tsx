'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Card, Button } from 'antd';
import { BlockOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import FlashCardService from '@/services/FlashCardService';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import FlashCardInterface from '@/types/FlashCard';
import './FlashCards.scss';
import ConfirmModal from '@/components/shared/ModalComfirm/ModalComfirm';
import Message from '@/components/shared/Message/Message';
import Link from 'next/link';

const FlashCardList = () => {
    const [flashCards, setFlashCards] = useState<FlashCardInterface[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
    const [messageProps, setMessageProps] = useState<{
        type: 'success' | 'error' | 'warning';
        content: string;
    } | null>(null);
    const messageRef = useRef<{
        type: 'success' | 'error' | 'warning';
        content: string;
    } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await FlashCardService.getAllFlashCards();
                setFlashCards(response);
            } catch (error) {
                console.error('Error fetching flashcards:', error);
            }
        };

        fetchData();
    }, []);

    const showConfirm = (id: string) => {
        setSelectedCardId(id);
        setIsModalVisible(true);
    };

    const handleConfirm = async () => {
        if (selectedCardId) {
            const success = await FlashCardService.deleteFlashCard(
                selectedCardId,
            );
            if (success) {
                setFlashCards((prevCards) =>
                    prevCards.filter((card) => card._id !== selectedCardId),
                );
                messageRef.current = {
                    type: 'success',
                    content: 'Flashcard deleted successfully!',
                };
                setMessageProps({
                    type: 'success',
                    content: 'Flashcard deleted successfully!',
                });
            } else {
                console.error('Failed to delete flashcard');
                messageRef.current = {
                    type: 'error',
                    content: 'Failed to delete flashcard',
                };
                setMessageProps({
                    type: 'error',
                    content: 'Failed to delete flashcard',
                });
            }
        }
        setIsModalVisible(false);
        setSelectedCardId(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedCardId(null);
    };

    useEffect(() => {
        if (messageProps) {
            const timer = setTimeout(() => {
                setMessageProps(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [messageProps]);

    return (
        <>
            <div
                id="heading"
                className="rounded-md w-full shadow-md mb-4 p-4 mt-10"
            >
                <div className="flex items-center">
                    <BlockOutlined style={{ fontSize: '45px' }} />
                    <h2 className="text-4xl font-bold">Flashcard</h2>
                </div>
            </div>

            <ButtonPrimary
                to="/flashcard/add"
                label="Tạo Flashcard"
                className="mb-4"
            />

            <Row
                gutter={[16, 16]}
                className="mb-4 p-4 rounded-md "
                id="container-flashcard"
            >
                {flashCards?.map((flashCard) => (
                    <Col
                        key={flashCard._id}
                        xs={24}
                        sm={12}
                        md={8}
                        lg={6}
                        className="card-col"
                    >
                        <Card
                            title={
                                <div className="flex justify-between">
                                    <h2>{flashCard.nameCard}</h2>
                                    <div className="card-actions">
                                        <Link
                                            href={`/flashcard/edit/${flashCard._id}`}
                                        >
                                            <button className="edit-button">
                                                <EditOutlined />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() =>
                                                showConfirm(flashCard._id || '')
                                            }
                                            className="delete-button hover:text-red-500 ml-2"
                                        >
                                            <DeleteOutlined />
                                        </button>
                                    </div>
                                </div>
                            }
                            bordered={false}
                            className="card"
                        >
                            <Link href={`/flashcard/${flashCard._id}`}>
                                <div className="w-full">
                                    {flashCard.words.map((word, index) => (
                                        <div key={index}></div>
                                    ))}
                                    Có {flashCard.words.length} từ vựng
                                </div>
                            </Link>
                        </Card>
                    </Col>
                ))}
                <ConfirmModal
                    visible={isModalVisible}
                    message="Bạn có chắc chắn muốn xóa flashcard này?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            </Row>
            {messageProps && (
                <Message
                    type={messageProps.type}
                    content={messageProps.content}
                />
            )}
        </>
    );
};

export default FlashCardList;
