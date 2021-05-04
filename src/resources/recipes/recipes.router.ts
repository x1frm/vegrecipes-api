import express from 'express';
import recipesController from './recipes.controller';
import recipesValidation from './validation/recipes.validation';

const router = express.Router();

router
  .route('/')
  .get(recipesController.getAll)
  .post(recipesValidation.joi.post, recipesController.add);

router
  .route('/:id')
  .get(recipesValidation.paramsId, recipesController.getById)
  .patch(recipesValidation.joi.patch, recipesController.update)
  .delete(recipesValidation.paramsId, recipesController.remove);

export default router;
