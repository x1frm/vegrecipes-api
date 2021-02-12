import mongoose from 'mongoose';
import { RecipeDocument, RecipeModel, RecipeSchema } from 'src/interfaces/mongoose.gen';

const recipeIngredientSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
      required: true,
    },
    amount: {
      type: Number,
      max: 100,
      min: 0,
    }, // in percents
  },
  {
    _id: false,
  }
);

const recipeSchema: RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  description: {
    type: String,
    maxlength: 1000,
  },
  ingredients: [recipeIngredientSchema],
  time: Number, // in minutes
  nutrition: {
    // in percents
    fat: {
      type: Number,
      max: 100,
      min: 0,
    },
    protein: {
      type: Number,
      max: 100,
      min: 0,
    },
    carbohydrates: {
      type: Number,
      max: 100,
      min: 0,
    },
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
