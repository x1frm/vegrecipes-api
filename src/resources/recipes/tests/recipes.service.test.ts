import { readFile } from 'fs';
import { RecipeRequestDto } from '../recipe.dto';
import { PageType } from '../recipes.model';
import recipesService from '../recipes.service';
import {
  getRecipeRequestData,
  getRecipeResponseData,
  mockSaveExtHtml,
  mockSavePage,
} from './helpers';

const url = getRecipeRequestData().pageUrl;

const addOne = async (mergeObj?: Partial<RecipeRequestDto>) =>
  await recipesService.add(getRecipeRequestData({ ...mergeObj }));

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

describe('Recipes Service', () => {
  const recipe = getRecipeRequestData();

  describe('savePage method', () => {
    it('Calls saveExternalHTML when pageUrl is provided and returns RecipeDescription', async () => {
      expect.assertions(3);
      const saveExternalHTML = mockSaveExtHtml();

      const recipeDesc = await recipesService.savePage(recipe);

      expect(saveExternalHTML).toHaveBeenCalledTimes(1);
      expect(saveExternalHTML).toHaveBeenCalledWith(recipe.pageUrl);
      expect(recipeDesc).toMatchObject(getRecipeResponseData());
    });

    it('fails if no pageUrl or pageHTML is provided', async () => {
      expect.assertions(2);

      const incorrect = getRecipeRequestData({ pageUrl: undefined });
      const saveExternalHTML = mockSaveExtHtml();

      const promise = recipesService.savePage(incorrect);

      await expect(promise).rejects.toThrow();
      expect(saveExternalHTML).not.toHaveBeenCalled();
    });

    it('Writes page info into description object', async () => {
      expect.assertions(3);

      mockSaveExtHtml();

      const recipeDesc = await recipesService.savePage(recipe);

      expect(recipeDesc.page?.id).toHaveLength(12);
      expect(recipeDesc.page?.pageType).toBe(PageType.EXTERNAL);
      expect(recipeDesc.page?.url).toBe(url);
    });
  });
});

describe('Recipes Service basic CRUD methods', () => {
  describe('UPD', () => {
    beforeEach(() => {
      mockSaveExtHtml();
    });

    it('doesnt call savePage if pageURL is not changed', async () => {
      expect.assertions(2);

      const recipe = await addOne();
      const savePage = mockSavePage();

      const updated = await recipesService.upd(recipe.id, getRecipeRequestData());

      expect(savePage).not.toHaveBeenCalled();
      expect(updated?.toObject()).toMatchObject(getRecipeResponseData());
    });

    it('calls savePage if new pageURL is provided', async () => {
      expect.assertions(2);

      const recipe = await addOne();
      const savePage = mockSavePage();

      const updated = await recipesService.upd(
        recipe.id,
        getRecipeRequestData({ pageUrl: 'http://example.com' })
      );

      expect(savePage).toHaveBeenCalledTimes(1);
      expect(updated?.toObject()).toMatchObject(getRecipeResponseData());
    });

    it("doesn't call savePage if pageURL or pageHTML is not provided", async () => {
      expect.assertions(2);

      const recipe = await addOne();
      const savePage = mockSavePage();

      const updated = await recipesService.upd(
        recipe.id,
        getRecipeRequestData({ pageUrl: undefined })
      );

      expect(savePage).not.toHaveBeenCalled();
      expect(updated?.toObject()).toMatchObject(getRecipeResponseData());
    });

    it('calls savePage if pageHTML is provided', async () => {
      expect.assertions(2);

      const recipe = await addOne({ pageUrl: undefined, pageHTML: '<div></div>' });
      const savePage = mockSavePage();

      const updated = await recipesService.upd(recipe.id, getRecipeRequestData());

      expect(savePage).toHaveBeenCalledTimes(1);
      expect(updated?.toObject()).toMatchObject(getRecipeResponseData());
    });

    // it('completely replaces old object', async () => {
    //   expect.assertions(3);

    //   const updatedDesc: RecipeRequestDto = {
    //     name: 'BrandNew',
    //     pageHTML: '<div></div>',
    //   };
    //   const recipe = await addOne();
    //   const expected = {
    //     name: updatedDesc.name,
    //   };

    //   const updated = await recipesService.upd(recipe.id, updatedDesc);

    //   expect(updated?.toObject()).toMatchObject(expected);
    //   expect(updated?.page?.url).not.toBeDefined();
    //   expect(updated?.description).not.toBeDefined();
    // });
  });

  describe('ADD', () => {
    it('throws an error if pageURL or pageHTML is not provided', async () => {
      expect.assertions(1);

      const promise = recipesService.add(getRecipeRequestData({ pageUrl: undefined }));

      return expect(promise).rejects.toThrow();
    });

    describe('with external page url provided', () => {
      const recipe = getRecipeRequestData({ pageUrl: url });

      it('calls saveExternalHTML', async () => {
        expect.assertions(3);
        const saveExternalHTML = mockSaveExtHtml();

        const recipeDoc = await recipesService.add(recipe);

        expect(saveExternalHTML).toHaveBeenCalled();
        expect(recipeDoc.page?.id).toHaveLength(12);
        expect(recipeDoc.page?.pageType).toBe(PageType.EXTERNAL);
      });
    });

    describe('with no external page url provided', () => {
      const recipe = getRecipeRequestData({ pageUrl: undefined, pageHTML: '<div></div>' });

      it('does not call a saveExternalHTML', async () => {
        expect.assertions(3);
        const saveExternalHTML = mockSaveExtHtml();

        const recipeDoc = await recipesService.add(recipe);

        expect(saveExternalHTML).not.toHaveBeenCalled();
        expect(recipeDoc.page?.id).not.toBeDefined();
        expect(recipeDoc.page?.pageType).not.toBeDefined();
      });
    });
  });
});
