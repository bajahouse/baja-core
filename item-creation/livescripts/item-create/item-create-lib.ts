import { itemClassInfo, qualityMultiplier, statCounts, statChoice, statToWeight, armorScalar, baseName, displayID, prefixPostfix, getRandNumberWithSeed, setupConstCreations, generateSeed } from "./const-creations";

const startID = 200000
let currentMaxID = startID;
let unusedIDs = [0]
const templateItemID = 38

export function itemCreationSetup(events: TSEvents) {
    unusedIDs.pop()//removes original 0
    setupStartingID()
    cleanUpItems()
    setupConstCreations()
}

export function createItemWithSeed(player: TSPlayer, seed: number) {
    let temp: TSItemTemplate = CreateItemTemplate(getItemID(), templateItemID)
    temp = modifyItemProperties(temp, chooseItemType(seed), getRandNumberWithSeed(seed, 2) + player.GetLevel(), getRandNumberWithSeed(seed, 3), GetRandQuality(seed), seed)
    player.SendItemQueryPacket(temp)
    return player.AddItem(temp.GetEntry(), 1)
}

export function createItemRandom(player: TSPlayer): TSItem {
    let temp: TSItemTemplate = CreateItemTemplate(getItemID(), templateItemID)
    let seed = generateSeed()
    temp = modifyItemProperties(temp, chooseItemType(seed), player.GetLevel(), getRandNumberWithSeed(seed, 3), GetRandQuality(seed), seed)
    player.SendItemQueryPacket(temp)
    return player.AddItem(temp.GetEntry(), 1)
}

export function returnCustomItemWithLevelQuality(level: number, quality: number): TSItemTemplate {
    let temp: TSItemTemplate = CreateItemTemplate(getItemID(), templateItemID)
    let seed = generateSeed()
    temp = modifyItemProperties(temp, chooseItemType(seed), level, getRandNumberWithSeed(seed, 3), quality, seed)
    return temp
}

function modifyItemProperties(temp: TSItemTemplate, itemInfo: number[], level: number, statType: number, quality: number, seed: number): TSItemTemplate {
    const qualMult = qualityMultiplier[temp.GetQuality()]
    const itemLevel = level < 70 ? (((level * level) / 36) + 1) : (16.5 * level - 1004)
    const commonMath = itemLevel * itemInfo[5] * qualMult

    temp.SetItemLevel(itemLevel);
    temp.SetRequiredLevel(level <= 80 ? level : 80)
    temp.SetQuality(quality)
    temp.SetMaterial(statType)
    temp.SetScriptID(<uint32>seed)

    temp.SetClass(itemInfo[0])
    temp.SetSubClass(itemInfo[1])
    temp.SetInventoryType(itemInfo[2])
    temp.SetMaterial(itemInfo[3])
    temp.SetSheath(itemInfo[4])

    if (itemInfo[2] == 13) {
        temp.SetDelay(1500 + (getRandNumberWithSeed(seed, 7) * 100))
        temp.SetDamageMinA(5 * commonMath)
        temp.SetDamageMaxA(8 * commonMath)
        if (temp.GetQuality() == 5) {
            temp.SetDamageMinB(2 * commonMath)
            temp.SetDamageMaxB(3 * commonMath)
        }
    } else if (itemInfo[2] == 17) {
        temp.SetDelay(2800 + (getRandNumberWithSeed(seed, 10) * 100))
        temp.SetDamageMinA(12 * commonMath)
        temp.SetDamageMaxA(22 * commonMath)
        if (temp.GetQuality() == 5) {
            temp.SetDamageMinB(4 * commonMath)
            temp.SetDamageMaxB(6 * commonMath)
        }
    } else if (itemInfo[2] == 26 || itemInfo[2] == 15) {
        temp.SetDelay(1800 + (getRandNumberWithSeed(seed, 6) * 100))
        temp.SetDamageMinA(5 * commonMath)
        temp.SetDamageMaxA(6 * commonMath)
        if (temp.GetQuality() == 5) {
            temp.SetDamageMinB(3 * commonMath)
            temp.SetDamageMaxB(4 * commonMath)
        }
    } else if (temp.GetClass() == 4 && itemInfo[1] != 0) {
        if (itemInfo[2] == 14) {
            temp.SetArmor(200 * commonMath)
            temp.SetBlock(commonMath)
        } else {
            temp.SetArmor(3.3 * commonMath * armorScalar[itemInfo[1]])
            temp.SetSocketColor(0, 1)
            if (quality >= 2) {
                temp.SetSocketColor(0, 1)
                temp.SetSocketContent(0, 1)
            }
            if (quality >= 3) {
                temp.SetSocketColor(1, 1)
                temp.SetSocketContent(1, 1)
            }
            if (quality >= 5) {
                temp.SetSocketColor(2, 1)
                temp.SetSocketContent(2, 1)
            }
        }
    }

    temp.SetName(getName(itemInfo, temp.GetQuality(), seed))
    temp.SetDisplayInfoID(getDisplayID(itemInfo, temp.GetQuality(), seed))
    generateStats(itemLevel, temp, itemInfo[5], statType, seed)

    temp.Save()
    return temp
}

function generateStats(itemLevel: number, temp: TSItemTemplate, slotMult: number, statType: number, seed: number) {
    const group = getStatGroup(statType, temp.GetQuality(), seed)
    var totalStats = slotMult * itemLevel * 4 * qualityMultiplier[temp.GetQuality()]
    if (temp.GetQuality() == 5)
        totalStats = totalStats * 1.5
    let statsPrimary: number = totalStats * .7
    let statsSecondary: number = totalStats * .35
    const flat1: number = statsPrimary * .1//forced value to each stat
    const flat2: number = statsSecondary * .1//forced value to each stat
    const stats = CreateDictionary<number, int32>({})

    // apply flat primary
    for (const stat of group[0]) {
        stats[stat] = flat1;
    }
    // distribute primary stats
    for (let i = 0; i < statsPrimary - flat1 * group[0].length; i++) {
        stats[group[0][getRandNumberWithSeed(seed * (i + 1), group[0].length)]]++;
    }
    // apply flat secondary
    for (const stat of group[1]) {
        stats[stat] = flat2;
    }
    // distribute secondary stats
    for (let i = 0; i < statsSecondary - flat2 * group[1].length; i++) {
        stats[group[1][getRandNumberWithSeed(seed * (i + 1), group[1].length)]]++;
    }

    //apply stats to item
    let index = 0
    stats.forEach((key, val) => {
        temp.SetStatType(index, key)
        temp.SetStatValue(index, <int32>(val * statToWeight[key]))
        index++
    })
    temp.SetStatsCount(index)
}

function GetRandQuality(seed: number): number {
    const qualityCheck = getRandNumberWithSeed(seed, 1000);
    if (qualityCheck <= 500) {//50% green
        return 2;
    } else if (qualityCheck <= 850) {//35% blue
        return 3;
    } else if (qualityCheck <= 999) {// 14.9% purple
        return 4;
    } else {//0.1% chance legendary
        return 5;
    }
}



function chooseItemType(seed: number): number[] {
    const choices = getRandNumberWithSeed(seed, 100) <= 85 ? itemClassInfo[0] : itemClassInfo[1]
    return choices[getRandNumberWithSeed(seed, choices.length)]
}


function getDisplayID(itemInfoArr: number[], quality: number, seed: number): number {
    let chose: number[] = <number[]>displayID[quality][itemInfoArr[0]][itemInfoArr[2]][itemInfoArr[1]]
    return chose[getRandNumberWithSeed(seed, chose.length)]
}

function getName(itemInfoArr: number[], quality: number, seed: number): string {
    let name: string = ""
    //prefix
    if (quality > 2) {
        name = prefixPostfix[0][getRandNumberWithSeed(seed, prefixPostfix[0].length)] + " "
    }
    //base name
    name = name + baseName[itemInfoArr[0]][itemInfoArr[1]][itemInfoArr[2]][getRandNumberWithSeed(seed, baseName[itemInfoArr[0]][itemInfoArr[1]][itemInfoArr[2]].length)]
    //suffix
    if (quality == 4 || quality == 5) {
        name = name + " " + prefixPostfix[1][getRandNumberWithSeed(seed, prefixPostfix[1].length)]
    }
    return name
}

export function regenerateAllItems() {
    let q = QueryCharacters('SELECT entry FROM custom_item_template')
    while (q.GetRow()) {
        let temp = GetItemTemplate(q.GetUInt32(0))
        modifyItemProperties(temp, chooseItemType(temp.GetScriptID()), getRandNumberWithSeed(temp.GetScriptID(), 2) + temp.GetRequiredLevel(), getRandNumberWithSeed(temp.GetScriptID(), 3), GetRandQuality(temp.GetScriptID()), temp.GetScriptID())
    }
}

function setupStartingID() {
    let q = QueryCharacters('SELECT MAX(entry) FROM custom_item_template')
    while (q.GetRow()) {
        if (startID < (q.GetUInt32(0) + 1))
            currentMaxID = (q.GetUInt32(0) + 1)
    }
}

function cleanUpItems() {
    QueryCharacters('DELETE FROM item_instance WHERE guid NOT IN ( SELECT item FROM character_inventory);')
    QueryCharacters('DELETE FROM custom_item_template WHERE entry NOT IN ( SELECT itemEntry FROM item_instance)')
    let q = QueryCharacters('SELECT entry FROM custom_item_template')
    let dict = CreateDictionary<number, number>({});
    while (q.GetRow()) {
        dict[q.GetUInt32(0)] = 1;
    }
    for (let i = startID; i < currentMaxID; i++) {
        if (dict[i] == null) {
            unusedIDs.push(i)
        }
    }
}

function getItemID(): number {
    if (unusedIDs.length > 0) {
        return unusedIDs.pop()!;
    } else {
        return currentMaxID++;
    }
}

function getStatGroup(statType: number, quality: number, seed: number): number[][] {
    let curStatCounts = statCounts[quality]
    let statGroup = <number[][]>[<number[]>[], <number[]>[]]
    for (let i = 0; i < curStatCounts[0]; i++) {
        statGroup[0].push(statChoice[0][statType][getRandNumberWithSeed(seed * (i + 1), statChoice[0][statType].length)])
    }
    for (let i = 0; i < curStatCounts[1]; i++) {
        statGroup[1].push(statChoice[1][statType][getRandNumberWithSeed(seed * (i + 1), statChoice[1][statType].length)])
    }
    return statGroup
}