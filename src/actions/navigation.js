export const NavigationActions = {
  SEARCH_SUMMONER: 'SEARCH_SUMMONER'
};

export const searchSummoner = ({region, summoner}) => ({
  type: NavigationActions.SEARCH_SUMMONER,
  payload: {
    region,
    summoner
  }
});
