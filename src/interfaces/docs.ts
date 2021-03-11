import { DishTypeObject, EquipmentObject, IngredientObject, RecipeObject } from './mongoose.gen';

type OmitId<T> = Omit<T, '_id'>;

export type IDishType = OmitId<DishTypeObject>;
export type IEquipment = OmitId<EquipmentObject>;
export type IIngredient = OmitId<IngredientObject>;
export type IRecipe = OmitId<RecipeObject>;
