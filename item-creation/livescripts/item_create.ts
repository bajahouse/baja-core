import { emptyQuality, itemClassInfo, qualityMultiplier, statChoices, statCounts } from "./const_creations";
import { getRandNumber } from "./livescripts";

let startID = 200000
const templateItemID = 38

const displayDict = CreateDictionary<uint32, TSDictionary<uint32, TSDictionary<uint32, TSDictionary<uint32, TSArray<uint32>>>>>({//quality
    2: emptyQuality,
    3: emptyQuality,
    4: emptyQuality,
    5: emptyQuality,
})

export function itemCreationSetup(events: TSEvents) {
    setupStartingID()
    setupDisplayIDDict()
}

export function createItemRandom(player: TSPlayer) {
    let temp: TSItemTemplate = CreateItemTemplate(startID++, templateItemID)
    temp = modifyItemProperties(temp, chooseItemType(), player.GetLevel(), getRandNumber(3))
    player.SendItemQueryPacket(temp)
    player.AddItem(temp.GetEntry(), 1)
}

export function createItemWithChoices(player: TSPlayer, i1: uint32, i2: uint32, level: uint32, statType: uint32): TSItem {
    let temp: TSItemTemplate = CreateItemTemplate(startID++, templateItemID)
    temp = modifyItemProperties(temp, itemClassInfo[i1][i2], level, statType)
    player.SendItemQueryPacket(temp)
    return player.AddItem(temp.GetEntry(), 1)
}

function modifyItemProperties(temp: TSItemTemplate, itemInfo: TSArray<float>, playerLevel: uint32, statType: uint32): TSItemTemplate {
    const itemLevel: uint32 = ((playerLevel * 2) * qualityMultiplier[temp.GetQuality()]) + 1
    temp.SetItemLevel(itemLevel);
    temp.SetRequiredLevel(playerLevel)
    temp.SetQuality(GetRandQuality())

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
    temp = generateStats(itemLevel, temp, itemInfo[5], statType)

    temp.Save()
    return temp
}

function generateStats(itemLevel: uint32, temp: TSItemTemplate, slotMult: float, statType: uint32): TSItemTemplate {
    let group = getStatGroup(statType, temp.GetQuality())
    let totalStats = slotMult * itemLevel * 20 * qualityMultiplier[temp.GetQuality()]
    let statsPrimary: uint32 = totalStats * .7
    let statsSecondary: uint32 = totalStats * .3
    let flat1: uint32 = statsPrimary * .1//forced value to each stat
    let flat2: uint32 = statsSecondary * .1//forced value to each stat
    let stats = CreateDictionary<uint32, int32>({})

    //apply flat primary
    for (let j = 0; j < group[0].length; j++) {
        stats[group[0][j]] = flat1
        statsPrimary -= flat1
    }
    //distribute primary stats
    while (statsPrimary > 0) {
        stats[group[0][getRandNumber(group[0].length)]]++
        statsPrimary--
    }

    //apply flat secondary
    for (let j = 0; j < group[1].length; j++) {
        stats[group[1][j]] = flat2
        statsSecondary -= flat2
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

function GetRandQuality(): uint32 {
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
    if (getRandNumber(100) < 85) {//armor
        return itemClassInfo[0][getRandNumber(itemClassInfo[0].length)]
    } else {//weapon
        return itemClassInfo[1][getRandNumber(itemClassInfo[1].length)]
    }
}

function getDisplayID(itemInfoArr: TSArray<float>, quality: uint32): uint32 {
    let chose = displayDict[quality][itemInfoArr[0]][itemInfoArr[2]][itemInfoArr[1]]
    return chose[getRandNumber(chose.length)]
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

function setupStartingID() {
    //we start our custom items at 200k
    let q = QueryCharacters('SELECT MAX(entry) FROM custom_item_template')
    while (q.GetRow()) {
        startID = (q.GetUInt32(0) + 1)
        if (startID < 200000)
            startID = 200000
    }
}

function setupDisplayIDDict() {
    //quality->class->invType->subclass->[displayIDs]
    let q = QueryCharacters('SELECT * FROM custom_item_template_displays')
    while (q.GetRow()) {
        displayDict[q.GetUInt32(0)][q.GetUInt32(1)][q.GetUInt32(3)][q.GetUInt32(2)].push(q.GetUInt32(4))
    }
}

function getStatGroup(statType: uint32, quality: uint32): TSArray<TSArray<uint32>> {
    let curStatCounts = statCounts[quality]
    let statGroup = <TSArray<TSArray<uint32>>>[<TSArray<uint32>>[], <TSArray<uint32>>[]]
    for (let i = 0; i < curStatCounts[0]; i++) {
        statGroup[0].push(statChoices[0][statType][getRandNumber(statChoices[0][statType].length)])
    }
    for (let i = 0; i < curStatCounts[1]; i++) {
        statGroup[1].push(statChoices[1][statType][getRandNumber(statChoices[1][statType].length)])
    }
    return statGroup
}