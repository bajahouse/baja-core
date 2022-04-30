let maps: TSArray<uint32> = [309]
let linkTable = CreateDictionary<uint32,TSArray<uint32>>({})
export function housing(events: TSEvents) {
    setupLinkTable()
    
    events.MapID.OnPlayerEnter(maps, (map, player) => {
        if (!map.GetBool("isSpawned", false)) {
            map.SetBool("isSpawned", true)
            map.SetUInt("playerOwner", player.GetGUIDLow())
            map.SetUInt('versionID', 1)
            player.SendAreaTriggerMessage("Welcome home, " + player.GetName() + "! You are displaying version " + 1)
            spawnMap(map, player, 1)
        }
    })

    events.MapID.OnPlayerLeave(maps, (map, player) => {
        if (map.GetUInt("playerOwner") == player.GetGUIDLow()) {
            player.SendAreaTriggerMessage("Come back home soon!")
        } else {
            player.SendAreaTriggerMessage("Come visit again soon!")
        }
        player.UnbindInstance(map.GetMapID(),map.GetDifficulty())
    })

    events.SpellID.OnCheckCast(GetIDTag('housing-mod', 'spawn-obj'), (spell, result) => {
        if (!spell.GetCaster().IsPlayer())
            return
        let player = spell.GetCaster().ToPlayer()
        if (player.GetMap().GetUInt("playerOwner", 1) != player.GetGUIDLow()) {
            player.SendAreaTriggerMessage("This is not your home!")
            result.set(SpellCastResult.FAILED_DONT_REPORT)

        }
    })

    events.SpellID.OnCast(GetIDTag('housing-mod', 'spawn-obj'), (spell) => {
        let caster = spell.GetCaster()
        QueryCharacters("INSERT INTO `player_housing` VALUES(" + caster.GetGUIDLow() + "," + caster.GetMapID() + "," + caster.GetMap().GetUInt('versionID', 1) + "," + linkTable[spell.GetEntry()][0] + "," + linkTable[spell.GetEntry()][1] + "," + spell.GetTargetDest().x + "," + spell.GetTargetDest().y + "," + spell.GetTargetDest().z + "," + caster.GetO() + ")")
        
    })

    //change spell ID later to something else
    events.SpellID.OnCheckCast(1, (spell, result) => {
        let player = spell.GetCaster().ToPlayer()
        if (player.GetMap().GetUInt("playerOwner", 1) != player.GetGUIDLow()) {
            player.SendAreaTriggerMessage("This is not your home!")
            result.set(SpellCastResult.FAILED_DONT_REPORT)
            return
        }
        let gobs = player.GetGameObjectsInRange(10, 0, 0)
        player.GossipClearMenu()
        if (gobs.length == 0) {
            player.SendAreaTriggerMessage('Unable to find any objects!')
            return
        }
    })
    //change spell ID later to something else
    events.SpellID.OnCast(1, (spell) => {
        let player = spell.GetCaster().ToPlayer()
        let gobs = player.GetGameObjectsInRange(10, 0, 0)
        if (gobs.length > 32) {
            gobs = gobs.slice(0, 31)
        }
        for (let i = 0; i < gobs.length; i++) {
            player.GossipMenuAddItem(0, "Remove " + gobs[i].GetName() + " Entry:" + gobs[i].GetEntry(), 0, i) //, false, "", 0
        }
        player.GossipSendMenu(5, gobs[0], 0)
    })

    events.GameObjects.OnGossipSelect((obj, player, menuID, selection, cancel) => {
        player.GossipComplete()
        if (player.GetMap().GetUInt("playerOwner", 1) != player.GetGUIDLow()) {
            player.SendAreaTriggerMessage("This is not your home!")
            return
        }
        let gobs: TSArray<TSGameObject> = player.GetGameObjectsInRange(10, 0, 0)
        let pos = gobs[selection].GetPosition()

        QueryCharacters("DELETE FROM `player_housing` WHERE playerGUID = " + player.GetGUIDLow() + " AND mapID = " + player.GetMapID() + " AND versionID = " + player.GetMap().GetUInt('versionID', 1) + "AND entry = " + gobs[selection].GetEntry() + " AND x = " + pos.x + " AND y = " + pos.y + " AND z = " + pos.z + " AND o = " + pos.o + " ")
        gobs[selection].Despawn()
    })
}

//reuse later when version swapping
function spawnMap(map: TSMap, player: TSPlayer, versionID: uint32) {
    let q = QueryCharacters("SELECT typeID,entry,x,y,z,o FROM `player_housing` WHERE playerGUID = " + player.GetGUIDLow() + " AND mapID = " + map.GetMapID() + " AND versionID = " + versionID)
    while (q.GetRow()) {
        if (q.GetInt32(0) == 1)
            map.SpawnGameObject(q.GetInt32(1), q.GetFloat(2), q.GetFloat(3), q.GetFloat(4), q.GetFloat(5))
        else if (q.GetInt32(0) == 2)
            map.SpawnCreature(q.GetInt32(1), q.GetFloat(2), q.GetFloat(3), q.GetFloat(4), q.GetFloat(5))
    }
}

function setupLinkTable() {
    let q = QueryWorld("SELECT * FROM `player_housing_spell_object_link`")
    while (q.GetRow()) {
        linkTable[q.GetUInt32(0)] = <TSArray<uint32>>[q.GetUInt32(1),q.GetUInt32(2)]
    }
}

