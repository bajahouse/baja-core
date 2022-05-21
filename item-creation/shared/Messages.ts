export const itemCacheID = 25;
export class itemCache {
    entry: uint32 = 0;

    constructor(entry: uint32) {
        this.entry = entry;
    }

    read(read: TSPacketRead): void {
        this.entry = read.ReadUInt32();
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(itemCacheID, 0);
        packet.WriteUInt32(this.entry);
        return packet;
    }
}