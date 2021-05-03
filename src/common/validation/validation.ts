import Joi from 'joi';
import { RequestHandler } from 'express';
import { mapValues } from 'lodash';

type JoiValidators<T> = {
  [P in keyof T]: RequestHandler[];
};

type CheckedProp = 'body' | 'params' | 'query';

type MethodSchemas = Partial<Record<CheckedProp, Joi.Schema>>;
type Schemas = Record<string, MethodSchemas>;

class Validation<T extends Schemas> {
  constructor(schemas: T) {
    this.schemas = schemas;

    this.joi = mapValues(this.schemas, methodSchemas => {
      const validators: RequestHandler[] = [];
      const props = Object.keys(methodSchemas);
      props.forEach(prop => {
        const schema = methodSchemas[prop as CheckedProp];
        if (schema) {
          const validator = this.createValidator(schema, prop as CheckedProp);
          validators.push(validator);
        }
      });

      return validators;
    });
  }

  schemas;

  joi: JoiValidators<T>;

  createValidator(schema: Joi.Schema, property: CheckedProp): RequestHandler {
    return (req, res, next) => {
      const { error } = schema.validate(req[property]);
      if (error) {
        const { name, message } = error;
        res.status(400).json({ error: { name, message } });
      } else {
        next();
      }
    };
  }
}

export default Validation;
