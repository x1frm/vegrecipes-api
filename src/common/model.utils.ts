import mongoose from 'mongoose';

export function getUniqueValidator(key: string) {
  return async function validator(this: mongoose.Document, value: string): Promise<void> {
    const Model = this.constructor as mongoose.Model<typeof this>;
    const sameNameDocCount = await Model.findOne({
      [key]: new RegExp(`^${value}$`, 'i'),
    }).countDocuments();
    if (sameNameDocCount) {
      throw new Error(`The ${Model.modelName} with key-value pair "${key}: ${value}" exists`);
    }
  };
}

export function nameSetter(val: string): string {
  const result = val.trim().replace(/(\.|,|;|\s)+$/, '');
  return result[0].toUpperCase() + result.slice(1);
}
