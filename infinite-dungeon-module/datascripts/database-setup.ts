import { std } from "wow/wotlk";

//dungeon
std.SQL.Databases.world_dest.writeEarly('DROP TABLE IF EXISTS `dungeon_spells`;')
std.SQL.Databases.world_dest.writeEarly('CREATE TABLE `dungeon_spells`  (  `classID` int(11) NOT NULL,  `spellID` int(11) NOT NULL,  `rarity` int(11) NULL DEFAULT NULL,  `type` int(11) NULL DEFAULT NULL,  `description` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,  PRIMARY KEY (`classID`, `spellID`) USING BTREE)')

