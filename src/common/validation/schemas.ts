import Joi from 'joi';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import oid from 'joi-objectid';

// eslint-disable-next-line
export const objectId: () => Joi.Schema = oid(Joi);

export const paramsId = Joi.object({
  id: objectId().required(),
}).required();
