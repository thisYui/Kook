/* Where will this be used?
    Hero card background (decorative stripes)
    Section backgrounds (visual interest)
    Card decorations (subtle patterns)
*/

import React from 'react';

/**
 * DecorativePattern - SVG-based decorative background patterns
 * 
 * @param {string} type - Pattern type: stripes|dots|waves|circles (default: 'stripes')
 * @param {string} position - Position: top-right|top-left|bottom-right|bottom-left (default: 'top-right')
 * @param {string} color - Pattern color (default: 'gray')
 * @param {number} opacity - Opacity 0-100 (default: 20)
 * @param {string} size - Size: sm|md|lg (default: 'md')
 * @param {string} className - Additional CSS classes
 */
export default function DecorativePattern({
  type = 'stripes',
  position = 'top-right',
  color = 'gray',
  opacity = 20,
  size = 'md',
  className = ''
}) {
  // Position classes
  const positionClasses = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  };

  // Size configurations
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-64 h-64',
    lg: 'w-96 h-96'
  };

  // Container classes
  const containerClasses = `
    absolute
    ${positionClasses[position] || positionClasses['top-right']}
    ${sizeClasses[size] || sizeClasses.md}
    pointer-events-none
    overflow-hidden
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Color mapping
  const colorMap = {
    gray: '#9CA3AF',
    blue: '#60A5FA',
    purple: '#A78BFA',
    pink: '#F472B6',
    orange: '#FB923C',
    green: '#4ADE80'
  };

  const patternColor = colorMap[color] || colorMap.gray;
  const patternOpacity = Math.min(100, Math.max(0, opacity)) / 100;

  // Stripe pattern
  const StripesPattern = () => (
    <svg
      className="w-full h-full"
      viewBox="0 0 200 200"
      preserveAspectRatio="none"
      style={{ opacity: patternOpacity }}
    >
      <defs>
        <pattern
          id="stripes"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="20"
            stroke={patternColor}
            strokeWidth="2"
          />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#stripes)" />
    </svg>
  );

  // Dots pattern
  const DotsPattern = () => (
    <svg
      className="w-full h-full"
      viewBox="0 0 200 200"
      preserveAspectRatio="none"
      style={{ opacity: patternOpacity }}
    >
      <defs>
        <pattern
          id="dots"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="10" cy="10" r="2" fill={patternColor} />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#dots)" />
    </svg>
  );

  // Waves pattern
  const WavesPattern = () => (
    <svg
      className="w-full h-full"
      viewBox="0 0 200 200"
      preserveAspectRatio="none"
      style={{ opacity: patternOpacity }}
    >
      <defs>
        <pattern
          id="waves"
          x="0"
          y="0"
          width="40"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 10 Q10 0, 20 10 T40 10"
            fill="none"
            stroke={patternColor}
            strokeWidth="2"
          />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#waves)" />
    </svg>
  );

  // Circles pattern
  const CirclesPattern = () => (
    <svg
      className="w-full h-full"
      viewBox="0 0 200 200"
      preserveAspectRatio="none"
      style={{ opacity: patternOpacity }}
    >
      <defs>
        <pattern
          id="circles"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="20"
            cy="20"
            r="15"
            fill="none"
            stroke={patternColor}
            strokeWidth="2"
          />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#circles)" />
    </svg>
  );

  // Pattern type mapping
  const patterns = {
    stripes: <StripesPattern />,
    dots: <DotsPattern />,
    waves: <WavesPattern />,
    circles: <CirclesPattern />
  };

  return (
    <div className={containerClasses} aria-hidden="true">
      {patterns[type] || patterns.stripes}
    </div>
  );
}
