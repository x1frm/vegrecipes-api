/* tslint:disable */
/* eslint-disable */

// ######################################## THIS FILE WAS GENERATED BY MONGOOSE-TSGEN ######################################## //

// NOTE: ANY CHANGES MADE WILL BE OVERWRITTEN ON SUBSEQUENT EXECUTIONS OF MONGOOSE-TSGEN.

import mongoose from 'mongoose';

/**
 * Lean version of DishTypeDocument (type alias of `DishType`)
 *
 * Use this type alias to avoid conflicts with model names:
 * ```
 * import { DishType } from "../models"
 * import { DishTypeObject } from "../interfaces/mongoose.gen.ts"
 *
 * const dishtypeObject: DishTypeObject = dishtype.toObject();
 * ```
 */
export type DishTypeObject = DishType;

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

/**
 * Mongoose Model type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const DishType = mongoose.model<DishTypeDocument, DishTypeModel>("DishType", DishTypeSchema);
 * ```
 */
export interface DishTypeModel extends mongoose.Model<DishTypeDocument>, DishTypeStatics {}

/**
 * Mongoose Schema type
 *
 * Assign this type to new DishType schema instances:
 * ```
 * const DishTypeSchema: DishTypeSchema = new mongoose.Schema({ ... })
 * ```
 */
export type DishTypeSchema = mongoose.Schema<DishTypeDocument, DishTypeModel>;

/**
 * Lean version of DishTypeDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `DishTypeDocument.toObject()`. To avoid conflicts with model names, use the type alias `DishTypeObject`.
 * ```
 * const dishtypeObject = dishtype.toObject();
 * ```
 */
export interface DishType {
  name: string;
  _id: mongoose.Types.ObjectId;
}

/**
 * Mongoose Document type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const DishType = mongoose.model<DishTypeDocument, DishTypeModel>("DishType", DishTypeSchema);
 * ```
 */
export interface DishTypeDocument
  extends mongoose.Document<mongoose.Types.ObjectId>,
    DishTypeMethods {
  name: string;
  _id: mongoose.Types.ObjectId;
}

/**
 * Lean version of EquipmentDocument (type alias of `Equipment`)
 *
 * Use this type alias to avoid conflicts with model names:
 * ```
 * import { Equipment } from "../models"
 * import { EquipmentObject } from "../interfaces/mongoose.gen.ts"
 *
 * const equipmentObject: EquipmentObject = equipment.toObject();
 * ```
 */
export type EquipmentObject = Equipment;

/**
 * Mongoose Method types
 *
 * Use type assertion to ensure Equipment methods type safety:
 * ```
 * EquipmentSchema.methods = <EquipmentMethods>{ ... };
 * ```
 */
export type EquipmentMethods = {};

/**
 * Mongoose Static types
 *
 * Use type assertion to ensure Equipment statics type safety:
 * ```
 * EquipmentSchema.statics = <EquipmentStatics>{ ... };
 * ```
 */
export type EquipmentStatics = {};

/**
 * Mongoose Model type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Equipment = mongoose.model<EquipmentDocument, EquipmentModel>("Equipment", EquipmentSchema);
 * ```
 */
export interface EquipmentModel extends mongoose.Model<EquipmentDocument>, EquipmentStatics {}

/**
 * Mongoose Schema type
 *
 * Assign this type to new Equipment schema instances:
 * ```
 * const EquipmentSchema: EquipmentSchema = new mongoose.Schema({ ... })
 * ```
 */
export type EquipmentSchema = mongoose.Schema<EquipmentDocument, EquipmentModel>;

/**
 * Lean version of EquipmentDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `EquipmentDocument.toObject()`. To avoid conflicts with model names, use the type alias `EquipmentObject`.
 * ```
 * const equipmentObject = equipment.toObject();
 * ```
 */
export interface Equipment {
  name: string;
  _id: mongoose.Types.ObjectId;
}

/**
 * Mongoose Document type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Equipment = mongoose.model<EquipmentDocument, EquipmentModel>("Equipment", EquipmentSchema);
 * ```
 */
export interface EquipmentDocument
  extends mongoose.Document<mongoose.Types.ObjectId>,
    EquipmentMethods {
  name: string;
  _id: mongoose.Types.ObjectId;
}

/**
 * Lean version of IngredientDocument (type alias of `Ingredient`)
 *
 * Use this type alias to avoid conflicts with model names:
 * ```
 * import { Ingredient } from "../models"
 * import { IngredientObject } from "../interfaces/mongoose.gen.ts"
 *
 * const ingredientObject: IngredientObject = ingredient.toObject();
 * ```
 */
export type IngredientObject = Ingredient;

/**
 * Mongoose Method types
 *
 * Use type assertion to ensure Ingredient methods type safety:
 * ```
 * IngredientSchema.methods = <IngredientMethods>{ ... };
 * ```
 */
export type IngredientMethods = {};

/**
 * Mongoose Static types
 *
 * Use type assertion to ensure Ingredient statics type safety:
 * ```
 * IngredientSchema.statics = <IngredientStatics>{ ... };
 * ```
 */
export type IngredientStatics = {};

/**
 * Mongoose Model type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Ingredient = mongoose.model<IngredientDocument, IngredientModel>("Ingredient", IngredientSchema);
 * ```
 */
export interface IngredientModel extends mongoose.Model<IngredientDocument>, IngredientStatics {}

/**
 * Mongoose Schema type
 *
 * Assign this type to new Ingredient schema instances:
 * ```
 * const IngredientSchema: IngredientSchema = new mongoose.Schema({ ... })
 * ```
 */
export type IngredientSchema = mongoose.Schema<IngredientDocument, IngredientModel>;

/**
 * Lean version of IngredientDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `IngredientDocument.toObject()`. To avoid conflicts with model names, use the type alias `IngredientObject`.
 * ```
 * const ingredientObject = ingredient.toObject();
 * ```
 */
export interface Ingredient {
  name: string;
  availableInDixy?: boolean;
  price?: number;
  ingredientType: string[];
  _id: mongoose.Types.ObjectId;
}

/**
 * Mongoose Document type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Ingredient = mongoose.model<IngredientDocument, IngredientModel>("Ingredient", IngredientSchema);
 * ```
 */
export interface IngredientDocument
  extends mongoose.Document<mongoose.Types.ObjectId>,
    IngredientMethods {
  name: string;
  availableInDixy?: boolean;
  price?: number;
  ingredientType: mongoose.Types.Array<string>;
  _id: mongoose.Types.ObjectId;
}

/**
 * Lean version of RecipeIngredientDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `RecipeDocument.toObject()`.
 * ```
 * const recipeObject = recipe.toObject();
 * ```
 */
export interface RecipeIngredient {
  id: Ingredient['_id'] | Ingredient;
  amount?: number;
}

/**
 * Lean version of RecipeDishTypeDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `RecipeDocument.toObject()`.
 * ```
 * const recipeObject = recipe.toObject();
 * ```
 */
export interface RecipeDishType {
  id?: DishType['_id'] | DishType;
}

/**
 * Lean version of RecipeEquipmentDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `RecipeDocument.toObject()`.
 * ```
 * const recipeObject = recipe.toObject();
 * ```
 */
export interface RecipeEquipment {
  id?: DishType['_id'] | DishType;
}

/**
 * Lean version of RecipeDocument (type alias of `Recipe`)
 *
 * Use this type alias to avoid conflicts with model names:
 * ```
 * import { Recipe } from "../models"
 * import { RecipeObject } from "../interfaces/mongoose.gen.ts"
 *
 * const recipeObject: RecipeObject = recipe.toObject();
 * ```
 */
export type RecipeObject = Recipe;

/**
 * Mongoose Method types
 *
 * Use type assertion to ensure Recipe methods type safety:
 * ```
 * RecipeSchema.methods = <RecipeMethods>{ ... };
 * ```
 */
export type RecipeMethods = {};

/**
 * Mongoose Static types
 *
 * Use type assertion to ensure Recipe statics type safety:
 * ```
 * RecipeSchema.statics = <RecipeStatics>{ ... };
 * ```
 */
export type RecipeStatics = {};

/**
 * Mongoose Model type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Recipe = mongoose.model<RecipeDocument, RecipeModel>("Recipe", RecipeSchema);
 * ```
 */
export interface RecipeModel extends mongoose.Model<RecipeDocument>, RecipeStatics {}

/**
 * Mongoose Schema type
 *
 * Assign this type to new Recipe schema instances:
 * ```
 * const RecipeSchema: RecipeSchema = new mongoose.Schema({ ... })
 * ```
 */
export type RecipeSchema = mongoose.Schema<RecipeDocument, RecipeModel>;

/**
 * Lean version of RecipeDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `RecipeDocument.toObject()`. To avoid conflicts with model names, use the type alias `RecipeObject`.
 * ```
 * const recipeObject = recipe.toObject();
 * ```
 */
export interface Recipe {
  name: string;
  description?: string;
  ingredients: RecipeIngredient[];
  time?: number;
  nutrition: {
    fat?: number;
    protein?: number;
    carbohydrates?: number;
  };
  dishTypes: RecipeDishType[];
  equipment: RecipeEquipment[];
  _id: mongoose.Types.ObjectId;
}

/**
 * Mongoose Embedded Document type
 *
 * Type of `RecipeDocument["ingredients"]` element.
 */
export interface RecipeIngredientDocument extends mongoose.Types.EmbeddedDocument {
  id: IngredientDocument['_id'] | IngredientDocument;
  amount?: number;
}

/**
 * Mongoose Embedded Document type
 *
 * Type of `RecipeDocument["dishTypes"]` element.
 */
export interface RecipeDishTypeDocument extends mongoose.Types.EmbeddedDocument {
  id?: DishTypeDocument['_id'] | DishTypeDocument;
}

/**
 * Mongoose Embedded Document type
 *
 * Type of `RecipeDocument["equipment"]` element.
 */
export interface RecipeEquipmentDocument extends mongoose.Types.EmbeddedDocument {
  id?: DishTypeDocument['_id'] | DishTypeDocument;
}

/**
 * Mongoose Document type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Recipe = mongoose.model<RecipeDocument, RecipeModel>("Recipe", RecipeSchema);
 * ```
 */
export interface RecipeDocument extends mongoose.Document<mongoose.Types.ObjectId>, RecipeMethods {
  name: string;
  description?: string;
  ingredients: mongoose.Types.DocumentArray<RecipeIngredientDocument>;
  time?: number;
  nutrition: {
    fat?: number;
    protein?: number;
    carbohydrates?: number;
  };
  dishTypes: mongoose.Types.DocumentArray<RecipeDishTypeDocument>;
  equipment: mongoose.Types.DocumentArray<RecipeEquipmentDocument>;
  _id: mongoose.Types.ObjectId;
}
