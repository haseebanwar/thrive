/*
 * Generic Helper functions to be used in entire application
 */

// function to uppercase first letter of the string
export const uppercaseFirst = str => {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};

//  function for sorting by numeric values
export const sortNumeric = (arr, sortKey, sortOrder) => {
  if (sortKey === 'totalCost') {
    const sorted = arr.sort((a, b) => {
      if (sortOrder === 'ASC') {
        return (
          a['cost']['totalCost']['value'] - b['cost']['totalCost']['value']
        );
      }
      if (sortOrder === 'DESC') {
        return (
          b['cost']['totalCost']['value'] - a['cost']['totalCost']['value']
        );
      }
      return 0;
    });
    return sorted;
  } else {
    const sorted = arr.sort((a, b) => {
      if (sortOrder === 'ASC') {
        return a[sortKey] - b[sortKey];
      }
      if (sortOrder === 'DESC') {
        return b[sortKey] - a[sortKey];
      }
      return 0;
    });
    return sorted;
  }
};

// convert UD to CAD
export const USToCAD = costInUSCents => {
  const costInCADCents = costInUSCents * 1.32;
  const actualCost = {
    unit: costInCADCents > 100 ? '$' : 'Cents',
    value:
      costInCADCents > 100
        ? (costInCADCents / 100).toFixed(2)
        : costInCADCents.toFixed(2)
  };
  actualCost['value'] = parseFloat(actualCost['value']);
  return actualCost;
};

// adjust cost
export const adjustCost = (newCost, costObject) => {
  if (costObject.unit === 'Cents') {
    const cost = {
      unit: newCost > 100 ? '$' : 'Cents',
      value: newCost > 100 ? (newCost / 100).toFixed(2) : newCost.toFixed(2)
    };
    cost['value'] = parseFloat(cost['value']);
    return cost;
  } else if (costObject.unit === '$') {
    const cost = {
      unit: newCost < 1 ? 'Cents' : '$',
      value: newCost < 1 ? (newCost * 100).toFixed(2) : newCost.toFixed(2)
    };
    cost['value'] = parseFloat(cost['value']);
    return cost;
  }
};

// adjust recipe according to servings
export const adjustRecipe = (newServings, recipe) => {
  const newUpdatedServings = (newServings / recipe.servings).toFixed(2);
  return {
    ...recipe,
    servings: newServings,
    ingredients: recipe.ingredients.map(ingredient => ({
      ...ingredient,
      amount: {
        metric: {
          ...ingredient['amount']['metric'],
          value: parseFloat(
            (
              ingredient['amount']['metric']['value'] * newUpdatedServings
            ).toFixed(2)
          )
        },
        us: {
          ...ingredient['amount']['us'],
          value: parseFloat(
            (ingredient['amount']['us']['value'] * newUpdatedServings).toFixed(
              2
            )
          )
        }
      },
      cost: adjustCost(
        ingredient['cost']['value'] * newUpdatedServings,
        ingredient.cost
      )
    })),
    cost: {
      ...recipe.cost,
      totalCost: adjustCost(
        recipe['cost']['totalCost']['value'] * newUpdatedServings,
        recipe['cost']['totalCost']
      )
    }
  };
};
