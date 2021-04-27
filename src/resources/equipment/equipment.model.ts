import mongoose from 'mongoose';
import { EquipmentDocument, EquipmentModel, EquipmentSchema } from 'src/interfaces/mongoose';
import { getUniqueValidator, nameSetter } from '../../common/model.utils';

const equipmentSchema: EquipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
    set: nameSetter,
    validate: getUniqueValidator('name'),
  },
});

export default mongoose.model<EquipmentDocument, EquipmentModel>('Equipment', equipmentSchema);
