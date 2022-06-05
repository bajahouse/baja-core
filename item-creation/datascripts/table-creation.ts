import { std } from "wow/wotlk";

std.SQL.Databases.world_dest.writeEarly(`
DROP TABLE IF EXISTS \`custom_item_template_displays\`;
CREATE TABLE \`custom_item_template_displays\`  (
  \`quality\` int(11) NOT NULL,
  \`class\` int(11) NOT NULL,
  \`subclass\` int(11) NOT NULL,
  \`invtype\` int(11) NOT NULL,
  \`displayid\` int(11) NOT NULL
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;
`)

std.SQL.Databases.world_dest.writeEarly(`
DROP TABLE IF EXISTS \`custom_item_template_names\`;
CREATE TABLE \`custom_item_template_names\`  (
  \`nameType\` int(11) NULL DEFAULT NULL,
  \`class\` int(11) NULL DEFAULT NULL,
  \`subclass\` int(11) NULL DEFAULT NULL,
  \`invtype\` int(11) NULL DEFAULT NULL,
  \`name\` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;
`)