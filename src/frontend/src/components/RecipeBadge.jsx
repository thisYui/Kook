import React from "react";
import { Flame, Sparkles, TrendingUp, Star } from 'lucide-react';

// Variant configuration with text, icon, and background color
const VARIANT_CONFIG = {
  hot: {
    text: 'Hot Recipes',
    icon: Flame,
    bgColor: 'bg-orange-100'
  },
  new: {
    text: 'New Recipes',
    icon: Sparkles,
    bgColor: 'bg-blue-100'
  },
  trending: {
    text: 'Trending',
    icon: TrendingUp,
    bgColor: 'bg-purple-100'
  },
  featured: {
    text: 'Featured',
    icon: Star,
    bgColor: 'bg-yellow-100'
  }
};

// Size variants 
const SIZE_CLASSES = {
  sm: 'px-2.5 py-1 text-xs gap-1.5',
  md: 'px-3 py-1.5 text-sm gap-2',
  lg: 'px-4 py-2 text-base gap-2'
};

/**
 * RecipeBadge - Display a labeled badge with icon
 * 
 * @param {string} variant - Badge variant (hot|new|trending|featured)
 * @param {string} size - Size variant (sm|md|lg)
 * @param {string} className - Additional CSS classes for customization
 */
export default function RecipeBadge({
    variant = 'hot',
    size = 'md',
    className = ''
}) {
    const config = VARIANT_CONFIG[variant] || VARIANT_CONFIG.hot;
    const Icon = config.icon;
    const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

    const badgeClasses = `
        inline-flex items-center
        rounded-full
        font-medium
        ${config.bgColor}
        ${sizeClass}
        ${className}
    `.trim();

    return (
        <span className={badgeClasses}>
            <Icon className="w-4 h-4" />
            <span>{config.text}</span>
        </span>
    );
}