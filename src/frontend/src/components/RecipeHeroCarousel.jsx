import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import RecipeHeroCard from './RecipeHeroCard';

/**
 * RecipeHeroCarousel Component
 * 
 * A full-featured carousel for displaying RecipeHeroCard components.
 * Supports auto-play, manual navigation, keyboard controls, and touch gestures.
 * 
 * @component
 * @example
 * const recipes = [
 *   { post_id: '1', title: 'Recipe 1', ... },
 *   { post_id: '2', title: 'Recipe 2', ... }
 * ];
 * 
 * <RecipeHeroCarousel
 *   recipes={recipes}
 *   autoPlay={true}
 *   interval={5000}
 *   onViewRecipe={(id) => navigate(`/recipe/${id}`)}
 * />
 */

const RecipeHeroCarousel = ({
  recipes = [],
  autoPlay = true,
  interval = 5000,
  showControls = true,
  showIndicators = true,
  onViewRecipe,
  onAuthorClick,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === recipes.length - 1 ? 0 : prevIndex + 1
    );
  }, [recipes.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? recipes.length - 1 : prevIndex - 1
    );
  }, [recipes.length]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play effect
  useEffect(() => {
    if (!isPlaying || recipes.length <= 1) return;

    const timer = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, interval, goToNext, recipes.length]);

  // Touch gestures for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swipe left - go to next
      goToNext();
      setIsPlaying(false);
    } else if (distance < -minSwipeDistance) {
      // Swipe right - go to previous
      goToPrevious();
      setIsPlaying(false);
    }

    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Validate recipes array (after all hooks)
  if (!recipes || recipes.length === 0) {
    return (
      <div className="bg-gray-100 rounded-xl p-12 text-center">
        <p className="text-gray-500">No recipes available</p>
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      {/* Carousel Container */}
      <div 
        className="relative overflow-hidden rounded-2xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label="Recipe carousel"
        aria-live="polite"
      >
        {/* Slides */}
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {recipes.map((recipe, index) => (
            <div 
              key={recipe.post_id || index}
              className="min-w-full"
              aria-hidden={index !== currentIndex}
            >
              <RecipeHeroCard
                recipe={recipe}
                onViewRecipe={onViewRecipe}
                onAuthorClick={onAuthorClick}
              />
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        {showControls && recipes.length > 1 && (
          <>
            {/* Previous Button */}
            <button
              onClick={() => {
                goToPrevious();
                setIsPlaying(false);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Previous recipe"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={() => {
                goToNext();
                setIsPlaying(false);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Next recipe"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Play/Pause Button */}
            {autoPlay && (
              <button
                onClick={togglePlayPause}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </button>
            )}
          </>
        )}
      </div>

      {/* Indicator Dots */}
      {showIndicators && recipes.length > 1 && (
        <div className="flex justify-center gap-2 p-1">
          {recipes.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                goToSlide(index);
                setIsPlaying(false);
              }}
              className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                index === currentIndex
                  ? 'w-8 h-2 bg-orange-500'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to recipe ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}

      {/* Progress Bar (optional - shows during autoplay) */}
      {isPlaying && recipes.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/50">
          <div 
            className="h-full bg-orange-200 transition-all"
            style={{
              animation: `progress ${interval}ms linear infinite`,
            }}
          />
        </div>
      )}

      {/* CSS Animation for Progress Bar */}
      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default RecipeHeroCarousel;
