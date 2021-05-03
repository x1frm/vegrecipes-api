import Joi from 'joi';
import { Request, RequestHandler } from 'express';
import { mapValues } from 'lodash';

type Validator<T> = {
  [P in keyof T]: () => RequestHandler;
};

type Schemas = Record<string, Joi.Schema>;

interface IValidation<T extends Schemas> {
  schemas: T;
}

class Validation<T extends Schemas> implements IValidation<T> {
  constructor(schemas: T) {
    this.schemas = schemas;
  }

  schemas;

  createValidator(schema: Joi.Schema, property: keyof Request): RequestHandler {
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

  // using as a middleware: validator('body').post()
  validator(property: keyof Request = 'body'): Validator<T> {
    return mapValues(this.schemas, val => () => this.createValidator(val, property));
  }
}

export default Validation;
