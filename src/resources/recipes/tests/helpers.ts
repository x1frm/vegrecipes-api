import { RecipeRequestDto, RecipeResponseDto } from '../recipe.dto';
import recipesService from '../recipes.service';

export const getRecipeRequestData = (mergeObj?: Partial<RecipeRequestDto>): RecipeRequestDto => ({
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
  pageUrl: 'https://eda.ru/recepty/osnovnye-blyuda/bulgur-s-tikvoj-52694',
  ...mergeObj,
});

export const getRecipeResponseData = (
  mergeObj?: Partial<RecipeResponseDto>
): Partial<RecipeResponseDto> => ({
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
  ...mergeObj,
});

export const mockSaveExtHtml = (): jest.SpyInstance =>
  jest
    .spyOn(recipesService, 'saveExternalHTML')
    .mockImplementation()
    .mockReturnValue(Promise.resolve('aaabbbcccddd'));
