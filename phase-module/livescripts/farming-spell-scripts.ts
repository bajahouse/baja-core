import { CropSizes, PlayerFarmCrops, PlayerFarmGobs, PlayerFarmCreatures, PlayerFarm } from "./farming-classes";

export function RegisterFarmingSpells(events: TSEvents) {
    spellScriptsForPlacement(events)

    //harvesting crop
    GetIDTag('farming-mod', 'farming-crop-final').forEach(x => {
        events.GameObjectID.OnUse(x, (obj, user, cancel) => {
            let player = user.ToPlayer();
            if (player.IsNull())
                return

            if (PlayerFarm.get(player).area != player.GetAreaID() || player.GetPhaseID() != player.GetGUID()) {
                player.SendAreaTriggerMessage("This is not your home!")
                cancel.set(true)
                return
            }

            PlayerFarmCrops.get(player).forEach(element => {
                if (element.spawnGuid == obj.GetGUID()) {
                    element.Harvest(player)
                    
                }
            })
        })
    })

    //fertilizer
    GetIDTag('farming-mod', 'farming-fertilizer-spell').forEach(x => {
        events.SpellID.OnCheckCast(x, (spell, result) => {
            let player = spell.GetCaster().ToPlayer()
            if (player.IsNull())
                return

            if (PlayerFarm.get(player).area != player.GetAreaID() || player.GetPhaseID() != player.GetGUID()) {
                player.SendAreaTriggerMessage("This is not your home!")
                result.set(SpellCastResult.FAILED_DONT_REPORT)
                return
            }
        })

        events.SpellID.OnCast(x, (spell) => {
            let player = spell.GetCaster().ToPlayer()
            let nearbyGobs = player.GetGameObjectsInRange(10, 0, 0)
            nearbyGobs.forEach((v, i, arr) => {
                PlayerFarmCrops.get(player).forEach(element => {
                    if (element.spawnGuid == v.GetGUID()) {
                        element.fertilizeMultiplier = spell.GetSpellInfo().GetPriority() / 10;
                        element.MarkDirty()
                    }
                })
            })
        })
    })
}

function spellScriptsForPlacement(events: TSEvents) {
    GetIDTag('farming-mod', 'farming-crop-spell').forEach(x => {
        events.SpellID.OnCheckCast(x, (spell, result) => {
            let player = spell.GetCaster().ToPlayer();
            if (player.IsNull())
                return
            if (PlayerFarm.get(player).area != player.GetAreaID() || player.GetPhaseID() != player.GetGUID()) {
                player.SendAreaTriggerMessage("This is not your home!")
                result.set(SpellCastResult.FAILED_DONT_REPORT)
                return
            }
            let cropData = PlayerFarmCrops.get(player);
            if (cropData.Size() >= CropSizes[player.GetAreaID()]) {
                player.SendBroadcastMessage(`You already have ${cropData.Size()} crops active!`);
                result.set(SpellCastResult.FAILED_DONT_REPORT)
                return;
            }
            result.set(SpellCastResult.FAILED_DONT_REPORT)
            let crop = cropData.Add(new PlayerFarmCrops(player.GetGUID()))
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

    GetIDTag('farming-mod', 'farming-gob-spell').forEach(x => {
        events.SpellID.OnCheckCast(x, (spell, result) => {
            let player = spell.GetCaster().ToPlayer();
            if (player.IsNull())
                return
            if (PlayerFarm.get(player).area != player.GetAreaID() || player.GetPhaseID() != player.GetGUID()) {
                player.SendAreaTriggerMessage("This is not your home!")
                result.set(SpellCastResult.FAILED_DONT_REPORT)
                return
            }
            let gobData = PlayerFarmGobs.get(player);
            result.set(SpellCastResult.FAILED_DONT_REPORT)
            let gob = gobData.Add(new PlayerFarmGobs(player.GetGUID()))
            gob.entry = spell.GetSpellInfo().GetPriority();
            gob.x = spell.GetTargetDest().x
            gob.y = spell.GetTargetDest().y
            gob.z = spell.GetTargetDest().z
            gob.o = player.GetO();
            gob.MarkDirty();
            gob.Spawn(player)
        })
    })

    GetIDTag('farming-mod', 'farming-creature-spell').forEach(x => {
        events.SpellID.OnCheckCast(x, (spell, result) => {
            let player = spell.GetCaster().ToPlayer();
            if (player.IsNull())
                return
            if (PlayerFarm.get(player).area != player.GetAreaID() || player.GetPhaseID() != player.GetGUID()) {
                player.SendAreaTriggerMessage("This is not your home!")
                result.set(SpellCastResult.FAILED_DONT_REPORT)
                return
            }
            let creatureData = PlayerFarmCreatures.get(player);
            result.set(SpellCastResult.FAILED_DONT_REPORT)
            let creature = creatureData.Add(new PlayerFarmCreatures(player.GetGUID()))
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