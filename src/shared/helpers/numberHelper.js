export const numberFormatter = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(0).replace(/\.0$/, '') + 'G';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(0).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0).replace(/\.0$/, '') + 'K';
  }
  return num;
}

// shameless copied from Mozilla docs
export const roundWithPrecision = (number, precision) => {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}
