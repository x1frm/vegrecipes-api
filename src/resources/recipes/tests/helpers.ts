import { RecipeRequestDto, RecipeResponseDto } from '../recipe.dto';
import { PageType } from '../recipes.model';
import recipesService from '../recipes.service';

const id = 'aaabbbcccddd';
const url = 'https://eda.ru/recepty/osnovnye-blyuda/bulgur-s-tikvoj-52694';

export const getRecipeRequestData = (
  mergeObj?: Partial<RecipeRequestDto>,
  propsToRemove?: [keyof RecipeRequestDto]
): RecipeRequestDto => {
  const request: RecipeRequestDto = {
    name: 'Blinchiki',
    description: 'Mmm',
    time: 20,
    ingredients: [
      {
        id: '604bdc0e9d07d51b052f872e',
        amount: 40,
      },
      {
        id: '604bdc0e9d07d51b052f8729',
        amount: 60,
      },
    ],
    nutrition: {
      fat: 20,
      protein: 30,
      carbohydrates: 40,
    },
    dishTypes: [{ id: '604bdc0e9d07d51b052f872f' }],
    equipment: [{ id: '604bdc0e9d07d51b052f872a' }],
    pageUrl: url,
    ...mergeObj,
  };

  propsToRemove?.forEach(el => delete request[el]);

  return { ...request, ...mergeObj };
};

export const getRecipeResponseData = (
  mergeObj?: Partial<RecipeResponseDto>,
  propsToRemove?: [keyof RecipeResponseDto]
): Partial<RecipeResponseDto> => {
  const response: Partial<RecipeResponseDto> = {
    name: 'Blinchiki',
    description: 'Mmm',
    time: 20,
    ingredients: [
      {
        id: '604bdc0e9d07d51b052f872e',
        amount: 40,
      },
      {
        id: '604bdc0e9d07d51b052f8729',
        amount: 60,
      },
    ],
    nutrition: {
      fat: 20,
      protein: 30,
      carbohydrates: 40,
    },
    dishTypes: [{ id: '604bdc0e9d07d51b052f872f' }],
    equipment: [{ id: '604bdc0e9d07d51b052f872a' }],
    page: {
      id,
      pageType: PageType.EXTERNAL,
      url,
    },
  };

  propsToRemove?.forEach(el => delete response[el]);

  return { ...response, ...mergeObj };
};

export const mockSaveExtHtml = (): jest.SpyInstance =>
  jest
    .spyOn(recipesService, 'saveExternalHTML')
    .mockImplementation()
    .mockReturnValue(Promise.resolve(id));

export const mockSavePage = (): jest.SpyInstance =>
  jest
    .spyOn(recipesService, 'savePage')
    .mockImplementation()
    .mockReturnValue(Promise.resolve(getRecipeRequestData()));

export const pageId = id;
