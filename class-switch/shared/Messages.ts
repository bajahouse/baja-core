export const classSwapID = 50;
export class classSwap {
    classID: uint32 = 0;

    constructor(entry: uint32) {
        this.classID = entry;
    }

    read(read: TSPacketRead): void {
        this.classID = read.ReadUInt32();
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(classSwapID, 0);
        packet.WriteUInt32(this.classID);
        return packet;
    }
}

export const unlockClassInfoID = 51;
export class unlockClassInfo {
    currentClassChoice: uint32 = 1
    currentUnlocks: TSArray<uint32> = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    constructor(cur: uint32, info: TSArray<uint32>) {
        this.currentClassChoice = cur
        this.currentUnlocks = info;
    }

    read(read: TSPacketRead): void {
        this.currentUnlocks.pop()
        this.currentClassChoice = read.ReadUInt32()
        for (let i = 0; i <= 11; i++)
            this.currentUnlocks.push(read.ReadUInt32())
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(unlockClassInfoID, 0);
        packet.WriteUInt32(this.currentClassChoice)
        for (let i = 0; i <= 11; i++)
            packet.WriteUInt32(this.currentUnlocks[i]);
        return packet;
    }
}