import React, { useState, useEffect, useRef, Children } from 'react'; // Bổ sung 'Children'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

/* HOW TO USE: (Đã cập nhật)
<Carousel 
    autoplayInterval={4500} 
    className="mb-8 w-1/2 h-60" 
>
    /* Bất kỳ phần tử nào bạn muốn đều nằm ở đây */
//     <div className="w-full h-full bg-blue-500 flex items-center justify-center">Slide 1</div>
//     <div className="w-full h-full bg-green-500 flex items-center justify-center">Slide 2</div>
//     <form className="w-full h-full bg-red-500 p-4">Slide 3</form>

// </Carousel>



// --- THAY ĐỔI 1: Bỏ prop `images`, thay bằng `children` ---
export default function Carousel({ children, autoplayInterval = 5000, className = "" }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // --- THAY ĐỔI 2: Chuyển `children` thành một mảng mà chúng ta có thể làm việc ---
    const slides = Children.toArray(children);

    // Keep track of the previous index to detect wrapping
    const prevIndexRef = useRef(0);
    useEffect(() => {
        prevIndexRef.current = currentIndex;
    }, [currentIndex]);

    const previousIndex = prevIndexRef.current;
    
    // --- THAY ĐỔI 3: Dùng `slides.length` thay vì `images.length` ---
    const isWrappingNext = previousIndex === slides.length - 1 && currentIndex === 0;
    const isWrappingPrev = previousIndex === 0 && currentIndex === slides.length - 1;


    // Autoplay functionality
    useEffect(() => {
        // --- THAY ĐỔI 4: Dùng `slides.length` ---
        if (isHovered || slides.length <= 1) return;
        
        const timer = setInterval(() => {
            // Always go next when autoplaying
            setCurrentIndex((current) => (current + 1) % slides.length);
        }, autoplayInterval);

        return () => clearInterval(timer);
    // --- THAY ĐỔI 5: Dùng `slides.length` ---
    }, [slides.length, autoplayInterval, isHovered]);

    // Handle navigation
    const goToSlide = (index) => {
        if (index === currentIndex) return; // Stay on the same slide if clicked
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        // --- THAY ĐỔI 6: Dùng `slides.length` ---
        setCurrentIndex((current) => (current - 1 + slides.length) % slides.length);
    };

    const goToNext = () => {
        // --- THAY ĐỔI 7: Dùng `slides.length` ---
        setCurrentIndex((current) => (current + 1) % slides.length);
    };

    // If no slides provided
    // --- THAY ĐỔI 8: Dùng `slides.length` ---
    if (!slides.length) {
        return null;
    }

    return (
        <div 
            className={`relative group ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image container */}
            <div className="relative h-full overflow-hidden rounded-xl">
                {/* --- THAY ĐỔI 9: Map qua `slides` thay vì `images` --- */}
                {slides.map((slide, index) => { // 'slide' thay vì 'image'

                    // Default transition
                    let transitionClass = 'transition-transform duration-500 ease-out';

                    const isIdleSlideDuringWrap = 
                        (isWrappingNext || isWrappingPrev) && 
                        index !== currentIndex && 
                        index !== previousIndex;
                    
                    if (isIdleSlideDuringWrap) {
                        transitionClass = 'transition-none';
                    }

                    const transformClass = 
                        index === currentIndex ? 'translate-x-0' : 
                        index < currentIndex ? '-translate-x-full' : 'translate-x-full';
                    
                    return (
                        <div
                            key={index}
                            className={`absolute w-full h-full ${transitionClass} ${transformClass}`}
                        >
                            {/* --- THAY ĐỔI 10: Render trực tiếp `slide` --- */}
                            {slide}
                        </div>
                    );
                })}
            </div>

            {/* Navigation Arrows */}
            {/* --- THAY ĐỔI 11: Dùng `slides.length` --- */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </>
            )}

            {/* Navigation Dots */}
            {/* --- THAY ĐỔI 12: Dùng `slides.length` --- */}
            {slides.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {/* --- THAY ĐỔI 13: Map qua `slides` --- */}
                    {slides.map((_, index) => (
                        <Button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentIndex 
                                ? 'bg-white w-4' 
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}