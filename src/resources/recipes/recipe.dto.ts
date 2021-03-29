import { PageType } from './recipes.model';

export interface RecipeRequestDto {
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
  pageUrl?: string;
  pageHTML?: string;
}

export interface RecipeDescription extends RecipeRequestDto {
  page?: {
    id?: string;
    pageType: PageType;
  };
}

export interface RecipeResponseDto extends RecipeDescription {
  _id: string;
}

export type RecipePatchDto = Partial<RecipeRequestDto>;

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
