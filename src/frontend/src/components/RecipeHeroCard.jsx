/* Where will this be used?
    Homepage hero section (featured recipe carousel)
    Recipe showcase pages
    Marketing/landing pages
    Featured content sections
*/

import React from 'react';
import RecipeBadge from './RecipeBadge';
import RecipeMetadata from './RecipeMetadata';
import AuthorInfo from './AuthorInfo';
import ActionButton from './ActionButton';
import RecipeImage from './RecipeImage';
import DecorativePattern from './DecorativePattern';
import { ArrowRight } from 'lucide-react';

/**
 * RecipeHeroCard - Complete hero card component combining all recipe components
 * 
 * @param {object} recipe - Recipe data object
 *   @param {string} recipe.post_id - Recipe ID for navigation
 *   @param {string} recipe.title - Recipe title
 *   @param {string} recipe.short_description - Recipe description
 *   @param {string} recipe.image_url - Recipe image URL
 *   @param {number} recipe.total_time - Cooking time in minutes
 *   @param {string} recipe.difficulty - Difficulty level
 *   @param {string} recipe.category - Recipe category/cuisine
 *   @param {object} recipe.author - Author information
 *     @param {string} recipe.author.user_id - Author ID
 *     @param {string} recipe.author.name - Author name
 *     @param {string} recipe.author.avatar_url - Author avatar
 *   @param {string} recipe.created_at - Publication date
 *   @param {object} recipe.badge - Optional badge config
 *     @param {string} recipe.badge.text - Badge text
 *     @param {string} recipe.badge.variant - Badge variant
 *     @param {string} recipe.badge.icon - Badge icon
 * 
 * @param {function} onViewRecipe - Handler for "View Recipe" button
 * @param {function} onAuthorClick - Handler for author click
 * @param {boolean} showPattern - Show decorative pattern (default: true)
 * @param {string} patternType - Pattern type (default: 'stripes')
 * @param {string} patternColor - Pattern color (default: 'purple')
 * @param {string} className - Additional CSS classes
 */
export default function RecipeHeroCard({
  recipe,
  onViewRecipe,
  onAuthorClick,
  showPattern = true,
  patternType = 'stripes',
  patternColor = 'purple',
  className = ''
}) {
  // Validate recipe data
  if (!recipe) return null;

  const {
    post_id,
    title,
    short_description,
    image_url,
    total_time,
    difficulty,
    category,
    author,
    created_at,
    badge
  } = recipe;

  // Handle view recipe click
  const handleViewRecipe = () => {
    if (onViewRecipe) {
      onViewRecipe(post_id);
    }
  };

  // Handle author click
  const handleAuthorClick = () => {
    if (onAuthorClick && author?.user_id) {
      onAuthorClick(author.user_id);
    }
  };

  return (
    <div 
      className={`
        relative
        bg-gradient-to-br from-blue-50 to-purple-50
        rounded-3xl
        overflow-hidden
        shadow-xl
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {/* Decorative Patterns */}
      {showPattern && (
        <>
          <DecorativePattern 
            type={patternType}
            position="top-right"
            color={patternColor}
            opacity={15}
            size="lg"
          />
          <DecorativePattern 
            type="dots"
            position="bottom-left"
            color="blue"
            opacity={10}
            size="md"
          />
        </>
      )}

      {/* Content Container */}
      <div className="relative z-10 p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-4 md:space-y-6">
            {/* Badge */}
            {badge && (
              <RecipeBadge
                text={badge.text}
                icon={badge.icon}
                variant={badge.variant}
                size="md"
                animated={true}
              />
            )}

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {title}
            </h2>

            {/* Description */}
            {short_description && (
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                {short_description}
              </p>
            )}

            {/* Metadata */}
            <RecipeMetadata
              time={total_time}
              difficulty={difficulty}
              category={category}
              size="md"
              layout="horizontal"
            />

            {/* Bottom Section - Author & CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              {/* Author Info */}
              {author && (
                <AuthorInfo
                  avatar={author.avatar_url}
                  name={author.name}
                  date={created_at}
                  size="md"
                  clickable={!!onAuthorClick}
                  onClick={handleAuthorClick}
                />
              )}

              {/* View Recipe Button */}
              <ActionButton
                icon={ArrowRight}
                variant="primary"
                size="md"
                onClick={handleViewRecipe}
              >
                View Recipe
              </ActionButton>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center md:justify-end">
            <RecipeImage
              src={image_url}
              alt={title}
              size="hero"
              shape="circle"
              showBorder={true}
              showShadow={true}
              onClick={handleViewRecipe}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
