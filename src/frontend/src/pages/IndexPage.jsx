import Navbar from "../components/NavigationBar";
import RecipeHeroCarousel from '../components/RecipeHeroCarousel';

import Button from "../components/Button";

//Category import img test
import breakfast from "../assets/categories/breakfast.png";
import vegan from "../assets/categories/vegan.png";
import meat from "../assets/categories/meat.png";
import dessert from "../assets/categories/dessert.png";
import lunch from "../assets/categories/lunch.png";
import chocolate from "../assets/categories/chocolate.png";

import CategoryButton from "../components/CategoryButton";

const IndexPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className="w-full bg-gradient-to-b from-gray-50 to-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RecipeHeroCarousel
              recipes={[
                {
                  post_id: "recipe-1",
                  title: "Canh ga Cong Phuong",
                  short_description:
                    "Canh ga 100% nguyen chat duoc chien boi chinh cau thu noi tieng Cong Phuong. Thom ngon moi ban an",
                  image_url:
                    "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800",
                  total_time: 30,
                  difficulty: "Medium",
                  category: "Chicken",
                  author: {
                    user_id: "user-1",
                    name: "Cong Phuong",
                    avatar_url: "https://i.pravatar.cc/150?img=12",
                  },
                  created_at: "2022-03-15",
                  badge: {
                    text: "Hot Recipes",
                    icon: "🔥",
                    variant: "hot",
                  },
                },
                {
                  post_id: "recipe-2",
                  title: "Vietnamese Pho",
                  short_description:
                    "Traditional Vietnamese beef noodle soup with aromatic herbs and spices. A comfort food classic that warms your soul.",
                  image_url:
                    "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800",
                  total_time: 120,
                  difficulty: "Hard",
                  category: "Vietnamese",
                  author: {
                    user_id: "user-2",
                    name: "Chef Nguyen",
                    avatar_url: "https://i.pravatar.cc/150?img=15",
                  },
                  created_at: "2025-10-20",
                  badge: {
                    text: "Trending",
                    icon: "📈",
                    variant: "trending",
                  },
                },
                {
                  post_id: "recipe-3",
                  title: "Grilled Salmon with Herbs",
                  short_description:
                    "Fresh Atlantic salmon grilled to perfection with a medley of aromatic herbs and lemon butter sauce.",
                  image_url:
                    "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800",
                  total_time: 25,
                  difficulty: "Easy",
                  category: "Seafood",
                  author: {
                    user_id: "user-3",
                    name: "Sarah Ocean",
                    avatar_url: "https://i.pravatar.cc/150?img=25",
                  },
                  created_at: "2025-10-22",
                  badge: {
                    text: "New",
                    icon: "✨",
                    variant: "new",
                  },
                },
                {
                  post_id: "recipe-4",
                  title: "Chocolate Lava Cake",
                  short_description:
                    "Decadent chocolate dessert with a molten center. The ultimate indulgence for chocolate lovers!",
                  image_url:
                    "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800",
                  total_time: 45,
                  difficulty: "Medium",
                  category: "Dessert",
                  author: {
                    user_id: "user-4",
                    name: "Pastry Chef Emma",
                    avatar_url: "https://i.pravatar.cc/150?img=40",
                  },
                  created_at: "2025-10-19",
                  badge: {
                    text: "Featured",
                    icon: "⭐",
                    variant: "featured",
                  },
                },
              ]}
              autoPlay={true}
              interval={5000}
              onViewRecipe={(postId) => alert(`Navigate to recipe: ${postId}`)}
              onAuthorClick={(userId) => alert(`Navigate to user: ${userId}`)}
            />
          </div>
        </div>
        <div className="Category-Box my-10 px-10">
          <div className="flex flex-row justify-between mb-5">
            <h2 className="text-[38px] font-medium">Category</h2>
            <Button
              name="View all Categories"
              className="px-5 py-3 bg-[#E7FAFE] rounded-xl"
            ></Button>
          </div>

          <div className="flex flex-row justify-between pt-12">
            <CategoryButton name="Breakfast" imageSrc={breakfast} />
            <CategoryButton name="Vegan" imageSrc={vegan} />
            <CategoryButton name="Meat" imageSrc={meat} />
            <CategoryButton name="Dessert" imageSrc={dessert} />
            <CategoryButton name="Lunch" imageSrc={lunch} />
            <CategoryButton name="Chocolate" imageSrc={chocolate} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default IndexPage;
