const mongoose = require('mongoose');

// Schema for media items (images/videos)
const mediaSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  url: { type: String, required: true }
}, { _id: false });

// Schema for each cooking step
const stepSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  media: { type: [mediaSchema], default: [] },
  duration: { type: Number }, // in minutes
  has_timer: { type: Boolean, default: false },
  tips: { type: [String], default: [] } // Tips for this specific step
}, { _id: false });

// Schema for ingredient items within a group
const ingredientItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  note: { type: String }
}, { _id: false });

// Schema for ingredient groups
const ingredientGroupSchema = new mongoose.Schema({
  group: { type: String }, // e.g., "Phần bánh", "Phần nhân"
  items: { type: [ingredientItemSchema], required: true }
}, { _id: false });

// Main recipe detail schema stored in MongoDB
const recipeDetailSchema = new mongoose.Schema({
  // Use string UUIDs from the SQL side
  recipe_id: { type: String, required: true, unique: true, index: true },
  post_id: { type: String, required: true, index: true },

  // Flexible ingredient structure with grouping
  ingredients: { type: [ingredientGroupSchema], required: true, default: [] },

  // Step-by-step cooking instructions
  steps: { type: [stepSchema], required: true, default: [] },

  // Versioning to track recipe changes
  version: { type: Number, default: 1 }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Index for versioning queries
recipeDetailSchema.index({ recipe_id: 1, version: 1 });

// Helper method to get total cooking time
recipeDetailSchema.methods.getTotalDuration = function() {
  return this.steps.reduce((total, step) => total + (step.duration || 0), 0);
};

// Helper method to get all ingredient names (flattened)
recipeDetailSchema.methods.getAllIngredientNames = function() {
  const names = [];
  this.ingredients.forEach(group => {
    group.items.forEach(item => {
      names.push(item.name);
    });
  });
  return names;
};

module.exports = mongoose.model('RecipeDetail', recipeDetailSchema);
