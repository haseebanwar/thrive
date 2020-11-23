import validator from 'validator';

/*
 * Generic classes for validating form's fields
 * Contains methods that validates fields and return response
 * Uses validator library
 */

//  Validaion for Recipes
class RecipeValidator {
  /*
   * All these methods return false when there are no errors
   * otherwise they return the error messages
   */
  validateQuery(query) {
    if (validator.isEmpty(query)) {
      return 'Please enter a search query';
    }
    return false;
  }
  validateServings(servings) {
    if (validator.isEmpty(servings)) {
      return 'Please enter desired servings';
    } else if (!validator.isNumeric(servings)) {
      return 'Please enter a numeric value';
    } else if (validator.toInt(servings) === 0) {
      return 'Servings must be greater than 0';
    }
    return false;
  }
}

// Validation for Users
class UserValidator {
  /*
   * All these methods return false when there are no errors
   * otherwise they return the error messages
   */
  validateName(name) {
    if (validator.isEmpty(name)) {
      return 'Please enter your name';
    }
    return false;
  }
  validateEmail(email) {
    if (validator.isEmpty(email)) {
      return 'Please enter your email';
    } else if (!validator.isEmail(email)) {
      return 'Invalid Email';
    }
    return false;
  }
  validatePassword(password) {
    if (validator.isEmpty(password)) {
      return 'Please enter a password';
    } else if (!validator.isLength(password, { min: 6 })) {
      return 'Password should be minimum 6 characters';
    }
    return false;
  }
}

const recipeValidator = new RecipeValidator();
const userValidator = new UserValidator();

export { recipeValidator, userValidator };
