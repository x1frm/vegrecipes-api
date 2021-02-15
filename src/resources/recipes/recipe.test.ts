import mongoose from 'mongoose';
import { DeepPartial } from 'src/common/types';
import { Recipe as IRecipe } from 'src/interfaces/mongoose.gen';
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
    expect.assertions(2);
    const recipe = new Recipe(recipeData);
    const result = await recipe.save();
    expect(result._id).toBeDefined();
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

  it("fails if data don't pass mongoose validation", async () => {});
});
