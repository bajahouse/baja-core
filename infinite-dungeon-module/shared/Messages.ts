export const spellChoicesID = 23;
export class spellChoices {
    spellIDs: TSArray<uint32> = [1];
    spellRarity: TSArray<uint32> = [1];
    spellDescs: TSArray<string> = [""];
    constructor(
        spellIDs: TSArray<uint32>,
        spellRarity: TSArray<uint32>,
        spellDescs: TSArray<string>
    ) {
        this.spellIDs = spellIDs;
        this.spellRarity = spellRarity;
        this.spellDescs = spellDescs;
    }

    read(read: TSPacketRead): void {
        for (let i = 0; i < 3; i++) {
            this.spellIDs.push(read.ReadUInt32());
            this.spellRarity.push(read.ReadUInt32());
            this.spellDescs.push(read.ReadString());
        }
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(spellChoicesID, 0);
        for (let i = 0; i < 3; i++) {
            packet.WriteUInt32(this.spellIDs[i]);
            packet.WriteUInt32(this.spellRarity[i]);
            packet.WriteString(this.spellDescs[i]);
        }
        return packet;
    }
}

export const spellChoiceID = 24;
export class spellChoice {
    choice: uint32 = 1;

    constructor(choice: uint32) {
        this.choice = choice;
    }

    read(read: TSPacketRead): void {
        this.choice = read.ReadUInt32();
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(spellChoiceID, 0);
        packet.WriteUInt32(this.choice);
        return packet;
    }
}