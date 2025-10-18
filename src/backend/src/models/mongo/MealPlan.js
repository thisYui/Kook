const mongoose = require('mongoose');

// Schema for individual meal entry
const mealEntrySchema = new mongoose.Schema({
  meal_type: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
    required: true
  },
  recipe_id: { type: String, required: true }
}, { _id: false });

// Main meal plan schema stored in MongoDB
const mealPlanSchema = new mongoose.Schema({
  // Use string UUIDs from the SQL side (stored as string)
  plan_id: { type: String, required: true, unique: true, index: true },
  user_id: { type: String, required: true, index: true },
  week_start: { type: Date, required: true },

  // Store meals organized by day of week
  meals: {
    Monday: { type: [mealEntrySchema], default: [] },
    Tuesday: { type: [mealEntrySchema], default: [] },
    Wednesday: { type: [mealEntrySchema], default: [] },
    Thursday: { type: [mealEntrySchema], default: [] },
    Friday: { type: [mealEntrySchema], default: [] },
    Saturday: { type: [mealEntrySchema], default: [] },
    Sunday: { type: [mealEntrySchema], default: [] }
  },

  // Versioning to track changes
  version: { type: Number, default: 1 }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Index for common lookup patterns
mealPlanSchema.index({ user_id: 1, week_start: 1 });
mealPlanSchema.index({ plan_id: 1, version: 1 });

// Helper method to get all recipe IDs in the meal plan
mealPlanSchema.methods.getAllRecipeIds = function() {
  const recipeIds = new Set();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  days.forEach(day => {
    if (this.meals[day]) {
      this.meals[day].forEach(meal => {
        if (meal.recipe_id) recipeIds.add(meal.recipe_id);
      });
    }
  });

  return Array.from(recipeIds);
};

// Helper method to get meals for a specific day
mealPlanSchema.methods.getMealsForDay = function(day) {
  return this.meals[day] || [];
};

// Helper method to add a meal to a specific day
mealPlanSchema.methods.addMeal = function(day, mealType, recipeId) {
  if (!this.meals[day]) {
    this.meals[day] = [];
  }
  this.meals[day].push({ meal_type: mealType, recipe_id: recipeId });
  return this.save();
};

module.exports = mongoose.model('MealPlan', mealPlanSchema);

