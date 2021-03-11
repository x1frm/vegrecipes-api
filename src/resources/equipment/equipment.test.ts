import mongoose from 'mongoose';
import { DeepPartial } from 'src/common/types';
import { Equipment as IEquipment } from 'src/interfaces/mongoose.gen';
import { longStr } from '../../common/utils';
import { dbInit, dbClose } from '../../../test/setup/shared.config';
import Equipment from './equipment.model';

const equipmentData: DeepPartial<IEquipment> = {
  name: 'Blender',
};

describe('Equipment Model Test', () => {
  beforeAll(dbInit);
  afterAll(dbClose);

  it('creates and saves equipment', async () => {
    expect.assertions(3);
    const equipment = new Equipment(equipmentData);
    const result = await equipment.save();
    expect(result._id).toBeDefined();
    expect(result.isNew).toBe(false);
    expect(result.toObject()).toMatchObject(equipmentData);
  });

  it('fails saving if required field is not provided', async () => {
    expect.assertions(2);
    const incorrect = { ...equipmentData };
    delete incorrect.name;
    const equipment = new Equipment(incorrect);

    const promise = equipment.save();
    await Promise.all([
      expect(promise).rejects.toBeInstanceOf(mongoose.Error.ValidationError),
      expect(promise).rejects.toHaveProperty('errors.name'),
    ]);
  });

  it("fails saving if data don't pass mongoose validation", async () => {
    expect.assertions(2);

    const incorrect: DeepPartial<IEquipment> = {
      ...equipmentData,
      name: longStr(101),
    };

    const equipment = new Equipment(incorrect);

    const promise = equipment.save();
    await Promise.all([
      expect(promise).rejects.toBeInstanceOf(mongoose.Error.ValidationError),
      expect(promise).rejects.toHaveProperty('errors.name'),
    ]);
  });
});
