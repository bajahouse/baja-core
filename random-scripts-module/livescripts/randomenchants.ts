// ============================================================================
// -  By: @tester -
//
// - Random Enchant Display -
//
//   This file randomly applies enchant visuals to items onLoot
//
// - External scripts -
//
// ============================================================================

@CharactersTable
export class playerEnchantInfo extends DBEntry {
    @DBPrimaryKey
    playerGUID: uint64 = 0
    @DBPrimaryKey
    itemGUID: uint64 = 0
    @DBField
    display: uint32 = 0

    constructor(player: TSPlayer, itemGUID: TSItem) {
        super();
        this.playerGUID = player.GetGUIDLow()
        this.itemGUID = itemGUID.GetGUIDLow()
    }

    static get(player: TSPlayer, item: TSItem): playerEnchantInfo {
        return player.GetObject('playerEnchantInfo', LoadDBEntry(new playerEnchantInfo(player, item)))
    }
}

let enchants = [3789, 3854, 3273, 3225, 3870, 1899, 2674, 2675, 2671, 2672, 3365, 2673, 2343, 425, 3855, 1894, 1103, 1898, 3345, 1743, 3093, 1900, 3846, 1606, 283, 1, 3265, 2, 3, 3266, 1903, 13, 26, 7, 803, 1896, 2666, 25]
let enchantsLength = enchants.length
let chance = 1//0.25

export function itemRandomEnchantVisual(events: TSEvents) {
    events.Player.OnLogin((player, first) => {
        applyVisuals(player)
    })

    events.Item.OnEquip((item, player, slot, isMerge) => {
        applySingleVisual(player, item)
    })

    events.Item.OnTakenAsLoot((item, lootItem, loot, player) => {
        if (item.GetClass() == 2) {
            if (Math.random() <= chance) {
                playerEnchantInfo.get(player, item).display = enchants[Math.floor(Math.random() * enchantsLength)]
                playerEnchantInfo.get(player, item).Save()
            }
        }
    })
}

function applyVisuals(player: TSPlayer) {
    for (let i = EquipmentSlots.MAINHAND; i <= EquipmentSlots.RANGED; i++) {
        let item = player.GetItemByPos(255, i)
        if (item)
            applySingleVisual(player, item)
    }
}

function applySingleVisual(player: TSPlayer, item: TSItem) {
    if (item.IsNull()) return
    if (item.GetEnchantmentID(0) != 0) return

    let cur = playerEnchantInfo.get(player, item)
    if (item.GetGUIDLow() == cur.itemGUID) {
        player.SetCoreUInt16(284 + (item.GetSlot() * 2), 0, cur.display)
    }
}