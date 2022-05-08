import { PlayerFarm, PlayerFarmCrops } from "./farming-classes";

export function baseFarm(events: TSEvents) {
    events.Player.OnCommand((player, command, found) => {
        if (command.get() == 'farm') {
            found.set(true)
            player.SendAreaTriggerMessage('You have bought a farm!')
            PlayerFarm.get(player).area = player.GetAreaID()
            PlayerFarm.get(player).Save();
        }
    })

    events.Player.OnUpdateZone((player, newZone, area) => {
        let farm = PlayerFarm.get(player)
        if (farm.area == area) {
            if (player.GetPhaseID() == 0) {
                PlayerFarm.get(player).Open(player)
                player.SendAreaTriggerMessage('You have entered your farm.')
                player.AddNamedTimer('refreshPlants',30000,TimerLoops.INDEFINITE,(owner,timer)=>{
                    let player = owner.ToPlayer()
                    PlayerFarmCrops.get(player).forEach((x)=>{
                        x.canGrow(player)
                        console.log('attempt')
                    })
                })
            }
            return
        } else if (farm.open) {
            PlayerFarm.get(player).Close(player)
            player.SendAreaTriggerMessage('You have exited your farm.')
            player.RemoveTimer('refreshPlants')
        } else if (player.GetBool('friendFarm', false)) {
            player.SetBool('friendFarm', false)
            player.SetPhaseMask(player.GetPhaseMask(), true, 0)
        }
    })
}

function goToFriendFarm(player: TSPlayer, targetPhase: number, targetCoords: TSPosition) {
    player.Teleport(targetCoords.map, targetCoords.x, targetCoords.y, targetCoords.z, targetCoords.o)
    player.SetPhaseMask(player.GetPhaseMask(), true, targetPhase)
    player.SetBool('friendFarm', true)
}