export interface IngredientDto {
  name: string;
  availableInDixy?: boolean;
  price?: number;
  ingredientType: string[];
  _id?: string;
}
