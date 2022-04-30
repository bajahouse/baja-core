import { std } from "wow/wotlk";
import { areaGroupID, MODNAME } from "./housing-base";

let gobSpell = std.Spells.create(MODNAME, "housing-template-spell-gob", 61031);
gobSpell.CastTime.setSimple(1000, 0, 1000);
gobSpell.Duration.setSimple(0, 0, 0);
gobSpell.Range.setSimple(0, 20);
gobSpell.RequiredArea.set(areaGroupID);
export let gobSpellEntry = gobSpell.ID

let creatureSpell = std.Spells.create(MODNAME, "housing-template-spell-creature", 4055);
creatureSpell.CastTime.setSimple(1000, 0, 1000);
creatureSpell.Duration.setSimple(0, 0, 0);
creatureSpell.Effects.get(0)
    .Type.SUMMON.set()
    .SummonProperties.set(4000)
    .ImplicitTargetA.DEST_CASTER.set()
creatureSpell.RequiredArea.set(areaGroupID);
export let creatureSpellEntry = creatureSpell.ID

let item = std.Items.create(MODNAME, "housing-template-item", 44606);
item.Quality.set(3);
item.Bonding.NO_BOUNDS.set();
item.Description.enGB.set("");
item.DisplayInfo.setSimpleIcon("INV_Misc_Gear_01");
item.Spells.clearAll();
item.Price.set(0, 0);
export let itemEntry = item.ID