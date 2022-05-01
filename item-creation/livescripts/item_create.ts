import { getRandNumber } from "./livescripts";

const itemClassInfo: TSArray<TSArray<TSArray<float>>> = [//class,subclass,invType,material,sheath,statMult
    [//ARMOR
        //cloth
        [4, 1, 1, 7, 0, 0.8125],//head
        [4, 1, 3, 7, 0, 0.75],//shoulder
        [4, 1, 5, 7, 0, 1],//chest
        [4, 1, 6, 7, 0, 0.5625],//waist
        [4, 1, 7, 7, 0, 0.875],//legs
        [4, 1, 8, 7, 0, 0.6875],//boots
        [4, 1, 9, 7, 0, 0.4375],//wrist
        [4, 1, 10, 7, 0, 0.625],//hands
        //leather
        [4, 2, 1, 8, 0, 0.8125],//head
        [4, 2, 3, 8, 0, 0.75],//shoulder
        [4, 2, 5, 8, 0, 1],//chest
        [4, 2, 6, 8, 0, 0.5625],//waist
        [4, 2, 7, 8, 0, 0.875],//legs
        [4, 2, 8, 8, 0, 0.6875],//boots
        [4, 2, 9, 8, 0, 0.4375],//wrist
        [4, 2, 10, 8, 0, 0.625],//hands
        //mail
        [4, 3, 1, 1, 0, 0.8125],//head
        [4, 3, 3, 1, 0, 0.75],//shoulder
        [4, 3, 5, 1, 0, 1],//chest
        [4, 3, 6, 1, 0, 0.5625],//waist
        [4, 3, 7, 1, 0, 0.875],//legs
        [4, 3, 8, 1, 0, 0.6875],//boots
        [4, 3, 9, 1, 0, 0.4375],//wrist
        [4, 3, 10, 1, 0, 0.625],//hands
        //extras
        [4, 0, 2, 5, 0, 0.5],//neck
        [4, 0, 11, 4, 0, 0.5],//ring
        [4, 0, 12, 4, 0, 0.5],//trinket
        [4, 1, 16, 7, 0, 0.48],//cloak
    ],
    [//WEAPONS
        [2, 0, 13, 1, 3, 0.6],//1h axe
        [2, 1, 17, 1, 1, 1],//2h axe
        [2, 2, 15, 2, 1, 0.8],//bow
        [2, 3, 26, 2, 1, 0.8],//gun
        [2, 4, 13, 1, 3, 0.6],//1h mace
        [2, 5, 17, 1, 1, 1],//2h mace
        [2, 6, 17, 1, 1, 1],//polearm
        [2, 7, 13, 1, 3, 0.6],//1h sword
        [2, 8, 17, 1, 1, 1],//2h sword
        [2, 10, 17, 2, 2, 1],//staff
        [2, 13, 13, 1, 3, 0.6],//first weapon
        [2, 15, 13, 1, 3, 0.5],//dagger
        [2, 19, 26, 2, 3, 0.6],//wand

        [4, 0, 23, 4, 3, 0.4],//offhand tome
        [4, 6, 14, 1, 6, 0.4],//shield
    ]
];

const qualityMultiplier = [
    0.5,//no quality 0
    0.6,//common unused
    0.7,//uncommon
    0.8,//rare
    0.9,//epic
    1//legendary
]

let mana = 0
let hp = 1
let agi = 3
let str = 4
let intl = 5
let spi = 6
let stam = 7
let hit = 31
let crit = 32
let haste = 36
let expertise = 37
let ap = 38
let apen = 44
let sp = 45
let spen = 47

const statGroups: TSArray<TSArray<TSArray<float>>> = <TSArray<TSArray<TSArray<float>>>>[//statgroups
    //str groups
    [
        [str, stam],//primary statIDs
        [haste, hit]//secondary statIDs
    ],
    [
        [str, stam],
        [ap, expertise]
    ],
    [
        [str, stam],
        [hp, crit]
    ],
    [
        [str, stam],
        [apen, hit]
    ],

    //agi groups
    [
        [agi, stam],//primary statIDs
        [haste, hit]//secondary statIDs
    ],
    [
        [agi, stam],
        [ap, expertise]
    ],
    [
        [agi, stam],
        [hp, crit]
    ],
    [
        [agi, stam],
        [apen, hit]
    ],

    //int groups
    [
        [intl, spi],//primary statIDs
        [haste, hit]//secondary statIDs
    ],
    [
        [intl],
        [spi, spen]
    ],
    [
        [intl, stam],
        [crit, sp]
    ],
    [
        [intl, mana],
        [spen, hit]
    ],
]
let startID = 200000
const templateItemID = 38

export function itemCreate(events: TSEvents) {
    startID = getOpenID()
    
    events.Player.OnCommand((player, command, found) => {
        const cmd = command.get().split(' ')
        if (cmd[0] == 'createitem') {
            // this 1 only works with the modified wow.exe.
            //the other parts work without. the exe mods are only needed for
            //newly generated items rather than modified items
            //there could be some updates(ex. a class/subclass/icon change)
            //that would require the exe mod. untested but assumptions
            found.set(true)
            createItemRandom(player)
        } else if (cmd[0] == 'updateitem') {
            //this will add the thori'dal spell to your ranged wep
            //also adds 5 stam to show stat reloading
            found.set(true)
            let item = player.GetItemByPos(255, 17)
            //player.RemoveAllItemMods()//other option rather than slot ID reloading
            player.RemoveItemMods(item, 17)
            let t = item.GetTemplate()
            t.SetStatsCount(1)
            t.SetStatType(0, 7)
            t.SetStatValue(0, 5)
            t.SetSpellID(0, 46699)
            t.SetSpellTrigger(0, 1)
            player.ApplyItemMods(item, 17, true, true)
            //player.ApplyAllItemMods()//other option rather than slot ID reloading
            player.SendItemQueryPacket(t)
            //player.SendItemQueryPacket(item.GetEntry())//other option
        } else if (cmd[0] == 'resetitem') {
            //this removes the thoridal spell from your ranged wep
            //also removes 5 stam to show stat reloading
            found.set(true)
            let item = player.GetItemByPos(255, 17)
            //player.RemoveAllItemMods()//other option rather than slot ID reloading
            player.RemoveItemMods(item, 17)
            let t = item.GetTemplate()
            t.SetStatsCount(0)
            t.SetStatType(0, 0)
            t.SetStatValue(0, 0)
            t.SetSpellID(0, 0)
            t.SetSpellTrigger(0, 0)
            player.ApplyItemMods(item, 17, true, true)
            //player.ApplyAllItemMods()//other option rather than slot ID reloading
            player.SendItemQueryPacket(t)
            //player.SendItemQueryPacket(item.GetEntry())//other option
        }
    })
}

function createItemRandom(player: TSPlayer) {
    let temp: TSItemTemplate = CreateItemTemplate(startID++, templateItemID)
    temp = setupItem(temp, chooseItemType(), player.GetLevel())
    player.SendItemQueryPacket(temp)
    player.AddItem(temp.GetEntry(), 1)
}

export function createItemWithChoices(player: TSPlayer, i1: number, i2: number, level: uint32): TSItem {
    let temp: TSItemTemplate = CreateItemTemplate(startID++, templateItemID)
    temp = setupItem(temp, itemClassInfo[i1][i2], level)
    player.SendItemQueryPacket(temp)
    return player.AddItem(temp.GetEntry(), 1)
}

function setupItem(temp: TSItemTemplate, itemInfo: TSArray<float>, playerLevel: uint32): TSItemTemplate {
    const itemLevel: uint32 = ((playerLevel * 2) * qualityMultiplier[temp.GetQuality()]) + 1
    temp.SetItemLevel(itemLevel);
    temp.SetRequiredLevel(playerLevel)
    temp.SetQuality(GetRandQuality())
    temp.SetStatsCount(temp.GetQuality() - 1)

    temp.SetClass(itemInfo[0])
    temp.SetSubClass(itemInfo[1])
    temp.SetInventoryType(itemInfo[2])
    temp.SetMaterial(itemInfo[3])
    temp.SetSheath(itemInfo[4])

    if (temp.GetClass() == 4)//if armor or shield/tome
    {
        if (temp.GetSubClass() != 23)//if not tome
        {
            temp.SetArmor(<uint32>(10 * itemLevel * itemInfo[5] * qualityMultiplier[temp.GetQuality()]))
        }
        if (itemInfo[2] == 14)//if shield
        {
            temp.SetBlock(<uint32>(itemLevel * itemInfo[5] * qualityMultiplier[temp.GetQuality()]))
        }

    } else {//setup weapon swing damage
        temp.SetDamageMinA(<uint32>(10 * itemLevel * itemInfo[5] * qualityMultiplier[temp.GetQuality()]))
        temp.SetDamageMaxA(<uint32>(20 * itemLevel * itemInfo[5] * qualityMultiplier[temp.GetQuality()]))
        if (temp.GetQuality() == 5) {
            temp.SetDamageMinB(<uint32>(3 * itemLevel * itemInfo[5] * qualityMultiplier[temp.GetQuality()]))
            temp.SetDamageMaxB(<uint32>(5 * itemLevel * itemInfo[5] * qualityMultiplier[temp.GetQuality()]))
        }
        if (itemInfo[2] == 13) {//1h
            temp.SetDelay(1700 + (getRandNumber(5) * 100))
        } else if (itemInfo[2] == 17) {//2h
            temp.SetDelay(2500 + (getRandNumber(5) * 100))
        } else if (itemInfo[2] == 26) {//ranged
            temp.SetDelay(1800 + (getRandNumber(5) * 100))
        }
    }
    temp.SetName(getName(itemInfo, temp.GetQuality()))
    temp.SetDisplayInfoID(getDisplayID(itemInfo, temp.GetQuality()))
    temp = generateStats(itemLevel, temp, itemInfo[5])

    temp.Save()
    return temp
}


function getOpenID(): uint32 {
    //we start our custom items at 200k//perhaps QueryWorld('SELECT MAX(entry) FROM item_template') and saved as const at top of file
    let q = QueryCharacters('SELECT MAX(entry) FROM custom_item_template')
    while (q.GetRow()) {
        return (q.GetUInt32(0) + 1)
    }
    return startID
}

function GetRandQuality(): number {
    let qualityCheck = getRandNumber(100)
    if (qualityCheck < 50) {//uncommon
        return 2
    } else if (qualityCheck < 80) {//rare
        return 3
    } else if (qualityCheck < 98) {//epic
        return 4
    } else {//legendary
        return 5
    }
}

function chooseItemType(): TSArray<float> {
    let qualityCheck = getRandNumber(100)
    if (qualityCheck < 85) {//armor
        return itemClassInfo[0][getRandNumber(itemClassInfo[0].length)]
    } else {//weapon
        return itemClassInfo[1][getRandNumber(itemClassInfo[1].length)]
    }
}

function getDisplayID(itemInfoArr: TSArray<float>, quality: uint32): uint32 {
    let q = QueryCharacters('SELECT displayid FROM custom_item_template_displays WHERE quality = ' + quality + ' AND class = ' + itemInfoArr[0] + ' AND subclass = ' + itemInfoArr[1] + ' AND invtype = ' + itemInfoArr[2] + ' ORDER BY RAND() LIMIT 1')
    while (q.GetRow()) {
        return q.GetUInt32(0)
    }
    return 1
}

function getName(itemInfoArr: TSArray<float>, quality: uint32): string {
    let name = ""
    //base name
    let q = QueryCharacters('SELECT name FROM custom_item_template_names WHERE nametype = 2 AND class = ' + itemInfoArr[0] + ' AND subclass = ' + itemInfoArr[1] + ' AND invtype = ' + itemInfoArr[2] + ' ORDER BY RAND() LIMIT 1')
    while (q.GetRow()) {
        name = q.GetString(0)
    }

    if (quality > 2) {//prefix
        let q = QueryCharacters('SELECT name FROM custom_item_template_names WHERE nametype = 1 ORDER BY RAND() LIMIT 1')
        while (q.GetRow()) {
            name = q.GetString(0) + " " + name
        }
    }

    if (quality == 4 || quality == 5) {//suffix
        q = QueryCharacters('SELECT name FROM custom_item_template_names WHERE  nametype = 3 ORDER BY RAND() LIMIT 1')
        while (q.GetRow()) {
            name += " " + q.GetString(0)
        }
    }
    return name
}

function generateStats(itemLevel: uint32, temp: TSItemTemplate, slotMult: float): TSItemTemplate {
    let group = statGroups[getRandNumber(statGroups.length)]
    let totalStats = slotMult * itemLevel * 20 * qualityMultiplier[temp.GetQuality()]
    let statsPrimary: uint32 = totalStats * .7
    let statsSecondary: uint32 = totalStats * .3
    let flat1 = statsPrimary * .1//forced value to each stat
    let flat2 = statsSecondary * .1//forced value to each stat
    let stats = CreateDictionary<uint32, int32>({})
    //apply flats
    for (let i = 0; i < group.length; i++) {
        for (let j = 0; j < group[i].length; j++) {
            if (i == 0) {
                stats[group[i][j]] = flat1
                statsPrimary -= flat1
            }
            if (i == 1) {
                stats[group[i][j]] = flat2
                statsSecondary -= flat2
            }
        }
    }
    //distribute primary stats
    while (statsPrimary > 0) {
        stats[group[0][getRandNumber(group[0].length)]]++
        statsPrimary--
    }
    //distribute secondary stats
    while (statsSecondary > 0) {
        stats[group[1][getRandNumber(group[1].length)]]++
        statsSecondary--
    }
    //apply stats to item
    let index = 0
    stats.forEach((key, val) => {
        temp.SetStatType(index, key)
        temp.SetStatValue(index, val)
        index++
    })
    temp.SetStatsCount(index)
    return temp
}