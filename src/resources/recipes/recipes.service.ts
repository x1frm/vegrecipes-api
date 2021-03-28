import { RecipeDocument } from 'src/interfaces/mongoose.gen';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import scraper from 'website-scraper';
import recipesRepo from './recipes.repo';
import Recipe from './recipes.model';
import { getHostname } from '../../common/utils';

const getId = mongoose.Types.ObjectId;

class RecipesService {
  getAll = (): Promise<RecipeDocument[]> => recipesRepo.getAll();

  getById = (id: string): Promise<RecipeDocument | null> => recipesRepo.getById(getId(id));

  add = (recipe: RecipeDocument): Promise<RecipeDocument> => recipesRepo.add(new Recipe(recipe));

  upd = (id: string, recipe: RecipeDocument): Promise<RecipeDocument | null> =>
    recipesRepo.upd(getId(id), recipe);

  del = (id: string): Promise<RecipeDocument | null> => recipesRepo.del(getId(id));

  async saveExternalHTML(url: string): Promise<string> {
    const id = nanoid(12);

    await scraper({
      urls: [url],
      directory: `data/external-recipes/${id}`,
      maxRecursiveDepth: 1,
      maxDepth: 2,
      request: {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
        },
      },
      subdirectories: [
        { directory: 'img', extensions: ['.jpg', '.png', '.svg'] },
        { directory: 'js', extensions: ['.js'] },
        { directory: 'css', extensions: ['.css'] },
      ],
      urlFilter(sublinkUrl: string) {
        const hostname = getHostname(url);
        return sublinkUrl.includes(hostname);
      },
    });

    return id;
  }
}

export default new RecipesService();
