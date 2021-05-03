import express from 'express';
import recipesController from './recipes.controller';
import recipesValidation from './validation/recipes.validation';

const router = express.Router();

router
  .route('/')
  .get(recipesController.getAll)
  .post(recipesValidation.validator().post(), recipesController.add);

router
  .route('/:id')
  .get(recipesController.getById)
  .patch(recipesValidation.validator().patch(), recipesController.update)
  .delete(recipesController.remove);

export default router;
