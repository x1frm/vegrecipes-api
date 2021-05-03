/* eslint-disable @typescript-eslint/ban-ts-comment */
import faker from 'faker';
import { RecipeIngredientDto } from '../recipe.dto';
import recipesSchemas from '../validation/recipes.schemas';
import { getRecipePostDto } from './helpers';

const patch = recipesSchemas.patch.body;
const post = recipesSchemas.post.body;

describe('Recipes joi schemas validation', () => {
  describe('PATCH', () => {
    it('Passes correct data', () => {
      const obj = getRecipePostDto(undefined, ['name']);

      const result = patch.validate(obj);

      expect(result.error).not.toBeDefined();
    });

    it('Rejects object with extra field', () => {
      const obj = getRecipePostDto({
        // @ts-ignore
        extraField: 'kek',
      });

      const result = patch.validate(obj);

      expect(result.error?.message).toContain('extraField');
    });

    it('Rejects object with deep extra field', () => {
      const obj = getRecipePostDto({
        nutrition: {
          // @ts-ignore
          deepExtraField: 'lol',
        },
      });

      const result = patch.validate(obj);

      expect(result.error?.message).toContain('deepExtraField');
    });

    it('Rejects object with incorrect deep field', () => {
      const obj = getRecipePostDto({
        nutrition: {
          // @ts-ignore
          fat: 'what?',
        },
      });

      const result = patch.validate(obj);

      expect(result.error?.message).toContain('fat');
    });

    it('Rejects object with two unique values', () => {
      const obj = getRecipePostDto();
      (obj.ingredients as RecipeIngredientDto[])[2] = {
        ...(obj.ingredients?.[0] as RecipeIngredientDto),
      };

      const result = patch.validate(obj);

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

      const result = patch.validate(obj);

      expect(result.error?.message).toContain('ingredients[0]');
    });

    it('Rejects empty object', () => {
      const obj = {};

      const result = patch.validate(obj);

      expect(result.error).toBeDefined();
    });

    it('Rejects no value', () => {
      const obj = undefined;

      const result = patch.validate(obj);

      expect(result.error).toBeDefined();
    });
  });

  describe('POST', () => {
    it('Rejects object without required field', () => {
      const obj = getRecipePostDto(undefined, ['name']);

      const result = post.validate(obj);

      expect(result.error?.message).toContain('name');
    });

    it('Rejects object with incorrect URL', () => {
      const obj = getRecipePostDto({
        pageUrl: faker.internet.email(),
      });

      const result = post.validate(obj);

      expect(result.error?.message).toContain('pageUrl');
    });

    it('Passes object with correct URL', () => {
      const obj = getRecipePostDto({
        pageUrl: faker.internet.url(),
      });

      const result = post.validate(obj);

      expect(result.error).not.toBeDefined();
    });

    it('Rejects empty object', () => {
      const obj = {};

      const result = post.validate(obj);

      expect(result.error).toBeDefined();
    });

    it('Rejects no value', () => {
      const obj = undefined;

      const result = post.validate(obj);

      expect(result.error).toBeDefined();
    });
  });
});
