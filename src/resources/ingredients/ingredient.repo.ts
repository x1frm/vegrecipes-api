import { IngredientDocument } from 'src/interfaces/mongoose.gen';
import Ingredient from './ingredient.model';

export default {
  async getAll(): Promise<IngredientDocument[]> {
    return Ingredient.find().exec();
  },

  async getById(id: IngredientDocument['_id']): Promise<IngredientDocument | null> {
    return Ingredient.findById(id).exec();
  },

  async add(ingredient: IngredientDocument): Promise<IngredientDocument> {
    // like this more significant info will be shown in the console. Try to debug errorHandler
    // try {
    //   return await ingredient.save();
    // } catch (e) {
    //   throw new Error(e);
    // }
    return ingredient.save();
  },

  async upd(
    id: IngredientDocument['_id'],
    ingredient: IngredientDocument
  ): Promise<IngredientDocument | null> {
    return Ingredient.findByIdAndUpdate(id, ingredient, { new: true }).exec();
  },

  async del(id: IngredientDocument['_id']): Promise<IngredientDocument | null> {
    // const promise = new Promise<IngredientDocument | false>(resolve => {
    //   Ingredient.findByIdAndRemove(id, (err, doc) => {
    //     if (err) resolve(false);
    //     else resolve(doc);
    //   });
    // });
    // return promise;
    return Ingredient.findByIdAndRemove(id).exec();
  },
};
