'use client';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';

function Target() {
    const quotes = [
        { q: 'Success is not final, failure is not fatal: It is the courage to continue that counts.', a: 'Winston Churchill' },
        { q: 'Believe you can and you’re halfway there.', a: 'Theodore Roosevelt' },
        { q: 'Don’t watch the clock; do what it does. Keep going.', a: 'Sam Levenson' },
        { q: 'Act as if what you do makes a difference. It does.', a: 'William James' },
        { q: 'Success usually comes to those who are too busy to be looking for it.', a: 'Henry David Thoreau' },
        { q: 'Don’t be afraid to give up the good to go for the great.', a: 'John D. Rockefeller' },
        { q: 'I find that the harder I work, the more luck I seem to have.', a: 'Thomas Jefferson' },
        { q: 'You miss 100% of the shots you don’t take.', a: 'Wayne Gretzky' },
        { q: 'Opportunities don’t happen. You create them.', a: 'Chris Grosser' },
        { q: 'The only limit to our realization of tomorrow is our doubts of today.', a: 'Franklin D. Roosevelt' },
    ];

    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        setQuote(randomQuote.q);
        setAuthor(randomQuote.a);
    }, []); 

    return (
        <>
            <div className="rounded-lg order-1 md:order-2 md:mb-0">
                <div className="text-center my-auto p-3 bg-orange-200 max-w-64 min-w-64 rounded-md min-h-32">
                    {quote || author ? (
                        <>
                            <blockquote className="border-l-4 border-gray-500 italic pl-4 max-w-md">
                                <p className="text-lg font-medium">{quote}</p>
                                <cite className="block text-right mt-4 text-gray-600">
                                    - {author}
                                </cite>
                            </blockquote>
                        </>
                    ) : (
                        <Spin className="text-center" />
                    )}
                </div>
            </div>
        </>
    );
}

export default Target;
