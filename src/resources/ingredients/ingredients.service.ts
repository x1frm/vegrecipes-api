import { IngredientDocument } from 'src/interfaces/mongoose';
import mongoose from 'mongoose';
import ingredientsRepo from './ingredients.repo';
import Ingredient from './ingredients.model';

const getId = mongoose.Types.ObjectId;

export const getAll = (): Promise<IngredientDocument[]> => ingredientsRepo.getAll();

export const getById = (id: string): Promise<IngredientDocument | null> =>
  ingredientsRepo.getById(getId(id));

export const add = (ingredient: IngredientDocument): Promise<IngredientDocument> =>
  ingredientsRepo.add(new Ingredient(ingredient));

export const upd = (
  id: string,
  ingredient: IngredientDocument
): Promise<IngredientDocument | null> => ingredientsRepo.upd(getId(id), ingredient);

export const del = (id: string): Promise<IngredientDocument | null> =>
  ingredientsRepo.del(getId(id));
