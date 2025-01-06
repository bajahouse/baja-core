// ============================================================================
//
// - Base Classes -
//
//   This file has a basic way to purchase a house and enter a house
//
// - External scripts -
//   Livescripts: livescripts/base-classes
//
// ============================================================================

import { PlayerHouse, PlayerHouseCrops } from "./base-classes";

export function baseHouse(events: TSEvents) {
    events.Player.OnCommand((player, command, found) => {
        if (command.get() == 'house') {
            found.set(true)
            player.SendAreaTriggerMessage('You have bought a house!')
            PlayerHouse.get(player).area = player.GetAreaID()
            PlayerHouse.get(player).Save();
        }
    })

    events.Player.OnUpdateZone((player, newZone, area) => {
        let farm = PlayerHouse.get(player)
        if (farm.area == area) {
            if (player.GetPhaseID() == 0) {
                PlayerHouse.get(player).Open(player)
                player.SendAreaTriggerMessage('You have entered your house.')
                player.AddNamedTimer('refreshPlants', 30000, TimerLoops.INDEFINITE, (owner, timer) => {
                    let player = owner.ToPlayer()!
                    PlayerHouseCrops.get(player).forEach((x) => {
                        x.canGrow(player)
                    })
                })
            }
            return
        } else if (farm.open) {
            PlayerHouse.get(player).Close(player)
            player.SendAreaTriggerMessage('You have exited your house.')
            player.RemoveTimer('refreshPlants')
        } else if (player.GetBool('friendHouse', false)) {
            player.SetBool('friendHouse', false)
            player.SetPhaseMask(player.GetPhaseMask(), true, 0)
        }
    })
}

function goToFriendHouse(player: TSPlayer, targetPhase: number, targetCoords: TSPosition) {
    player.Teleport(targetCoords.map, targetCoords.x, targetCoords.y, targetCoords.z, targetCoords.o)
    player.SetPhaseMask(player.GetPhaseMask(), true, targetPhase)
    player.SetBool('friendHouse', true)
}