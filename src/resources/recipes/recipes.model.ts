import mongoose from 'mongoose';
import { RecipeDocument, RecipeModel, RecipeSchema } from 'src/interfaces/mongoose';
import {
  MAX_RECIPE_NAME_LENGTH,
  MAX_RECIPE_TIME,
  MAX_REIPE_DESCRIPTION_LENGTH,
} from '../../common/const';
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
    maxLength: MAX_RECIPE_NAME_LENGTH,
  },
  description: {
    type: String,
    maxlength: MAX_REIPE_DESCRIPTION_LENGTH,
  },
  ingredients: [recipeIngredientSchema],
  time: {
    // in minutes
    type: Number,
    min: 0,
    max: MAX_RECIPE_TIME,
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
    url: String,
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
