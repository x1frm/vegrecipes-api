import mongoose from 'mongoose';
import { DeepPartial } from 'src/common/types';
import { DishType as IDishType } from 'src/interfaces/mongoose.gen';
import DishType from './dishType.model';

const dishTypeData: DeepPartial<IDishType> = {
  name: 'Peanut',
};

describe('DishType Model Test', () => {
  it('creates and saves dishType', async () => {
    expect.assertions(3);
    const dishType = new DishType(dishTypeData);
    const result = await dishType.save();
    expect(result._id).toBeDefined();
    expect(result.isNew).toBe(false);
    expect(result.toObject()).toMatchObject(dishTypeData);
  });

  it('fails saving if required field is not provided', async () => {
    expect.assertions(2);
    const incorrect = { ...dishTypeData };
    delete incorrect.name;
    const dishType = new DishType(incorrect);

    const promise = dishType.save();
    await Promise.all([
      expect(promise).rejects.toBeInstanceOf(mongoose.Error.ValidationError),
      expect(promise).rejects.toHaveProperty('errors.name'),
    ]);
  });

  it('fails saving if an dishType with similar name exists', async () => {
    expect.assertions(4);

    await DishType.deleteMany({});

    const item1 = new DishType(dishTypeData);
    const item2 = new DishType({
      ...dishTypeData,
      name: 'PEAnut',
    });
    const item3 = new DishType({
      ...dishTypeData,
      name: '  PEANUT  ',
    });
    const item4 = new DishType({
      ...dishTypeData,
      name: ' PEANUT,.;  ',
    });
    const item5 = new DishType(dishTypeData);

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
    const i1 = new DishType({ name: '   TrimIt!  ' });
    const i2 = new DishType({ name: 'remove dots...' });
    const i3 = new DishType({ name: '   aagrx   ..,;;  ' });
    const i4 = new DishType({ name: 'middle.dot' });
    await Promise.all([
      expect(i1.save()).resolves.toMatchObject({ name: 'TrimIt!' }),
      expect(i2.save()).resolves.toMatchObject({ name: 'Remove dots' }),
      expect(i3.save()).resolves.toMatchObject({ name: 'Aagrx' }),
      expect(i4.save()).resolves.toMatchObject({ name: 'Middle.dot' }),
    ]);
  });
});
