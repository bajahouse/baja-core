// ============================================================================
//
// - Reforging -
//
//   This file allows reforging of a randomly generated item.
//
// - External scripts -
//   Livescripts: livescripts/item-create/const-creations
//
// ============================================================================

import { statToName } from "../item-create/const-creations"

//reforge % modifier
const reforgePercent = 0.4//40%
//dont touch below
const reforgeOpposite = 1 - reforgePercent
const reforgeWholeNumber: uint32 = Math.floor(reforgePercent * 100)



export function reforging(events: TSEvents) {

    
    events.GameObject.OnGossipHello(GetID('gameobject_template', 'wardonic-mod', 'reforge-master'), (gameObject, player, cancel) => {
        player.SetUInt('selCount', 0)
        player.SetUInt('reforge_item_choice', 0)
        player.SetUInt('reforge_item_stat_choice_loss', 0)
        player.GossipComplete()
        player.GossipClearMenu()
        for (let i = 0; i <= 18; i++) {
            let curItem = player.GetItemByPos(255, i)
            if (!curItem.IsNull() && curItem.GetEntry() > 200000 && curItem.GetTemplate().GetPageMaterial() == 0) {
                player.GossipMenuAddItem(1, "Reforge: " + curItem.GetName(), gameObject.GetGUID().GetCounter(), i)
            }
        }
        player.GossipSendMenu(5, gameObject, 1)
    })

    events.GameObject.OnGossipSelect(GetID('gameobject_template', 'wardonic-mod', 'reforge-master'), (gameObject, player, menu, selection, cancel) => {
        player.GossipComplete()
        player.GossipClearMenu()
        if (player.GetUInt('selCount', 0) == 0) {
            player.SetUInt('reforge_item_choice', selection)
            player.SetUInt('selCount', 1)
            let chosenItem = player.GetItemByPos(255, selection)
            let itemTemplate = chosenItem.GetTemplate()
            for (let i = 0; i < itemTemplate.GetStatsCount(); i++) {
                let choice: string = isPrimary(itemTemplate.GetStatType(i)) ? '(Primary Stat) ' : '(Secondary Stat) ';
                player.GossipMenuAddItem(1, choice + "Reforge Stat Type: " + statToName[itemTemplate.GetStatType(i)], gameObject.GetGUID().GetCounter(), i)
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
                    player.GossipMenuAddItem(1, 'Reforge  ' + reforgeWholeNumber + '% of ' + statToName[itemTemplate.GetStatType(selection)] + ' to ' + statToName[itemTemplate.GetStatType(i)], gameObject.GetGUID().GetCounter(), i, false, 'are you sure you want to replace ' + reforgeWholeNumber + '% of ' + statToName[itemTemplate.GetStatType(selection)] + ' with ' + statToName[itemTemplate.GetStatType(i)] + '?')
                }
            }
            player.GossipSendMenu(5, gameObject, 1)
        } else if (player.GetUInt('selCount', 0) == 2) {
            let chosenItem = player.GetItemByPos(255, player.GetUInt('reforge_item_choice', 0))
            player.RemoveItemMods(chosenItem, player.GetUInt('reforge_item_choice', 0))
            let itemTemplate = chosenItem.GetTemplate()
            //increase stat 2
            itemTemplate.SetStatValue(selection, <int32>(itemTemplate.GetStatValue(selection) + (itemTemplate.GetStatValue(player.GetUInt('reforge_item_stat_choice_loss', 0)) * reforgePercent)))
            //decrease stat 1
            itemTemplate.SetStatValue(player.GetUInt('reforge_item_stat_choice_loss', 0), <int32>(itemTemplate.GetStatValue(player.GetUInt('reforge_item_stat_choice_loss', 0)) * reforgeOpposite))
            //item cannot be reforged twice
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