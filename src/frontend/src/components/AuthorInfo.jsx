/* Where will this be used?
    Hero card (author credit)
    Recipe list cards (compact author display)
    Recipe detail page (full author info)
    Comments (commenter info)
    Reposts (sharer info)
*/

import React from 'react';

const SIZE_CLASSES = {
  sm: {
    avatar: 'w-8 h-8',
    text: 'text-xs',
    name: 'text-sm',
    gap: 'gap-2'
  },
  md: {
    avatar: 'w-10 h-10',
    text: 'text-sm',
    name: 'text-base',
    gap: 'gap-3'
  },
  lg: {
    avatar: 'w-12 h-12',
    text: 'text-base',
    name: 'text-lg',
    gap: 'gap-4'
  }
};

/**
 * Format date to human-readable string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 * 
 * Examples:
 * "2022-03-15" → "15 March 2022"
 * "2025-10-20" → "20 October 2025"
 */
function formatDate(date) {
  if (!date) return null;
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Format: "15 March 2022"
    return dateObj.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Invalid date format:', error);
    return null;
  }
}

/**
 * Get initials from name for fallback avatar
 * @param {string} name - User's name
 * @returns {string} Initials (max 2 characters)
 * 
 * Examples:
 * "Cong Phuong" → "CP"
 * "John" → "JO"
 * "Mary Jane Smith" → "MJ"
 */
function getInitials(name) {
  if (!name) return '?';
  
  const words = name.trim().split(' ');
  
  if (words.length === 1) {
    // Single name: take first 2 chars
    return name.slice(0, 2).toUpperCase();
  }
  
  // Multiple names: take first letter of first and last name
  const firstInitial = words[0][0];
  const lastInitial = words[words.length - 1][0];
  return (firstInitial + lastInitial).toUpperCase();
}

/**
 * AuthorAvatar - Avatar image with fallback to initials
 */
export function AuthorAvatar({ src, name, size, onClick }) {
  const [imageError, setImageError] = React.useState(false);
  const sizeClass = SIZE_CLASSES[size].avatar;
  
  // If no image or image failed to load, show initials
  if (!src || imageError) {
    const initials = getInitials(name);
    
    return (
      <div
        className={`
          ${sizeClass}
          rounded-full
          bg-gradient-to-br from-blue-400 to-purple-500
          flex items-center justify-center
          text-white font-semibold
          flex-shrink-0
          ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
        `}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      >
        {initials}
      </div>
    );
  }
  
  // Show avatar image
  return (
    <img
      src={src}
      alt={`${name}'s avatar`}
      className={`
        ${sizeClass}
        rounded-full
        object-cover
        flex-shrink-0
        ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
      `}
      onError={() => setImageError(true)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    />
  );
}

/**
 * AuthorInfo - Display author information with avatar, name, and date
 * 
 * @param {string} avatar - Avatar image URL
 * @param {string} name - Author's name (required)
 * @param {string|Date} date - Publication/creation date
 * @param {string} size - Size variant (sm|md|lg)
 * @param {string} layout - Layout mode (horizontal|vertical)
 * @param {boolean} clickable - Enable click interaction (default: false)
 * @param {function} onClick - Click handler for author name/avatar
 * @param {boolean} showDate - Show date (default: true)
 * @param {string} className - Additional CSS classes
 */
export default function AuthorInfo({
  avatar,
  name,
  date,
  size = 'md',
  layout = 'horizontal',
  clickable = false,
  onClick,
  showDate = true,
  className = ''
}) {
  // Name is required
  if (!name) return null;
  
  const sizeConfig = SIZE_CLASSES[size] || SIZE_CLASSES.md;
  const formattedDate = formatDate(date);
  
  const isInteractive = clickable || onClick;
  
  const layoutClasses = {
    horizontal: `flex items-center ${sizeConfig.gap}`,
    vertical: `flex flex-col ${sizeConfig.gap}`
  };
  
  const containerClass = `
    ${layoutClasses[layout] || layoutClasses.horizontal}
    ${className}
  `.trim();
  
  return (
    <div className={containerClass}>
      {/* Avatar */}
      <AuthorAvatar
        src={avatar}
        name={name}
        size={size}
        onClick={isInteractive ? onClick : undefined}
      />
      
      {/* Name and Date */}
      <div className="flex flex-col min-w-0">
        {/* Author Name */}
        <span
          className={`
            ${sizeConfig.name}
            font-semibold
            text-gray-900
            truncate
            ${isInteractive ? 'cursor-pointer hover:text-blue-600 transition-colors' : ''}
          `}
          onClick={isInteractive ? onClick : undefined}
          role={isInteractive ? 'button' : undefined}
          tabIndex={isInteractive ? 0 : undefined}
          onKeyDown={isInteractive ? (e) => e.key === 'Enter' && onClick() : undefined}
        >
          {name}
        </span>
        
        {/* Publication Date */}
        {showDate && formattedDate && (
          <span className={`${sizeConfig.text} text-gray-500`}>
            {formattedDate}
          </span>
        )}
      </div>
    </div>
  );
}
