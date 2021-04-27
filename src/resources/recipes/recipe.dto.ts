import { RecipeObject } from '../../interfaces/mongoose';

export interface RecipeRequestDto {
  name: string;
  description?: string;
  ingredients: RecipeIngredientDto[];
  time?: number;
  nutrition?: {
    fat?: number;
    protein?: number;
    carbohydrates?: number;
  };
  dishTypes: RecipeDishTypeDto[];
  equipment: RecipeEquipmentDto[];
  pageUrl?: string;
  pageHTML?: string;
}

export type RecipeResponseDto = RecipeObject;

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
