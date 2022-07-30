// ============================================================================
//
// - Examples -
//
//   This file has a couple showcases of the item generator with commands
//
// - External scripts -
//   Livescripts: livescripts/item-create/item-create-lib
//
// ============================================================================

import { classIDToStatType } from "./item-create/const-creations"
import { createItemRandom, createItemWithChoices } from "./item-create/item-create-lib"

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
        } else if (cmd[0] == 'createset') {
            //this will create a full set of items based on class and level
            //level is passed as 2nd argument
            found.set(true)
            let classId = player.GetClass()
            for (let i = 0; i < 8; i++) {
                createItemWithChoices(player, 0, i, ToUInt32(cmd[1]), classIDToStatType(classId))
            }
            for (let i = 24; i < 28; i++) {
                createItemWithChoices(player, 0, i, ToUInt32(cmd[1]), classIDToStatType(classId))
            }
            let wepID = [2, 7, 7, 8, 9, 11, 11, 12, 13, 14]
            wepID.forEach((v: double, i: uint32, arr) => {
                createItemWithChoices(player, 1, v, ToUInt32(cmd[1]), classIDToStatType(classId))
            })
        }
    })
}

