import { textMessage } from "../shared/Messages"

let addons: TSArray<TSArray<TSString>> = <TSArray<TSArray<TSString>>>[]
export function Main(events: TSEvents) {
    setupTable()
    events.Player.OnLogin((player, first) => {
        addons.forEach((v, i, arr) => {
            let pkt = new textMessage(v[0], v[1]);
            pkt.write().SendToPlayer(player)
            console.log('sent from serverside')
        })
    })
}

function setupTable() {
    let q = QueryWorld("SELECT * FROM `aio_addons`")
    while (q.GetRow()) {
        addons.push([q.GetString(0), q.GetString(1)])
    }
}