import { std } from "wow/wotlk";
import { MODNAME } from "./farming-base";
import { gobSpellEntry, creatureSpellEntry, itemEntry } from "./farming-objects";

export function setupAreaForCrops(areaID: number, cropCount: number) {
    std.SQL.Databases.world_dest.write(`INSERT INTO \`farming_crops_size\` VALUES ( ${areaID}, ${cropCount})`);
}

export function makeHousingItemForFertilizer(name: string, mult: number) {
    let spellID = makeHousingSpellFertilizer(name, mult);
    let itemID = makeHousingItemTemplate(name, spellID);
    return itemID
}

function makeHousingSpellFertilizer(name: string, mult: number): number {
    let spl = std.Spells.create(MODNAME, "farming-" + name.toLowerCase().replace(" ", "-"), 67285);
    spl.Name.enGB.set("Farming: Fertilizer " + name);
    spl.Description.enGB.set("Used to speed up fertilization by " + mult + "x.");
    spl.Priority.set(mult)
    spl.Tags.add(MODNAME, 'farming-fertilizer-spell')
    return spl.ID;
}

export function makeHousingItemForCrop(firstCopy: number, finalCopy: number, name: string, growthtime: number, harvestReward: uint32, minreward: uint32, maxReward: uint32) {
    let spellID = makeHousingSpellCrop(firstCopy, name);
    let itemID = makeHousingItemTemplate(name, spellID);
    let objFinal = std.GameObjectTemplates.Rituals.create(MODNAME, "farming-" + name.toLowerCase().replace(" ", "-") + "-final", 177193);
    objFinal.Name.enGB.set(name);
    objFinal.Tags.add(MODNAME, 'farming-crop-final');
    objFinal.Display.set(std.GameObjectTemplates.Generic.load(finalCopy).Display.get())
    std.SQL.Databases.world_dest.write(`INSERT INTO \`farming_crops\` VALUES ( ${firstCopy}, ${objFinal.ID}, ${growthtime}, ${spellID},${harvestReward},${minreward},${maxReward})`);
    return itemID;
}

function makeHousingSpellCrop(entry: number, name: string): number {
    let spl = std.Spells.create(MODNAME, "farming-" + name.toLowerCase().replace(" ", "-"), gobSpellEntry)
        .Name.enGB.set("Farming: Spawn " + name)
        .Description.enGB.set("Used to place a " + name + " at a chosen location.")
        .Priority.set(entry)
        .Tags.add(MODNAME, 'farming-crop-spell')
    spl.Effects.get(0).MiscValueA.set(entry);
    return spl.ID;
}

export function makeHousingItemForGob(entry: number, name: string) {
    let spellID = makeHousingSpellGob(entry, name);
    let itemID = makeHousingItemTemplate(name, spellID);
    return itemID;
}

function makeHousingSpellGob(entry: number, name: string): number {
    let spl = std.Spells.create(MODNAME, "farming-" + name.toLowerCase().replace(" ", "-"), gobSpellEntry)
        .Name.enGB.set("Housing: Spawn " + name)
        .Description.enGB.set("Used to place a " + name + " at a chosen location.")
        .Priority.set(entry)
        .Tags.add(MODNAME, 'farming-gob-spell')
    let obj = std.GameObjectTemplates.Generic.create(MODNAME, "farming-" + name.toLowerCase().replace(" ", "-"), entry);
        obj.Tags.add(MODNAME,'farming-gob')
    spl.Effects.get(0).MiscValueA.set(obj.ID)

    return spl.ID;
}

export function makeHousingItemForCreature(entry: number, name: string) {
    let spellID = makeHousingSpellCreature(entry, name);
    let itemID = makeHousingItemTemplate(name, spellID);
    return itemID;
}

function makeHousingSpellCreature(entry: number, name: string): number {
    let spl = std.Spells.create(MODNAME, "farming-" + name.toLowerCase().replace(" ", "-"), creatureSpellEntry)
        .Name.enGB.set("Housing: Spawn " + name)
        .Description.enGB.set("Used to place a " + name + " at your feet.")
        .Priority.set(entry)
        .Tags.add(MODNAME, 'farming-creature-spell')
    spl.Effects.get(0).MiscValueA.set(entry);

    return spl.ID;
}

function makeHousingItemTemplate(name: string, spellID: number) {
    let item = std.Items.create(MODNAME, "farming-" + name.toLowerCase().replace(" ", "-"), itemEntry)
        .Name.enGB.set("Housing: Spawn " + name)
        .Spells.addMod((val) => {
            val.Spell.set(spellID);
            val.Charges.set(1, "DELETE_ITEM")
        });
    return item.ID;
}