// ============================================================================
//
// - Fill Database -
//
//   This file creates the database tables and fills them with information from const-creations
//   After being run once, createDatabase and fillDatabase can be safely commented out until you next run --rebuild
//   or if you modify the name/displays of the items inside of const-creations
//
// - External scripts -
//   Datascripts: datascripts/const-creation
//   Livescripts: livescripts/item-create/item-create-lib 
//
// ============================================================================

import { std } from "wow/wotlk"
import { displays, names } from "./const-creations"

createDatabase()
fillDatabase()

function createDatabase() {
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
}

function fillDatabase() {
    let sqlExecute = ""
    names.forEach((v, i, arr) => {
        sqlExecute += 'REPLACE INTO `custom_item_template_names` VALUES (' + v[0] + ',' + v[1] + ',' + v[2] + ',' + v[3] + ',\'' + v[4] + '\');'
    })
    displays.forEach((v, i, arr) => {
        sqlExecute += 'REPLACE INTO `custom_item_template_displays` VALUES (' + v[0] + ',' + v[1] + ',' + v[2] + ',' + v[3] + ',' + v[4] + ');'
    })
    std.SQL.Databases.world_dest.writeLate(sqlExecute)
}