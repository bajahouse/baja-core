export const textMessageID = 100;
export class textMessage {
    
    name: string = "";
    addonText: string = "name";
    shouldClear: uint8 = 0;
    isLast: uint8 = 0;

    constructor(id: string, addonText: string) {
        this.name = id;
        this.addonText = addonText;
        this.shouldClear = 0;
        this.isLast = 0;
    }

    read(read: TSPacketRead): void {
        this.name = read.ReadString();
        this.addonText = read.ReadString();
        this.shouldClear = read.ReadUInt8();
        this.isLast = read.ReadUInt8();
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(textMessageID, 0);
        packet.WriteString(this.name);
        packet.WriteString(this.addonText);
        packet.WriteUInt8(this.shouldClear);
        packet.WriteUInt8(this.isLast);
        return packet;
    }
}

export const itemCacheID = 101;
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