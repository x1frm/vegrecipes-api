import mongoose from 'mongoose';
import * as utils from '../model.utils';

describe('Name setter', () => {
  it('removes unnecessary chars from name string edges and capitalizes first letter', () => {
    const ns = utils.nameSetter;
    expect(ns('  trim  ')).toBe('Trim');
    expect(ns('remove dots....')).toBe('Remove dots');
    expect(ns(' blabla  .,;,;;  ')).toBe('Blabla');
  });
});

describe('Similar string validator', () => {
  const validator = utils.getUniqueValidator('foo');
  const schema = new mongoose.Schema({ foo: { type: String, validate: validator } });
  const modelName = 'TestModel';
  const Model = mongoose.model(modelName, schema);
  const item = { foo: 'bar' };

  it('throws an error if a doc with same key-value already exists', async () => {
    await new Model(item).save();
    const promise = new Model(item).save();
    expect.assertions(2);
    await Promise.all([
      expect(promise).rejects.toBeInstanceOf(Error),
      expect(promise).rejects.toHaveProperty(
        'errors.foo.message',
        expect.stringMatching(/TestModel[\s\S]+foo[\s\S]+exists/)
      ),
    ]);
  });

  it('passes an item with unique value', async () => {
    const item2 = { foo: 'baz' };
    const doc = await new Model(item2).save();
    expect(doc.toObject()).toMatchObject(item2);
  });
});
