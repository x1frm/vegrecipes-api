import Validation from '../../../common/validation/validation';
import recipesSchemas from './recipes.schemas';

class RecipeValidation extends Validation {}

export default new RecipeValidation(recipesSchemas);
