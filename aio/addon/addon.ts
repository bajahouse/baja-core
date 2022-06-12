import { textMessage, textMessageID } from "../shared/Messages";

OnCustomPacket(textMessageID, (packet) => {
    let customPacket = new textMessage("", "");
    customPacket.read(packet);
    assert(loadstring(customPacket.addonText, customPacket.name))()
})