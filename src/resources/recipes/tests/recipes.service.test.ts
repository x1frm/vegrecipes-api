import { RecipePostDto } from '../recipe.dto';
import { PageType } from '../recipes.model';
import recipesService from '../recipes.service';
import {
  getRecipePostDto,
  getRecipeResponseDto,
  mockSaveExtHtml,
  mockSavePage,
  mockSaveUserHtml,
  extPageId,
  userPageId,
} from './helpers';

let savePage = mockSavePage();
const saveUserHTML = mockSaveUserHtml();
const saveExternalHTML = mockSaveExtHtml();

beforeEach(() => {
  savePage.mockRestore();
});

const url = getRecipePostDto().pageUrl;

const addOne = async (...args: Parameters<typeof getRecipePostDto>) =>
  await recipesService.add(getRecipePostDto(...args));

describe('Recipes Service', () => {
  const recipe = getRecipePostDto();

  describe('savePage method', () => {
    describe('when pageUrl is provided', () => {
      it('Calls saveExternalHTML', async () => {
        expect.assertions(2);

        await recipesService.savePage(recipe);

        expect(saveExternalHTML).toHaveBeenCalledTimes(1);
        expect(saveExternalHTML).toHaveBeenCalledWith(recipe.pageUrl);
      });

      it('Returns RecipeDescription', async () => {
        expect.assertions(1);

        const recipeDesc = await recipesService.savePage(recipe);

        expect(recipeDesc).toMatchObject(getRecipeResponseDto());
      });
    });

    describe('when no pageUrl or pageHTML is provided', () => {
      it('throws an error', async () => {
        expect.assertions(2);

        const incorrect = getRecipePostDto(undefined, ['pageUrl']);

        const promise = recipesService.savePage(incorrect);

        await expect(promise).rejects.toThrow();
        expect(saveExternalHTML).not.toHaveBeenCalled();
      });
    });

    describe('When pageHtml is provided', () => {
      it('Calls saveUserHTML', async () => {
        expect.assertions(2);

        const recipe2 = getRecipePostDto({ pageHTML: '<div></div>' }, ['pageUrl']);

        await recipesService.savePage(recipe2);

        expect(saveUserHTML).toHaveBeenCalledTimes(1);
        expect(saveUserHTML).toHaveBeenCalledWith(recipe2.pageHTML);
      });

      it('Returns RecipeDescription', async () => {
        expect.assertions(1);

        const recipe2 = getRecipePostDto({ pageHTML: '<div></div>' }, ['pageUrl']);
        const expected = getRecipeResponseDto(
          {
            page: {
              id: userPageId,
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
        savePage = mockSavePage();

        await recipesService.upd(recipe.id, getRecipePostDto());

        expect(savePage).not.toHaveBeenCalled();
      });

      it('Returns correct RecipeDocument', async () => {
        expect.assertions(1);

        const recipe = await addOne();

        const updated = await recipesService.upd(recipe.id, getRecipePostDto());

        expect(updated?.toObject()).toMatchObject(getRecipeResponseDto());
      });
    });

    describe('When brand new pageUrl is provided', () => {
      it('Calls savePage', async () => {
        expect.assertions(2);

        const oldRecipe = await addOne();
        savePage = mockSavePage();
        const updatedReq = getRecipePostDto({ pageUrl: 'http://example.com' });

        await recipesService.upd(oldRecipe.id, updatedReq);

        expect(savePage).toHaveBeenCalledTimes(1);
        expect(savePage).toHaveBeenCalledWith(updatedReq);
      });

      it('Returns correct RecipeDocument', async () => {
        expect.assertions(1);

        const oldRecipe = await addOne();
        const updatedReq = getRecipePostDto({ pageUrl: 'http://example.com' });

        const updatedDoc = await recipesService.upd(oldRecipe.id, updatedReq);

        expect(updatedDoc?.toObject()).toMatchObject(
          getRecipeResponseDto({
            page: {
              url: 'http://example.com',
              pageType: PageType.EXTERNAL,
              id: extPageId,
            },
          })
        );
      });
    });

    describe('When pageUrl is provided instead of pageHtml', () => {
      const htmlRecipeReq = getRecipePostDto({ pageHTML: '<div></div>' }, ['pageUrl']);

      it('Calls savePage', async () => {
        expect.assertions(2);

        const oldRecipe = await recipesService.add(htmlRecipeReq);
        savePage = mockSavePage();
        const updatedReq = getRecipePostDto({ pageUrl: 'http://example.com' });

        await recipesService.upd(oldRecipe.id, updatedReq);

        expect(savePage).toHaveBeenCalledTimes(1);
        expect(savePage).toHaveBeenCalledWith(updatedReq);
      });

      it('Returns correct RecipeDocument', async () => {
        expect.assertions(1);

        const oldRecipe = await recipesService.add(htmlRecipeReq);
        const updatedReq = getRecipePostDto({ pageUrl: 'http://example.com' });

        const updatedDoc = await recipesService.upd(oldRecipe.id, updatedReq);

        expect(updatedDoc?.toObject()).toMatchObject(
          getRecipeResponseDto({
            page: {
              url: 'http://example.com',
              pageType: PageType.EXTERNAL,
              id: extPageId,
            },
          })
        );
      });
    });

    describe('When no page info is provided', () => {
      const noPageRecipe = getRecipePostDto(undefined, ['pageUrl']);

      it("doesn't call savePage", async () => {
        expect.assertions(1);

        const recipe = await addOne();
        savePage = mockSavePage();

        await recipesService.upd(recipe.id, noPageRecipe);

        expect(savePage).not.toHaveBeenCalled();
      });

      it('returns correct RecipeDocument', async () => {
        expect.assertions(1);

        const recipe = await addOne();
        mockSavePage();
        const expected = getRecipeResponseDto({
          page: {
            id: extPageId,
            url,
            pageType: PageType.EXTERNAL,
          },
        });

        const updated = await recipesService.upd(recipe.id, noPageRecipe);

        expect(updated?.toObject()).toMatchObject(expected);
      });
    });

    describe('When pageHtml is provided', () => {
      const htmlRecipeReq = getRecipePostDto({ pageHTML: '<div></div>' }, ['pageUrl']);

      it('Calls savePage', async () => {
        expect.assertions(2);

        const oldRecipe = await recipesService.add(htmlRecipeReq);
        savePage = mockSavePage();
        const updatedReq = htmlRecipeReq;

        await recipesService.upd(oldRecipe.id, updatedReq);

        expect(savePage).toHaveBeenCalledTimes(1);
        expect(savePage).toHaveBeenCalledWith(updatedReq);
      });

      it('Returns correct RecipeDocument', async () => {
        expect.assertions(1);

        const oldRecipe = await recipesService.add(htmlRecipeReq);
        const updatedReq = getRecipePostDto({ pageHTML: '<p></p>' }, ['pageUrl']);

        const updatedDoc = await recipesService.upd(oldRecipe.id, updatedReq);

        expect(updatedDoc?.toObject()).toMatchObject(
          getRecipeResponseDto({
            page: {
              pageType: PageType.USER_DEFINED,
              id: userPageId,
            },
          })
        );
      });
    });

    describe('When pageHtml is provided instead of pageUrl', () => {
      const htmlRecipeReq = getRecipePostDto({ pageHTML: '<div></div>' }, ['pageUrl']);

      it('Calls savePage', async () => {
        expect.assertions(2);

        const oldRecipe = await addOne();
        savePage = mockSavePage();
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
          getRecipeResponseDto({
            page: {
              pageType: PageType.USER_DEFINED,
              id: userPageId,
            },
          })
        );
      });
    });

    it('Changes only given properties of the document', async () => {
      expect.assertions(3);

      const recipe = await addOne();
      const updateDesc: RecipePostDto = {
        name: 'BrandNew',
        pageHTML: '<div></div>',
      };
      const expected = getRecipeResponseDto({
        name: updateDesc.name,
        page: {
          pageType: PageType.USER_DEFINED,
          id: userPageId,
        },
      });

      const updated = await recipesService.upd(recipe.id, updateDesc);

      expect(updated?.toObject()).toMatchObject(expected);
      expect(updated?.description).toBe(getRecipeResponseDto().description);
      expect(updated?.name).toBe(updateDesc.name);
    });

    it('Removes properties with "undefined" value', async () => {
      expect.assertions(2);

      const recipe = await addOne();
      const updateDesc: RecipePostDto = {
        name: 'BrandNew',
        description: undefined,
      };
      const expected = getRecipeResponseDto(
        {
          name: updateDesc.name,
        },
        ['description']
      );

      const updated = await recipesService.upd(recipe.id, updateDesc);

      expect(updated?.toObject()).toMatchObject(expected);
      expect(updated?.description).not.toBeDefined();
    });
  });

  describe('ADD', () => {
    it('throws an error if pageURL or pageHTML is not provided', async () => {
      expect.assertions(1);

      const promise = recipesService.add(getRecipePostDto({ pageUrl: undefined }));

      return expect(promise).rejects.toThrow();
    });

    describe('With pageUrl provided', () => {
      const recipe = getRecipePostDto({ pageUrl: url });

      it('Calls saveExternalHTML', async () => {
        expect.assertions(2);

        await recipesService.add(recipe);

        expect(saveExternalHTML).toHaveBeenCalled();
        expect(saveExternalHTML).toHaveBeenCalledWith(recipe.pageUrl);
      });

      it('Returns correct RecipeDocument', async () => {
        expect.assertions(3);

        const recipeDoc = await recipesService.add(recipe);

        expect(recipeDoc.page?.id).toHaveLength(12);
        expect(recipeDoc.page?.pageType).toBe(PageType.EXTERNAL);
        expect(recipeDoc.toObject()).toMatchObject(getRecipeResponseDto());
      });
    });

    describe('With pageHtml provided', () => {
      const recipe = getRecipePostDto({ pageHTML: '<div></div>' }, ['pageUrl']);

      it('Does not call saveExternalHTML', async () => {
        expect.assertions(1);

        await recipesService.add(recipe);

        expect(saveExternalHTML).not.toHaveBeenCalled();
      });

      it('Returns correct RecipeDocument', async () => {
        expect.assertions(2);

        const expected = getRecipeResponseDto({
          page: {
            id: userPageId,
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
