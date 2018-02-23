import ChampionMappings from '../championMappings.js';
import SummonerSpellMappings from '../summonerSpellMappings.js';

const baseUrl = 'http://127.0.0.1:8000/static';

export const getStaticImage = (path) => {
  return baseUrl + path;
}

export const getMasteryIconUrl = (masteryLevel) => {
  return baseUrl + `/masteries/${masteryLevel}.png`;
}

export const getTierIconUrl = (division) => {
  const lowerCased = division.toLowerCase();
  const divisionIconName = lowerCased.charAt(0).toUpperCase() + lowerCased.slice(1);
  return baseUrl + `/tiers/${divisionIconName}.png`;
}

export const getRoleIconUrl = (role) => {
  const roleStr = role.split('_')[0].toLowerCase();
  return baseUrl + `/roles/${roleStr}.png`;
}

const opggBaseUrl = "http://opgg-static.akamaized.net/images/lol/"
const opggPerkIcon = "perk/"
const opggPerkStyleIcon = "perkStyle/"

const ddBaseUrl = "http://ddragon.leagueoflegends.com/cdn/";
const ddProfileIcon = "/img/profileicon/"
const ddChampionIcon = "/img/champion/"
const ddSpellIcon = "/img/spell/"
const ddItemIcon = "/img/item/"
const ddMap = "/img/map/"

const AssetType = {
  PERK: opggPerkIcon,
  PERK_STYLE: opggPerkStyleIcon,
  PROFILE_ICON: ddProfileIcon,
  CHAMPION: ddChampionIcon,
  SPELL: ddSpellIcon,
  ITEM: ddItemIcon,
  MAP: ddMap,
};

export const getDDAsset = (version, assetType, assetId) => {
  return ddBaseUrl + version + assetType + assetId + ".png";
}

export const getProfileIconUrl = (id, version) => {
  return getDDAsset(version, AssetType.PROFILE_ICON, id);
}

export const getChampionIconUrl = (id, version) => {
  return getDDAsset(version, AssetType.CHAMPION, ChampionMappings[id].image);
}

export const getSpellIconUrl = (id, version) => {
  return getDDAsset(version, AssetType.SPELL, SummonerSpellMappings[id].image);
}

export const getChampionSpellIconUrl = (name, version) => {
  name = name.substr(0, name.length - 4);
  return getDDAsset(version, AssetType.SPELL, name);
}

export const getItemIconUrl = (id, version) => {
  if (id === 0 || id === undefined) return "";
  return getDDAsset(version, AssetType.ITEM, id);
}

export const getMapUrl = (id, version) => {
  return getDDAsset(version, AssetType.MAP, "map"+id);
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
