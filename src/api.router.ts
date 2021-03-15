import express from 'express';
import recipeRouter from './resources/recipes/recipes.router';
import ingredientRouter from './resources/ingredients/ingredients.router';

const router = express.Router();
router.use('/recipes', recipeRouter);
router.use('/ingredients', ingredientRouter);

export default router;
