import React from 'react';
import Navbar from '../components/NavigationBar';
import RecipeBadge from '../components/RecipeBadge';
import RecipeMetadata from '../components/RecipeMetadata';
import AuthorInfo from '../components/AuthorInfo';

const IndexPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-center mb-8">
            Welcome to KooK
          </h1>
          <p className="text-center text-gray-600 mb-12">
            Your recipe sharing platform - Component Showcase
          </p>

          {/* RecipeMetadata Showcase Section */}
          <div className="bg-blue-50 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">RecipeMetadata Component Showcase</h2>
            
            {/* Basic Usage */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Basic Usage (Time + Category)</h3>
              <div className="bg-white p-4 rounded-lg">
                <RecipeMetadata 
                  time={30}
                  category="Chicken"
                />
                <p className="text-sm text-gray-600 mt-2">← Like in your hero card design</p>
              </div>
            </div>

            {/* All Metadata Types */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">All Metadata Types</h3>
              <div className="bg-white p-4 rounded-lg">
                <RecipeMetadata 
                  time={90}
                  difficulty="Medium"
                  servings={4}
                  category="Vietnamese"
                />
              </div>
            </div>

            {/* Size Variants */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Size Variants</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Small (for mobile/compact cards)</p>
                  <RecipeMetadata 
                    time={45}
                    category="Seafood"
                    difficulty="Easy"
                    size="sm"
                  />
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Medium (default, for cards)</p>
                  <RecipeMetadata 
                    time={60}
                    category="Italian"
                    difficulty="Medium"
                    size="md"
                  />
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Large (for hero/featured)</p>
                  <RecipeMetadata 
                    time={120}
                    category="French"
                    difficulty="Hard"
                    size="lg"
                  />
                </div>
              </div>
            </div>

            {/* Layout Options */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Layout Options</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Horizontal (default)</p>
                  <RecipeMetadata 
                    time={30}
                    difficulty="Easy"
                    servings={2}
                    category="Quick Meals"
                    layout="horizontal"
                  />
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Vertical (for narrow spaces)</p>
                  <RecipeMetadata 
                    time={45}
                    difficulty="Medium"
                    servings={4}
                    category="Asian"
                    layout="vertical"
                  />
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Grid (for detail pages)</p>
                  <RecipeMetadata 
                    time={60}
                    difficulty="Hard"
                    servings={6}
                    category="European"
                    layout="grid"
                  />
                </div>
              </div>
            </div>

            {/* Time Formatting Examples */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Time Formatting</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <RecipeMetadata time={15} />
                  <p className="text-xs text-gray-500 mt-1">15 minutes</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <RecipeMetadata time={30} />
                  <p className="text-xs text-gray-500 mt-1">30 minutes</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <RecipeMetadata time={60} />
                  <p className="text-xs text-gray-500 mt-1">1 hour (exact)</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <RecipeMetadata time={90} />
                  <p className="text-xs text-gray-500 mt-1">1 hour 30 minutes</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <RecipeMetadata time={125} />
                  <p className="text-xs text-gray-500 mt-1">2 hours 5 minutes</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <RecipeMetadata time={180} />
                  <p className="text-xs text-gray-500 mt-1">3 hours (exact)</p>
                </div>
              </div>
            </div>

            {/* Difficulty Color Coding */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Difficulty Levels (Color Coded)</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <RecipeMetadata difficulty="Easy" servings={2} />
                  <p className="text-xs text-gray-500 mt-1">Green = Beginner-friendly</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <RecipeMetadata difficulty="Medium" servings={4} />
                  <p className="text-xs text-gray-500 mt-1">Yellow = Moderate skill</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <RecipeMetadata difficulty="Hard" servings={6} />
                  <p className="text-xs text-gray-500 mt-1">Red = Advanced techniques</p>
                </div>
              </div>
            </div>

            {/* Without Icons */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Without Icons (Text Only)</h3>
              <div className="bg-white p-4 rounded-lg">
                <RecipeMetadata 
                  time={45}
                  difficulty="Medium"
                  category="Dessert"
                  showIcons={false}
                />
                <p className="text-sm text-gray-600 mt-2">← Minimal style for space-constrained layouts</p>
              </div>
            </div>

            {/* Real-World Examples */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Real-World Examples</h3>
              <div className="space-y-4">
                {/* Hero Card Example */}
                <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
                  <RecipeBadge text="Hot Recipes" icon="🔥" variant="hot" size="md" className="mb-3" />
                  <h3 className="text-2xl font-bold mb-2">Canh ga Cong Phuong</h3>
                  <p className="text-gray-600 mb-4">
                    Canh ga 100% nguyen chat duoc chien boi chinh cau thu noi tieng Cong Phuong. Thom ngon moi ban an
                  </p>
                  <RecipeMetadata 
                    time={30}
                    category="Chicken"
                    size="md"
                  />
                  <p className="text-xs text-blue-600 mt-2 font-medium">← Hero card layout from your design</p>
                </div>

                {/* Recipe List Card */}
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex gap-4">
                    <img 
                      src="https://via.placeholder.com/100" 
                      alt="Recipe" 
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">Quick Pasta Carbonara</h4>
                        <RecipeBadge text="New" variant="new" size="sm" />
                      </div>
                      <RecipeMetadata 
                        time={20}
                        difficulty="Easy"
                        servings={2}
                        size="sm"
                        layout="horizontal"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">← Compact card for list view</p>
                </div>
              </div>
            </div>
          </div>

          {/* AuthorInfo Showcase Section */}
          <div className="bg-green-50 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">AuthorInfo Component Showcase</h2>
            
            {/* Basic Usage */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Basic Usage (With Avatar)</h3>
              <div className="bg-white p-4 rounded-lg">
                <AuthorInfo 
                  avatar="https://i.pravatar.cc/150?img=12"
                  name="Cong Phuong"
                  date="2022-03-15"
                />
                <p className="text-sm text-gray-600 mt-2">← Like in your hero card design</p>
              </div>
            </div>

            {/* Without Avatar (Fallback to Initials) */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Without Avatar (Initials Fallback)</h3>
              <div className="bg-white p-4 rounded-lg space-y-4">
                <AuthorInfo 
                  name="Cong Phuong"
                  date="2022-03-15"
                />
                <AuthorInfo 
                  name="Mary Jane"
                  date="2025-10-20"
                />
                <AuthorInfo 
                  name="Chef Gordon"
                  date="2025-01-01"
                />
              </div>
            </div>

            {/* Size Variants */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Size Variants</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Small (for compact lists)</p>
                  <AuthorInfo 
                    avatar="https://i.pravatar.cc/150?img=5"
                    name="John Doe"
                    date="2025-10-15"
                    size="sm"
                  />
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Medium (default, for cards)</p>
                  <AuthorInfo 
                    avatar="https://i.pravatar.cc/150?img=8"
                    name="Jane Smith"
                    date="2025-10-18"
                    size="md"
                  />
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Large (for profile headers)</p>
                  <AuthorInfo 
                    avatar="https://i.pravatar.cc/150?img=33"
                    name="Chef Maria"
                    date="2025-10-20"
                    size="lg"
                  />
                </div>
              </div>
            </div>

            {/* Layout Options */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Layout Options</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Horizontal (default)</p>
                  <AuthorInfo 
                    avatar="https://i.pravatar.cc/150?img=10"
                    name="Alex Thompson"
                    date="2025-09-25"
                    layout="horizontal"
                  />
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Vertical (for centered layouts)</p>
                  <div className="flex justify-center">
                    <AuthorInfo 
                      avatar="https://i.pravatar.cc/150?img=15"
                      name="Sarah Connor"
                      date="2025-08-10"
                      layout="vertical"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive (Clickable) */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Interactive (Hover to see effect)</h3>
              <div className="bg-white p-4 rounded-lg space-y-4">
                <AuthorInfo 
                  avatar="https://i.pravatar.cc/150?img=20"
                  name="David Miller"
                  date="2025-10-19"
                  clickable={true}
                  onClick={() => alert('Navigate to author profile')}
                />
                <p className="text-sm text-gray-600">← Hover over the name or avatar to see hover effect</p>
              </div>
            </div>

            {/* Without Date */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Without Date (Name Only)</h3>
              <div className="bg-white p-4 rounded-lg">
                <AuthorInfo 
                  avatar="https://i.pravatar.cc/150?img=25"
                  name="Emily Watson"
                  showDate={false}
                />
                <p className="text-sm text-gray-600 mt-2">← Useful for comment sections</p>
              </div>
            </div>

            {/* Broken Avatar Image (Tests Fallback) */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Broken Image (Automatic Fallback)</h3>
              <div className="bg-white p-4 rounded-lg">
                <AuthorInfo 
                  avatar="https://invalid-url-that-wont-load.com/image.jpg"
                  name="Test User"
                  date="2025-10-20"
                />
                <p className="text-sm text-gray-600 mt-2">← Gracefully falls back to initials</p>
              </div>
            </div>

            {/* Date Formatting Examples */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Date Formatting</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <AuthorInfo 
                    name="User One"
                    date="2025-01-01"
                  />
                  <p className="text-xs text-gray-500 mt-1">2025-01-01 → 1 January 2025</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <AuthorInfo 
                    name="User Two"
                    date="2024-12-25"
                  />
                  <p className="text-xs text-gray-500 mt-1">2024-12-25 → 25 December 2024</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <AuthorInfo 
                    name="User Three"
                    date={new Date('2025-06-15')}
                  />
                  <p className="text-xs text-gray-500 mt-1">Date object → 15 June 2025</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <AuthorInfo 
                    name="User Four"
                    date="2022-03-15T10:30:00Z"
                  />
                  <p className="text-xs text-gray-500 mt-1">ISO 8601 → 15 March 2022</p>
                </div>
              </div>
            </div>

            {/* Real-World Examples */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Real-World Examples</h3>
              <div className="space-y-4">
                {/* Hero Card Complete */}
                <div className="bg-white p-6 rounded-lg border-2 border-green-200">
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
                  <AuthorInfo 
                    avatar="https://i.pravatar.cc/150?img=12"
                    name="Cong Phuong"
                    date="2022-03-15"
                    clickable={true}
                  />
                  <p className="text-xs text-green-600 mt-2 font-medium">← Complete hero card with all components</p>
                </div>

                {/* Comment Example */}
                <div className="bg-white p-4 rounded-lg border">
                  <AuthorInfo 
                    avatar="https://i.pravatar.cc/150?img=30"
                    name="Tom Johnson"
                    date="2025-10-20T08:30:00Z"
                    size="sm"
                    showDate={true}
                  />
                  <p className="text-sm text-gray-700 mt-2 ml-10">
                    This recipe looks amazing! Can't wait to try it this weekend. Thanks for sharing!
                  </p>
                  <p className="text-xs text-gray-500 mt-2">← Comment layout with author info</p>
                </div>

                {/* Recipe List with Author */}
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex gap-4">
                    <img 
                      src="https://via.placeholder.com/100" 
                      alt="Recipe" 
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">Quick Pasta Carbonara</h4>
                        <RecipeBadge text="New" variant="new" size="sm" />
                      </div>
                      <RecipeMetadata 
                        time={20}
                        difficulty="Easy"
                        size="sm"
                        className="mb-2"
                      />
                      <AuthorInfo 
                        avatar="https://i.pravatar.cc/150?img=40"
                        name="Chef Marco"
                        date="2025-10-19"
                        size="sm"
                        showDate={false}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">← Recipe card with author attribution</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IndexPage;