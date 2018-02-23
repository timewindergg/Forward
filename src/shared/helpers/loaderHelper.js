export const hasDataLoaded = (objects) => {
  for (var i = 0; i < objects.length; i++){
    if (objects[i] instanceof Array ){
      if (objects[i].length === 0){
        return false;
      }
    }
    else if (objects[i] instanceof Object){
      if (Object.keys(objects[i]).length === 0){
        return false;
      }
    }
    else {
      return false;
    }
  }

  return true;
}

// same as above but user gets to pass in custom assertions for data loading
export const assertDataLoaded = (objectsAndAssertions) => {
  return objectsAndAssertions.every((objectAndAssertion) => {
    const obj = objectAndAssertion[0];

    if (objectAndAssertion.length === 1) {
      if (obj instanceof Array ) {
        return obj.length > 0;
      }
      else if (obj instanceof Object) {
        return Object.keys(obj).length > 0;
      }
    }


    const assertion = objectAndAssertion[1];
    return assertion(obj);
  })
}
