export interface RecipeDto {
  name: string;
  description?: string;
  ingredients: RecipeIngredientDto[];
  time?: number;
  nutrition: {
    fat?: number;
    protein?: number;
    carbohydrates?: number;
  };
  dishTypes: RecipeDishTypeDto[];
  equipment: RecipeEquipmentDto[];
  _id?: string;
}

export interface RecipeIngredientDto {
  id: string;
  amount?: number;
}

export interface RecipeDishTypeDto {
  id: string;
}

export interface RecipeEquipmentDto {
  id: string;
}
