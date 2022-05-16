import { statToName } from "./const_creations"

export function reforging(events: TSEvents) {
    events.GameObjectID.OnGossipHello(GetID('gameobject_template','item-creation','reforge-master'), (gameObject, player, cancel) => {
        player.SetUInt('selCount', 0)
        player.SetUInt('reforge_item_choice', 0)
        player.SetUInt('reforge_item_stat_choice_loss', 0)
        player.GossipComplete()
        player.GossipClearMenu()
        for (let i = 0; i <= 18; i++) {
            let curItem = player.GetItemByPos(255, i)
            if (!curItem.IsNull() && curItem.GetEntry() > 200000 && curItem.GetTemplate().GetPageMaterial() == 0) {
                player.GossipMenuAddItem(1, "Reforge: " + curItem.GetName(), gameObject.GetGUID(), i)
            }
        }
        player.GossipSendMenu(5, gameObject, 1)
    })
    
    events.GameObjectID.OnGossipSelect(GetID('gameobject_template','item-creation','reforge-master'), (gameObject, player, menu, selection, cancel) => {
        player.GossipComplete()
        player.GossipClearMenu()
        if (player.GetUInt('selCount', 0) == 0) {
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
            player.SetUInt('reforge_item_stat_choice_loss', selection)
            let chosenItem = player.GetItemByPos(255, player.GetUInt('reforge_item_choice', 0))
            let itemTemplate = chosenItem.GetTemplate()
            let isPrim = isPrimary(itemTemplate.GetStatType(selection))
            for (let i = 0; i < itemTemplate.GetStatsCount(); i++) {
                if (i != selection && isPrim == isPrimary(itemTemplate.GetStatType(i))) {
                    player.GossipMenuAddItem(1, 'Reforge 40% of ' + statToName[itemTemplate.GetStatType(selection)] + ' to ' + statToName[itemTemplate.GetStatType(i)], gameObject.GetGUID(), i, false, 'are you sure you want to replace 40% of ' + statToName[itemTemplate.GetStatType(selection)] + ' with ' + statToName[itemTemplate.GetStatType(i)] + '?')
                }
            }
            player.GossipSendMenu(5, gameObject, 1)
        } else if (player.GetUInt('selCount', 0) == 2) {
            player.SetUInt('selCount', 3)
            let chosenItem = player.GetItemByPos(255, player.GetUInt('reforge_item_choice', 0))
            player.RemoveItemMods(chosenItem, player.GetUInt('reforge_item_choice', 0))
            let itemTemplate = chosenItem.GetTemplate()
            //increase stat 2
            itemTemplate.SetStatValue(selection, <int32>(itemTemplate.GetStatValue(selection) + (itemTemplate.GetStatValue(player.GetUInt('reforge_item_stat_choice_loss', 0)) * 0.4)))
            //decrease stat 1
            itemTemplate.SetStatValue(player.GetUInt('reforge_item_stat_choice_loss', 0), <int32>(itemTemplate.GetStatValue(player.GetUInt('reforge_item_stat_choice_loss', 0)) * 0.6))
            itemTemplate.SetPageMaterial(1)
            player.ApplyItemMods(chosenItem, player.GetUInt('reforge_item_choice', 0), true, true)
            player.SendItemQueryPacket(itemTemplate)
            itemTemplate.Save()
        }
    })
}

function isPrimary(stat: uint32): boolean {
    if (stat == 0 || stat == 1 || stat == 3 || stat == 4 || stat == 5 || stat == 6 || stat == 7)
        return true
    return false
}