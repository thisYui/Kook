/* Where will this be used?
    Hero card (View Recipes CTA)
    Recipe detail page (Save, Share, Cook buttons)
    Forms (Submit, Cancel)
    Modals (Confirm, Close)
    Navigation (Next, Previous)
    Cards (Quick actions)
*/

import React from 'react';
import { Loader2 } from 'lucide-react';

// Variant styles for different button types
const VARIANT_CLASSES = {
  primary: `
    bg-black text-white
    hover:bg-gray-800
    active:bg-gray-900
    disabled:bg-gray-400
  `,
  secondary: `
    bg-gray-200 text-gray-900
    hover:bg-gray-300
    active:bg-gray-400
    disabled:bg-gray-100 disabled:text-gray-400
  `,
  outline: `
    bg-transparent text-gray-900
    border-2 border-gray-900
    hover:bg-gray-900 hover:text-white
    active:bg-black
    disabled:border-gray-300 disabled:text-gray-300
  `,
  ghost: `
    bg-transparent text-gray-900
    hover:bg-gray-100
    active:bg-gray-200
    disabled:text-gray-400
  `,
  danger: `
    bg-red-600 text-white
    hover:bg-red-700
    active:bg-red-800
    disabled:bg-red-300
  `,
  success: `
    bg-green-600 text-white
    hover:bg-green-700
    active:bg-green-800
    disabled:bg-green-300
  `
};

// Size configurations matching other components
const SIZE_CLASSES = {
  sm: {
    padding: 'px-3 py-1.5',
    text: 'text-sm',
    icon: 'w-4 h-4',
    gap: 'gap-1.5'
  },
  md: {
    padding: 'px-4 py-2',
    text: 'text-base',
    icon: 'w-5 h-5',
    gap: 'gap-2'
  },
  lg: {
    padding: 'px-6 py-3',
    text: 'text-lg',
    icon: 'w-6 h-6',
    gap: 'gap-2.5'
  }
};

/**
 * ActionButton - Enhanced button component with icons, loading states, and variants
 * 
 * @param {string} children - Button text/content (required)
 * @param {ReactNode} icon - Icon component (optional)
 * @param {string} iconPosition - Icon position: 'left' | 'right' (default: 'right')
 * @param {string} variant - Style variant: primary|secondary|outline|ghost|danger|success
 * @param {string} size - Size variant: sm|md|lg
 * @param {boolean} loading - Show loading spinner (default: false)
 * @param {boolean} disabled - Disable button (default: false)
 * @param {boolean} fullWidth - Take full width (default: false)
 * @param {string} type - Button type: button|submit|reset (default: 'button')
 * @param {function} onClick - Click handler
 * @param {string} className - Additional CSS classes
 * @param {object} ...rest - Other HTML button attributes
 */
export default function ActionButton({
  children,
  icon: Icon,
  iconPosition = 'right',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  ...rest
}) {
  // Button cannot be clicked while loading or disabled
  const isDisabled = disabled || loading;
  
  // Get variant and size classes
  const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;
  const sizeConfig = SIZE_CLASSES[size] || SIZE_CLASSES.md;
  
  // Handle click with safety checks
  const handleClick = (e) => {
    if (isDisabled || !onClick) return;
    onClick(e);
  };
  
  // Base classes for all buttons
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium
    rounded-full
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
    disabled:cursor-not-allowed
    select-none
  `;
  
  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${variantClass}
    ${sizeConfig.padding}
    ${sizeConfig.text}
    ${sizeConfig.gap}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' '); // Remove extra whitespace
  
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isDisabled}
      className={buttonClasses}
      aria-busy={loading}
      aria-disabled={isDisabled}
      {...rest}
    >
      {/* Loading Spinner (always on left when active) */}
      {loading && (
        <Loader2 
          className={`${sizeConfig.icon} animate-spin`}
          aria-hidden="true"
        />
      )}
      
      {/* Icon on left (if not loading) */}
      {!loading && Icon && iconPosition === 'left' && (
        <Icon 
          className={sizeConfig.icon}
          aria-hidden="true"
        />
      )}
      
      {/* Button Text */}
      <span>{children}</span>
      
      {/* Icon on right (if not loading) */}
      {!loading && Icon && iconPosition === 'right' && (
        <Icon 
          className={sizeConfig.icon}
          aria-hidden="true"
        />
      )}
    </button>
  );
}
