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
  if (!isNumeric(number)) {return number;}

  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

export const calculateGradient = (color1, color2, ratio) => {
  var hex = function(x) {
      x = x.toString(16);
      return (x.length === 1) ? '0' + x : x;
  };

  var r = Math.ceil(parseInt(color1.substring(0,2), 16) * ratio + parseInt(color2.substring(0,2), 16) * (1-ratio));
  var g = Math.ceil(parseInt(color1.substring(2,4), 16) * ratio + parseInt(color2.substring(2,4), 16) * (1-ratio));
  var b = Math.ceil(parseInt(color1.substring(4,6), 16) * ratio + parseInt(color2.substring(4,6), 16) * (1-ratio));

  var gradient = hex(r) + hex(g) + hex(b);
  return gradient;
}


export const isNumeric = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export const getNearestThousand = (val, roundUp) => {
  if ((val % 1000 === 0) || (val % 1000 === -0)) {
    return val;
  }

  let base = parseInt(val / 1000, 10);

  if (roundUp) {
    return 1000 * (val < 0 ? base : base + 1);
  }

  return 1000 * (val < 0 ? base - 1 : base);
}
