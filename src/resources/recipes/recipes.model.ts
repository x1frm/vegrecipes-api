import mongoose from 'mongoose';
import { RecipeDocument, RecipeModel, RecipeSchema } from 'src/interfaces/mongoose';
import { objectIdGetter } from '../../common/model.utils';

mongoose.SchemaTypes.ObjectId.get(objectIdGetter);

export enum PageType {
  EXTERNAL = 'EXTERNAL',
  USER_DEFINED = 'USER_DEFINED',
}

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

const recipeDishTypeSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DishType',
    },
  },
  {
    _id: false,
  }
);

const recipeEquipmentSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DishType',
    },
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
  time: {
    // in minutes
    type: Number,
    min: 0,
    max: 43200,
  },
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
  dishTypes: [recipeDishTypeSchema],
  equipment: [recipeEquipmentSchema],
  page: {
    id: String,
    pageType: {
      type: String,
      enum: PageType,
    },
  },
});

recipeEquipmentSchema.set('toObject', { getters: true });
recipeEquipmentSchema.set('toJSON', { getters: true });

recipeIngredientSchema.set('toObject', { getters: true });
recipeIngredientSchema.set('toJSON', { getters: true });

recipeDishTypeSchema.set('toObject', { getters: true });
recipeDishTypeSchema.set('toJSON', { getters: true });

export default mongoose.model<RecipeDocument, RecipeModel>('Recipe', recipeSchema);
