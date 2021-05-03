import mockHttp from '../../../../test/helpers/mock-http';
import recipesValidation from '../validation/recipes.validation';
import { getRecipePostDto } from './helpers';

const url = '/api/recipes';

describe('Recipes validation service', () => {
  describe('Joi validation of Request property', () => {
    describe('With correct data', () => {
      const data = getRecipePostDto();

      it('Calls next()', () => {
        const mock = mockHttp.post(url, data);
        const next = jest.fn();

        recipesValidation.validator().post()(...mock.reqHandlerParams, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith();
      });
    });

    describe('With incorrect data', () => {
      const data = getRecipePostDto(undefined, ['name']);

      it('Does not call next', () => {
        const mock = mockHttp.post(url, data);
        const next = jest.fn();

        recipesValidation.validator().post()(...mock.reqHandlerParams, next);

        expect(next).not.toHaveBeenCalled();
      });

      it('Sends 400 with correct error', () => {
        const mock = mockHttp.post(url, data);
        const next = jest.fn();

        recipesValidation.validator().post()(...mock.reqHandlerParams, next);

        expect(mock.status).toBe(400);
        expect(mock.body.error).toBeDefined();
        expect(mock.body.error.name).toContain('ValidationError');
        expect(mock.body.error.message).toContain('name');
      });
    });
  });
});
