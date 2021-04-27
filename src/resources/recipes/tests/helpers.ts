import { RecipeRequestDto } from '../recipe.dto';

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
  ...mergeObj,
});
