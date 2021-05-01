import mongoose from 'mongoose';
import { DeepPartial } from 'src/common/types';
import { RecipeDescription } from 'src/interfaces/mongoose';
import { MAX_RECIPE_NAME_LENGTH, MAX_REIPE_DESCRIPTION_LENGTH } from '../../../common/const';
import { longStr } from '../../../common/utils';
import Recipe from '../recipes.model';
import { getRecipePostDto } from './helpers';

describe('Recipe Model Test', () => {
  it('creates and saves recipe', async () => {
    expect.assertions(3);
    const recipe = new Recipe(getRecipePostDto());
    const result = await recipe.save();
    expect(result._id).toBeDefined();
    expect(result.isNew).toBe(false);
    expect(result.description).toBe(getRecipePostDto().description);
  });

  it('fails saving if required field is not provided', () => {
    expect.assertions(3);
    const incorrect: DeepPartial<RecipeDescription> = { ...getRecipePostDto() };
    delete incorrect.name;
    delete incorrect.ingredients?.[0]?.id;
    const recipe = new Recipe(incorrect);

    return recipe.save().catch((e: mongoose.Error.ValidationError) => {
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.name).toBeDefined();
      expect(e.errors['ingredients.0.id']).toBeDefined();
    });
  });

  it("fails if data don't pass mongoose validation", () => {
    expect.assertions(8);

    const incorrect = {
      ...getRecipePostDto(),
      name: longStr(MAX_RECIPE_NAME_LENGTH + 1),
      description: longStr(MAX_REIPE_DESCRIPTION_LENGTH + 1),
      ingredients: [
        {
          id: new mongoose.Types.ObjectId(),
          amount: -1,
        },
        {
          id: new mongoose.Types.ObjectId(),
          amount: 101,
        },
      ],
      nutrition: {
        fat: 101,
        protein: -1,
        carbohydrates: 101,
      },
    };

    const recipe = new Recipe(incorrect);

    return recipe.save().catch((e: mongoose.Error.ValidationError) => {
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.name).toBeDefined();
      expect(e.errors.description).toBeDefined();
      expect(e.errors['nutrition.fat']).toBeDefined();
      expect(e.errors['nutrition.protein']).toBeDefined();
      expect(e.errors['nutrition.carbohydrates']).toBeDefined();
      expect(e.errors['ingredients.0.amount']).toBeDefined();
      expect(e.errors['ingredients.1.amount']).toBeDefined();
    });
  });
});
