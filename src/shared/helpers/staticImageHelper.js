const baseUrl = 'http://127.0.0.1:8000/static';

export const getMasteryIconUrl = (masteryLevel) => {
  return baseUrl + `/masteries/${masteryLevel}.png`;
}

export const getTierIconUrl = (division) => {
  const lowerCased = division.toLowerCase();
  const divisionIconName = lowerCased.charAt(0).toUpperCase() + lowerCased.slice(1);
  return baseUrl + `/tiers/${divisionIconName}.png`;
}