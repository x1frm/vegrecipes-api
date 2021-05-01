import joi from 'joi';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import objectid from 'joi-objectid';
import {
  MAX_RECIPE_HTML_LENGTH,
  MAX_RECIPE_NAME_LENGTH,
  MAX_RECIPE_TIME,
  MAX_RECIPE_URL_LENGTH,
  MAX_REIPE_DESCRIPTION_LENGTH,
} from '../../../common/const';
import { DeepRecord } from '../../../common/types';
import { RecipePatchDto, RecipePostDto } from '../recipe.dto';

// eslint-disable-next-line
const oid: () => joi.Schema = objectid(joi);

type PostSchemaMap = DeepRecord<RecipePostDto, joi.Schema>;
type BaseSchemaMap = Omit<PostSchemaMap, 'pageUrl' | 'pageHTML'>;
type PatchSchemaMap = DeepRecord<RecipePatchDto, joi.Schema>;

const baseSchemaMap: BaseSchemaMap = {
  name: joi.string().min(2).max(MAX_RECIPE_NAME_LENGTH),
  description: joi.string().max(MAX_REIPE_DESCRIPTION_LENGTH),
  ingredients: joi
    .array()
    .unique('id')
    .items(
      joi.object({
        id: oid().required(),
        amount: joi.number().min(0).max(100),
      })
    ),
  time: joi.number().min(0).max(MAX_RECIPE_TIME),
  nutrition: {
    fat: joi.number().min(0).max(100),
    protein: joi.number().min(0).max(100),
    carbohydrates: joi.number().min(0).max(100),
  },
  dishTypes: joi
    .array()
    .unique('id')
    .items(
      joi.object({
        id: oid().required(),
      })
    ),
  equipment: joi
    .array()
    .unique('id')
    .items(
      joi.object({
        id: oid().required(),
      })
    ),
};

const patchSchemaMap: PatchSchemaMap = {
  ...baseSchemaMap,
  pageHTML: joi.string().max(MAX_RECIPE_HTML_LENGTH),
  pageUrl: joi
    .string()
    .uri({
      allowQuerySquareBrackets: true,
      domain: {},
    })
    .max(MAX_RECIPE_URL_LENGTH),
};

const postSchemaMap: PostSchemaMap = {
  ...patchSchemaMap,
  name: baseSchemaMap.name.required(),
};

export const postSchema = joi.object<RecipePostDto>(postSchemaMap).xor('pageHtml', 'pageUrl');

export const patchSchema = joi.object<RecipePatchDto>(patchSchemaMap).oxor('pageHtml', 'pageUrl');
