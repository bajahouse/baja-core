import { itemCache, itemCacheID, textMessage, textMessageID } from "../shared/Messages"

let addons: TSArray<TSArray<TSString>> = <TSArray<TSArray<TSString>>>[]
export function Main(events: TSEvents) {
    setupTable()
    events.Player.OnCommand((player, command, found) => {
        let cc = command.get().split(' ')
        if (cc[0] == 'aio' && cc[1] == 'reload') {
            found.set(true)
            setupTable()
            sendAddonReload(player)
        }
    })

    events.CustomPacketID.OnReceive(textMessageID,(opcode,packet,player)=>{
        let pkt = new textMessage("","");
        pkt.read(packet);
        sendAllAddons(player)
    })

    events.CustomPacketID.OnReceive(itemCacheID,(opcode,packet,player)=>{
        console.log('packet 2')
        let pkt = new itemCache(1);
        pkt.read(packet);
        if(pkt.entry == 17)
        console.log('sent from dd aio addon')
    })
}

function setupTable() {
    addons = <TSArray<TSArray<TSString>>>[]
    let fs = ReadDirectory('./aio/')
    fs.forEach((v: TSString) => {
        if (v.endsWith('.lua')) {
            addons.push([v, ReadFile(v, `print("error loading ` + v + `")`)])
        }
    })
    console.log('loaded ' + addons.length + ' aio files')
}

function sendAllAddons(player: TSPlayer) {
    addons.forEach((v, i) => {
        let pkt = new textMessage(v[0], v[1]);
        if (i == 0)
            pkt.shouldClear = 1
        if (i == addons.length - 1)
            pkt.isLast = 1
        pkt.write().SendToPlayer(player)
    })
}

function sendAddonReload(player: TSPlayer) {
    addons.forEach((v, i) => {
        let pkt = new textMessage("AIO_FORCE_RELOAD", "");
        pkt.write().SendToPlayer(player)
    })
}
