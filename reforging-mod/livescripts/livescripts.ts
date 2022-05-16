export function Main(events: TSEvents) {
    events.Player.OnCommand((player,command)=>{
        let commSplit = command.get().split(" ");
        if(commSplit[0] == 'reforge')
        {
            //moves 40% of one of the stats to another
            let item = player.GetItemByEntry(ToUInt32(commSplit[1]));
            item.GetBagSlot()
            let itemTemplate = item.GetTemplate()
        }
    })

    events.CreatureID.OnGossipHello(1,(creature,player,cancel)=>{
        for(let i=0;i<=18;i++){
            let curItem = player.GetItemByPos(255,i)
            player.GossipMenuAddItem(1,"reforge: "+curItem.GetName(),creature.GetGUID(),i,false,'are you sure you want to reforge ' + curItem.GetName() + '?',0)    
        } 
        player.GossipSendMenu(0,creature,0)
 })
    events.CreatureID.OnGossipSelect(1,(creature,player,menu,selection,cancel)=>{
        let chosenItem = player.GetItemByPos(255,selection)
        let itemTemplate = chosenItem.GetTemplate()
        for(let i =0;i<itemTemplate.GetStatsCount();i++)
        {
            itemTemplate.GetStatType(i)
            player.GossipMenuAddItem(1,"reforge stat type: "+itemTemplate.GetStatType(i),creature.GetGUID(),i) 
        }
    })
}