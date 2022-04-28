let maps = [309]
export function housing(events: TSEvents) {
    maps.forEach((mapID, i, arr) => {
        events.MapID.OnPlayerEnter(mapID, (map, player) => {
            player.LearnClassSpells(true,true,true)
            if (!map.GetBool("isSpawned", false)) {
                map.SetBool("isSpawned", true);
                map.SetUInt("playerOwner", player.GetGUIDLow());
                player.SendAreaTriggerMessage("Welcome home, " + player.GetName() + "!");
                let q = QueryCharacters(
                    "SELECT * FROM `player_housing` WHERE guid = " + player.GetGUIDLow()
                );
                while (q.GetRow()) {
                    map.SpawnGameObject(q.GetInt32(1), q.GetFloat(2), q.GetFloat(3), q.GetFloat(4), q.GetFloat(5)
                    );
                }
            }
        });

        events.MapID.OnPlayerLeave(mapID, (map, player) => {
            if (map.GetUInt("playerOwner") == player.GetGUIDLow()) {
                player.SendAreaTriggerMessage("Come back home soon!");
            } else {
                player.SendAreaTriggerMessage("Come visit again soon!");
            }
        });
    })
    events.SpellID.OnCheckCast(GetIDTag('housing-mod', 'spawn-gob'), (spell, result) => {
        let player = spell.GetCaster().ToPlayer();
        if (player.GetMap().GetUInt("playerOwner", 1) != player.GetGUIDLow()) {
            player.SendAreaTriggerMessage("This is not your home!");
            spell.Cancel();
        } else {
            //eventually replace with a dictionary map that gets made at start of server
            let q = QueryWorld("SELECT entry,typeID FROM `player_housing_spell_object_link` WHERE spellID = " + spell.GetEntry());
            while (q.GetRow()) {
                QueryCharacters("INSERT INTO `player_housing` VALUES(" + player.GetGUIDLow() + "," + q.GetUInt32(0) + "," + q.GetUInt32(1) + "," + spell.GetTargetDest().x + "," + spell.GetTargetDest().y + "," + spell.GetTargetDest().z + "," + spell.GetTargetDest().o + ")"
                );
            }
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
        if (gobs.length > 0) {
            if (gobs.length > 32) {
                gobs = gobs.slice(0, 31);
            }
            for (let i = 0; i < gobs.length; i++) {
                player.GossipMenuAddItem(0, "Remove " + gobs[i].GetName() + " ID:" + gobs[i].GetGUIDLow(), 0,
                    gobs[i].GetGUIDLow(), false,
                    "", 0);
            }
            player.GossipSendMenu(5, gobs[0], 0);
        }
    });

    events.GameObjects.OnGossipSelect((obj, player, menuID, selection, cancel) => {
        player.GossipComplete();
        if (player.GetMap().GetUInt("playerOwner", 1) != player.GetGUIDLow()) {
            player.SendAreaTriggerMessage("This is not your home!");
            return
        }

        let gobs: TSArray<TSGameObject> = player.GetGameObjectsInRange(10, 0, 0);
        let index = -1;
        for (let i = 0; i < gobs.length; i++) {
            if (gobs[i].GetGUIDLow() == selection) {
                index = i;
                break;
            }
        }
        if (index == -1) {
            player.SendAreaTriggerMessage("Unable to find that game object!");
        } else {
            let pos = gobs[index].GetPosition();
            gobs[index].Despawn();
            QueryCharacters("DELETE FROM `player_housing` WHERE x = " + pos.x + " AND y = " + pos.y + " AND z = " + pos.z + ";"
            );
        }
    }
    );
}
