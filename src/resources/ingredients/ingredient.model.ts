import mongoose from 'mongoose';
import { IngredientDocument, IngredientModel, IngredientSchema } from 'src/interfaces/mongoose.gen';

const ingredientSchema: IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  availableInDixy: Boolean,
  price: Number, // per 1 kg, in RUB
  ingredientType: [String],
});

export default mongoose.model<IngredientDocument, IngredientModel>('Ingredient', ingredientSchema);
