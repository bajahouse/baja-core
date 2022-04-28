export function Main(events: TSEvents) {
    events.Player.OnSay((player,msg,lang)=>{
        console.log('test server')
        player.SendAreaTriggerMessage('test player')
    })
}