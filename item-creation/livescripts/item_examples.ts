import { createItemRandom } from "./item_create"

export function example(events: TSEvents) {
    events.Player.OnCommand((player, command, found) => {
        const cmd = command.get().split(' ')
        if (cmd[0] == 'createitem') {
            // this 1 only works with the modified wow.exe.
            //the other parts work without. the exe mods are only needed for
            //newly generated items rather than modified items
            //there could be some updates(ex. a class/subclass/icon change)
            //that would require the exe mod. untested but assumptions
            found.set(true)
            createItemRandom(player)
        } else if (cmd[0] == 'updateitem') {
            //this will add the thori'dal spell to your ranged wep
            //also adds 5 stam to show stat reloading
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
            //this removes the thoridal spell from your ranged wep
            //also removes 5 stam to show stat reloading
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
    })
}

