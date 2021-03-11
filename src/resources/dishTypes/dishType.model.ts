import mongoose from 'mongoose';
import { DishTypeDocument, DishTypeModel, DishTypeSchema } from 'src/interfaces/mongoose.gen';
import { getUniqueValidator, nameSetter } from '../../common/model.utils';

const dishTypeSchema: DishTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
    set: nameSetter,
    validate: getUniqueValidator('name'),
  },
});

export default mongoose.model<DishTypeDocument, DishTypeModel>('DishType', dishTypeSchema);
