import mongoose from 'mongoose';
import { DeepPartial } from 'src/common/types';
import { IngredientObject as IIngredient } from 'src/interfaces/mongoose';
import { longStr } from '../../common/utils';
import Ingredient from './ingredients.model';

const ingredientData: DeepPartial<IIngredient> = {
  name: 'Peanut',
  availableInDixy: true,
  price: 200,
  ingredientType: ['nuts'],
};

describe('Ingredient Model Test', () => {
  it('creates and saves ingredient', async () => {
    expect.assertions(3);
    const ingredient = new Ingredient(ingredientData);
    const result = await ingredient.save();
    expect(result._id).toBeDefined();
    expect(result.isNew).toBe(false);
    expect(result.toObject()).toMatchObject(ingredientData);
  });

  it('fails saving if required field is not provided', async () => {
    expect.assertions(2);
    const incorrect = { ...ingredientData };
    delete incorrect.name;
    const ingredient = new Ingredient(incorrect);

    const promise = ingredient.save();
    await Promise.all([
      expect(promise).rejects.toBeInstanceOf(mongoose.Error.ValidationError),
      expect(promise).rejects.toHaveProperty('errors.name'),
    ]);
  });

  it("fails saving if data don't pass mongoose validation", async () => {
    expect.assertions(3);

    const incorrect: DeepPartial<IIngredient> = {
      ...ingredientData,
      name: longStr(101),
      price: 200000,
    };

    const ingredient = new Ingredient(incorrect);

    const promise = ingredient.save();
    await Promise.all([
      expect(promise).rejects.toBeInstanceOf(mongoose.Error.ValidationError),
      expect(promise).rejects.toHaveProperty('errors.name'),
      expect(promise).rejects.toHaveProperty('errors.price'),
    ]);
  });

  it('fails saving if an ingredient with similar name exists', async () => {
    expect.assertions(4);

    await Ingredient.deleteMany({});

    const item1 = new Ingredient(ingredientData);
    const item2 = new Ingredient({
      ...ingredientData,
      name: 'PEAnut',
    });
    const item3 = new Ingredient({
      ...ingredientData,
      name: '  PEANUT  ',
    });
    const item4 = new Ingredient({
      ...ingredientData,
      name: ' PEANUT,.;  ',
    });
    const item5 = new Ingredient(ingredientData);

    await item1.save();

    await Promise.all([
      expect(item2.save()).rejects.toHaveProperty('errors.name'),
      expect(item3.save()).rejects.toHaveProperty('errors.name'),
      expect(item4.save()).rejects.toHaveProperty('errors.name'),
      expect(item5.save()).rejects.toHaveProperty('errors.name'),
    ]);
  });

  it('removes unnecessary chars from name string edges and capitalizes first letter', async () => {
    expect.assertions(4);
    const i1 = new Ingredient({ name: '   TrimIt!  ' });
    const i2 = new Ingredient({ name: 'remove dots...' });
    const i3 = new Ingredient({ name: '   aagrx   ..,;;  ' });
    const i4 = new Ingredient({ name: 'middle.dot' });
    await Promise.all([
      expect(i1.save()).resolves.toMatchObject({ name: 'TrimIt!' }),
      expect(i2.save()).resolves.toMatchObject({ name: 'Remove dots' }),
      expect(i3.save()).resolves.toMatchObject({ name: 'Aagrx' }),
      expect(i4.save()).resolves.toMatchObject({ name: 'Middle.dot' }),
    ]);
  });
});
