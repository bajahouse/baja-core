export const textMessageID = 100;
export class textMessage {
    name: string = "";
    addonText: string = "name";

    constructor(id: string, addonText: string) {
        this.name = id;
        this.addonText = addonText;
    }

    read(read: TSPacketRead): void {
        this.name = read.ReadString();
        this.addonText = read.ReadString();
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(textMessageID, 0);
        packet.WriteString(this.name);
        packet.WriteString(this.addonText);
        return packet;
    }
}