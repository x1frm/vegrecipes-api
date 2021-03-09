import mongoose from 'mongoose';
import { DeepPartial } from 'src/common/types';
import { Recipe as IRecipe } from 'src/interfaces/mongoose.gen';
import { LongStr } from '../../common/utils';
import { dbInit, dbClose } from '../../../test/setup/shared.config';
import Recipe from './recipe.model';

const recipeData: DeepPartial<IRecipe> = {
  name: 'Blinchiki',
  description: 'Mmm',
  time: 20,
  ingredients: [
    {
      id: new mongoose.Types.ObjectId(),
      amount: 40,
    },
    {
      id: new mongoose.Types.ObjectId(),
      amount: 60,
    },
  ],
  nutrition: {
    fat: 20,
    protein: 30,
    carbohydrates: 40,
  },
  dishTypes: [new mongoose.Types.ObjectId()],
  equipment: [new mongoose.Types.ObjectId()],
};

describe('Recipe Model Test', () => {
  beforeAll(dbInit);
  afterAll(dbClose);

  it('creates and saves recipe', async () => {
    expect.assertions(3);
    const recipe = new Recipe(recipeData);
    const result = await recipe.save();
    expect(result._id).toBeDefined();
    expect(result.isNew).toBe(false);
    expect(result.toObject()).toMatchObject(recipeData);
  });

  it('fails saving if required field is not provided', () => {
    expect.assertions(3);
    const incorrect = { ...recipeData };
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

    const incorrect: DeepPartial<IRecipe> = {
      ...recipeData,
      name: LongStr(101),
      description: LongStr(1001),
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
