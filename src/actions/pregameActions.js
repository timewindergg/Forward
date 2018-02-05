export const PREGAME_SELECT_SUMMONER = 'PREGAME_SELECT_SUMMONER';

export const selectSummoner = (summonerID, isRed) => ({
  type: PREGAME_SELECT_SUMMONER,
  payload: {
    summonerID,
    isRed
  }
});
