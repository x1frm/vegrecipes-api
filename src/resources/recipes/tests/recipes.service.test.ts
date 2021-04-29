import { readFile } from 'fs';
import { RecipeRequestDto } from '../recipe.dto';
import { PageType } from '../recipes.model';
import recipesService from '../recipes.service';
import {
  getRecipeRequestData,
  getRecipeResponseData,
  mockSaveExtHtml,
  mockSavePage,
  pageId,
} from './helpers';

beforeEach(() => {
  jest
    .spyOn(recipesService, 'saveUserHTML')
    .mockImplementation()
    .mockReturnValue(Promise.resolve(pageId));
  mockSaveExtHtml();
});

const url = getRecipeRequestData().pageUrl;

const addOne = async (...args: Parameters<typeof getRecipeRequestData>) =>
  await recipesService.add(getRecipeRequestData(...args));

describe('Recipes Service', () => {
  const recipe = getRecipeRequestData();

  describe('savePage method', () => {
    describe('when pageUrl is provided', () => {
      it('Calls saveExternalHTML', async () => {
        expect.assertions(2);
        const saveExternalHTML = mockSaveExtHtml();

        await recipesService.savePage(recipe);

        expect(saveExternalHTML).toHaveBeenCalledTimes(1);
        expect(saveExternalHTML).toHaveBeenCalledWith(recipe.pageUrl);
      });

      it('Returns RecipeDescription', async () => {
        expect.assertions(1);

        const recipeDesc = await recipesService.savePage(recipe);

        expect(recipeDesc).toMatchObject(getRecipeResponseData());
      });
    });

    describe('when no pageUrl or pageHTML is provided', () => {
      it('throws an error', async () => {
        expect.assertions(2);

        const incorrect = getRecipeRequestData(undefined, ['pageUrl']);
        const saveExternalHTML = mockSaveExtHtml();

        const promise = recipesService.savePage(incorrect);

        await expect(promise).rejects.toThrow();
        expect(saveExternalHTML).not.toHaveBeenCalled();
      });
    });

    describe('When pageHtml is provided', () => {
      it('Calls saveUserHTML', async () => {
        expect.assertions(2);

        const saveUserHTML = jest.spyOn(recipesService, 'saveUserHTML').mockImplementation();
        const recipe2 = getRecipeRequestData({ pageHTML: '<div></div>' }, ['pageUrl']);

        await recipesService.savePage(recipe2);

        expect(saveUserHTML).toHaveBeenCalledTimes(1);
        expect(saveUserHTML).toHaveBeenCalledWith(recipe2.pageHTML);
      });

      it('Returns RecipeDescription', async () => {
        expect.assertions(1);

        const id = 'qqqwwweeerrr';
        jest
          .spyOn(recipesService, 'saveUserHTML')
          .mockImplementation()
          .mockReturnValue(Promise.resolve(id));
        const recipe2 = getRecipeRequestData({ pageHTML: '<div></div>' }, ['pageUrl']);
        const expected = getRecipeResponseData(
          {
            page: {
              id,
              pageType: PageType.USER_DEFINED,
            },
          },
          ['page']
        );

        const recipeDesc = await recipesService.savePage(recipe2);

        expect(recipeDesc).toMatchObject(expected);
      });
    });
  });
});

describe('Recipes Service basic CRUD methods', () => {
  describe('UPD', () => {
    describe('When pageUrl is provided, but not changed', () => {
      it('Does not call savePage', async () => {
        expect.assertions(1);

        const recipe = await addOne();
        const savePage = mockSavePage();

        await recipesService.upd(recipe.id, getRecipeRequestData());

        expect(savePage).not.toHaveBeenCalled();
      });

      it('Returns correct RecipeDocument', async () => {
        expect.assertions(1);

        const recipe = await addOne();

        const updated = await recipesService.upd(recipe.id, getRecipeRequestData());

        expect(updated?.toObject()).toMatchObject(getRecipeResponseData());
      });
    });

    describe('When brand new pageUrl is provided', () => {
      it('Calls savePage', async () => {
        expect.assertions(2);

        const oldRecipe = await addOne();
        const savePage = mockSavePage();
        const updatedReq = getRecipeRequestData({ pageUrl: 'http://example.com' });

        await recipesService.upd(oldRecipe.id, updatedReq);

        expect(savePage).toHaveBeenCalledTimes(1);
        expect(savePage).toHaveBeenCalledWith(updatedReq);
      });

      it('Returns correct RecipeDocument', async () => {
        expect.assertions(1);

        const oldRecipe = await addOne();
        const updatedReq = getRecipeRequestData({ pageUrl: 'http://example.com' });

        const updatedDoc = await recipesService.upd(oldRecipe.id, updatedReq);

        expect(updatedDoc?.toObject()).toMatchObject(
          getRecipeResponseData({
            page: {
              url: 'http://example.com',
              pageType: PageType.EXTERNAL,
              id: pageId,
            },
          })
        );
      });
    });

    describe('When pageUrl is provided instead of pageHtml', () => {
      const htmlRecipeReq = getRecipeRequestData({ pageHTML: '<div></div>' }, ['pageUrl']);

      it('Calls savePage', async () => {
        expect.assertions(2);

        const oldRecipe = await recipesService.add(htmlRecipeReq);
        const savePage = mockSavePage();
        const updatedReq = getRecipeRequestData({ pageUrl: 'http://example.com' });

        await recipesService.upd(oldRecipe.id, updatedReq);

        expect(savePage).toHaveBeenCalledTimes(1);
        expect(savePage).toHaveBeenCalledWith(updatedReq);
      });

      it('Returns correct RecipeDocument', async () => {
        expect.assertions(1);

        const oldRecipe = await recipesService.add(htmlRecipeReq);
        const updatedReq = getRecipeRequestData({ pageUrl: 'http://example.com' });

        const updatedDoc = await recipesService.upd(oldRecipe.id, updatedReq);

        expect(updatedDoc?.toObject()).toMatchObject(
          getRecipeResponseData({
            page: {
              url: 'http://example.com',
              pageType: PageType.EXTERNAL,
              id: pageId,
            },
          })
        );
      });
    });

    describe('When no page info is provided', () => {
      const noPageRecipe = getRecipeRequestData(undefined, ['pageUrl']);

      it("doesn't call savePage", async () => {
        expect.assertions(1);

        const recipe = await addOne();
        const savePage = mockSavePage();

        await recipesService.upd(recipe.id, noPageRecipe);

        expect(savePage).not.toHaveBeenCalled();
      });

      it('returns correct RecipeDocument', async () => {
        expect.assertions(1);

        const recipe = await addOne();
        mockSavePage();
        const expected = getRecipeResponseData({
          page: {
            id: pageId,
            url,
            pageType: PageType.EXTERNAL,
          },
        });

        const updated = await recipesService.upd(recipe.id, noPageRecipe);

        expect(updated?.toObject()).toMatchObject(expected);
      });
    });

    describe('When pageHtml is provided', () => {
      const htmlRecipeReq = getRecipeRequestData({ pageHTML: '<div></div>' }, ['pageUrl']);

      it('Calls savePage', async () => {
        expect.assertions(2);

        const oldRecipe = await recipesService.add(htmlRecipeReq);
        const savePage = mockSavePage();
        const updatedReq = htmlRecipeReq;

        await recipesService.upd(oldRecipe.id, updatedReq);

        expect(savePage).toHaveBeenCalledTimes(1);
        expect(savePage).toHaveBeenCalledWith(updatedReq);
      });

      it('Returns correct RecipeDocument', async () => {
        expect.assertions(1);

        const oldRecipe = await recipesService.add(htmlRecipeReq);
        const updatedReq = getRecipeRequestData({ pageHTML: '<p></p>' }, ['pageUrl']);

        const updatedDoc = await recipesService.upd(oldRecipe.id, updatedReq);

        expect(updatedDoc?.toObject()).toMatchObject(
          getRecipeResponseData({
            page: {
              pageType: PageType.USER_DEFINED,
              id: pageId,
            },
          })
        );
      });
    });

    describe('When pageHtml is provided instead of pageUrl', () => {
      const htmlRecipeReq = getRecipeRequestData({ pageHTML: '<div></div>' }, ['pageUrl']);

      it('Calls savePage', async () => {
        expect.assertions(2);

        const oldRecipe = await addOne();
        const savePage = mockSavePage();
        const updatedReq = htmlRecipeReq;

        await recipesService.upd(oldRecipe.id, updatedReq);

        expect(savePage).toHaveBeenCalledTimes(1);
        expect(savePage).toHaveBeenCalledWith(updatedReq);
      });

      it('Returns correct RecipeDocument', async () => {
        expect.assertions(1);

        const oldRecipe = await addOne();
        const updatedReq = htmlRecipeReq;

        const updatedDoc = await recipesService.upd(oldRecipe.id, updatedReq);

        expect(updatedDoc?.toObject()).toMatchObject(
          getRecipeResponseData({
            page: {
              pageType: PageType.USER_DEFINED,
              id: pageId,
            },
          })
        );
      });
    });

    it('Changes only given properties of the document', async () => {
      expect.assertions(3);

      const recipe = await addOne();
      const updateDesc: RecipeRequestDto = {
        name: 'BrandNew',
        pageHTML: '<div></div>',
      };
      const expected = getRecipeResponseData({
        name: updateDesc.name,
        page: {
          pageType: PageType.USER_DEFINED,
          id: pageId,
        },
      });

      const updated = await recipesService.upd(recipe.id, updateDesc);

      expect(updated?.toObject()).toMatchObject(expected);
      expect(updated?.description).toBe(getRecipeResponseData().description);
      expect(updated?.name).toBe(updateDesc.name);
    });

    // it('Removes properties with "undefined" value', async () => {
    //   expect.assertions(2);

    //   const recipe = await addOne();
    //   const updateDesc: RecipeRequestDto = {
    //     name: 'BrandNew',
    //     description: undefined,
    //   };
    //   const expected = getRecipeResponseData(
    //     {
    //       name: updateDesc.name,
    //     },
    //     ['description']
    //   );

    //   const updated = await recipesService.upd(recipe.id, updateDesc);

    //   expect(updated?.toObject()).toMatchObject(expected);
    //   expect(updated?.description).not.toBeDefined();
    // });
  });

  describe('ADD', () => {
    it('throws an error if pageURL or pageHTML is not provided', async () => {
      expect.assertions(1);

      const promise = recipesService.add(getRecipeRequestData({ pageUrl: undefined }));

      return expect(promise).rejects.toThrow();
    });

    describe('With pageUrl provided', () => {
      const recipe = getRecipeRequestData({ pageUrl: url });

      it('Calls saveExternalHTML', async () => {
        expect.assertions(2);
        const saveExternalHTML = mockSaveExtHtml();

        await recipesService.add(recipe);

        expect(saveExternalHTML).toHaveBeenCalled();
        expect(saveExternalHTML).toHaveBeenCalledWith(recipe.pageUrl);
      });

      it('Returns correct RecipeDocument', async () => {
        expect.assertions(3);

        const recipeDoc = await recipesService.add(recipe);

        expect(recipeDoc.page?.id).toHaveLength(12);
        expect(recipeDoc.page?.pageType).toBe(PageType.EXTERNAL);
        expect(recipeDoc.toObject()).toMatchObject(getRecipeResponseData());
      });
    });

    describe('With pageHtml provided', () => {
      const recipe = getRecipeRequestData({ pageHTML: '<div></div>' }, ['pageUrl']);

      it('Does not call saveExternalHTML', async () => {
        expect.assertions(1);
        const saveExternalHTML = mockSaveExtHtml();

        await recipesService.add(recipe);

        expect(saveExternalHTML).not.toHaveBeenCalled();
      });

      it('Returns correct RecipeDocument', async () => {
        expect.assertions(2);

        const expected = getRecipeResponseData({
          page: {
            id: pageId,
            pageType: PageType.USER_DEFINED,
          },
        });

        const recipeDoc = await recipesService.add(recipe);

        expect(recipeDoc.page?.url).not.toBeDefined();
        expect(recipeDoc.toObject()).toMatchObject(expected);
      });
    });
  });
});
