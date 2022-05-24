import { std } from "wow/wotlk";

//dungeon
std.SQL.Databases.world_dest.writeEarly(`
DROP TABLE IF EXISTS \`dungeon_spells\`;
CREATE TABLE \`dungeon_spells\`  (
  \`classID\` int(11) NULL DEFAULT NULL,
  \`spellID\` int(11) NULL DEFAULT NULL,
  \`spellRarity\` int(11) NULL DEFAULT NULL,
  \`spellType\` int(11) NULL DEFAULT NULL,
  \`spellDesc\` varchar(1000) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;
`)
