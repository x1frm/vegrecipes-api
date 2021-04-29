import { RecipeDocument, RecipeDescription } from 'src/interfaces/mongoose';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import scraper from 'website-scraper';
import { writeFile } from 'fs/promises';
import recipesRepo from './recipes.repo';
import Recipe, { PageType } from './recipes.model';
import { addProtocol, getHostname } from '../../common/utils';
import { RecipeRequestDto } from './recipe.dto';

const getId = mongoose.Types.ObjectId;

class RecipesService {
  getAll = (): Promise<RecipeDocument[]> => recipesRepo.getAll();

  getById = (id: string): Promise<RecipeDocument | null> => recipesRepo.getById(getId(id));

  async add(recipeDto: RecipeRequestDto): Promise<RecipeDocument> {
    const recipe = await this.savePage(recipeDto);

    return await recipesRepo.add(new Recipe(recipe));
  }

  async upd(id: string, recipeDto: RecipeRequestDto): Promise<RecipeDocument | null> {
    let recipe: RecipeDescription = recipeDto;

    if (recipeDto.pageHTML) {
      recipe = await this.savePage(recipeDto);
    } else if (!recipeDto.pageUrl) {
      recipe = recipeDto;
    } else {
      const oldRecipe = await this.getById(id);

      if (oldRecipe?.page?.url !== recipeDto.pageUrl) {
        recipe = await this.savePage(recipeDto);
      } else {
        recipe = {
          ...recipeDto,
          page: oldRecipe.page,
        };
      }
    }

    return await recipesRepo.upd(id, recipe);
  }

  del = (id: string): Promise<RecipeDocument | null> => recipesRepo.del(getId(id));

  async savePage(recipeDto: RecipeRequestDto): Promise<RecipeDescription> {
    let recipe: RecipeDescription;

    if (recipeDto.pageUrl) {
      const url = addProtocol(recipeDto.pageUrl);
      const pageId = await this.saveExternalHTML(url);
      const { pageUrl, pageHTML, ...recipeExternal } = {
        ...recipeDto,
        page: {
          id: pageId,
          pageType: PageType.EXTERNAL,
          url,
        },
      };

      recipe = recipeExternal;
    } else if (recipeDto.pageHTML) {
      const pageId = await this.saveUserHTML(recipeDto.pageHTML);
      const { pageUrl, pageHTML, ...userRecipe } = {
        ...recipeDto,
        page: {
          id: pageId,
          pageType: PageType.USER_DEFINED,
        },
      };

      recipe = userRecipe;
    } else {
      throw new Error('Page URL or HTML is required');
    }

    return recipe;
  }

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

  async saveUserHTML(html: string): Promise<string> {
    const id = nanoid(12);

    await writeFile(`data/user-recipes/${id}.html`, html);
    return id;
  }
}

export default new RecipesService();
