import mongoose from 'mongoose';
import { EquipmentDocument, EquipmentModel, EquipmentSchema } from 'src/interfaces/mongoose.gen';
import { getSimilarStringValidator, nameSetter } from '../../common/model.utils';

const equipmentSchema: EquipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
    set: nameSetter,
    validate: getSimilarStringValidator('name'),
  },
});

export default mongoose.model<EquipmentDocument, EquipmentModel>('Equipment', equipmentSchema);
