import { std } from "wow/wotlk";
import { MODNAME } from "./farming-base";
import { gobSpellEntry, creatureSpellEntry, itemEntry } from "./farming-objects";

export function makeHousingItemForCrop(startingVisual: number, finalVisual: number, name: string, growthtime: number) {
    let spellID = makeHousingSpellCrop(startingVisual, name);
    let itemID = makeHousingItemTemplate(name, spellID);
    std.SQL.Databases.world_dest.write(`INSERT INTO \`farming_crops\` VALUES ( ${startingVisual}, ${finalVisual}, ${growthtime}, ${spellID} );`)
    return itemID;
}

function makeHousingSpellCrop(entry: number, name: string): number {
    let spl = std.Spells.create(
        MODNAME,
        "farming-" + name.toLowerCase().replace(" ", "-"),
        gobSpellEntry
    );
    spl.Name.enGB.set("Farming: Spawn " + name);
    spl.Description.enGB.set("Used to place a " + name + " at a chosen location.");
    spl.Effects.get(0).MiscValueA.set(entry)
    spl.Priority.set(entry)
    spl.Tags.add(MODNAME, 'farming-crop-spell')
    return spl.ID;
}

export function makeHousingItemForGob(entry: number, name: string) {
    let spellID = makeHousingSpellGob(entry, name);
    let itemID = makeHousingItemTemplate(name, spellID);
    return itemID;
}

function makeHousingSpellGob(entry: number, name: string): number {
    let spl = std.Spells.create(
        MODNAME,
        "farming-" + name.toLowerCase().replace(" ", "-"),
        gobSpellEntry
    );
    spl.Name.enGB.set("Housing: Spawn " + name);
    spl.Description.enGB.set("Used to place a " + name + " at a chosen location.");
    spl.Effects.get(0).MiscValueA.set(entry)
    spl.Priority.set(entry)
    spl.Tags.add(MODNAME, 'farming-gob-spell')
    return spl.ID;
}

export function makeHousingItemForCreature(entry: number, name: string) {
    let spellID = makeHousingSpellCreature(entry, name);
    let itemID = makeHousingItemTemplate(name, spellID);
    return itemID;
}

function makeHousingSpellCreature(entry: number, name: string): number {
    let spl = std.Spells.create(
        MODNAME,
        "farming-" + name.toLowerCase().replace(" ", "-"),
        creatureSpellEntry
    );
    spl.Name.enGB.set("Housing: Spawn " + name);
    spl.Description.enGB.set("Used to place a " + name + " at your feet.");
    spl.Effects.get(0).MiscValueA.set(entry)
    spl.Priority.set(entry)
    spl.Tags.add(MODNAME, 'farming-creature-spell')
    return spl.ID;
}

function makeHousingItemTemplate(name: string, spellID: number) {
    let item = std.Items.create(
        MODNAME,
        "farming-" + name.toLowerCase().replace(" ", "-"),
        itemEntry
    );
    item.Name.enGB.set("Housing: Spawn " + name);
    item.Spells.addMod((val) => {
        val.Spell.set(spellID);
        val.Charges.set(1,"DELETE_ITEM")
    });
    return item.ID;
}