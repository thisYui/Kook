import React from 'react';
import RecipeBadge from '../components/RecipeBadge';
import RecipeMetadata from '../components/RecipeMetadata';
import AuthorInfo from '../components/AuthorInfo';
import ActionButton from '../components/ActionButton';
import RecipeImage from '../components/RecipeImage';
import DecorativePattern from '../components/DecorativePattern';
import RecipeHeroCard from '../components/RecipeHeroCard';
import RecipeHeroCarousel from '../components/RecipeHeroCarousel';

import Button from '../components/Button';

// Icons for ActionButton demo
import { 
  ArrowRight, 
  Heart, 
  Share2, 
  BookmarkPlus, 
  ChefHat,
  Download,
  Edit,
  Trash2,
  Check,
  X
} from 'lucide-react';

const ShowCasePage = () => {

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="w-full">{/* Hero Carousel Section */}
          <div className="w-full bg-gradient-to-b from-gray-50 to-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <RecipeHeroCarousel
                recipes={[
                  {
                    post_id: "recipe-1",
                    title: "Canh ga Cong Phuong",
                    short_description: "Canh ga 100% nguyen chat duoc chien boi chinh cau thu noi tieng Cong Phuong. Thom ngon moi ban an",
                    image_url: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800",
                    total_time: 30,
                    difficulty: "Medium",
                    category: "Chicken",
                    author: {
                      user_id: "user-1",
                      name: "Cong Phuong",
                      avatar_url: "https://i.pravatar.cc/150?img=12"
                    },
                    created_at: "2022-03-15",
                    badge: {
                      text: "Hot Recipes",
                      icon: "🔥",
                      variant: "hot"
                    }
                  },
                  {
                    post_id: "recipe-2",
                    title: "Vietnamese Pho",
                    short_description: "Traditional Vietnamese beef noodle soup with aromatic herbs and spices. A comfort food classic that warms your soul.",
                    image_url: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800",
                    total_time: 120,
                    difficulty: "Hard",
                    category: "Vietnamese",
                    author: {
                      user_id: "user-2",
                      name: "Chef Nguyen",
                      avatar_url: "https://i.pravatar.cc/150?img=15"
                    },
                    created_at: "2025-10-20",
                    badge: {
                      text: "Trending",
                      icon: "📈",
                      variant: "trending"
                    }
                  },
                  {
                    post_id: "recipe-3",
                    title: "Grilled Salmon with Herbs",
                    short_description: "Fresh Atlantic salmon grilled to perfection with a medley of aromatic herbs and lemon butter sauce.",
                    image_url: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800",
                    total_time: 25,
                    difficulty: "Easy",
                    category: "Seafood",
                    author: {
                      user_id: "user-3",
                      name: "Sarah Ocean",
                      avatar_url: "https://i.pravatar.cc/150?img=25"
                    },
                    created_at: "2025-10-22",
                    badge: {
                      text: "New",
                      icon: "✨",
                      variant: "new"
                    }
                  },
                  {
                    post_id: "recipe-4",
                    title: "Chocolate Lava Cake",
                    short_description: "Decadent chocolate dessert with a molten center. The ultimate indulgence for chocolate lovers!",
                    image_url: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800",
                    total_time: 45,
                    difficulty: "Medium",
                    category: "Dessert",
                    author: {
                      user_id: "user-4",
                      name: "Pastry Chef Emma",
                      avatar_url: "https://i.pravatar.cc/150?img=40"
                    },
                    created_at: "2025-10-19",
                    badge: {
                      text: "Featured",
                      icon: "⭐",
                      variant: "featured"
                    }
                  }
                ]}
                autoPlay={true}
                interval={5000}
                onViewRecipe={(postId) => alert(`Navigate to recipe: ${postId}`)}
                onAuthorClick={(userId) => alert(`Navigate to user: ${userId}`)}
              />
            </div>
          </div>

          {/* ActionButton Showcase Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-purple-50 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">ActionButton Component Showcase</h2>
              
              {/* Basic Variants */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <ActionButton variant="primary">
                    Primary Button
                  </ActionButton>
                  <ActionButton variant="secondary">
                    Secondary Button
                  </ActionButton>
                  <ActionButton variant="outline">
                    Outline Button
                  </ActionButton>
                  <ActionButton variant="ghost">
                    Ghost Button
                  </ActionButton>
                  <ActionButton variant="danger">
                    Danger Button
                  </ActionButton>
                  <ActionButton variant="success">
                    Success Button
                  </ActionButton>
                </div>
              </div>

              {/* With Icons */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">With Icons</h3>
                <div className="flex flex-wrap gap-4">
                  <ActionButton icon={ArrowRight} variant="primary">
                    View Recipes
                  </ActionButton>
                  <ActionButton icon={Heart} iconPosition="left" variant="outline">
                    Save Recipe
                  </ActionButton>
                  <ActionButton icon={Share2} iconPosition="left" variant="secondary">
                    Share
                  </ActionButton>
                  <ActionButton icon={BookmarkPlus} iconPosition="left" variant="ghost">
                    Add to Notebook
                  </ActionButton>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  ← Icons can be positioned left or right (default: right)
                </p>
              </div>

              {/* Size Variants */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Size Variants</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <ActionButton size="sm" icon={ChefHat}>
                    Small Button
                  </ActionButton>
                  <ActionButton size="md" icon={ChefHat}>
                    Medium Button
                  </ActionButton>
                  <ActionButton size="lg" icon={ChefHat}>
                    Large Button
                  </ActionButton>
                </div>
              </div>

              {/* Loading States */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Loading States</h3>
                <div className="flex flex-wrap gap-4">
                  <ActionButton loading variant="primary">
                    Saving...
                  </ActionButton>
                  <ActionButton loading variant="secondary">
                    Processing
                  </ActionButton>
                  <ActionButton loading variant="outline">
                    Loading
                  </ActionButton>
                  <ActionButton loading icon={Download}>
                    Downloading...
                  </ActionButton>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  ← Spinner replaces icon, button is disabled while loading
                </p>
              </div>

              {/* Disabled States */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Disabled States</h3>
                <div className="flex flex-wrap gap-4">
                  <ActionButton disabled variant="primary">
                    Disabled Primary
                  </ActionButton>
                  <ActionButton disabled variant="secondary">
                    Disabled Secondary
                  </ActionButton>
                  <ActionButton disabled variant="outline">
                    Disabled Outline
                  </ActionButton>
                  <ActionButton disabled icon={Heart}>
                    Disabled with Icon
                  </ActionButton>
                </div>
              </div>

              {/* Full Width */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Full Width</h3>
                <div className="space-y-3">
                  <ActionButton fullWidth variant="primary" icon={ChefHat}>
                    Start Cooking
                  </ActionButton>
                  <ActionButton fullWidth variant="outline" icon={BookmarkPlus} iconPosition="left">
                    Save to Notebook
                  </ActionButton>
                </div>
              </div>

              {/* Icon Positions */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Icon Positions</h3>
                <div className="flex flex-wrap gap-4">
                  <ActionButton icon={ArrowRight} iconPosition="right" variant="primary">
                    Next Step
                  </ActionButton>
                  <ActionButton icon={ArrowRight} iconPosition="left" variant="primary">
                    Previous Step
                  </ActionButton>
                  <ActionButton icon={Edit} iconPosition="left" variant="secondary">
                    Edit Recipe
                  </ActionButton>
                  <ActionButton icon={Trash2} iconPosition="left" variant="danger">
                    Delete
                  </ActionButton>
                </div>
              </div>

              {/* Interactive Examples */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Interactive (Click to test)</h3>
                <div className="flex flex-wrap gap-4">
                  <ActionButton 
                    icon={Check} 
                    variant="success"
                    onClick={() => alert('Action confirmed!')}
                  >
                    Confirm
                  </ActionButton>
                  <ActionButton 
                    icon={X} 
                    variant="danger"
                    onClick={() => alert('Action cancelled')}
                  >
                    Cancel
                  </ActionButton>
                  <ActionButton 
                    icon={Heart} 
                    iconPosition="left"
                    variant="outline"
                    onClick={() => alert('Recipe saved to favorites!')}
                  >
                    Add to Favorites
                  </ActionButton>
                </div>
              </div>

              {/* Real-World Examples */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Real-World Examples</h3>
                <div className="space-y-6">
                  
                  {/* Hero Card with ActionButton */}
                  <div className="bg-white p-6 rounded-lg border-2 border-purple-200">
                    <RecipeBadge text="Hot Recipes" icon="🔥" variant="hot" size="md" className="mb-3" />
                    <h3 className="text-2xl font-bold mb-2">Canh ga Cong Phuong</h3>
                    <p className="text-gray-600 mb-4">
                      Canh ga 100% nguyen chat duoc chien boi chinh cau thu noi tieng Cong Phuong. Thom ngon moi ban an
                    </p>
                    <RecipeMetadata 
                      time={30}
                      category="Chicken"
                      size="md"
                      className="mb-4"
                    />
                    <div className="flex items-center justify-between">
                      <AuthorInfo 
                        avatar="https://i.pravatar.cc/150?img=12"
                        name="Cong Phuong"
                        date="2022-03-15"
                        size="md"
                      />
                      <ActionButton 
                        icon={ArrowRight} 
                        variant="primary"
                        onClick={() => alert('View recipe details')}
                      >
                        View Recipe
                      </ActionButton>
                    </div>
                    <p className="text-xs text-purple-600 mt-4 font-medium">← Complete hero card with ActionButton</p>
                  </div>

                  {/* Recipe Actions Bar */}
                  <div className="bg-white p-6 rounded-lg border">
                    <h4 className="font-semibold mb-4">Recipe Quick Actions</h4>
                    <div className="flex flex-wrap gap-3">
                      <ActionButton 
                        icon={ChefHat} 
                        iconPosition="left"
                        variant="primary"
                        size="md"
                      >
                        Start Cooking
                      </ActionButton>
                      <ActionButton 
                        icon={BookmarkPlus} 
                        iconPosition="left"
                        variant="outline"
                        size="md"
                      >
                        Save
                      </ActionButton>
                      <ActionButton 
                        icon={Share2} 
                        iconPosition="left"
                        variant="ghost"
                        size="md"
                      >
                        Share
                      </ActionButton>
                      <ActionButton 
                        icon={Download} 
                        iconPosition="left"
                        variant="ghost"
                        size="md"
                      >
                        Export PDF
                      </ActionButton>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">← Recipe detail page action bar</p>
                  </div>

                  {/* Form Buttons */}
                  <div className="bg-white p-6 rounded-lg border">
                    <h4 className="font-semibold mb-4">Form Example</h4>
                    <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Recipe Title</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 border rounded-lg"
                          placeholder="Enter recipe name..."
                        />
                      </div>
                      <div className="flex gap-3">
                        <ActionButton 
                          type="submit"
                          variant="primary"
                          icon={Check}
                        >
                          Save Recipe
                        </ActionButton>
                        <ActionButton 
                          type="button"
                          variant="outline"
                          icon={X}
                          onClick={() => alert('Cancelled')}
                        >
                          Cancel
                        </ActionButton>
                      </div>
                    </form>
                    <p className="text-xs text-gray-500 mt-4">← Form submit/cancel buttons</p>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* RecipeImage Showcase Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-pink-50 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">RecipeImage Component Showcase</h2>
              
              {/* Basic Usage */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Basic Usage (Circle)</h3>
                <div className="flex justify-center bg-white p-8 rounded-lg">
                  <RecipeImage 
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
                    alt="Delicious food"
                  />
                </div>
              </div>

              {/* Size Variants */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Size Variants</h3>
                <div className="flex flex-wrap items-end justify-center gap-8 bg-white p-8 rounded-lg">
                  <div className="text-center">
                    <RecipeImage 
                      src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200"
                      alt="Pizza"
                      size="sm"
                    />
                    <p className="text-xs text-gray-500 mt-2">Small (32x32)</p>
                  </div>
                  <div className="text-center">
                    <RecipeImage 
                      src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300"
                      alt="Pizza"
                      size="md"
                    />
                    <p className="text-xs text-gray-500 mt-2">Medium (64x64)</p>
                  </div>
                  <div className="text-center">
                    <RecipeImage 
                      src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
                      alt="Pizza"
                      size="lg"
                    />
                    <p className="text-xs text-gray-500 mt-2">Large (96x96)</p>
                  </div>
                </div>
              </div>

              {/* Shape Variants */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Shape Variants</h3>
                <div className="flex flex-wrap justify-center gap-8 bg-white p-8 rounded-lg">
                  <div className="text-center">
                    <RecipeImage 
                      src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300"
                      alt="Pancakes"
                      size="md"
                      shape="circle"
                    />
                    <p className="text-xs text-gray-500 mt-2">Circle (default)</p>
                  </div>
                  <div className="text-center">
                    <RecipeImage 
                      src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300"
                      alt="Pancakes"
                      size="md"
                      shape="rounded"
                    />
                    <p className="text-xs text-gray-500 mt-2">Rounded</p>
                  </div>
                  <div className="text-center">
                    <RecipeImage 
                      src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300"
                      alt="Pancakes"
                      size="md"
                      shape="square"
                    />
                    <p className="text-xs text-gray-500 mt-2">Square</p>
                  </div>
                </div>
              </div>

              {/* With Border */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">With Border & Shadow</h3>
                <div className="flex flex-wrap justify-center gap-8 bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg">
                  <RecipeImage 
                    src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300"
                    alt="Salad bowl"
                    size="lg"
                    showBorder={true}
                    showShadow={true}
                  />
                  <RecipeImage 
                    src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300"
                    alt="Salad bowl"
                    size="lg"
                    showBorder={false}
                    showShadow={false}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Left: With border & shadow | Right: Without
                </p>
              </div>

              {/* Loading State */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Loading State</h3>
                <div className="flex justify-center gap-8 bg-white p-8 rounded-lg">
                  <RecipeImage 
                    src="https://this-image-will-never-load.com/fake.jpg"
                    alt="Loading example"
                    size="md"
                  />
                  <p className="text-sm text-gray-600 self-center">
                    ← Shows skeleton while loading
                  </p>
                </div>
              </div>

              {/* Error State */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Error State (Broken Image)</h3>
                <div className="flex justify-center gap-8 bg-white p-8 rounded-lg">
                  <RecipeImage 
                    src="invalid-url"
                    alt="Error example"
                    size="md"
                  />
                  <p className="text-sm text-gray-600 self-center">
                    ← Shows error placeholder gracefully
                  </p>
                </div>
              </div>

              {/* Object Fit */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Object Fit Options</h3>
                <div className="flex flex-wrap justify-center gap-8 bg-white p-8 rounded-lg">
                  <div className="text-center">
                    <RecipeImage 
                      src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=300"
                      alt="Burger"
                      size="md"
                      objectFit="cover"
                    />
                    <p className="text-xs text-gray-500 mt-2">Cover (default)</p>
                  </div>
                  <div className="text-center">
                    <RecipeImage 
                      src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=300"
                      alt="Burger"
                      size="md"
                      objectFit="contain"
                    />
                    <p className="text-xs text-gray-500 mt-2">Contain</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DecorativePattern Showcase Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-yellow-50 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">DecorativePattern Component Showcase</h2>
              
              {/* Pattern Types */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Pattern Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative bg-white h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                    <DecorativePattern type="stripes" position="top-right" />
                    <div className="absolute bottom-4 left-4">
                      <p className="text-sm font-medium">Stripes</p>
                    </div>
                  </div>
                  <div className="relative bg-white h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                    <DecorativePattern type="dots" position="top-right" />
                    <div className="absolute bottom-4 left-4">
                      <p className="text-sm font-medium">Dots</p>
                    </div>
                  </div>
                  <div className="relative bg-white h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                    <DecorativePattern type="waves" position="top-right" />
                    <div className="absolute bottom-4 left-4">
                      <p className="text-sm font-medium">Waves</p>
                    </div>
                  </div>
                  <div className="relative bg-white h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                    <DecorativePattern type="circles" position="top-right" />
                    <div className="absolute bottom-4 left-4">
                      <p className="text-sm font-medium">Circles</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Positions */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Position Variants</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="relative bg-white h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                    <DecorativePattern type="stripes" position="top-right" size="sm" />
                    <p className="text-xs p-2">Top Right</p>
                  </div>
                  <div className="relative bg-white h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                    <DecorativePattern type="stripes" position="top-left" size="sm" />
                    <p className="text-xs p-2">Top Left</p>
                  </div>
                  <div className="relative bg-white h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                    <DecorativePattern type="stripes" position="bottom-right" size="sm" />
                    <p className="text-xs p-2">Bottom Right</p>
                  </div>
                  <div className="relative bg-white h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                    <DecorativePattern type="stripes" position="bottom-left" size="sm" />
                    <p className="text-xs p-2">Bottom Left</p>
                  </div>
                  <div className="relative bg-white h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                    <DecorativePattern type="stripes" position="center" size="sm" />
                    <p className="text-xs p-2">Center</p>
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Color Variants</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['gray', 'blue', 'purple', 'pink', 'orange', 'green'].map(color => (
                    <div key={color} className="relative bg-white h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                      <DecorativePattern type="dots" color={color} size="sm" />
                      <p className="text-xs p-2 capitalize">{color}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opacity Levels */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Opacity Levels</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[10, 20, 40, 60].map(opacity => (
                    <div key={opacity} className="relative bg-white h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                      <DecorativePattern type="stripes" opacity={opacity} size="sm" />
                      <p className="text-xs p-2">{opacity}% Opacity</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-World Example: Hero Card with Pattern */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Real-World Example: Hero Card</h3>
                <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl overflow-hidden">
                  {/* Decorative patterns */}
                  <DecorativePattern type="stripes" position="top-right" color="purple" opacity={15} size="lg" />
                  <DecorativePattern type="dots" position="bottom-left" color="blue" opacity={10} size="md" />
                  
                  {/* Content */}
                  <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      {/* Left side */}
                      <div>
                        <RecipeBadge text="Hot Recipes" icon="🔥" variant="hot" className="mb-3" />
                        <h3 className="text-3xl font-bold mb-3">Canh ga Cong Phuong</h3>
                        <p className="text-gray-600 mb-4">
                          Canh ga 100% nguyen chat duoc chien boi chinh cau thu noi tieng Cong Phuong
                        </p>
                        <RecipeMetadata 
                          time={30}
                          category="Chicken"
                          className="mb-4"
                        />
                        <AuthorInfo 
                          avatar="https://i.pravatar.cc/150?img=12"
                          name="Cong Phuong"
                          date="2022-03-15"
                          className="mb-4"
                        />
                        <ActionButton icon={ArrowRight} variant="primary">
                          View Recipe
                        </ActionButton>
                      </div>
                      
                      {/* Right side - Image */}
                      <div className="flex justify-center">
                        <RecipeImage 
                          src="https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400"
                          alt="Chicken dish"
                          size="lg"
                          showBorder={true}
                          showShadow={true}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-purple-600 mt-6 font-medium text-center relative z-10">
                    ← Complete hero card with decorative patterns!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RecipeHeroCard Showcase Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">🎉 RecipeHeroCard - The Complete Component!</h2>
              <p className="text-gray-600 mb-8">
                This is the final component that combines all the previous components together.
                It's ready to use with your API data!
              </p>
              
              {/* Single Recipe Example */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Single Recipe Hero Card</h3>
                <RecipeHeroCard
                  recipe={{
                    post_id: "recipe-1",
                    title: "Canh ga Cong Phuong",
                    short_description: "Canh ga 100% nguyen chat duoc chien boi chinh cau thu noi tieng Cong Phuong. Thom ngon moi ban an",
                    image_url: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600",
                    total_time: 30,
                    difficulty: "Medium",
                    category: "Chicken",
                    author: {
                      user_id: "user-1",
                      name: "Cong Phuong",
                      avatar_url: "https://i.pravatar.cc/150?img=12"
                    },
                    created_at: "2022-03-15",
                    badge: {
                      text: "Hot Recipes",
                      icon: "🔥",
                      variant: "hot"
                    }
                  }}
                  onViewRecipe={(postId) => alert(`Navigate to recipe: ${postId}`)}
                  onAuthorClick={(userId) => alert(`Navigate to user: ${userId}`)}
                />
              </div>

              {/* Multiple Hero Cards (Carousel Preview) */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Multiple Cards (Carousel Preview)</h3>
                <div className="space-y-6">
                  <RecipeHeroCard
                    recipe={{
                      post_id: "recipe-2",
                      title: "Vietnamese Pho",
                      short_description: "Traditional Vietnamese beef noodle soup with aromatic herbs and spices. A comfort food classic.",
                      image_url: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600",
                      total_time: 120,
                      difficulty: "Hard",
                      category: "Vietnamese",
                      author: {
                        user_id: "user-2",
                        name: "Chef Nguyen",
                        avatar_url: "https://i.pravatar.cc/150?img=15"
                      },
                      created_at: "2025-10-20",
                      badge: {
                        text: "Trending",
                        icon: "📈",
                        variant: "trending"
                      }
                    }}
                    onViewRecipe={(postId) => alert(`Navigate to recipe: ${postId}`)}
                  />

                  <RecipeHeroCard
                    recipe={{
                      post_id: "recipe-3",
                      title: "Quick Pasta Carbonara",
                      short_description: "Classic Italian pasta with creamy egg sauce, crispy pancetta, and parmesan cheese. Ready in 20 minutes!",
                      image_url: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600",
                      total_time: 20,
                      difficulty: "Easy",
                      category: "Italian",
                      author: {
                        user_id: "user-3",
                        name: "Marco Rossi",
                        avatar_url: "https://i.pravatar.cc/150?img=33"
                      },
                      created_at: "2025-10-22",
                      badge: {
                        text: "New",
                        icon: "✨",
                        variant: "new"
                      }
                    }}
                    patternColor="blue"
                    onViewRecipe={(postId) => alert(`Navigate to recipe: ${postId}`)}
                  />
                </div>
              </div>

              {/* Without Badge */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Without Badge</h3>
                <RecipeHeroCard
                  recipe={{
                    post_id: "recipe-4",
                    title: "Healthy Green Salad",
                    short_description: "Fresh mixed greens with cherry tomatoes, cucumber, and a light vinaigrette dressing.",
                    image_url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600",
                    total_time: 10,
                    difficulty: "Easy",
                    category: "Salad",
                    author: {
                      user_id: "user-4",
                      name: "Sarah Health",
                      avatar_url: "https://i.pravatar.cc/150?img=25"
                    },
                    created_at: "2025-10-21"
                  }}
                  onViewRecipe={(postId) => alert(`Navigate to recipe: ${postId}`)}
                />
              </div>

              {/* Without Pattern */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Without Decorative Pattern (Clean Style)</h3>
                <RecipeHeroCard
                  recipe={{
                    post_id: "recipe-5",
                    title: "Chocolate Lava Cake",
                    short_description: "Decadent chocolate cake with a molten center. Perfect dessert for chocolate lovers!",
                    image_url: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600",
                    total_time: 45,
                    difficulty: "Medium",
                    category: "Dessert",
                    author: {
                      user_id: "user-5",
                      name: "Pastry Chef Emma",
                      avatar_url: "https://i.pravatar.cc/150?img=40"
                    },
                    created_at: "2025-10-19",
                    badge: {
                      text: "Featured",
                      icon: "⭐",
                      variant: "featured"
                    }
                  }}
                  showPattern={false}
                  onViewRecipe={(postId) => alert(`Navigate to recipe: ${postId}`)}
                />
              </div>

              {/* API Integration Example */}
              <div className="bg-white rounded-xl p-6 border-2 border-indigo-200">
                <h3 className="text-lg font-semibold mb-4">📝 How to Use with Your API</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// Fetch recipes from your API
const [recipes, setRecipes] = useState([]);

useEffect(() => {
  fetch('/api/posts/hero')
    .then(res => res.json())
    .then(data => setRecipes(data));
}, []);

// Render hero cards
{recipes.map(recipe => (
  <RecipeHeroCard
    key={recipe.post_id}
    recipe={recipe}
    onViewRecipe={(postId) => 
      navigate(\`/recipe/\${postId}\`)
    }
    onAuthorClick={(userId) => 
      navigate(\`/user/\${userId}\`)
    }
  />
))}`}
                </pre>
              </div>

              {/* Component Summary */}
              <div className="mt-8 bg-white rounded-xl p-6 border-2 border-green-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span>✅</span>
                  <span>All Components Built!</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span><strong>RecipeBadge</strong> - Status labels</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span><strong>RecipeMetadata</strong> - Time & difficulty</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span><strong>AuthorInfo</strong> - Author attribution</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span><strong>ActionButton</strong> - Enhanced buttons</span>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span><strong>RecipeImage</strong> - Smart images</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span><strong>DecorativePattern</strong> - SVG patterns</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span><strong>RecipeHeroCard</strong> - Complete card</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span><strong>RecipeHeroCarousel</strong> - Hero carousel</span>
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  🎉 You now have a complete, production-ready hero card system that matches your design!
                </p>
              </div>
            </div>
          </div>

          {/* RecipeHeroCarousel Showcase Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">🎠 RecipeHeroCarousel - Auto-playing Carousel!</h2>
              <p className="text-gray-600 mb-8">
                A fully-featured carousel component for your hero section. Check it out at the top of this page!
              </p>

              {/* Features List */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    <span>Navigation Features</span>
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">→</span>
                      <span><strong>Arrow Buttons:</strong> Appear on hover, click to navigate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">→</span>
                      <span><strong>Indicator Dots:</strong> Click to jump to any slide</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">→</span>
                      <span><strong>Keyboard:</strong> Arrow keys to navigate (← →)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">→</span>
                      <span><strong>Touch Gestures:</strong> Swipe left/right on mobile</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <span className="text-2xl">⚡</span>
                    <span>Auto-Play Features</span>
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">→</span>
                      <span><strong>Auto-advance:</strong> Slides change every 5 seconds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">→</span>
                      <span><strong>Progress Bar:</strong> Shows timing until next slide</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">→</span>
                      <span><strong>Play/Pause:</strong> Control button appears on hover</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">→</span>
                      <span><strong>Auto-pause:</strong> Pauses when you interact</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Props Documentation */}
              <div className="bg-white rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-4">📋 Component Props</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-3 font-semibold">Prop</th>
                        <th className="text-left p-3 font-semibold">Type</th>
                        <th className="text-left p-3 font-semibold">Default</th>
                        <th className="text-left p-3 font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="p-3 font-mono text-blue-600">recipes</td>
                        <td className="p-3 text-gray-600">Array</td>
                        <td className="p-3 text-gray-600">[]</td>
                        <td className="p-3">Array of recipe objects to display</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-blue-600">autoPlay</td>
                        <td className="p-3 text-gray-600">Boolean</td>
                        <td className="p-3 text-gray-600">true</td>
                        <td className="p-3">Enable auto-advance slides</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-blue-600">interval</td>
                        <td className="p-3 text-gray-600">Number</td>
                        <td className="p-3 text-gray-600">5000</td>
                        <td className="p-3">Milliseconds between slides</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-blue-600">showControls</td>
                        <td className="p-3 text-gray-600">Boolean</td>
                        <td className="p-3 text-gray-600">true</td>
                        <td className="p-3">Show arrow buttons & play/pause</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-blue-600">showIndicators</td>
                        <td className="p-3 text-gray-600">Boolean</td>
                        <td className="p-3 text-gray-600">true</td>
                        <td className="p-3">Show dot indicators</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-blue-600">onViewRecipe</td>
                        <td className="p-3 text-gray-600">Function</td>
                        <td className="p-3 text-gray-600">-</td>
                        <td className="p-3">Callback when "View Recipe" clicked</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-blue-600">onAuthorClick</td>
                        <td className="p-3 text-gray-600">Function</td>
                        <td className="p-3 text-gray-600">-</td>
                        <td className="p-3">Callback when author is clicked</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Usage Examples */}
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold mb-4">💻 Usage Examples</h3>
                
                <div className="space-y-4">
                  {/* Basic Usage */}
                  <div>
                    <p className="text-sm font-medium mb-2">Basic Usage (with auto-play):</p>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
{`<RecipeHeroCarousel
  recipes={heroRecipes}
  onViewRecipe={(id) => navigate(\`/recipe/\${id}\`)}
/>`}
                    </pre>
                  </div>

                  {/* Manual Control */}
                  <div>
                    <p className="text-sm font-medium mb-2">Manual Control (no auto-play):</p>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
{`<RecipeHeroCarousel
  recipes={featuredRecipes}
  autoPlay={false}
  onViewRecipe={(id) => navigate(\`/recipe/\${id}\`)}
/>`}
                    </pre>
                  </div>

                  {/* Custom Interval */}
                  <div>
                    <p className="text-sm font-medium mb-2">Custom Interval (faster slides):</p>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
{`<RecipeHeroCarousel
  recipes={quickRecipes}
  autoPlay={true}
  interval={3000}  // 3 seconds
  onViewRecipe={(id) => navigate(\`/recipe/\${id}\`)}
/>`}
                    </pre>
                  </div>

                  {/* Minimal UI */}
                  <div>
                    <p className="text-sm font-medium mb-2">Minimal UI (no controls, just dots):</p>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
{`<RecipeHeroCarousel
  recipes={recipes}
  showControls={false}
  showIndicators={true}
  onViewRecipe={(id) => navigate(\`/recipe/\${id}\`)}
/>`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Accessibility Features */}
              <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <span>♿</span>
                  <span>Accessibility Built-in</span>
                </h3>
                <ul className="grid md:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Keyboard navigation support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>ARIA labels on all controls</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Focus indicators on buttons</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>aria-live for slide changes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>aria-current on active slide</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Reduced motion support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      </main>
    </div>
  );
};

export default ShowCasePage;