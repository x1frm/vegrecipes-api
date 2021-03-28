import { RecipeDocument } from 'src/interfaces/mongoose.gen';
import mongoose from 'mongoose';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { createWriteStream } from 'fs';
import recipesRepo from './recipes.repo';
import Recipe from './recipes.model';
import logger, { debug } from '../../common/logger';

const dbg = debug('recipes:service');

const getId = mongoose.Types.ObjectId;

class RecipesService {
  getAll = (): Promise<RecipeDocument[]> => recipesRepo.getAll();

  getById = (id: string): Promise<RecipeDocument | null> => recipesRepo.getById(getId(id));

  add = (recipe: RecipeDocument): Promise<RecipeDocument> => recipesRepo.add(new Recipe(recipe));

  upd = (id: string, recipe: RecipeDocument): Promise<RecipeDocument | null> =>
    recipesRepo.upd(getId(id), recipe);

  del = (id: string): Promise<RecipeDocument | null> => recipesRepo.del(getId(id));

  async saveExternalHTML(url: string): Promise<string> {
    const res = await axios({
      method: 'GET',
      url,
      responseType: 'stream',
    });
    const id = nanoid(12);

    dbg(res);

    const body = res.data as NodeJS.ReadStream;
    const writeStream = createWriteStream(`data/external-recipes/${id}.html`);

    return await new Promise((resolve, reject) => {
      body.pipe(writeStream);
      body.on('error', reject);
      writeStream.on('finish', () => resolve(id));
    });
  }
}

export default new RecipesService();
