/* Where will this be used?
    Hero card (main recipe image with decorative background)
    Recipe detail page (hero image)
    Recipe cards (thumbnail with styling)
    Gallery views (image grid)
*/

import React from 'react';

// Size configurations
const SIZE_CLASSES = {
  sm: 'w-32 h-32',       // Small thumbnails
  md: 'w-64 h-64',       // Medium cards
  lg: 'w-96 h-96',       // Large hero images
  hero: 'w-full h-[400px]' // Full-width hero
};

// Shape variants
const SHAPE_CLASSES = {
  circle: 'rounded-full',
  rounded: 'rounded-2xl',
  square: 'rounded-none'
};

/**
 * RecipeImage - Styled image component with loading states and decorative effects
 * 
 * @param {string} src - Image source URL (required)
 * @param {string} alt - Alt text for accessibility (required)
 * @param {string} size - Size variant: sm|md|lg|hero (default: 'md')
 * @param {string} shape - Shape variant: circle|rounded|square (default: 'circle')
 * @param {boolean} showShadow - Show drop shadow (default: true)
 * @param {boolean} showBorder - Show border (default: false)
 * @param {string} objectFit - CSS object-fit: cover|contain|fill (default: 'cover')
 * @param {function} onClick - Click handler (optional)
 * @param {boolean} lazy - Enable lazy loading (default: true)
 * @param {string} className - Additional CSS classes
 */
export default function RecipeImage({
  src,
  alt,
  size = 'md',
  shape = 'circle',
  showShadow = true,
  showBorder = false,
  objectFit = 'cover',
  onClick,
  lazy = true,
  className = ''
}) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  // Handle image load
  const handleLoad = () => {
    setIsLoading(false);
  };

  // Handle image error
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Get size and shape classes
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;
  const shapeClass = SHAPE_CLASSES[shape] || SHAPE_CLASSES.circle;

  // Object fit class
  const objectFitClass = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill'
  }[objectFit] || 'object-cover';

  // Combine classes
  const imageClasses = `
    ${sizeClass}
    ${shapeClass}
    ${objectFitClass}
    ${showShadow ? 'shadow-2xl' : ''}
    ${showBorder ? 'border-4 border-white' : ''}
    ${onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Loading skeleton classes
  const skeletonClasses = `
    ${sizeClass}
    ${shapeClass}
    bg-gray-200
    animate-pulse
    flex items-center justify-center
  `.trim().replace(/\s+/g, ' ');

  // Error state classes
  const errorClasses = `
    ${sizeClass}
    ${shapeClass}
    bg-gray-100
    border-2 border-gray-300 border-dashed
    flex items-center justify-center
    text-gray-400
  `.trim().replace(/\s+/g, ' ');

  // Show error state
  if (hasError) {
    return (
      <div className={errorClasses}>
        <div className="text-center p-4">
          <svg
            className="w-12 h-12 text-gray-300 mx-auto mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-xs">Failed to load image</p>
        </div>
      </div>
    );
  }

  // Show image with loading overlay
  return (
    <div className="relative inline-block">
      {/* Loading skeleton overlay */}
      {isLoading && (
        <div className={`${skeletonClasses} absolute inset-0 z-10`}>
          <svg
            className="w-12 h-12 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
      
      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        loading={lazy ? 'lazy' : 'eager'}
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
        className={imageClasses}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      />
    </div>
  );
}
