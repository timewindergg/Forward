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