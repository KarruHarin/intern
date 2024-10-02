import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CharacterRevealTextProps {
    onTextChange: (index: number, text: string) => void;
}

const CharacterRevealText: React.FC<CharacterRevealTextProps> = ({ onTextChange }) => {
    const textRef = useRef<HTMLHeadingElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const texts = [
        "Innovation in every pulse",
        "Elevate Health, Enrich Lives",
        "Cutting-Edge Health Tech.",
        "Comfort Beyond Compare"
    ];

    const animateText = () => {
        if (textRef.current) {
            const currentText = texts[currentIndex];
            const characters = currentText.split('');
            textRef.current.innerHTML = characters
                .map((char) => `<span class="char">${char}</span>`)
                .join('');

            gsap.fromTo(
                textRef.current.querySelectorAll('.char'),
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.05,
                    duration: 0.5,
                    ease: 'power3.out',
                    onComplete: () => {
                        // Notify parent component of the text change
                        onTextChange(currentIndex, currentText);
                        // Change text after animation completes
                        setTimeout(() => {
                            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts?.length);
                        }, 2000); // Adjust delay if needed
                    }
                }
            );
        }
    };

    useEffect(() => {
        animateText();
    }, [currentIndex]);

    return (
        <h1
            ref={textRef}
            className="mt-8 text-5xl sm:text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl sm:text-left text-center"
        >
            {texts[currentIndex]}
        </h1>
    );
};

export default CharacterRevealText;
