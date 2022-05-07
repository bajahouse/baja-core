import { std } from "wow/wotlk";
import { MODNAME } from "./farming-base";

let gobSpell = std.Spells.create(MODNAME, "farming-template-spell-gob", 61031)
    .CastTime.setSimple(1000, 0, 1000)
    .Duration.setSimple(0, 0, 0)
    .Range.setSimple(0, 20)
export let gobSpellEntry = gobSpell.ID

let creatureSpell = std.Spells.create(MODNAME, "farming-template-spell-creature", 4055);
creatureSpell.CastTime.setSimple(1000, 0, 1000)
    .Duration.setSimple(0, 0, 0)
    .Effects.get(0)
    .Type.SUMMON.set()
    .SummonProperties.set(4000)
    .ImplicitTargetA.DEST_CASTER.set();
export let creatureSpellEntry = creatureSpell.ID

let item = std.Items.create(MODNAME, "farming-template-creature-spell", 44606)
    .Quality.set(3)
    .MaxCount.set(-1)
    .Bonding.NO_BOUNDS.set()
    .Description.enGB.set("")
    .DisplayInfo.setSimpleIcon("INV_Misc_Gear_01")
    .MaxStack.set(20)
    .Spells.clearAll()
    .Price.set(0, 0)
export let itemEntry = item.ID