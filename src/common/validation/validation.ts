import Joi from 'joi';
import { Request, RequestHandler } from 'express';
import { mapValues } from 'lodash';

type Schemas = Record<string, Joi.Schema>;

type Validator = {
  [P in keyof Schemas]: () => RequestHandler;
};

interface IValidation {
  schemas: Schemas;
}

class Validation implements IValidation {
  constructor(schemas: Schemas) {
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
  validator(property: keyof Request = 'body'): Validator {
    return mapValues(this.schemas, val => () => this.createValidator(val, property));
  }
}

export default Validation;
