/* tslint:disable */
/* eslint-disable */

import mongoose from 'mongoose';

/**
 * Mongoose Method types
 *
 * Use type assertion to ensure DishType methods type safety:
 * ```
 * DishTypeSchema.methods = <DishTypeMethods>{ ... };
 * ```
 */
export type DishTypeMethods = {};

/**
 * Mongoose Static types
 *
 * Use type assertion to ensure DishType statics type safety:
 * ```
 * DishTypeSchema.statics = <DishTypeStatics>{ ... };
 * ```
 */
export type DishTypeStatics = {};
export interface DishTypeModel extends mongoose.Model<DishTypeDocument>, DishTypeStatics {}
export type DishTypeSchema = mongoose.Schema<DishTypeDocument, DishTypeModel>;

/**
 * Lean version of DishTypeDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `DishTypeDocument.toObject()`. To avoid conflicts with model names, use the type alias `DishTypeObject`.
 * ```
 * const dishtypeObject = dishtype.toObject();
 * ```
 */
export interface DishTypeObject {
  name: string;
  _id: string;
}

export interface DishTypeDocument extends mongoose.Document, DishTypeMethods {
  name: string;
}

export type EquipmentMethods = {};
export type EquipmentStatics = {};
export interface EquipmentModel extends mongoose.Model<EquipmentDocument>, EquipmentStatics {}
export type EquipmentSchema = mongoose.Schema<EquipmentDocument, EquipmentModel>;

export interface EquipmentObject {
  name: string;
  _id: string;
}

export interface EquipmentDocument extends mongoose.Document, EquipmentMethods {
  name: string;
}

export type IngredientMethods = {};
export type IngredientStatics = {};
export interface IngredientModel extends mongoose.Model<IngredientDocument>, IngredientStatics {}
export type IngredientSchema = mongoose.Schema<IngredientDocument, IngredientModel>;

export interface IngredientObject {
  name: string;
  availableInDixy?: boolean;
  price?: number;
  ingredientType: string[];
  _id: string;
}

export interface IngredientDocument extends mongoose.Document, IngredientMethods {
  name: string;
  availableInDixy?: boolean;
  price?: number;
  ingredientType: mongoose.Types.Array<string>;
}

export interface RecipeIngredientObject {
  id: IngredientObject['_id'] | IngredientObject;
  amount?: number;
}

export interface RecipeDishTypeObject {
  id?: DishTypeObject['_id'] | DishTypeObject;
}

export interface RecipeEquipmentObject {
  id?: DishTypeObject['_id'] | DishTypeObject;
}

export type RecipeMethods = {};
export type RecipeStatics = {};
export interface RecipeModel extends mongoose.Model<RecipeDocument>, RecipeStatics {}
export type RecipeSchema = mongoose.Schema<RecipeDocument, RecipeModel>;

export interface RecipeObject {
  name: string;
  description?: string;
  ingredients: RecipeIngredientObject[];
  time?: number;
  nutrition: {
    fat?: number;
    protein?: number;
    carbohydrates?: number;
  };
  dishTypes: RecipeDishTypeObject[];
  equipment: RecipeEquipmentObject[];
  page: {
    id?: string;
    url?: string;
    pageType?: string;
  };
  _id: string;
}

/**
 * Description type
 * Type of an object, that is passed to new Model()
 * let document = new Model(obj: ModelDescription)
 */
export interface RecipeIngredientDescription {
  id: string;
  amount?: number;
}

/**
 * Mongoose Embedded Document type
 *
 * Type of `RecipeDocument["ingredients"]` element.
 */
export interface RecipeIngredientDocument
  extends mongoose.Types.EmbeddedDocument,
    RecipeIngredientDescription {
  id: IngredientDocument['_id'] | IngredientDocument;
}

export interface RecipeDishTypeDescription {
  id?: string;
}

export interface RecipeDishTypeDocument
  extends mongoose.Types.EmbeddedDocument,
    RecipeDishTypeDescription {
  id?: DishTypeDocument['_id'] | DishTypeDocument;
}

export interface RecipeEquipmentDescription {
  id?: string;
}

export interface RecipeEquipmentDocument
  extends mongoose.Types.EmbeddedDocument,
    RecipeEquipmentDescription {
  id?: EquipmentDocument['_id'] | EquipmentDocument;
}

// export interface RecipeDocument extends mongoose.Document, RecipeMethods {
//   name: string;
//   description?: string;
//   ingredients: mongoose.Types.DocumentArray<RecipeIngredientDocument>;
//   time?: number;
//   nutrition?: {
//     fat?: number;
//     protein?: number;
//     carbohydrates?: number;
//   };
//   dishTypes: mongoose.Types.DocumentArray<RecipeDishTypeDocument>;
//   equipment: mongoose.Types.DocumentArray<RecipeEquipmentDocument>;
//   page?: {
//     id?: string;
//     pageType?: string;
//   };
// }

export interface RecipeDescription {
  name: string;
  description?: string;
  ingredients?: RecipeIngredientDescription[];
  time?: number;
  nutrition?: {
    fat?: number;
    protein?: number;
    carbohydrates?: number;
  };
  dishTypes?: RecipeDishTypeDescription[];
  equipment?: RecipeEquipmentDescription[];
  page?: {
    id?: string;
    url?: string;
    pageType?: string;
  };
}

export interface RecipeDocument extends RecipeDescription, mongoose.Document, RecipeMethods {}
