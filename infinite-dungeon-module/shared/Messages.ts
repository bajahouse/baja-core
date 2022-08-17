export const spellChoicesID = 23;
export class spellChoices {
    spellIDs: TSArray<number> = [1];
    spellRarity: TSArray<number> = [1];
    spellDescs: TSArray<string> = [""];
    constructor(
        spellIDs: TSArray<number>,
        spellRarity: TSArray<number>,
        spellDescs: TSArray<string>
    ) {
        this.spellIDs = spellIDs;
        this.spellRarity = spellRarity;
        this.spellDescs = spellDescs;
    }

    read(read: TSPacketRead): void {
        for (let i = 0; i < 3; i++) {
            this.spellIDs.push(read.ReadDouble());
            this.spellRarity.push(read.ReadDouble());
            this.spellDescs.push(read.ReadString());
        }
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(spellChoicesID, 0);
        for (let i = 0; i < 3; i++) {
            packet.WriteDouble(this.spellIDs[i]);
            packet.WriteDouble(this.spellRarity[i]);
            packet.WriteString(this.spellDescs[i]);
        }
        return packet;
    }
}

export const spellChoiceID = 24;
export class spellChoice {
    choice: number = 1;

    constructor(choice: number) {
        this.choice = choice;
    }

    read(read: TSPacketRead): void {
        this.choice = read.ReadDouble();
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(spellChoiceID, 0);
        packet.WriteDouble(this.choice);
        return packet;
    }
}