import { RecipeDocument, RecipeDescription } from 'src/interfaces/mongoose';
import Recipe from './recipes.model';

export default {
  async getAll(): Promise<RecipeDocument[]> {
    return Recipe.find().exec();
  },

  async getById(id: RecipeDocument['_id']): Promise<RecipeDocument | null> {
    return Recipe.findById(id).exec();
  },

  async add(recipe: RecipeDocument): Promise<RecipeDocument> {
    // like this more significant info will be shown in the console. Try to debug errorHandler
    // try {
    //   return await recipe.save();
    // } catch (e) {
    //   throw new Error(e);
    // }
    return await recipe.save();
  },

  async upd(id: string, recipe: RecipeDescription): Promise<RecipeDocument | null> {
    return await Recipe.findByIdAndUpdate(id, recipe).exec();
  },

  async del(id: RecipeDocument['_id']): Promise<RecipeDocument | null> {
    // const promise = new Promise<RecipeDocument | false>(resolve => {
    //   Recipe.findByIdAndRemove(id, (err, doc) => {
    //     if (err) resolve(false);
    //     else resolve(doc);
    //   });
    // });
    // return promise;
    return Recipe.findByIdAndRemove(id).exec();
  },
};
