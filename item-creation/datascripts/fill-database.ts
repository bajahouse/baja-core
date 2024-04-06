import { std } from "wow/wotlk"
import { displays, names, statChoices, statToWeight } from "./const-creations"
import { runDB } from "../datascripts"

if(runDB)
{
    createDatabaseNameDisplay()
    fillDatabaseNameDisplay()
    fillStatChoices()
    fillStatWeights()
}

function createDatabaseNameDisplay() {
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

function fillDatabaseNameDisplay() {
    let sqlExecute = ""
    names.forEach((v, i, arr) => {
        sqlExecute += 'REPLACE INTO `custom_item_template_names` VALUES (' + v[0] + ',' + v[1] + ',' + v[2] + ',' + v[3] + ',\'' + v[4] + '\');'
    })
    displays.forEach((v, i, arr) => {
        sqlExecute += 'REPLACE INTO `custom_item_template_displays` VALUES (' + v[0] + ',' + v[1] + ',' + v[2] + ',' + v[3] + ',' + v[4] + ');'
    })
    std.SQL.Databases.world_dest.writeLate(sqlExecute)
}

export function fillStatChoices() {
    std.SQL.Databases.world_dest.writeEarly(`
        DROP TABLE IF EXISTS \`stat_choices\`;
        CREATE TABLE \`stat_choices\`  (
        \`statGroup\` int(11) NULL DEFAULT NULL,
        \`primaries\` VARCHAR(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
        \`secondaries\`VARCHAR(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL
        ) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;
    `)
    for (let i = 0; i < statChoices[0].length; i++)//0->2, str, agi,int
    {
        std.SQL.Databases.world_dest.write("INSERT INTO `stat_choices` (`statGroup`,`primaries`, `secondaries`) VALUES (" + i + ",\"" + statChoices[0][i] + "\",\"" + statChoices[1][i] + "\")")
    }
}

export function fillStatWeights() {
    std.SQL.Databases.world_dest.writeEarly(`
    DROP TABLE IF EXISTS \`stat_weights\`;
    CREATE TABLE \`stat_weights\`  (
    \`statID\` int(11) NULL DEFAULT NULL,
    \`statMult\` double NULL DEFAULT NULL
    ) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;
`)


    for (let [stat, weight] of Object.entries(statToWeight)) {
        std.SQL.Databases.world_dest.write("INSERT INTO `stat_weights` (`statID`,`statMult`) VALUES (" + stat + "," + weight + ")")
    }
}
