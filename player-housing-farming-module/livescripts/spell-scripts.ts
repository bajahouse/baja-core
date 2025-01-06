// ============================================================================
//
// - Spell Scripts -
//
//   This file has all spell and gob scripts for housing
//
// - External scripts -
//   Livescripts: livescripts/base-classes
//   Datascripts: datascripts/example-usage
//
// ============================================================================

import { CropSizes, PlayerHouseCrops, PlayerHouseGobs, PlayerHouseCreatures, PlayerHouse } from "./base-classes";

export function RegisterFarmingSpells(events: TSEvents) {
    spellScriptsForPlacement(events)
    //harvesting crop
    GetIDTag('player-housing-mod', 'farming-crop-final').forEach(x => {
        events.GameObject.OnUse(x, (obj, user, cancel) => {
            let player = user.ToPlayer();
            if (!player)
                return

            if (PlayerHouse.get(player).area != player.GetAreaID() || player.GetPhaseID() != player.GetGUIDLow()) {
                player.SendAreaTriggerMessage("This is not your home!")
                cancel.set(true)
                return
            }

            PlayerHouseCrops.get(player).forEach(element => {
                if (element.spawnGuid == obj.GetGUIDLow()) {
                    element.Harvest(player!)
                }
            })
        })
    })

    //fertilizer
    GetIDTag('player-housing-mod', 'farming-fertilizer-spell').forEach(x => {
        events.Spell.OnCheckCast(x, (spell, result) => {
            let player = spell.GetCaster().ToPlayer()
            if (!player)
                return

            if (PlayerHouse.get(player).area != player.GetAreaID() || player.GetPhaseID() != player.GetGUIDLow()) {
                player.SendAreaTriggerMessage("This is not your home!")
                result.set(SpellCastResult.FAILED_DONT_REPORT)
                return
            }
        })

        events.Spell.OnCast(x, (spell) => {
            let player = spell.GetCaster().ToPlayer()!
            let nearbyGobs = player.GetGameObjectsInRange(10, 0, 0)
            nearbyGobs.forEach((v, i, arr) => {
                PlayerHouseCrops.get(player).forEach(element => {
                    if (element.spawnGuid == v.GetGUIDLow()) {
                        element.fertilizeMultiplier = spell.GetSpellInfo().GetPriority() / 10;
                        element.MarkDirty()
                    }
                })
            })
        })
    })
}

function spellScriptsForPlacement(events: TSEvents) {
    GetIDTag('player-housing-mod', 'farming-crop-spell').forEach(x => {
        events.Spell.OnCheckCast(x, (spell, result) => {
            let player = spell.GetCaster().ToPlayer();
            if (!player)
                return
            if (PlayerHouse.get(player).area != player.GetAreaID() || player.GetPhaseID() != player.GetGUIDLow()) {
                player.SendAreaTriggerMessage("This is not your home!")
                result.set(SpellCastResult.FAILED_DONT_REPORT)
                return
            }
            let cropData = PlayerHouseCrops.get(player);
            if (cropData.Size() >= CropSizes[player.GetAreaID()]) {
                player.SendBroadcastMessage(`You already have ${cropData.Size()} crops active!`);
                result.set(SpellCastResult.FAILED_DONT_REPORT)
                return;
            }
            result.set(SpellCastResult.FAILED_DONT_REPORT)
            let crop = cropData.Add(new PlayerHouseCrops(player.GetGUIDLow()))
            crop.x = spell.GetTargetDest().x
            crop.y = spell.GetTargetDest().y
            crop.z = spell.GetTargetDest().z
            crop.o = player.GetO();
            crop.spawnTime = GetUnixTime();
            crop.type = spell.GetSpellInfo().GetPriority();
            crop.fertilizeMultiplier = 10.0
            crop.MarkDirty();
            crop.Spawn(player)
        })
    })

    GetIDTag('player-housing-mod', 'farming-gob-spell').forEach(x => {
        events.Spell.OnCheckCast(x, (spell, result) => {
            let player = spell.GetCaster().ToPlayer();
            if (!player)
                return
            if (PlayerHouse.get(player).area != player.GetAreaID() || player.GetPhaseID() != player.GetGUIDLow()) {
                player.SendAreaTriggerMessage("This is not your home!")
                result.set(SpellCastResult.FAILED_DONT_REPORT)
                return
            }
            let gobData = PlayerHouseGobs.get(player);
            result.set(SpellCastResult.FAILED_DONT_REPORT)
            let gob = gobData.Add(new PlayerHouseGobs(player.GetGUIDLow()))
            gob.entry = spell.GetSpellInfo().GetPriority();
            gob.x = spell.GetTargetDest().x
            gob.y = spell.GetTargetDest().y
            gob.z = spell.GetTargetDest().z
            gob.o = player.GetO();
            gob.MarkDirty();
            gob.Spawn(player)
        })
    })

    GetIDTag('player-housing-mod', 'farming-creature-spell').forEach(x => {
        events.Spell.OnCheckCast(x, (spell, result) => {
            let player = spell.GetCaster().ToPlayer();
            if (!player)
                return
            if (PlayerHouse.get(player).area != player.GetAreaID() || player.GetPhaseID() != player.GetGUIDLow()) {
                player.SendAreaTriggerMessage("This is not your home!")
                result.set(SpellCastResult.FAILED_DONT_REPORT)
                return
            }
            let creatureData = PlayerHouseCreatures.get(player);
            result.set(SpellCastResult.FAILED_DONT_REPORT)
            let creature = creatureData.Add(new PlayerHouseCreatures(player.GetGUIDLow()))
            creature.entry = spell.GetSpellInfo().GetPriority();
            creature.x = player.GetX()
            creature.y = player.GetY()
            creature.z = player.GetZ()
            creature.o = player.GetO();
            creature.MarkDirty();
            creature.Spawn(player)
        })
    })
}