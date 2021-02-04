import mongoose from 'mongoose';
import { RecipeDocument, RecipeModel, RecipeSchema } from 'src/interfaces/mongoose.gen';

const ingredientKind: string[] = [];
const dishKind: string[] = [];

const equipmentSchema = new mongoose.Schema({
  name: String,
});

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  availableInDixy: Boolean,
  price: Number, // per 1 kg
  ingredientType: {
    type: [String],
    enum: ingredientKind,
  },
});

const recipeSchema: RecipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  ingredients: [
    {
      item: ingredientSchema,
      amount: Number, // in percents
    },
  ],
  time: Number, // in minutes
  nutrition: {
    // in percents
    fat: Number,
    protein: Number,
    carbohydrates: Number,
  },
  dishType: {
    type: [String],
    enum: dishKind,
  },
  equipment: [equipmentSchema],
});

// if (!recipeSchema.options.toJSON) recipeSchema.options.toJSON = {};
// recipeSchema.options.toJSON.transform = doc => {
//   const { id, title, columns } = doc;
//   return { id, title, columns };
// };

export default mongoose.model<RecipeDocument, RecipeModel>('Recipe', recipeSchema);
