import { readFile } from 'fs';
import { PageType } from '../recipes.model';
import recipesService from '../recipes.service';
import { getRecipeRequestData } from './helpers';

const url = 'https://eda.ru/recepty/osnovnye-blyuda/bulgur-s-tikvoj-52694';

// describe('saveExternalHTML method', () => {
//   it('Saves external recipe from URL to a local file', async () => {
//     expect.assertions(2);

//     const id = await recipesService.saveExternalHTML(url);

//     expect(id).toHaveLength(12);

//     return new Promise((resolve, reject) => {
//       readFile(`data/external-recipes/${id}/index.html`, 'utf-8', (err, data) => {
//         if (err) reject(err);
//         expect(data).toContain('Булгур с тыквой');
//         resolve(0);
//       });
//     });
//   });
// });

describe('Recipes Service basic CRUD methods', () => {
  const makeMock = () =>
    jest
      .spyOn(recipesService, 'saveExternalHTML')
      .mockImplementation()
      .mockReturnValue(Promise.resolve('aaabbbcccddd'));

  describe('with external page url provided', () => {
    const recipe = getRecipeRequestData({ pageUrl: url });

    it('calls a saveExternalHTML from "add" method', async () => {
      expect.assertions(3);
      const saveExternalHTML = makeMock();

      const recipeDoc = await recipesService.add(recipe);

      expect(saveExternalHTML).toHaveBeenCalled();
      expect(recipeDoc.page?.id).toHaveLength(12);
      expect(recipeDoc.page?.pageType).toBe(PageType.EXTERNAL);
    });
  });

  describe('with no external page url provided', () => {
    const recipe = getRecipeRequestData();

    it('does not call a saveExternalHTML from "add" method', async () => {
      expect.assertions(3);
      const saveExternalHTML = makeMock();

      const recipeDoc = await recipesService.add(recipe);

      expect(saveExternalHTML).not.toHaveBeenCalled();
      expect(recipeDoc.page?.id).not.toBeDefined();
      expect(recipeDoc.page?.pageType).not.toBeDefined();
    });
  });
});
