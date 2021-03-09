import express from 'express';
import recipeRouter from './resources/recipes/recipe.router';
import ingredientRouter from './resources/ingredients/ingredient.router';

const router = express.Router();
router.use('/recipes', recipeRouter);
router.use('/ingredients', ingredientRouter);

export default router;
