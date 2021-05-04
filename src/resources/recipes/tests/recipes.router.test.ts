import supertest from 'supertest';
import { clearDatabase } from '../../../../test/setup/db';
import app from '../../../app';
import { RecipePostDto, RecipeResponseDto } from '../recipe.dto';
import {
  getRecipePostDto,
  mockSaveExtHtml,
  getRecipeResponseDto,
  mockSaveUserHtml,
} from './helpers';

const request = supertest(app);
const url = '/api/recipes/';

const recipe = getRecipePostDto();
const recipeRes = getRecipeResponseDto();
const postOne = (item: RecipePostDto = recipe) => request.post(url).send(item).expect(200);

mockSaveExtHtml();
mockSaveUserHtml();

describe('/recipes/', () => {
  afterEach(clearDatabase);

  it('Gets empty array when no recipes were added yet', async () =>
    request.get(url).expect(200, []));

  it('Gets all recipes', async () => {
    expect.assertions(1);
    const pancakes = getRecipePostDto({
      name: 'Pancakes',
    });
    const pancakesRes = getRecipeResponseDto({
      name: 'Pancakes',
    });
    await postOne();
    await postOne(pancakes);

    const get = await request.get(url).expect(200);
    expect(get.body).toMatchObject([recipeRes, pancakesRes]);
  });

  it('Post a single recipe and gets it back', async () => {
    expect.assertions(2);

    const post = await postOne();
    expect(post.body).toMatchObject(recipeRes);

    const get = await request.get(url).expect(200);
    expect(get.body).toMatchObject([recipeRes]);
  });

  it('Gets a recipe by id', async () => {
    expect.assertions(1);

    const post = await postOne();

    const get = await request.get(`${url}${(post.body as RecipeResponseDto)._id}`).expect(200);
    expect(get.body).toMatchObject(recipeRes);
  });

  it('Patches a recipe', async () => {
    expect.assertions(2);
    const post = await postOne();

    const updated = getRecipePostDto({ description: 'Tasty breakfast' });
    const updatedRes = getRecipeResponseDto({ description: 'Tasty breakfast' });

    const patch = await request
      .patch(`${url}${(post.body as RecipeResponseDto)._id}`)
      .send(updated)
      .expect(200);
    expect(patch.body.description).toBe(updated.description);

    const get = await request.get(`${url}${(patch.body as RecipeResponseDto)._id}`).expect(200);
    expect(get.body).toMatchObject(updatedRes);
  });

  it('Deletes a recipe', async () => {
    const post = await postOne();
    return request.del(`${url}${(post.body as RecipeResponseDto)._id}`).expect(204);
  });

  describe('With incorrect data', () => {
    const data = getRecipePostDto(undefined, ['name']);

    it('Sends 400 with correct error', async () => {
      expect.assertions(3);

      const post = await request.post(url).send(data).expect(400);

      expect(post.body.error).toBeDefined();
      expect(post.body.error.name).toContain('ValidationError');
      expect(post.body.error.message).toContain('name');
    });
  });

  describe('With incorrect format of id provided', () => {
    const data = getRecipePostDto();

    it('Sends 400 to PATCH', async () => {
      expect.assertions(1);

      const patch = await request.patch(`${url}wrongId`).send(data).expect(400);

      expect(patch.body.error.message).toContain('id');
    });

    it('Sends 400 to DELETE', async () => {
      expect.assertions(1);

      const patch = await request.del(`${url}wrongId`).expect(400);

      expect(patch.body.error.message).toContain('id');
    });

    it('Sends 400 to GET', async () => {
      expect.assertions(1);

      const patch = await request.get(`${url}wrongId`).expect(400);

      expect(patch.body.error.message).toContain('id');
    });
  });

  // it('Responses with 404 if id is not found', async () => {
  //   const id = '604bdc0e9d07d51b052f872f';
  //   await request.get(url + id).expect(404);
  //   await request
  //     .patch(url + id)
  //     .send(recipe)
  //     .expect(404);
  //   await request.delete(url + id).expect(404);
  // });
});
