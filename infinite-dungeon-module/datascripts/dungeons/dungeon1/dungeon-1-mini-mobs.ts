// ============================================================================
//
// - Dungeon 1 mini mobs -
//
//   This file creates the bosses for dungeon 1 mini mobs
//
// - External scripts -
//   Livescripts: livescripts/dungeon/dungeon-1
//
// ============================================================================

import { std } from "wow/wotlk";
import { MODNAME } from "../../modname";

export let minimobOne = std.CreatureTemplates.create(MODNAME,'dungeonminimob1',98)
minimobOne.Name.enGB.set('mini mob 1')
minimobOne.AIName.set('')
export let minimobTwo = std.CreatureTemplates.create(MODNAME,'dungeonminimob2',8912)
minimobTwo.Name.enGB.set('Summoned Twilight Shadow Shaman')
minimobTwo.Subname.enGB.set('Apprentice Acolyte of the Damned')
minimobTwo.AIName.set('')
minimobTwo.Level.set(16,16)
minimobTwo.FactionTemplate.set(18)
minimobTwo.Stats.HealthMod.set(2)
minimobTwo.Stats.DamageMod.set(3)