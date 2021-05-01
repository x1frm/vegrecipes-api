import supertest from 'supertest';
import { clearDatabase } from '../../../../test/setup/db';
import app from '../../../app';
import { RecipePostDto, RecipeResponseDto } from '../recipe.dto';
import recipesService from '../recipes.service';
import { getRecipePostDto, mockSaveExtHtml, getRecipeResponseDto } from './helpers';

const request = supertest(app);
const url = '/api/recipes/';

const recipe = getRecipePostDto();
const recipeRes = getRecipeResponseDto();
const postOne = (item: RecipePostDto = recipe) => request.post(url).send(item).expect(200);

describe('/recipes/', () => {
  beforeEach(() => {
    mockSaveExtHtml();
    jest.spyOn(recipesService, 'saveUserHTML').mockImplementation();
  });
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

  it('Puts a recipe', async () => {
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
