import mongoose from 'mongoose';
import { IngredientDocument, IngredientModel, IngredientSchema } from 'src/interfaces/mongoose.gen';
import { getSimilarStringValidator, nameSetter } from '../../common/model.utils';

const ingredientSchema: IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
    set: nameSetter,
    validate: getSimilarStringValidator('name'),
  },
  availableInDixy: Boolean,
  price: {
    // per 1 kg, in RUB
    type: Number,
    min: 0,
    max: 100000,
  },
  ingredientType: [String],
});

export default mongoose.model<IngredientDocument, IngredientModel>('Ingredient', ingredientSchema);
