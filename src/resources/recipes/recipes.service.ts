import { RecipeDocument } from 'src/interfaces/mongoose.gen';
import mongoose from 'mongoose';
import recipesRepo from './recipes.repo';
import Recipe from './recipes.model';

const getId = mongoose.Types.ObjectId;

class RecipesService {
  getAll = (): Promise<RecipeDocument[]> => recipesRepo.getAll();

  getById = (id: string): Promise<RecipeDocument | null> => recipesRepo.getById(getId(id));

  add = (recipe: RecipeDocument): Promise<RecipeDocument> => recipesRepo.add(new Recipe(recipe));

  upd = (id: string, recipe: RecipeDocument): Promise<RecipeDocument | null> =>
    recipesRepo.upd(getId(id), recipe);

  del = (id: string): Promise<RecipeDocument | null> => recipesRepo.del(getId(id));
}

export default new RecipesService();
