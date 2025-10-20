/* Where will this be used ?
    Hero card
    Recipe list cards
    Search results
    User profile (featured recipes)
*/

import React from "react";

// Color variants 
const VARIANT_CLASSES = {
  hot: 'bg-orange-100 text-orange-700 border-orange-200',
  new: 'bg-blue-100 text-blue-700 border-blue-200',
  trending: 'bg-purple-100 text-purple-700 border-purple-200',
  featured: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  default: 'bg-gray-100 text-gray-700 border-gray-200'
};

// Size variants 
const SIZE_CLASSES = {
  sm: 'px-2 py-0.5 text-xs gap-1',      // Compact (tags, inline)
  md: 'px-3 py-1 text-sm gap-1.5',      // Default (cards)
  lg: 'px-4 py-1.5 text-base gap-2'     // Prominent (hero)
};

/**
 * RecipeBadge - Display a labeled badge with optional icon and animations
 * 
 * @param {string} text - Badge text (required)
 * @param {ReactNode} icon - Icon element or emoji (optional)
 * @param {string} variant - Color variant (hot|new|trending|featured|default)
 * @param {string} size - Size variant (sm|md|lg)
 * @param {boolean} animated - Enable hover animations (default: true)
 * @param {boolean} pulse - Enable pulse animation for emphasis (default: false)
 * @param {string} className - Additional CSS classes for customization
 */
export default function RecipeBadge({
    text,
    icon,
    variant = 'default',
    size = 'md',
    animated = true,
    pulse = false,
    className = ''
}) {
    if (!text) return null;

    const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.default;
    
    const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

    const animationClasses = animated 
        ? 'transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md hover:-translate-y-0.5'
        : '';

    const pulseClass = pulse ? 'animate-pulse' : '';

    // Combine all classes
    const badgeClasses = `
        inline-flex items-center
        rounded-full
        border 
        font-medium
        select-none
        ${sizeClass}
        ${variantClass}
        ${animationClasses}
        ${pulseClass}
        ${className}
    `.trim();

    return (
        <span className={badgeClasses}>
            {icon && (
            <span className="flex-shrink-0" aria-hidden='true'>
                    {icon}
            </span>
            )}
            <span>{text}</span>
        </span>
    );
}