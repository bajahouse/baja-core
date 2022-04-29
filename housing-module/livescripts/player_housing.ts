let maps = [309]
export function housing(events: TSEvents) {
    events.MapID.OnPlayerEnter(maps, (map, player) => {
        if (!map.GetBool("isSpawned", false)) {
            map.SetBool("isSpawned", true);
            map.SetUInt("playerOwner", player.GetGUIDLow());
            player.SendAreaTriggerMessage("Welcome home, " + player.GetName() + "! You are displaying version " + 1);
            spawnMap(map, player, 1)
        }
    });

    events.MapID.OnPlayerLeave(maps, (map, player) => {
        if (map.GetUInt("playerOwner") == player.GetGUIDLow()) {
            player.SendAreaTriggerMessage("Come back home soon!");
        } else {
            player.SendAreaTriggerMessage("Come visit again soon!");
        }
    });

    events.SpellID.OnCheckCast(GetIDTag('housing-mod', 'spawn-obj'), (spell, result) => {
        if (!spell.GetCaster().IsPlayer())
            return

        let player = spell.GetCaster().ToPlayer();
        if (player.GetMap().GetUInt("playerOwner", 1) != player.GetGUIDLow()) {
            player.SendAreaTriggerMessage("This is not your home!");
            spell.Cancel();
            return
        }
        //eventually replace with a dictionary map that gets made at start of server
        let q = QueryWorld("SELECT typeID,entry FROM `player_housing_spell_object_link` WHERE spellID = " + spell.GetEntry());
        while (q.GetRow()) {
            QueryCharacters("INSERT INTO `player_housing` VALUES(" + player.GetGUIDLow() + "," + player.GetMapID()+ "," + player.GetMap().GetUInt('versionID',1) + "," + q.GetUInt32(0) + "," + q.GetUInt32(1) + "," + spell.GetTargetDest().x + "," + spell.GetTargetDest().y + "," + spell.GetTargetDest().z + "," + spell.GetTargetDest().o + ")");
        }
    })

    events.SpellID.OnCheckCast(1, (spell, result) => {
        //change spell ID later to something else
        let player = spell.GetCaster().ToPlayer();
        if (player.GetMap().GetUInt("playerOwner", 1) != player.GetGUIDLow()) {
            player.SendAreaTriggerMessage("This is not your home!");
            spell.Cancel();
            return
        }
        let gobs = player.GetGameObjectsInRange(10, 0, 0);
        player.GossipClearMenu();
        if (gobs.length == 0) {
            player.SendAreaTriggerMessage('Unable to find any objects!')
            return
        }
        if (gobs.length > 32) {
            gobs = gobs.slice(0, 31);
        }
        for (let i = 0; i < gobs.length; i++) {
            player.GossipMenuAddItem(0, "Remove " + gobs[i].GetName() + " Entry:" + gobs[i].GetEntry(), 0, i);//, false, "", 0
        }
        player.GossipSendMenu(5, gobs[0], 0);

    });

    events.GameObjects.OnGossipSelect((obj, player, menuID, selection, cancel) => {
        player.GossipComplete();
        if (player.GetMap().GetUInt("playerOwner", 1) != player.GetGUIDLow()) {
            player.SendAreaTriggerMessage("This is not your home!");
            return
        }
        let gobs: TSArray<TSGameObject> = player.GetGameObjectsInRange(10, 0, 0);
        let pos = gobs[selection].GetPosition();

        QueryCharacters("DELETE FROM `player_housing` WHERE playerGUID = " + player.GetGUIDLow() + " AND mapID = " + player.GetMapID() + " AND versionID = " + player.GetMap().GetUInt('versionID', 1) + "AND entry = " + gobs[selection].GetEntry() + " AND x = " + pos.x + " AND y = " + pos.y + " AND z = " + pos.z +  " AND o = " + pos.o + ";");
        gobs[selection].Despawn();
    });
}
function spawnMap(map: TSMap, player: TSPlayer, versionID: uint32) {
    let q = QueryCharacters("SELECT typeID,entry,x,y,z,o FROM `player_housing` WHERE playerGUID = " + player.GetGUIDLow() + " AND mapID = " + map.GetMapID() + " AND versionID = " + versionID);
    while (q.GetRow()) {
        if (q.GetInt32(0) == 0)
            map.SpawnGameObject(q.GetInt32(1), q.GetFloat(2), q.GetFloat(3), q.GetFloat(4), q.GetFloat(5));
        else if (q.GetInt32(0) == 1)
            map.SpawnCreature(q.GetInt32(1), q.GetFloat(2), q.GetFloat(3), q.GetFloat(4), q.GetFloat(5))
    }
}

