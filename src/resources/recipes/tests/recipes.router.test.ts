import supertest from 'supertest';
import { clearDatabase } from '../../../../test/setup/db';
import app from '../../../app';
import { RecipeRequestDto, RecipeResponseDto } from '../recipe.dto';
import { getRecipeRequestData } from './helpers';

const request = supertest(app);
const url = '/api/recipes/';

const recipe = getRecipeRequestData();
const postOne = (item: RecipeRequestDto = recipe) => request.post(url).send(item).expect(200);

describe('/recipes/', () => {
  afterEach(clearDatabase);

  it('Gets empty array when no recipes were added yet', async () =>
    request.get(url).expect(200, []));

  it('Gets all recipes', async () => {
    expect.assertions(1);
    const pancakes = {
      ...getRecipeRequestData(),
      name: 'Pancakes',
    };
    await postOne();
    await postOne(pancakes);

    const get = await request.get(url).expect(200);
    expect(get.body).toMatchObject([recipe, pancakes]);
  });

  it('Post a single recipe and gets it back', async () => {
    expect.assertions(2);

    const post = await postOne();
    expect(post.body).toMatchObject(recipe);

    const get = await request.get(url).expect(200);
    expect(get.body).toMatchObject([recipe]);
  });

  it('Gets a recipe by id', async () => {
    expect.assertions(1);

    const post = await postOne();

    const get = await request.get(`${url}${(post.body as RecipeResponseDto)._id}`).expect(200);
    expect(get.body).toMatchObject(recipe);
  });

  it('Puts a recipe', async () => {
    expect.assertions(2);
    const post = await postOne();

    const updated = getRecipeRequestData();
    updated.description = 'Tasty breakfast';

    const put = await request
      .put(`${url}${(post.body as RecipeResponseDto)._id}`)
      .send(updated)
      .expect(200);
    expect(put.body.description).toBe(updated.description);

    const get = await request.get(`${url}${(put.body as RecipeResponseDto)._id}`).expect(200);
    expect(get.body).toMatchObject(updated);
  });

  it('Deletes a recipe', async () => {
    const post = await postOne();
    return request.del(`${url}${(post.body as RecipeResponseDto)._id}`).expect(204);
  });

  // it('Responses with 404 if id is not found', async () => {
  //   const id = '604bdc0e9d07d51b052f872f';
  //   await request.get(url + id).expect(404);
  //   await request
  //     .put(url + id)
  //     .send(recipe)
  //     .expect(404);
  //   await request.delete(url + id).expect(404);
  // });
});
