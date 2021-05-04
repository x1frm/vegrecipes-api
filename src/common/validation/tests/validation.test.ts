import { Types } from 'mongoose';
import supertest from 'supertest';
import app from '../../../app';
import recipesController from '../../../resources/recipes/recipes.controller';
import { getRecipePostDto } from '../../../resources/recipes/tests/helpers';
import recipesSchemas from '../../../resources/recipes/validation/recipes.schemas';

const request = supertest(app);

const id = Types.ObjectId().toString();
const url = `/api/recipes/${id}`;
const data = getRecipePostDto();

describe('Validation base service', () => {
  it('Calls validate method on required schemas', async () => {
    expect.assertions(5);

    const postBody = jest.spyOn(recipesSchemas.post.body, 'validate');
    const patchParams = jest.spyOn(recipesSchemas.patch.params, 'validate');
    const patchBody = jest.spyOn(recipesSchemas.patch.body, 'validate');
    const controller = jest.spyOn(recipesController, 'update');

    await request.patch(url).send(data);

    expect(patchBody).toHaveBeenCalledTimes(1);
    expect(patchBody).toHaveBeenCalledWith(data);
    expect(patchParams).toHaveBeenCalledTimes(1);
    expect(patchParams).toHaveBeenCalledWith({ id });
    expect(postBody).not.toHaveBeenCalled();

    [postBody, patchParams, patchBody, controller].forEach(mock => mock.mockRestore());
  });
});
