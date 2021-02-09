import mongoose from 'mongoose';
import { RecipeDocument, RecipeModel, RecipeSchema } from 'src/interfaces/mongoose.gen';

const recipeIngredientSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
    },
    amount: Number, // in percents
  },
  {
    _id: false,
  }
);

const recipeSchema: RecipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  ingredients: [recipeIngredientSchema],
  time: Number, // in minutes
  nutrition: {
    // in percents
    fat: Number,
    protein: Number,
    carbohydrates: Number,
  },
  dishTypes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DishType',
    },
  ],
  equipment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Equipment',
    },
  ],
});

export default mongoose.model<RecipeDocument, RecipeModel>('Recipe', recipeSchema);
