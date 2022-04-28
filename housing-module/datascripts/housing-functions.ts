import { std } from "wow/wotlk";
import { areaGroupID } from "./housing-base";

//entry = gob ID / creatureID
//name = name to show 
//typeID = 1 for gob, 2 for creature
export function makeHousingItemForGob(entry: number, name: string) {
    let spellID = makeHousingSpell(name, entry);
    let itemID = makeHousingItemTemplate(name, spellID);
    std.SQL.Databases.world_dest.write(
        "INSERT INTO `player_housing_spell_object_link` VALUES(" +
        spellID +
        "," +
        1 + //typeID
        "," +
        entry +
        ")"
    );
    return itemID;
}

function makeHousingSpell(name: string, entry: number): number {
    let spl = std.Spells.create(
        "testing-housing",
        "housing-" + name.toLowerCase().replace(" ", "-"),
        61031
    );
    spl.Name.enGB.set("Housing: Spawn " + name);
    spl.Description.enGB.set("Used to place a " + name);
    spl.CastTime.setSimple(1000, 0, 1000);
    spl.Duration.setSimple(0, 0, 0);
    spl.Effects.get(0).Type.TRANS_DOOR.set().GOTemplate.set(entry);
    spl.Range.setSimple(0, 20);
    spl.SchoolMask.set(99);
    spl.RequiredArea.set(areaGroupID);
    return spl.ID;
}
function makeHousingItemTemplate(name: string, spellID: number) {
    let item = std.Items.create(
        "testing-housing",
        "housing-" + name.toLowerCase().replace(" ", "-"),
        44606
    );
    item.Name.enGB.set("Housing: Spawn " + name);
    item.Quality.set(3);
    item.Bonding.NO_BOUNDS.set();
    item.Description.enGB.set("");
    item.DisplayInfo.setSimpleIcon("INV_Misc_Gear_01");
    item.Spells.clearAll();
    item.Spells.addMod((val) => {
        val.Spell.set(spellID);
    });
    item.Price.set(0, 0);
    return item.ID;
}
