import { std } from "wow/wotlk"
import { displays, names } from "./const-creations"

let sqlExecute = ""
names.forEach((v, i, arr) => {
    sqlExecute += 'INSERT INTO `custom_item_template_names` VALUES (' + v[0] + ',' + v[1] + ',' + v[2] + ',' + v[3] + ',\'' + v[4] + '\');'
})
displays.forEach((v, i, arr) => {
    sqlExecute += 'INSERT INTO `custom_item_template_displays` VALUES (' + v[0] + ',' + v[1] + ',' + v[2] + ',' + v[3] + ',' + v[4] + ');'

})
std.SQL.Databases.world_dest.writeLate(sqlExecute)