import mongoose from 'mongoose';
import { DeepPartial } from 'src/common/types';
import { longStr } from '../../../common/utils';
import Recipe from '../recipes.model';
import { getRecipeData } from './helpers';
import { RecipeDto } from '../recipe.dto';

describe('Recipe Model Test', () => {
  it('creates and saves recipe', async () => {
    expect.assertions(3);
    const recipe = new Recipe(getRecipeData());
    const result = await recipe.save();
    expect(result._id).toBeDefined();
    expect(result.isNew).toBe(false);
    expect(result.toObject()).toMatchObject(getRecipeData());
  });

  it('fails saving if required field is not provided', () => {
    expect.assertions(3);
    const incorrect: DeepPartial<RecipeDto> = { ...getRecipeData() };
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
      ...getRecipeData(),
      name: longStr(101),
      description: longStr(1001),
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
