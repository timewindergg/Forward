export const getPercentClass = (percent) => {
  let pc = 'perc-0-20';
  
  if (percent >= 80) {
    pc = 'perc-80-100';
  } else if (percent >= 60) {
    pc = 'perc-60-80';
  } else if (percent >= 40) {
    pc = 'perc-40-60';
  } else if (percent >= 20) {
    pc = 'perc-20-40';
  }

  return pc;
}