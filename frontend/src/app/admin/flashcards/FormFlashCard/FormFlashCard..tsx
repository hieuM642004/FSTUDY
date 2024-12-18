'use client';

import { MenuOutlined, DeleteOutlined } from '@ant-design/icons';
import { Row, Col, Button, Image, Input } from 'antd';
import { useEffect, useState } from 'react';
import './FormFlashCard.scss';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import FlashCard from '@/types/FlashCard';
import FlashCardService from '@/services/FlashCardService';
import Message from '@/components/shared/Message/Message';
import { useRouter } from 'next/navigation';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useAuth } from '@/hooks/useAuth';

function FormFlashCard({
    id,
    selectedText,
}: {
    id?: string;
    selectedText?: string;
}) {
    const [loading, setLoading] = useState(false);
    const [nameCard, setNameCard] = useState('');
    const [cards, setCards] = useState<FlashCard[]>([]);
    const [examples, setExamples] = useState<{
        [index: number]: {
            generatedExample?: string;
            translatedExample?: string;
        };
    }>({});
    const [isWordValid, setIsWordValid] = useState<{
        [index: number]: boolean;
    }>({});
    const { isLoggedIn } = useAuth();
    const [messageProps, setMessageProps] = useState<{
        type: 'success' | 'error' | 'warning';
        content: string;
    } | null>(null);
    const router = useRouter();
    const dataUser = useTypedSelector((state) => state.user);
    const {} = dataUser;
    useEffect(() => {
        if (id) {
            const fetchCardData = async () => {
                try {
                    const response = await FlashCardService.getAllFlashCardById(
                        id,
                    );
                    console.log(response);

                    const flashCardData = response;
                    setNameCard(flashCardData.nameCard);
                    setCards([
                        {
                            nameCard: flashCardData.nameCard,
                            words: flashCardData.words,
                            wordCount: flashCardData.wordCount,
                            isPublic: flashCardData.isPublic,
                        },
                    ]);
                } catch (error) {
                    console.error('Error fetching card data:', error);
                }
            };
            fetchCardData();
        } else {
            const storedCards = localStorage.getItem('flashcards');
            const cardsData = storedCards ? JSON.parse(storedCards) : [];
            setCards(cardsData);
        }
    }, [id]);
    useEffect(() => {
        if (selectedText && cards.length > 0) {
            const updatedCards = [...cards];
            const firstCard = updatedCards[0];

            if (!firstCard.words.some((word) => word.word === selectedText)) {
                firstCard.words.push({
                    word: selectedText,
                    definition: '',
                    audioUrl: '',
                    image: '',
                });
                firstCard.wordCount += 1;
                setCards(updatedCards);
            }
        }
    }, [selectedText, cards]);

    useEffect(() => {
        if (!id) {
            localStorage.setItem('flashcards', JSON.stringify(cards));
        }
    }, [cards, id]);

    const saveToLocalStorage = (updatedCards: FlashCard[]) => {
        localStorage.setItem('flashcards', JSON.stringify(updatedCards));
    };

    const addCard = () => {
        const newCard: FlashCard = {
            nameCard: '',
            words: [
                {
                    word: '',
                    definition: '',
                    audioUrl: '',
                    image: '',
                },
            ],
            wordCount: 1,
            isPublic: false,
        };
        const updatedCards = [...cards, newCard];
        setCards(updatedCards);
        if (!id) {
            saveToLocalStorage(updatedCards);
        }
    };

    const removeCard = (index: number) => {
        const updatedCards = cards.filter((_, i) => i !== index);
        setCards(updatedCards);
        if (!id) {
            saveToLocalStorage(updatedCards);
        }
    };
    const removeWord = (cardIndex: number, wordIndex: number) => {
        const updatedCards = cards.map((card, i) =>
            i === cardIndex
                ? {
                      ...card,
                      words: card.words.filter((_, j) => j !== wordIndex),
                  }
                : card,
        );
        setCards(updatedCards);
        if (!id) {
            saveToLocalStorage(updatedCards);
        }
    };
    const fetchAudioUrl = async (word: string) => {
        try {
            const response = await fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
            );
            const data = await response.json();
            if (data && data[0] && data[0].phonetics.length > 0) {
                return data[0].phonetics[0].audio
                    ? `${data[0].phonetics[0].audio}`
                    : '';
            }
        } catch (error) {
            console.error('Error fetching audio URL:', error);
        }
        return '';
    };

    const handleTermChange = async (
        newTerm: string,
        cardIndex: number,
        wordIndex: number,
    ) => {
        const updatedCards = cards.map((card, index) =>
            index === cardIndex
                ? {
                      ...card,
                      words: card.words.map((word, i) =>
                          i === wordIndex ? { ...word, word: newTerm } : word,
                      ),
                  }
                : card,
        );
        setCards(updatedCards);

        try {
            const response = await fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${newTerm}`,
            );
            if (response.ok) {
                const updatedWordValid = {
                    ...isWordValid,
                    [`${cardIndex}-${wordIndex}`]: true,
                };
                setIsWordValid(updatedWordValid);
            } else {
                const updatedWordValid = {
                    ...isWordValid,
                    [`${cardIndex}-${wordIndex}`]: false,
                };
                setIsWordValid(updatedWordValid);
            }
        } catch (error) {
            console.error('Error fetching word validity:', error);
            const updatedWordValid = {
                ...isWordValid,
                [`${cardIndex}-${wordIndex}`]: false,
            };
            setIsWordValid(updatedWordValid);
        }
    };

    const handleDefinitionChange = (
        cardIndex: number,
        wordIndex: number,
        newDefinition: string,
    ) => {
        const updatedCards = cards.map((card, index) =>
            index === cardIndex
                ? {
                      ...card,
                      words: card.words.map((word, i) =>
                          i === wordIndex
                              ? { ...word, definition: newDefinition }
                              : word,
                      ),
                  }
                : card,
        );
        setCards(updatedCards);
        if (!id) {
            saveToLocalStorage(updatedCards);
        }
    };

    const handleCreateImage = async (cardIndex: number, wordIndex: number) => {
        const card = cards[cardIndex];
        if (card) {
            try {
                const response = await fetch(
                    `https://api.pexels.com/v1/search?query=${card.words[wordIndex].word}&per_page=1`,
                    {
                        headers: {
                            Authorization:
                                'cepTv9PwEPIsUuvLH1TgKnMcBGIRtmCN8kvfoQ4b6p7DPA1q9vE1xmVV',
                        },
                    },
                );
                const data = await response.json();
                const imageUrl = data.photos?.[0]?.src.medium || '';
                updateCardImage(cardIndex, wordIndex, imageUrl);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        }
    };

    const updateCardImage = (
        cardIndex: number,
        wordIndex: number,
        newImageUrl: string,
    ) => {
        const updatedCards = cards.map((card, i) =>
            i === cardIndex
                ? {
                      ...card,
                      words: card.words.map((word, j) =>
                          j === wordIndex
                              ? { ...word, image: newImageUrl }
                              : word,
                      ),
                  }
                : card,
        );
        setCards(updatedCards);
        if (!id) {
            saveToLocalStorage(updatedCards);
        }
    };

    const handleCreateExample = async (
        cardIndex: number,
        wordIndex: number,
    ) => {
        try {
            setLoading(true);
            const card = cards[cardIndex];
            if (card) {
                const response: any =
                    await FlashCardService.getExampleFlashCards(
                        card.words[wordIndex].word,
                    );
                const generatedExample = response.generated_response || '';
                const translatedExample = response.translated_response || '';
                updateCardDefinition(cardIndex, wordIndex, {
                    generatedExample,
                    translatedExample,
                });
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching example:', error);
            setLoading(false);
        }
    };

    const updateCardDefinition = (
        cardIndex: number,
        wordIndex: number,
        examples: { generatedExample: string; translatedExample: string },
    ) => {
        setExamples((prevExamples) => ({
            ...prevExamples,
            [cardIndex]: examples,
        }));
        const updatedCards = cards.map((card, i) =>
            i === cardIndex
                ? {
                      ...card,
                      words: card.words.map((word, j) =>
                          j === wordIndex
                              ? {
                                    ...word,
                                    definition: examples.generatedExample,
                                }
                              : word,
                      ),
                  }
                : card,
        );
        setCards(updatedCards);
        if (!id) {
            saveToLocalStorage(updatedCards);
        }
    };

    const removeExamples = (cardIndex: number, wordIndex: number) => {
        setExamples((prevExamples) => ({
            ...prevExamples,
            [cardIndex]: {
                generatedExample: undefined,
                translatedExample: undefined,
            },
        }));
        const updatedCards = cards.map((card, i) =>
            i === cardIndex
                ? {
                      ...card,
                      words: card.words.map((word, j) =>
                          j === wordIndex ? { ...word, definition: '' } : word,
                      ),
                  }
                : card,
        );
        setCards(updatedCards);
        if (!id) {
            saveToLocalStorage(updatedCards);
        }
    };

    const handleSubmit = async () => {
        if (!nameCard.trim()) {
            alert('Tên flashcard không được trống');
            return;
        }

        const flashCardData = {
            nameCard: nameCard.trim(),
            words: [],
            wordCount: 0,
            isPublic: false,
            userId: dataUser?.id,
        };

        if (!cards || cards.length === 0) {
            alert('Không có flashcard nào được thêm vào');
            return;
        }

        for (const card of cards) {
            if (!card.words || card.words.length === 0) {
                alert('Từ của mỗi thẻ không được trống');
                continue; // Skip to the next card if no words are available
            }

            for (const word of card.words) {
                // Check if word has a valid word value
                if (!word.word.trim()) {
                    alert('Word cannot be empty');
                    continue; // Skip empty words
                }

                // If audioUrl is not available, try to fetch it
                if (!word.audioUrl) {
                    try {
                        word.audioUrl = await fetchAudioUrl(word.word.trim());
                    } catch (error) {
                        alert(
                            `Failed to fetch audio URL for word ${word.word}:`,
                        );
                    }
                }

                flashCardData.words.push(word);
            }
        }

        if (flashCardData.words.length === 0) {
            console.error('No valid words to submit');
            return;
        }

        // Set the word count
        flashCardData.wordCount = flashCardData.words.length;

        try {
            if (id) {
                const response = await FlashCardService.updateFlashCard(
                    id,
                    flashCardData,
                );
                setMessageProps({
                    type: 'success',
                    content: 'Flashcard updated successfully!',
                });
                router.push('/admin/flashcards');
                console.log('Update success:', response);
            } else {
                const response = await FlashCardService.addFlashCard(
                    flashCardData,
                );
                setMessageProps({
                    type: 'success',
                    content: 'Flashcard add successfully!',
                });
                router.push('/admin/flashcards');
                console.log('Add success:', response);
            }
        } catch (error) {
            console.log('Error:', error);
        }

        console.log('Submitted Data:', flashCardData);
    };

    return (
        <section className="p-6">
            <Input
                placeholder="Tên flashcard"
                variant="borderless"
                className="mb-4 shadow-md w-40 p-2"
                value={nameCard}
                onChange={(e) => setNameCard(e.target.value)}
            />

            <div className="my-4 mx-auto">
                {cards?.map((card, cardIndex) => (
                    <>
                        {card?.words.map((word, wordIndex) => (
                            <>
                                <div
                                    key={wordIndex}
                                    className="w-full bg-white text-black rounded-lg shadow-lg p-4 mb-4"
                                >
                                    <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-4">
                                        <div className="text-lg font-bold">
                                            {id ? wordIndex + 1 : cardIndex + 1}
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="text-gray-400 hover:text-white">
                                                <MenuOutlined />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    removeWord(
                                                        cardIndex,
                                                        wordIndex,
                                                    )
                                                }
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <DeleteOutlined />
                                            </button>
                                        </div>
                                    </div>
                                    <Row justify="space-between" align="middle">
                                        <Col
                                            xs={24}
                                            sm={23}
                                            md={22}
                                            lg={22}
                                            xl={18}
                                            xxl={16}
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center">
                                                <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
                                                    <p className="text-gray-400">
                                                        THUẬT NGỮ
                                                    </p>
                                                    <input
                                                        className="w-full text-xl font-semibold text-black border-none focus:outline-none custom-outline"
                                                        value={word?.word}
                                                        onChange={(e) =>
                                                            handleTermChange(
                                                                e.target.value,
                                                                cardIndex,
                                                                wordIndex,
                                                            )
                                                        }
                                                        placeholder="Thuật ngữ"
                                                    />
                                                </div>
                                                <div className="w-full sm:w-3/5 sm:ml-4">
                                                    <p className="text-gray-400">
                                                        ĐỊNH NGHĨA
                                                    </p>
                                                    <textarea
                                                        className="w-full text-lg text-black border-none focus:outline-none custom-outline"
                                                        value={word?.definition}
                                                        onChange={(e) =>
                                                            handleDefinitionChange(
                                                                cardIndex,
                                                                wordIndex,
                                                                e.target.value,
                                                            )
                                                        }
                                                        rows={1}
                                                        placeholder="Bạn có thể thay đổi định nghĩa"
                                                    />
                                                    <button
                                                        onClick={() =>
                                                            handleCreateExample(
                                                                cardIndex,
                                                                wordIndex,
                                                            )
                                                        }
                                                        disabled={
                                                            !isWordValid[
                                                                `${cardIndex}-${wordIndex}`
                                                            ]
                                                        }
                                                        className={`text-gray-400 hover:text-blue-500 ${
                                                            !isWordValid[
                                                                `${cardIndex}-${wordIndex}`
                                                            ]
                                                                ? 'opacity-50 cursor-not-allowed'
                                                                : ''
                                                        }`}
                                                    >
                                                        Tạo ví dụ
                                                    </button>

                                                    {loading && (
                                                        <p>Đang tạo...</p>
                                                    )}

                                                    <>
                                                        {word.definition && (
                                                            <button
                                                                onClick={() =>
                                                                    removeExamples(
                                                                        cardIndex,
                                                                        wordIndex,
                                                                    )
                                                                }
                                                                className="text-gray-400 hover:text-red-500 ml-2"
                                                            >
                                                                Xóa ví dụ
                                                            </button>
                                                        )}

                                                        <div className="mt-2">
                                                            <p className="text-gray-400">
                                                                Ví dụ
                                                                (Generated)
                                                            </p>
                                                            <p></p>
                                                        </div>
                                                    </>

                                                    <div className="mt-2">
                                                        <p className="text-gray-400">
                                                            Ví dụ (Translated)
                                                        </p>
                                                        <p></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col
                                            xs={24}
                                            sm={1}
                                            md={2}
                                            lg={2}
                                            xl={6}
                                            xxl={8}
                                        >
                                            <div className="relative w-2/4 h-24 sm:w-2/4 border-2 border-dashed border-gray-400 flex items-center justify-center">
                                                <div className="relative w-full h-full">
                                                    {word?.image && (
                                                        <Image
                                                            className="!object-cover w-20 !h-30"
                                                            src={word.image}
                                                            alt="Image"
                                                        />
                                                    )}

                                                    {!word?.image && (
                                                        <button
                                                            onClick={() =>
                                                                handleCreateImage(
                                                                    cardIndex,
                                                                    wordIndex,
                                                                )
                                                            }
                                                            disabled={
                                                                !isWordValid[
                                                                    `${cardIndex}-${wordIndex}`
                                                                ]
                                                            } // Disable nếu từ không hợp lệ
                                                            className={`absolute inset-0 flex items-center justify-center bg-gray-200 rounded ${
                                                                !isWordValid[
                                                                    `${cardIndex}-${wordIndex}`
                                                                ]
                                                                    ? 'opacity-50 cursor-not-allowed'
                                                                    : ''
                                                            }`}
                                                        >
                                                            Tạo ảnh
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </>
                        ))}
                    </>
                ))}
                <div className="text-center">
                    <Button onClick={addCard}>Thêm thẻ</Button>
                </div>
            </div>
            <div className="flex justify-end">
                <ButtonPrimary
                    disabled={cards.length === 0}
                    label={id ? 'Cập nhật Flashcard' : 'Tạo Flashcard'}
                    size="large"
                    onClick={handleSubmit}
                />
            </div>
            {messageProps && (
                <Message
                    type={messageProps.type}
                    content={messageProps.content}
                />
            )}
        </section>
    );
}

export default FormFlashCard;
