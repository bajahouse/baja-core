import { std } from "wow/wotlk";

export const areaGroupID = 3000;
std.DBC.AreaGroup.add(areaGroupID).AreaID.set([1977]); //change to a dungeon eventually
std.SQL.Databases.world_dest.writeEarly('DROP TABLE IF EXISTS `player_housing_spell_object_link`;')
std.SQL.Databases.world_dest.writeEarly('CREATE TABLE `player_housing_spell_object_link` (`spellID` int(11) NULL DEFAULT NULL, `typeID` int(11) NULL DEFAULT NULL, `entry` int(11) NULL DEFAULT NULL)')

//execute this in your characters/ DB 
//CREATE TABLE IF NOT EXISTS `player_housing` ( `playerGUID` int(11) NOT NULL, `mapID` int(11) NULL DEFAULT NULL, `versionID` int(11) NULL DEFAULT NULL, `typeID` int(11) NULL DEFAULT NULL, `entry` int(11) NULL DEFAULT NULL, `x` float NULL DEFAULT NULL, `y` float NULL DEFAULT NULL, `z` float NULL DEFAULT NULL, `o` float NULL DEFAULT NULL )
