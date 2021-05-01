/* eslint-disable @typescript-eslint/ban-ts-comment */
import faker from 'faker';
import { RecipeIngredientDto } from '../recipe.dto';
import { patchSchema, postSchema } from '../validation/recipes.schemas';
import { getRecipePostDto } from './helpers';

describe('Recipes joi schemas validation', () => {
  describe('PATCH', () => {
    it('Passes correct data', () => {
      const obj = getRecipePostDto(undefined, ['name']);

      const result = patchSchema.validate(obj);

      expect(result.error).not.toBeDefined();
    });

    it('Rejects object with extra field', () => {
      const obj = getRecipePostDto({
        // @ts-ignore
        extraField: 'kek',
      });

      const result = patchSchema.validate(obj);

      expect(result.error?.message).toContain('extraField');
    });

    it('Rejects object with deep extra field', () => {
      const obj = getRecipePostDto({
        nutrition: {
          // @ts-ignore
          deepExtraField: 'lol',
        },
      });

      const result = patchSchema.validate(obj);

      expect(result.error?.message).toContain('deepExtraField');
    });

    it('Rejects object with incorrect deep field', () => {
      const obj = getRecipePostDto({
        nutrition: {
          // @ts-ignore
          fat: 'what?',
        },
      });

      const result = patchSchema.validate(obj);

      expect(result.error?.message).toContain('fat');
    });

    it('Rejects object with two unique values', () => {
      const obj = getRecipePostDto();
      (obj.ingredients as RecipeIngredientDto[])[2] = {
        ...(obj.ingredients?.[0] as RecipeIngredientDto),
      };

      const result = patchSchema.validate(obj);

      expect(result.error?.message).toContain('ingredients[2]');
    });

    it('Rejects object without required objectId', () => {
      const obj = getRecipePostDto({
        ingredients: [
          // @ts-ignore
          {
            amount: 50,
          },
        ],
      });

      const result = patchSchema.validate(obj);

      expect(result.error?.message).toContain('ingredients[0]');
    });
  });

  describe('POST', () => {
    it('Rejects object without required field', () => {
      const obj = getRecipePostDto(undefined, ['name']);

      const result = postSchema.validate(obj);

      expect(result.error?.message).toContain('name');
    });

    it('Rejects object with incorrect URL', () => {
      const obj = getRecipePostDto({
        pageUrl: faker.internet.email(),
      });

      const result = postSchema.validate(obj);

      expect(result.error?.message).toContain('pageUrl');
    });

    it('Passes object with correct URL', () => {
      const obj = getRecipePostDto({
        pageUrl: faker.internet.url(),
      });

      const result = postSchema.validate(obj);

      expect(result.error).not.toBeDefined();
    });
  });
});
