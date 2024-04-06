import { createItemRandom, createItemWithSeed, regenerateAllItems } from "./item-create/item-create-lib"

export function example(events: TSEvents) {
    events.Player.OnCommand((player, command, found) => {
        const cmd = command.get().split(' ')
        if (!player)
            return
        if (!player.IsGM())
            return

        if (cmd[0] == 'createitem') {
            found.set(true)
            createItemRandom(player)
        } else if (cmd[0] == 'updateitem') {
            found.set(true)
            let item = player.GetItemByPos(255, 17)
            //player.RemoveAllItemMods()//other option rather than slot ID reloading
            player.RemoveItemMods(item, 17)
            let t = item.GetTemplate()
            t.SetStatsCount(1)
            t.SetStatType(0, 7)
            t.SetStatValue(0, 5)
            t.SetSpellID(0, 46699)
            t.SetSpellTrigger(0, 1)
            player.ApplyItemMods(item, 17, true, true)
            //player.ApplyAllItemMods()//other option rather than slot ID reloading
            player.SendItemQueryPacket(t)
            //player.SendItemQueryPacket(item.GetEntry())//other option
        } else if (cmd[0] == 'resetitem') {
            found.set(true)
            let item = player.GetItemByPos(255, 17)
            //player.RemoveAllItemMods()//other option rather than slot ID reloading
            player.RemoveItemMods(item, 17)
            let t = item.GetTemplate()
            t.SetStatsCount(0)
            t.SetStatType(0, 0)
            t.SetStatValue(0, 0)
            t.SetSpellID(0, 0)
            t.SetSpellTrigger(0, 0)
            player.ApplyItemMods(item, 17, true, true)
            //player.ApplyAllItemMods()//other option rather than slot ID reloading
            player.SendItemQueryPacket(t)
            //player.SendItemQueryPacket(item.GetEntry())//other option
        }
        else if (command.get() == 'seeditem') {
            createItemWithSeed(player, 773974156)
        }
        else if (command.get() == 'regenItems')
            regenerateAllItems()
    })
}

