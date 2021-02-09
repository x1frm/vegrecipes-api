import mongoose from 'mongoose';
import { DishTypeDocument, DishTypeModel, DishTypeSchema } from 'src/interfaces/mongoose.gen';

const dishTypeSchema: DishTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model<DishTypeDocument, DishTypeModel>('DishType', dishTypeSchema);
