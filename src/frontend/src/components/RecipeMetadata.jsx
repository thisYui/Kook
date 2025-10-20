/* Where will this be used?
    Hero card (prominent metadata display)
    Recipe list cards (compact info)
    Recipe detail page (full metadata)
    Search results (quick scan info)
*/

import React from 'react';
import { Clock, ChefHat, Users, Utensils } from 'lucide-react';

// Size configurations matching RecipeBadge
const SIZE_CLASSES = {
  sm: {
    text: 'text-xs',
    icon: 'w-3 h-3',
    gap: 'gap-1'
  },
  md: {
    text: 'text-sm',
    icon: 'w-4 h-4',
    gap: 'gap-1.5'
  },
  lg: {
    text: 'text-base',
    icon: 'w-5 h-5',
    gap: 'gap-2'
  }
};

// Difficulty color coding (visual hierarchy)
const DIFFICULTY_COLORS = {
  Easy: 'text-green-600',
  Medium: 'text-yellow-600',
  Hard: 'text-red-600'
};

/**
 * Format minutes into human-readable time
 * @param {number} minutes - Total time in minutes
 * @returns {string} Formatted time string
 * 
 * Examples:
 * 30 → "30 mins"
 * 60 → "1 hour"
 * 90 → "1h 30m"
 * 125 → "2h 5m"
 */
function formatTime(minutes) {
  if (!minutes || minutes <= 0) return null;
  
  // Under an hour: show minutes only
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'min' : 'mins'}`;
  }
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  // Exact hours: "1 hour", "2 hours"
  if (mins === 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  }
  
  // Mixed: "1h 30m" (compact for space)
  return `${hours}h ${mins}m`;
}

/**
 * MetadataItem - Individual metadata display component
 * Renders icon + text pair with proper spacing and styling
 */
function MetadataItem({ icon: Icon, text, color, size }) {
  if (!text) return null;
  
  const sizeConfig = SIZE_CLASSES[size];
  
  return (
    <div className={`flex items-center ${sizeConfig.gap}`}>
      {Icon && (
        <Icon 
          className={`${sizeConfig.icon} flex-shrink-0 ${color || 'text-gray-600'}`}
          aria-hidden="true"
        />
      )}
      <span className={`${sizeConfig.text} ${color || 'text-gray-700'} font-medium`}>
        {text}
      </span>
    </div>
  );
}

/**
 * RecipeMetadata - Display recipe metadata with icons
 * 
 * @param {number} time - Total cooking time in minutes
 * @param {string} difficulty - Difficulty level (Easy|Medium|Hard)
 * @param {number} servings - Number of servings
 * @param {string} category - Recipe category/primary ingredient
 * @param {boolean} showIcons - Show icons (default: true)
 * @param {string} size - Size variant (sm|md|lg)
 * @param {string} layout - Layout mode (horizontal|vertical|grid)
 * @param {string} className - Additional CSS classes
 */
export default function RecipeMetadata({
  time,
  difficulty,
  servings,
  category,
  showIcons = true,
  size = 'md',
  layout = 'horizontal',
  className = ''
}) {
  if (!time && !difficulty && !servings && !category) {
    return null;
  }

  const formattedTime = formatTime(time);
  
  const difficultyColor = DIFFICULTY_COLORS[difficulty] || 'text-gray-600';

  // Layout-specific 
  const layoutClasses = {
    horizontal: 'flex flex-wrap items-center gap-4',
    vertical: 'flex flex-col gap-2',
    grid: 'grid grid-cols-2 gap-3'
  };

  const containerClass = `
    ${layoutClasses[layout] || layoutClasses.horizontal}
    ${className}
  `.trim();

  return (
    <div className={containerClass}>
      {/* Time */}
      {formattedTime && (
        <MetadataItem
          icon={showIcons ? Clock : null}
          text={formattedTime}
          size={size}
        />
      )}

      {/* Category/Ingredient */}
      {category && (
        <MetadataItem
          icon={showIcons ? Utensils : null}
          text={category}
          size={size}
        />
      )}

      {/* Servings */}
      {servings && (
        <MetadataItem
          icon={showIcons ? Users : null}
          text={`${servings} ${servings === 1 ? 'serving' : 'servings'}`}
          size={size}
        />
      )}

      {/* Difficulty */}
      {difficulty && (
        <MetadataItem
          icon={showIcons ? ChefHat : null}
          text={difficulty}
          color={difficultyColor}
          size={size}
        />
      )}
    </div>
  );
}
