import mockHttp from '../../../../test/helpers/mock-http';
import { clearDatabase } from '../../../../test/setup/db';
import { RecipePostDto, RecipeResponseDto } from '../recipe.dto';
import recipesController from '../recipes.controller';
import recipesService from '../recipes.service';
import { getRecipePostDto, getRecipeResponseDto, mockSaveExtHtml } from './helpers';

const url = '/api/recipes/';

const recipe = getRecipePostDto();
const recipeRes = getRecipeResponseDto();

const postOne = async (item: RecipePostDto = recipe) => {
  const mock = mockHttp.post(url, item);
  await recipesController.add(...mock.mock);
  return mock;
};

describe('/recipes/', () => {
  beforeEach(() => {
    mockSaveExtHtml();
    jest.spyOn(recipesService, 'saveUserHTML').mockImplementation();
  });
  afterEach(clearDatabase);

  it('Gets empty array when no recipes were added yet', async () => {
    expect.assertions(2);

    const mock = mockHttp.get(url);

    await recipesController.getAll(...mock.mock);

    expect(mock.body).toStrictEqual([]);
    expect(mock.status).toBe(200);
  });

  it('Gets all recipes', async () => {
    expect.assertions(2);

    const pancakes = getRecipePostDto({
      name: 'Pancakes',
    });
    const pancakesRes = getRecipeResponseDto({
      name: 'Pancakes',
    });
    await postOne();
    await postOne(pancakes);
    const get = mockHttp.get(url);

    await recipesController.getAll(...get.mock);

    expect(get.body).toMatchObject([recipeRes, pancakesRes]);
    expect(get.status).toBe(200);
  });

  it('Post a single recipe and gets it back', async () => {
    expect.assertions(4);

    const post = await postOne();
    const get = mockHttp.get(url);

    await recipesController.getAll(...get.mock);

    expect(post.body).toMatchObject(recipeRes);
    expect(get.body).toMatchObject([recipeRes]);
    expect(post.status).toBe(200);
    expect(get.status).toBe(200);
  });

  it('Gets a recipe by id', async () => {
    expect.assertions(2);

    const post = await postOne();
    const id = (post.body as RecipeResponseDto)._id;
    const get = mockHttp.get(`${url}${id}`).params({ id });

    await recipesController.getById(...get.mock);

    expect(get.body).toMatchObject(recipeRes);
    expect(get.status).toBe(200);
  });

  it('Puts a recipe', async () => {
    expect.assertions(4);

    const post = await postOne();
    const updated = getRecipePostDto({ description: 'Tasty breakfast' });
    const updatedRes = getRecipeResponseDto({ description: 'Tasty breakfast' });
    const postId = (post.body as RecipeResponseDto)._id;
    const patch = mockHttp.patch(`${url}${postId}`, updated).params({ id: postId });

    await recipesController.update(...patch.mock);

    const id = (post.body as RecipeResponseDto)._id;
    const get = mockHttp.get(`${url}${id}`).params({ id });
    await recipesController.getById(...get.mock);

    expect(patch.body.description).toBe(updated.description);
    expect(get.body).toMatchObject(updatedRes);
    expect(patch.status).toBe(200);
    expect(get.status).toBe(200);
  });

  it('Deletes a recipe', async () => {
    expect.assertions(1);

    const post = await postOne();
    const id = (post.body as RecipeResponseDto)._id;
    const del = mockHttp.del(`${url}${id}`).params({ id });

    await recipesController.remove(...del.mock);

    expect(del.status).toBe(204);
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
