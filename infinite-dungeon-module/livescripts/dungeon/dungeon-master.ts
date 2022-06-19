// ============================================================================
//
// - Dungeon Master -
//
//   This file holds all reusable information for use in infinite dungeon creation
//   This includes usage of spell choice, player rewards, resets, scaling, formation spawns,  and apply/removal of buffs
//
// - External scripts -
//   datascripts: datascripts/dungeons/dungeon1/*
//   livescripts: livescripts/dungeon/dungeon-master
//
// ============================================================================

import { spellChoiceID, spellChoice, spellChoices } from "../../shared/Messages"
export const startingMapID = GetID("Map","infinite-dungeon-mod","basemap")
const classSpells: TSArray<TSArray<TSArray<uint32>>> = <TSArray<TSArray<TSArray<uint32>>>>[
    <TSArray<TSArray<uint32>>>[],//none
    <TSArray<TSArray<uint32>>>[],
    <TSArray<TSArray<uint32>>>[],
    <TSArray<TSArray<uint32>>>[],
    <TSArray<TSArray<uint32>>>[],
    <TSArray<TSArray<uint32>>>[],
    <TSArray<TSArray<uint32>>>[],
    <TSArray<TSArray<uint32>>>[],
    <TSArray<TSArray<uint32>>>[],
    <TSArray<TSArray<uint32>>>[],
    <TSArray<TSArray<uint32>>>[],//none
    <TSArray<TSArray<uint32>>>[],
]
const classSpellDescriptions: TSArray<TSArray<string>> = <TSArray<TSArray<string>>>[
    <TSArray<string>>[],//none
    <TSArray<string>>[],
    <TSArray<string>>[],
    <TSArray<string>>[],
    <TSArray<string>>[],
    <TSArray<string>>[],
    <TSArray<string>>[],
    <TSArray<string>>[],
    <TSArray<string>>[],
    <TSArray<string>>[],
    <TSArray<string>>[],//none
    <TSArray<string>>[],
]

const tormentAndBlessingSpells: TSArray<TSArray<uint32>> = <TSArray<TSArray<uint32>>>[
    <TSArray<uint32>>[GetID("Spell", 'infinite-dungeon-mod', "increasedhealth1-spell"), 0],
]

export const prestigeSpell: uint32 = GetID("Spell", 'infinite-dungeon-mod', "mapprestige-spell")
//end of config
const spellIDToType: TSDictionary<uint32, uint32> = CreateDictionary<uint32, uint32>({
    1: 1
});
class dungeonBuffs {
    currentBuffs: TSArray<uint32> = []
    currentBuffsType: TSArray<uint32> = []
    currentBuffsCount: TSArray<uint32> = []

    currentTormentsAndBlessings: TSArray<uint32> = []
    currentTormentsAndBlessingsType: TSArray<uint32> = []
    currentTormentsAndBlessingsCount: TSArray<uint32> = []

    currentChoiceBuffs: TSArray<uint32> = []
}

export function dungeonBuffSystem(events: TSEvents) {
    setupTables()
    events.CreatureID.OnCreate(GetID("creature_template", 'infinite-dungeon-mod', "dungeon-orb"), (creature, cancel) => {
        creature.GetCollisions().Add(ModID(), "hungergames-collision", 2, 500, 0, (self,collided,cancel,entry) => {
            if (collided.IsPlayer()) {
                let player = collided.ToPlayer()
                let creature = self.ToCreature()
                if (player.IsInGroup()) {
                    let arr = creature.GetJsonArray('usedBy', new TSJsonArray())
                    for (let i = 0; i < arr.length; i++) {
                        if (arr.GetNumber(i) == player.GetGUIDLow()) {
                            return
                        }
                    }
                    if (givePlayerChoiceOfBuffs(player)) {
                        arr.PushNumber(player.GetGUIDLow())
                        creature.SetJsonArray('usedBy', arr)
                    }
                    if (arr.length == player.GetGroup().GetMembersCount()) {
                        creature.DespawnOrUnsummon(0)
                    }
                } else {
                    if (givePlayerChoiceOfBuffs(player)) {
                        creature.DespawnOrUnsummon(0)
                    }
                }
            }
        })
    })

    events.GameObjectID.OnGossipHello(GetID("gameobject_template", 'infinite-dungeon-mod', "dungeon-chest"), (obj, player, cancel) => {
        player.SpawnCreature(GetID("creature_template", 'infinite-dungeon-mod', "dungeon-orb"), obj.GetX(), obj.GetY(), obj.GetZ(), obj.GetO(), 8, 0)
        obj.Despawn()
    })

    events.GameObjectID.OnGossipHello(GetID("gameobject_template", 'infinite-dungeon-mod', "dungeonendobj"), (obj, player, cancel) => {
        player.GossipClearMenu()
        player.GossipMenuAddItem(0, 'Go again', obj.GetGUIDLow(), 0, false, '', 0)
        player.GossipMenuAddItem(0, 'Escape', obj.GetGUIDLow(), 1, false, '', 0)
        player.GossipSendMenu(5, obj, 1)
    })

    events.Player.OnLogout((player) => {
        removePlayerBuffs(player)
    })

    events.Player.OnSay((player, msg,type, lang ) => {
        if (msg.get().startsWith("#1")) {
            playerChoseBuff(player, 2)
            applyPlayerBuffs(player)
        } else if (msg.get().startsWith("#2")) {
            playerChoseBuff(player, 1)
            applyPlayerBuffs(player)
        } else if (msg.get().startsWith("#3")) {
            playerChoseBuff(player, 0)
            applyPlayerBuffs(player)
        }
    })

    events.CustomPacketID.OnReceive(spellChoiceID, (opcode, packet, player) => {
        let pkt = new spellChoice(0)
        pkt.read(packet)
        playerChoseBuff(player, pkt.choice)
        applyPlayerBuffs(player)
    })
}

export function rewardGroup(player: TSPlayer) {
    despawnMap(player)
    let rewardID: uint32 = player.GetMap().GetUInt('rewardID', GetID("item_template", 'infinite-dungeon-mod', "dungeon-end-currency"))
    let insideID: uint32 = player.GetMap().GetUInt('dropID', GetID("item_template", 'infinite-dungeon-mod', "dungeon-inside-currency"))
    if (player.IsInGroup()) {
        let group = player.GetGroup().GetMembers()
        for (let i = 0; i < group.length; i++) {
            let curPrestige: uint32 = group[i].GetUInt('prestige', 0)
            let rewCount: uint32 = (curPrestige * curPrestige) + curPrestige
            group[i].SendAreaTriggerMessage('You were rewarded with ' + rewCount + ' of animare power for your prowess')
            group[i].AddItem(rewardID, rewCount)
            group[i].SetUInt('prestige', 0)
            group[i].RemoveItemByEntry(insideID, 999999)
            group[i].Teleport(startingMapID, -8750.45, -74.64, 31, 0)
        }
    } else {
        let curPrestige: uint32 = player.GetUInt('prestige', 0)
        player.AddItem(rewardID, (curPrestige * curPrestige) + curPrestige )
        player.SetUInt('prestige', 0)
        player.RemoveItemByEntry(insideID, 999999)
        player.Teleport(startingMapID, -8750.45, -74.64, 31, 0)
    }
}

export function resetGroup(player: TSPlayer, playerSpawnCoords: TSDictionary<string, float>, miniMobSpawnCoords: TSArray<TSDictionary<string, float>>, miniMobIDs: TSArray<uint32>, mobSpawnCoords: TSArray<TSDictionary<string, float>>, mobIDs: TSArray<uint32>, miniBossSpawnCoords: TSArray<TSDictionary<string, float>>, miniBossIDs: TSArray<uint32>, bossSpawnCoords: TSArray<TSDictionary<string, float>>, bossIDs: TSArray<uint32>, vendorSpawnCoords: TSDictionary<string, float>, chestSpawnCoords: TSArray<TSDictionary<string, float>>, vaseSpawnCoords: TSArray<TSDictionary<string, float>>) {
    let map = player.GetMap()
    let prestige = map.GetUInt('prestige', 0) + 1
    map.SetUInt('prestige', prestige)
    if (prestige % 5 == 0) {
        if (player.IsInGroup()) {
            let pGroup = player.GetGroup().GetMembers()
            for (let i = 0; i > pGroup.length; i++) {
                addTormentOrBlessing(pGroup[i])
                applyPlayerBuffs(pGroup[i])
            }
        } else {
            addTormentOrBlessing(player)
            applyPlayerBuffs(player)
        }
    }
    despawnMap(player)
    if (player.IsInGroup()) {
        teleportRandomStart(player.GetGroup().GetMembers(), playerSpawnCoords)
    } else {
        teleportRandomStart([player], playerSpawnCoords)
    }
    spawnMap(map, miniMobSpawnCoords, miniMobIDs, mobSpawnCoords, mobIDs, miniBossSpawnCoords, miniBossIDs, bossSpawnCoords, bossIDs, vendorSpawnCoords, chestSpawnCoords, vaseSpawnCoords)
}

function teleportRandomStart(players: TSPlayer[], playerSpawnCoords: TSDictionary<string, float>) {
    let prestige = players[0].GetMap().GetUInt('prestige', 0)
    for (let i = 0; i < players.length; i++) {
        players[i].SetUInt('prestige', players[i].GetUInt('prestige', 0) + 1)
        if (prestige > 0) {
            players[i].SendAreaTriggerMessage("You are on Prestige " + prestige)
        }
        players[i].Teleport(playerSpawnCoords['m'], playerSpawnCoords['x'], playerSpawnCoords['y'], playerSpawnCoords['z'], playerSpawnCoords['o'])
    }
}

function despawnMap(player: TSPlayer) {
    let creatures = player.GetCreaturesInRange(20000, 0, 0, 0)
    for (let i = 0; i < creatures.length; i++) {
        creatures[i].DespawnOrUnsummon(3000)
    }
    let gobs = player.GetGameObjectsInRange(20000, 0, 0)
    for (let i = 0; i < gobs.length; i++) {
        gobs[i].Despawn()
    }
}

export function spawnMap(map: TSMap, miniMobSpawnCoords: TSArray<TSDictionary<string, float>>, miniMobIDs: TSArray<uint32>, mobSpawnCoords: TSArray<TSDictionary<string, float>>, mobIDs: TSArray<uint32>, miniBossSpawnCoords: TSArray<TSDictionary<string, float>>, miniBossIDs: TSArray<uint32>, bossSpawnCoords: TSArray<TSDictionary<string, float>>, bossIDs: TSArray<uint32>, vendorSpawnCoords: TSDictionary<string, float>, chestSpawnCoords: TSArray<TSDictionary<string, float>>, vaseSpawnCoords: TSArray<TSDictionary<string, float>>,) {
    let c = map.SpawnCreature(GetID("creature_template", 'infinite-dungeon-mod', "dungeon-vendor"), vendorSpawnCoords['x'], vendorSpawnCoords['y'], vendorSpawnCoords['z'], vendorSpawnCoords['o'], 180000)
    //chests
    for (let i = 0; i < chestSpawnCoords.length; i++) {
        c.SummonGameObject(GetID("gameobject_template", 'infinite-dungeon-mod', "dungeon-chest"), chestSpawnCoords[i]['x'], chestSpawnCoords[i]['y'], chestSpawnCoords[i]['z'], chestSpawnCoords[i]['o'], 0)
    }
    //vases
    for (let i = 0; i < vaseSpawnCoords.length; i++) {
        map.SpawnCreature(GetID("creature_template", 'infinite-dungeon-mod', "dungeon-vase"), vaseSpawnCoords[i]['x'], vaseSpawnCoords[i]['y'], vaseSpawnCoords[i]['z'], vaseSpawnCoords[i]['o'], 0)
            .SetScale(Math.random() / 4 + 0.15)
    }
    //minimobs
    for (let i = 0; i < miniMobSpawnCoords.length; i++) {
        for (let j = 0; j < getRandomInt(3); j++) {
            map.SpawnCreature(miniMobIDs[getRandomInt(miniMobIDs.length)], miniMobSpawnCoords[i]['x'], miniMobSpawnCoords[i]['y'], miniMobSpawnCoords[i]['z'], miniMobSpawnCoords[i]['o'], 0).MoveRandom(30)
        }
    }
    //mobs
    for (let i = 0; i < mobSpawnCoords.length; i++) {
        spawnFormation(map, mobSpawnCoords.get(i), mobIDs, mobIDs.length)
    }
    //minibosses
    for (let i = 0; i < miniBossSpawnCoords.length; i++) {
        map.SpawnCreature(miniBossIDs[getRandomInt(miniBossIDs.length)], miniBossSpawnCoords[i]['x'], miniBossSpawnCoords[i]['y'], miniBossSpawnCoords[i]['z'], miniBossSpawnCoords[i]['o'], 0)
    }
    //bosses
    for (let i = 0; i < bossSpawnCoords.length; i++) {
        if (i == bossSpawnCoords.length - 1) {//last boss
            spawnBoss(map, bossIDs[getRandomInt(bossIDs.length)], bossSpawnCoords.get(i), true)
        } else {
            spawnBoss(map, bossIDs[getRandomInt(bossIDs.length)], bossSpawnCoords.get(i), false)
        }
    }
}

function spawnBoss(map: TSMap, bossID: number, sPos: TSDictionary<string, number>, lastBoss: boolean) {
    let c = map.SpawnCreature(bossID, sPos['x'], sPos['y'], sPos['z'], sPos['o'], 0)
    if (lastBoss) {
        c.SetUInt('lastBoss', 1)
    } else {
        c.SetUInt('lastBoss', 0)
    }
}

function spawnFormation(map: TSMap, sPos: TSDictionary<string, float>, mobIDs: TSArray<uint32>, mobCount: uint32) {
    //forward is x+cosRad y+sinRad
    //backwards is x-cosRad y-sinRad
    //left is x+sinRad y+cosRad
    //right is x-sinRad y-cosRad
    let cosRad = 3 * Math.cos(sPos['o'])
    let sinRad = 3 * Math.sin(sPos['o'])
    let formationNumber = getRandomInt(10)
    map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'], sPos['y'], sPos['z'], sPos['o'], 0)
    switch (formationNumber) {
        case 0:
            //0x0
            //0x0
            //000
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] + cosRad, sPos['y'] + sinRad, sPos['z'], sPos['o'], 0)
            break;
        case 1:
            //000
            //xx0
            //000
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] + sinRad, sPos['y'] + cosRad, sPos['z'], sPos['o'], 0)
            break;
        case 2:
            //000
            //0xx
            //000
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] - sinRad, sPos['y'] - cosRad, sPos['z'], sPos['o'], 0)
            break;
        case 3:
            //0x0
            //0x0
            //0x0
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] + cosRad, sPos['y'] + sinRad, sPos['z'], sPos['o'], 0)
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] - cosRad, sPos['y'] - sinRad, sPos['z'], sPos['o'], 0)
            break;
        case 4:
            //000
            //xxx
            //000
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] + sinRad, sPos['y'] + cosRad, sPos['z'], sPos['o'], 0)
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] - sinRad, sPos['y'] - cosRad, sPos['z'], sPos['o'], 0)
            break;
        case 5:
            //000
            //0x0
            //x0x
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] + sinRad - cosRad, sPos['y'] + cosRad - sinRad, sPos['z'], sPos['o'], 0)
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] - sinRad, sPos['y'] - cosRad, sPos['z'], sPos['o'], 0)
            break;
        case 6:
            //x0x
            //0x0
            //000
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] + sinRad + cosRad, sPos['y'] + cosRad + sinRad, sPos['z'], sPos['o'], 0)
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] - sinRad, sPos['y'] - cosRad, sPos['z'], sPos['o'], 0)
            break;
        case 7:
            //0x0
            //xxx
            //000
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] + cosRad, sPos['y'] + sinRad, sPos['z'], sPos['o'], 0)
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] + sinRad, sPos['y'] + cosRad, sPos['z'], sPos['o'], 0)
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] - sinRad, sPos['y'] - cosRad, sPos['z'], sPos['o'], 0)
            break;
        case 8:
            //000
            //xxx
            //0x0
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] - cosRad, sPos['y'] - sinRad, sPos['z'], sPos['o'], 0)
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] + sinRad, sPos['y'] + cosRad, sPos['z'], sPos['o'], 0)
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] - sinRad, sPos['y'] - cosRad, sPos['z'], sPos['o'], 0)
            break;
        case 9:
            //x0x
            //xxx
            //000
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] + sinRad, sPos['y'] + cosRad, sPos['z'], sPos['o'], 0)
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] - sinRad, sPos['y'] - cosRad, sPos['z'], sPos['o'], 0)
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] + sinRad + cosRad, sPos['y'] + cosRad + sinRad, sPos['z'], sPos['o'], 0)
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] - sinRad + cosRad, sPos['y'] - cosRad + sinRad, sPos['z'], sPos['o'], 0)
            break;
        case 10:
            //000
            //xxx
            //x0x
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] + sinRad, sPos['y'] + cosRad, sPos['z'], sPos['o'], 0)
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] - sinRad, sPos['y'] - cosRad, sPos['z'], sPos['o'], 0)
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] + sinRad - cosRad, sPos['y'] + cosRad - sinRad, sPos['z'], sPos['o'], 0)
            map.SpawnCreature(mobIDs[getRandomInt(mobCount)], sPos['x'] - sinRad - cosRad, sPos['y'] - cosRad - sinRad, sPos['z'], sPos['o'], 0)
            break;
    }
}

function givePlayerChoiceOfBuffs(player: TSPlayer): boolean {
    let charItems = player.GetObject<dungeonBuffs>("dungeonBuffs", new dungeonBuffs())
    let spellRarity: TSArray<uint32> = []
    let spellDescs: TSArray<string> = []
    let classID = player.GetClass()
    let allSpells: TSArray<TSArray<uint32>> = classSpells[classID]
    let allDesc = classSpellDescriptions[classID]
    let continueLoop = true
    let count = 0

    if (charItems.currentChoiceBuffs.length > 0) {
        return false
    } else {
        player.SendBroadcastMessage('--- Spell Choices---')
        while (continueLoop == true) {
            const index = Math.floor(Math.random() * allSpells.length)
            let spellInfo: TSArray<uint32> = allSpells[index]
            let desc = allDesc[index]
            let c: uint32 = spellInfo[0]
            if (spellIDToType[c] == 0) {
                count++
                player.SendBroadcastMessage('#'+count+': ' +desc)
                charItems.currentChoiceBuffs.push(c)
                spellRarity.push(spellInfo[1])
                spellDescs.push(desc)
                
            } else if (spellIDToType[c] == 1 || spellIDToType[c] == 2) {
                if (!charItems.currentBuffs.includes(c)) {
                    count++
                    player.SendBroadcastMessage('#'+count+': ' + desc)
                    charItems.currentChoiceBuffs.push(c)
                    spellRarity.push(spellInfo[1])
                    spellDescs.push(desc)
                }
            }
            if (count == 3) {
                continueLoop = false
            }
        }
        let pkt = new spellChoices(charItems.currentChoiceBuffs, spellRarity, spellDescs)
        pkt.write().SendToPlayer(player)
        return true
    }
}

function playerChoseBuff(player: TSPlayer, index: uint32) {
    let charItems = player.GetObject<dungeonBuffs>("dungeonBuffs", new dungeonBuffs())
    if (charItems.currentChoiceBuffs.length == 3) {
        let currentChoicesID: TSArray<uint32> = [charItems.currentChoiceBuffs.pop()!, charItems.currentChoiceBuffs.pop()!, charItems.currentChoiceBuffs.pop()!]
        let choice: uint32 = currentChoicesID[index]
        let found: uint32 = -1
        for (let i = 0; i < charItems.currentBuffs.length; i++) {
            if (charItems.currentBuffs[i] == choice) {
                found = i
                break
            }
        }
        if (found == -1) {
            charItems.currentBuffs.push(choice)
            charItems.currentBuffsType.push(spellIDToType[choice])
            charItems.currentBuffsCount.push(1)
        } else {
            charItems.currentBuffsCount[found]++
        }
    }
}

function addTormentOrBlessing(player: TSPlayer) {
    let charItems = player.GetObject<dungeonBuffs>("dungeonBuffs", new dungeonBuffs())
    let continueLoop = true
    while (continueLoop == true) {
        let index = getRandomInt(tormentAndBlessingSpells.length)
        let spellInfo: TSArray<uint32> = tormentAndBlessingSpells[index]
        let spellID = spellInfo[0]
        let spellType = spellInfo[1]
        let found: uint32 = -1

        for (let i = 0; i < charItems.currentTormentsAndBlessings.length; i++) {
            if (charItems.currentTormentsAndBlessings[i] == spellID) {
                found = i
                break
            }
        }
        if (found == -1) {
            charItems.currentTormentsAndBlessings.push(spellID)
            charItems.currentTormentsAndBlessingsType.push(spellType)
            charItems.currentTormentsAndBlessingsCount.push(1)
            continueLoop = false
        } else if (found != -1 && spellType == 0) {//found spell, spell type 0 allows stack
            charItems.currentTormentsAndBlessingsCount[found]++
            continueLoop = false
        }
    }
}

export function applyPlayerBuffs(player: TSPlayer) {
    if (player.IsDead())
        return

    let charItems = player.GetObject<dungeonBuffs>("dungeonBuffs", new dungeonBuffs())
    for (let i = 0; i < charItems.currentBuffs.length; i++) {
        if (charItems.currentBuffsType[i] == 0 || charItems.currentBuffsType[i] == 1) {
            //console.log('player:'+player.GetName() + ' spellID ' + charItems.currentBuffs[i] + ' stackAmt: ' +charItems.currentBuffsCount[i] )
            if(player.HasAura(charItems.currentBuffs[i])){
                player.GetAura(charItems.currentBuffs[i]).SetStackAmount(charItems.currentBuffsCount[i])
            }else{
                player.AddAura(charItems.currentBuffs[i], player).SetStackAmount(charItems.currentBuffsCount[i])
            }
            //player.AddAura(charItems.currentBuffs[i], player).SetStackAmount(charItems.currentBuffsCount[i])
        } else if (charItems.currentBuffsType[i] == 2) {
            if(!player.HasSpell(charItems.currentBuffs[i]))
            player.LearnSpell(charItems.currentBuffs[i])
        }
    }
    for (let i = 0; i < charItems.currentTormentsAndBlessings.length; i++) {
        if (charItems.currentTormentsAndBlessingsType[i] == 0 || charItems.currentTormentsAndBlessingsType[i] == 1) {
            if(player.HasAura(charItems.currentTormentsAndBlessings[i])){
                player.GetAura(charItems.currentTormentsAndBlessings[i]).SetStackAmount(charItems.currentTormentsAndBlessingsCount[i])
            }else{
                player.AddAura(charItems.currentTormentsAndBlessings[i], player).SetStackAmount(charItems.currentTormentsAndBlessingsCount[i])
            }
            //player.AddAura(charItems.currentTormentsAndBlessings[i], player).SetStackAmount(charItems.currentTormentsAndBlessingsCount[i])
        } else if (charItems.currentTormentsAndBlessingsType[i] == 2) {
            if(!player.HasSpell(charItems.currentTormentsAndBlessings[i]))
            player.LearnSpell(charItems.currentTormentsAndBlessings[i])
        }
    }
}

export function removePlayerBuffs(player: TSPlayer) {
    let charItems = player.GetObject<dungeonBuffs>("dungeonBuffs", new dungeonBuffs())
    for (let i = 0; i < charItems.currentBuffs.length; i++) {
        if (charItems.currentBuffsType[i] == 0 || charItems.currentBuffsType[i] == 1) {
            player.RemoveAura(charItems.currentBuffs[i])
        } else if (charItems.currentBuffsType[i] == 2) {
            player.RemoveSpell(charItems.currentBuffs[i], false, false)
        }
    }
    for (let i = 0; i < charItems.currentTormentsAndBlessings.length; i++) {
        if (charItems.currentTormentsAndBlessingsType[i] == 0 || charItems.currentTormentsAndBlessingsType[i] == 1) {
            player.RemoveAura(charItems.currentTormentsAndBlessings[i])
        } else if (charItems.currentTormentsAndBlessingsType[i] == 2) {
            player.RemoveSpell(charItems.currentTormentsAndBlessings[i], false, false)
        }
    }
    player.SetObject("dungeonBuffs", new dungeonBuffs())
}

export function getRandomInt(max: uint32): uint32 {
    return Math.floor(Math.random() * max)
}

function setupTables() {
    //sql query for all spells
    let query = QueryWorld("SELECT * FROM `dungeon_spells`;");

        while (query.GetRow()) {
        let classID = query.GetUInt32(0)
        let spellID = query.GetUInt32(1)
        let spellRarity = query.GetUInt32(2)
        let spellType = query.GetUInt32(3)
        let spellDesc = query.GetString(4)
        spellIDToType[spellID] = spellType
        if(classID == 0){//add spell to all
            for (let j = 1; j <= 11; j++) {//1->11 for class IDs
                if (j == 10) 
                    continue;
                classSpells[j].push(<TSArray<uint32>>[spellID,spellRarity,spellType])
                classSpellDescriptions[j].push(spellDesc)
            }
            
        }else{//single class
            classSpells[classID].push(<TSArray<uint32>>[spellID,spellRarity,spellType])
            classSpellDescriptions[classID].push(spellDesc)
        }
    }
}

export function setupLastBossCheck(events: TSEvents, bossID: number) {
    events.CreatureID.OnDeath(bossID, (creature, killer) => {
        if (creature.GetUInt('lastBoss', 0) == 1) {
            killer.SummonGameObject(GetID("gameobject_template", 'infinite-dungeon-mod', "dungeonendobj"), creature.GetX(), creature.GetY(), creature.GetZ()+1, creature.GetO(), 0)
        }
    })
}

