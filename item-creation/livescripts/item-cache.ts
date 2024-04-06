// ============================================================================
//
// - Item Cache Updater -
//
//   This file is the response to the client requesting a new item cache
//
// - External scripts -
//   Addon: addon/item-cache-request
//
// ============================================================================

import { itemCache, itemCacheID } from "../../shared/Messages";

export function itemCacheSend(events: TSEvents) {
    events.CustomPacket.OnReceive(itemCacheID, (opcode, packet, player) => {
        let msg = new itemCache(0);
        msg.read(packet);
        player.SendItemQueryPacket(msg.entry)
    })
}