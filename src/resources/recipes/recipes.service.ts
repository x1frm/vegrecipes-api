import { RecipeDocument } from 'src/interfaces/mongoose.gen';
import mongoose from 'mongoose';
import recipesRepo from './recipes.repo';
import Recipe from './recipes.model';

const getId = mongoose.Types.ObjectId;

export const getAll = (): Promise<RecipeDocument[]> => recipesRepo.getAll();

export const getById = (id: string): Promise<RecipeDocument | null> =>
  recipesRepo.getById(getId(id));

export const add = (recipe: RecipeDocument): Promise<RecipeDocument> =>
  recipesRepo.add(new Recipe(recipe));

export const upd = (id: string, recipe: RecipeDocument): Promise<RecipeDocument | null> =>
  recipesRepo.upd(getId(id), recipe);

export const del = (id: string): Promise<RecipeDocument | null> => recipesRepo.del(getId(id));
