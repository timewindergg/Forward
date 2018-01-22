const baseUrl = 'http://127.0.0.1:8000/static';

export const getMasteryIconUrl = (masteryLevel) => {
  return baseUrl + `/masteries/${masteryLevel}.png`;
}

export const getTierIconUrl = (division) => {
  const lowerCased = division.toLowerCase();
  const divisionIconName = lowerCased.charAt(0).toUpperCase() + lowerCased.slice(1);
  return baseUrl + `/tiers/${divisionIconName}.png`;
}

const opggBaseUrl = "http://opgg-static.akamaized.net/images/lol/"
const opggPerkIcon = "perk/"
const opggPerkStyleIcon = "perkStyle/"

const ddBaseUrl = "http://ddragon.leagueoflegends.com/cdn/";
const ddProfileIcon = "/img/profileicon/"
const ddChampionIcon = "/img/champion/"
const ddSpellIcon = "/img/spell/"
const ddItemIcon = "/img/item/"

const AssetType = {
  PERK: opggPerkIcon,
  PERK_STYLE: opggPerkStyleIcon,
  PROFILE_ICON: ddProfileIcon,
  CHAMPION: ddChampionIcon,
  SPELL: ddSpellIcon,
  ITEM: ddItemIcon,
};

export const getDDAsset = (version, assetType, assetId) => {
  return ddBaseUrl + version + assetType + assetId + ".png";
}

export const getProfileIconUrl = (id, version) => {
  return getDDAsset(version, AssetType.PROFILE_ICON, id);
}

export const getChampionIconUrl = (id, version) => {
  return getDDAsset(version, AssetType.PROFILE_ICON, id);
}

export const getSpellIconUrl = (id, version) => {
  return getDDAsset(version, AssetType.PROFILE_ICON, id);
}

export const getItemIconUrl = (id, version) => {
  return getDDAsset(version, AssetType.PROFILE_ICON, id);
}

export const getOpggAsset = (assetType, assetId) => {
  return opggBaseUrl + assetType + assetId + ".png";
}

export const getPerkIconUrl = (id, version) => {
  return getOpggAsset(AssetType.PERK, id);
}

export const getPerkStyleIconUrl = (id, version) => {
  return getOpggAsset(AssetType.PERK_STYLE, id);
}

