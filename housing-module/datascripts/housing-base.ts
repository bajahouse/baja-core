import { std } from "wow/wotlk";

export const areaGroupID = 3000;
std.DBC.AreaGroup.add(areaGroupID).AreaID.set([1977]); //change to a dungeon eventually

//create sql table  player_housing_spell_object_link(world)(links spellID to gobID, should be in memory on startup)(each time truncate and go again(possibly just use REPLACE INTO isntead of truncate?)) and
// player_housing(characters)(once) stores each players instance of gobs/creatures/versioniD