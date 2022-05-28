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