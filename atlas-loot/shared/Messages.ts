export const creatureNameMessageID = 1;
export class creatureNameMessage {
    isName: uint32 = 1;
    entry: string = "name";

    constructor(isName: uint32, entry: string) {
        this.isName = isName;
        this.entry = entry;
    }

    read(read: TSPacketRead): void {
        this.isName = read.ReadUInt32();
        this.entry = read.ReadString();
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(creatureNameMessageID, 2000);
        packet.WriteUInt32(this.isName);
        packet.WriteString(this.entry);
        return packet;
    }
}

export const itemLootMessageID = 2;
export class itemLootMessage {
    size: uint32 = 0;
    entryID: uint32 = 0;
    arr: TSArray<TSArray<double>> = [<TSArray<double>>[1, 1, 1, 1]];
    constructor() {
        this.size = 0;
        this.entryID = 0;
        this.arr = <TSArray<TSArray<double>>>[<TSArray<double>>[1, 1, 1, 1]];
    }
    read(read: TSPacketRead): void {
        this.arr.pop();
        this.size = read.ReadUInt32();
        this.entryID = read.ReadUInt32();
        for (let i = 0; i < this.size; i++) {
            let id = read.ReadDouble();
            let min = read.ReadDouble();
            let max = read.ReadDouble();
            let dropChance = read.ReadDouble();
            this.arr.push(<TSArray<double>>[id, min, max, dropChance]);
        }
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(itemLootMessageID, 2000);
        packet.WriteUInt32(this.size);
        packet.WriteUInt32(this.entryID);
        for (let i = 0; i < this.size; i++) {
            packet.WriteDouble(this.arr[i][0]);
            packet.WriteDouble(this.arr[i][1]);
            packet.WriteDouble(this.arr[i][2]);
            packet.WriteDouble(this.arr[i][3]);
        }
        return packet;
    }
}