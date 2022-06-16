import { textMessage, textMessageID } from "../shared/Messages"

let addons: TSArray<TSArray<TSString>> = <TSArray<TSArray<TSString>>>[]
export function Main(events: TSEvents) {
    setupTable()
    events.Player.OnCommand((player, command, found) => {
        if (command.get().startsWith('aio reload')) {
            found.set(true)
            setupTable()
            GetAllPlayers().forEach((v, i, arr) => {
                sendAddonReload(v)
            });
        }
    })

    events.CustomPacketID.OnReceive(textMessageID, (opcode, packet, player) => {
        sendAllAddons(player)
    })
}

function setupTable() {
    addons = <TSArray<TSArray<TSString>>>[]
    let fs = ReadDirectory('./aio/')
    fs.forEach((v: TSString) => {
        if (v.endsWith('.aio.lua')) {
            addons.push([v, ReadFile(v, `print("error loading ` + v + `")`)])
        }
    })
    console.log('loaded ' + addons.length + ' aio files')
}

function sendAllAddons(player: TSPlayer) {
    addons.forEach((v, i) => {
        let pkt = new textMessage(v[0], v[1])
        if (i == 0)
            pkt.shouldClear = 1
        if (i == addons.length - 1)
            pkt.isLast = 1
        pkt.write().SendToPlayer(player)
    })
}

function sendAddonReload(player: TSPlayer) {
    new textMessage("AIO_FORCE_RELOAD", "").write().SendToPlayer(player)
}
