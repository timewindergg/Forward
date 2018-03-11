export const sortItems = (items, isRed = true) => {
  let total = 0;

  let sItems = Object.keys(items).map(item => {
    total += items[item];
    return {key: item, value: items[item]}
  });

  if (isRed) {
    sItems.sort((a, b) => {
      if (a.value < b.value){ return 1; }
      else if (a.value > b.value) { return -1; }
      return 0;
    });
  } else {
    // ascending order because CSS HACK!
    sItems.sort((a, b) => {
      if (a.value < b.value){ return -1; }
      else if (a.value > b.value) { return 1; }
      return 0;
    });
  }

  return [sItems, total];
}
