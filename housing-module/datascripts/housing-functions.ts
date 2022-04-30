import { std } from "wow/wotlk";
import { MODNAME } from "./housing-base";
import { creatureSpellEntry, gobSpellEntry, itemEntry } from "./housing-template-objects";

//entry = gob ID / creatureID
//name = name to show 
//typeID = 1 for gob, 2 for creature
export function makeHousingItemForGob(entry: number, name: string) {
    let spellID = makeHousingSpellGob(entry, name);
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

function makeHousingSpellGob(entry: number, name: string): number {
    let spl = std.Spells.create(
        MODNAME,
        "housing-" + name.toLowerCase().replace(" ", "-"),
        gobSpellEntry
    );
    spl.Name.enGB.set("Housing: Spawn " + name);
    spl.Description.enGB.set("Used to place a " + name + " at a chosen location.");
    spl.Effects.get(0).MiscValueA.set(entry)
    spl.Tags.add(MODNAME, 'spawn-obj')
    return spl.ID;
}

export function makeHousingItemForCreature(entry: number, name: string) {
    let spellID = makeHousingSpellCreature(entry, name);
    let itemID = makeHousingItemTemplate(name, spellID);
    std.SQL.Databases.world_dest.write(
        "INSERT INTO `player_housing_spell_object_link` VALUES(" +
        spellID +
        "," +
        2 + //typeID
        "," +
        entry +
        ")"
    );
    return itemID;
}

function makeHousingSpellCreature(entry: number, name: string): number {
    let spl = std.Spells.create(
        MODNAME,
        "housing-" + name.toLowerCase().replace(" ", "-"),
        creatureSpellEntry
    );
    spl.Name.enGB.set("Housing: Spawn " + name);
    spl.Description.enGB.set("Used to place a " + name + " at your feet.");
    spl.Effects.get(0).MiscValueA.set(entry)
    spl.Tags.add(MODNAME, 'spawn-obj')
    return spl.ID;
}

function makeHousingItemTemplate(name: string, spellID: number) {
    let item = std.Items.create(
        MODNAME,
        "housing-" + name.toLowerCase().replace(" ", "-"),
        itemEntry
    );
    item.Name.enGB.set("Housing: Spawn " + name);
    item.Spells.addMod((val) => {
        val.Spell.set(spellID);
    });
    return item.ID;
}
