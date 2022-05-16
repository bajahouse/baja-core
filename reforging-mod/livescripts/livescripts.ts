import { statToName } from "./const_creations"

export function Main(events: TSEvents) {
    events.GameObjectID.OnGossipHello(177193, (gameObject, player, cancel) => {
        player.SetUInt('selCount', 0)
        player.GossipComplete()
        player.GossipClearMenu()
        for (let i = 0; i <= 18; i++) {
            let curItem = player.GetItemByPos(255, i)
            if (!curItem.IsNull()) {
                player.GossipMenuAddItem(1, "Reforge: " + curItem.GetName(), gameObject.GetGUID(), i)
            }
        }
        player.GossipSendMenu(5, gameObject, 1)
    })
    events.GameObjectID.OnGossipSelect(177193, (gameObject, player, menu, selection, cancel) => {
        player.GossipComplete()
        player.GossipClearMenu()
        if (player.GetUInt('selCount', 0) == 0) {
            console.log('inside')
            player.SetUInt('reforge_item_choice', selection)
            player.SetUInt('selCount', 1)
            let chosenItem = player.GetItemByPos(255, selection)
            let itemTemplate = chosenItem.GetTemplate()
            for (let i = 0; i < itemTemplate.GetStatsCount(); i++) {
                player.GossipMenuAddItem(1, "Reforge Stat Type: " + statToName[itemTemplate.GetStatType(i)], gameObject.GetGUID(), i)
            }
            player.GossipSendMenu(5, gameObject, 1)
        } else if (player.GetUInt('selCount', 0) == 1) {
            player.SetUInt('selCount', 2)

            let chosenItem = player.GetItemByPos(255, player.GetUInt('reforge_item_choice', 0))
            let itemTemplate = chosenItem.GetTemplate()
            itemTemplate.SetStatValue(selection, itemTemplate.GetStatValue(selection) * 1.4)
            
            //statIndex = selection
        }
    })
}

function isPrimary(stat: uint32): boolean {
    if (stat == 3 || stat == 4 || stat == 5 || stat == 6 || stat == 7)
        return true
    return false
}