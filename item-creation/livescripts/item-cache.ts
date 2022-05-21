import { itemCache, itemCacheID } from "../shared/Messages";

export function itemCacheSend(events: TSEvents) {
    events.CustomPacketID.OnReceive(itemCacheID, (opcode, packet, player) => {
        let msg = new itemCache(0);
        msg.read(packet);
        player.SendItemQueryPacket(msg.entry)
    })
}