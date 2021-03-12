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
  dishTypes: string[];
  equipment: string[];
  _id: string;
}

export interface RecipeIngredientDto {
  id: string;
  amount?: number;
}

export interface Ingredient {
  name: string;
  availableInDixy?: boolean;
  price?: number;
  ingredientType: string[];
  _id: string;
}

export interface Equipment {
  name: string;
  _id: string;
}

export interface DishType {
  name: string;
  _id: string;
}
