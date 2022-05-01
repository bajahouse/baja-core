import { std } from "wow/wotlk";
import { MODNAME } from "./farming-base";

let gobSpell = std.Spells.create(MODNAME, "farming-template-spell-gob", 61031);
gobSpell.CastTime.setSimple(1000, 0, 1000);
gobSpell.Duration.setSimple(0, 0, 0);
gobSpell.Range.setSimple(0, 20);
export let gobSpellEntry = gobSpell.ID

let creatureSpell = std.Spells.create(MODNAME, "farming-template-spell-creature", 4055);
creatureSpell.CastTime.setSimple(1000, 0, 1000);
creatureSpell.Duration.setSimple(0, 0, 0);
creatureSpell.Effects.get(0)
    .Type.SUMMON.set()
    .SummonProperties.set(4000)
    .ImplicitTargetA.DEST_CASTER.set()
export let creatureSpellEntry = creatureSpell.ID

let item = std.Items.create(MODNAME, "farming-template-creature-spell", 44606);
item.Quality.set(3);
item.MaxCount.set(-1)
item.Bonding.NO_BOUNDS.set();
item.Description.enGB.set("");
item.DisplayInfo.setSimpleIcon("INV_Misc_Gear_01");
item.Spells.clearAll();
item.Price.set(0, 0);
export let itemEntry = item.ID