// ============================================================================
//
// - Base Objects -
//
//   This file craetes the base object to be copied in functions
//
// - External scripts -
//   Datascripts: datascripts/functions
//
// ============================================================================

import { std } from "wow/wotlk";
import { MODNAME } from "./datascripts";
let sProp = std.DBC.SummonProperties.add(std.IDs.SummonProperties.id()).Control.set(0).Faction.set(35).Title.set(0).Slot.set(0).Flags.set(6272)

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
    .SummonProperties.set(sProp.ID.get())
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

let removeGobSpell = std.Spells.create(MODNAME, "farming-template-remove-gob", 23618)
    .CastTime.setSimple(1000, 0, 1000)
    .Tags.add(MODNAME, 'farming-remove-gob-spell')
let removeGobItem = std.Items.create(MODNAME, "farming-remove-gob-item", itemEntry)
    .Name.enGB.set("Housing: Remove GameObject")
    .Spells.addMod((val) => {
        val.Spell.set(removeGobSpell.ID);
        val.Charges.set("UNLIMITED")
    });