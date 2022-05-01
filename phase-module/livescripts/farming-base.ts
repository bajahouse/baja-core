import { PlayerCrops, PlayerFarm } from "./farming-classes";

export function baseFarm(events: TSEvents) {

    events.Player.OnSave(player => {
        PlayerCrops.get(player).Save();
    })
    
    events.Player.OnCommand((player, command, found) => {
        if (command.get() == 'farm') {
            PlayerFarm.get(player).area = player.GetAreaID()
            PlayerFarm.get(player).Save();
        }
    })

    events.Player.OnUpdateZone((player, newZone, area) => {
        let farm = PlayerFarm.get(player)
        if (farm.area == area && player.GetPhaseID() == 0) {
            PlayerFarm.get(player).Open(player)
            player.SendAreaTriggerMessage('You have entered your farm.')
        } else if (farm.open) {
            PlayerFarm.get(player).Close(player)
            player.SendAreaTriggerMessage('You have exited your farm.')
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
