// ============================================================================
//
// - Item Generator Library -
//
//   This file is used to generate an item using multipliers from const-creations and control the IDs of any generated items.
//   There are 4 functions to use external of the lib:createItemRandom,returnItemIDRandom,createItemWithChoices,returnItemIDWithChoices
// - External scripts -
//   datascripts: datascripts/fill-database
//
// ============================================================================

import { itemClassInfo, qualityMultiplier, statCounts, statChoices, statToWeight, armorScalar, baseNameDict, displayDict, prefixPostfixArray } from "./const-creations";
import { getRandNumber } from "../livescripts";

let startID = 200000
const templateItemID = 38
//dont touch

export function itemCreationSetup(events: TSEvents) {
    setupStartingID()
    setupBaseNameDict()
    setupPrefixPostfixDict()
    setupDisplayIDDict()
}

export function createItemRandom(player: TSPlayer): TSItem {
    let temp: TSItemTemplate = CreateItemTemplate(startID++, templateItemID)
    temp = modifyItemProperties(temp, chooseItemType(), player.GetLevel(), getRandNumber(3))
    player.SendItemQueryPacket(temp)
    return player.AddItem(temp.GetEntry(), 1)
}

export function createItemWithChoices(player: TSPlayer, itemType: uint32, itemSubType: uint32, level: uint32, statType: uint32): TSItem {
    let temp: TSItemTemplate = CreateItemTemplate(startID++, templateItemID)
    temp = modifyItemProperties(temp, itemClassInfo[itemType][itemSubType], level, statType)
    player.SendItemQueryPacket(temp)
    return player.AddItem(temp.GetEntry(), 1)
}

export function returnItemIDRandom(player: TSUnit): uint32 {
    let temp: TSItemTemplate = CreateItemTemplate(startID++, templateItemID)
    temp = modifyItemProperties(temp, chooseItemType(), player.GetLevel(), getRandNumber(3))
    return temp.GetEntry()
}

export function returnItemIDWithChoices(itemType: uint32, itemSubType: uint32, level: uint32, statType: uint32): uint32 {
    let temp: TSItemTemplate = CreateItemTemplate(startID++, templateItemID)
    temp = modifyItemProperties(temp, itemClassInfo[itemType][itemSubType], level, statType)
    return temp.GetEntry()
}

function modifyItemProperties(temp: TSItemTemplate, itemInfo: TSArray<float>, level: uint32, statType: uint32): TSItemTemplate {
    const qualMult = qualityMultiplier[temp.GetQuality()]
    let itemLevel = level < 70 ? (((level * level) / 36) + 1) : (16.5 * level - 1004)
    const commonMath = itemLevel * itemInfo[5] * qualMult

    temp.SetItemLevel(itemLevel);
    temp.SetRequiredLevel(level <= 80 ? level : 80)
    temp.SetQuality(GetRandQuality())

    temp.SetClass(itemInfo[0])
    temp.SetSubClass(itemInfo[1])
    temp.SetInventoryType(itemInfo[2])
    temp.SetMaterial(itemInfo[3])
    temp.SetSheath(itemInfo[4])

    if (temp.GetClass() == 4)//if armor or shield/tome
    {
        if (itemInfo[1] != 0)//if not ring/neck/trink/tome
        {
            if (itemInfo[2] == 14)//if shield
            {
                temp.SetArmor(<uint32>(200 * commonMath))
                temp.SetBlock(<uint32>(commonMath))
            }
            else {
                temp.SetArmor(<uint32>(3.3 * commonMath * armorScalar[itemInfo[1]]))
            }
        }
    } else {//setup weapon swing damage
        if (itemInfo[2] == 13) {//1h
            temp.SetDelay(1500 + (getRandNumber(7) * 100))
            temp.SetDamageMinA(<uint32>(5 * commonMath))
            temp.SetDamageMaxA(<uint32>(8 * commonMath))
            if (temp.GetQuality() == 5) {
                temp.SetDamageMinB(<uint32>(2 * commonMath))
                temp.SetDamageMaxB(<uint32>(3 * commonMath))
            }
        } else if (itemInfo[2] == 17) {//2h
            temp.SetDelay(2800 + (getRandNumber(10) * 100))
            temp.SetDamageMinA(<uint32>(12 * commonMath))
            temp.SetDamageMaxA(<uint32>(22 * commonMath))
            if (temp.GetQuality() == 5) {
                temp.SetDamageMinB(<uint32>(4 * commonMath))
                temp.SetDamageMaxB(<uint32>(6 * commonMath))
            }
        } else if (itemInfo[2] == 26 || itemInfo[2] == 15) {//ranged
            temp.SetDelay(1800 + (getRandNumber(6) * 100))
            temp.SetDamageMinA(<uint32>(5 * commonMath))
            temp.SetDamageMaxA(<uint32>(6 * commonMath))
            if (temp.GetQuality() == 5) {
                temp.SetDamageMinB(<uint32>(3 * commonMath))
                temp.SetDamageMaxB(<uint32>(4 * commonMath))
            }
        }
    }
    temp.SetName(getName(itemInfo, temp.GetQuality()))
    temp.SetDisplayInfoID(getDisplayID(itemInfo, temp.GetQuality()))
    generateStats(itemLevel, temp, itemInfo[5], statType)

    temp.Save()
    return temp
}

function generateStats(itemLevel: uint32, temp: TSItemTemplate, slotMult: float, statType: uint32) {
    let group = getStatGroup(statType, temp.GetQuality())
    let totalStats = slotMult * itemLevel * 4 * qualityMultiplier[temp.GetQuality()]
    let statsPrimary: uint32 = totalStats * .7
    let statsSecondary: uint32 = totalStats * .35
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
        temp.SetStatValue(index, <int32>(val * statToWeight[key]))
        index++
    })
    temp.SetStatsCount(index)
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
    //prefix
    if (quality > 2) {
        name = prefixPostfixArray[0][getRandNumber(prefixPostfixArray[0].length)] + " "
    }
    //base name
    name += baseNameDict[itemInfoArr[0]][itemInfoArr[1]][itemInfoArr[2]][getRandNumber(baseNameDict[itemInfoArr[0]][itemInfoArr[1]][itemInfoArr[2]].length)]
    //suffix
    if (quality == 4 || quality == 5) {
        name += " " + prefixPostfixArray[1][getRandNumber(prefixPostfixArray[1].length)]
    }
    return name
}

function setupStartingID() {
    //we start our custom items at 200k
    let q = QueryCharacters('SELECT MAX(entry) FROM custom_item_template')
    while (q.GetRow()) {
        if (startID < (q.GetUInt32(0) + 1))
            startID = (q.GetUInt32(0) + 1)
    }
}

function setupDisplayIDDict() {
    //quality->class->invType->subclass->[displayIDs]
    let q = QueryWorld('SELECT * FROM custom_item_template_displays')
    while (q.GetRow()) {
        displayDict[q.GetUInt32(0)][q.GetUInt32(1)][q.GetUInt32(3)][q.GetUInt32(2)].push(q.GetUInt32(4))
    }
}

function setupBaseNameDict() {
    let q = QueryWorld('SELECT * FROM custom_item_template_names WHERE nametype = 2')
    while (q.GetRow()) {
        baseNameDict[q.GetUInt32(1)][q.GetUInt32(2)][q.GetUInt32(3)].push(q.GetString(4))
    }
}

function setupPrefixPostfixDict() {
    let q = QueryWorld('SELECT  name FROM custom_item_template_names WHERE nametype = 1')
    while (q.GetRow()) {
        prefixPostfixArray[0].push(q.GetString(0))
    }
    q = QueryWorld('SELECT name FROM custom_item_template_names WHERE nametype = 3')
    while (q.GetRow()) {
        prefixPostfixArray[1].push(q.GetString(0))
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

function createItemPacket(itemID: number) {
    let item: TSItemTemplate = (itemID > 0) ? GetItemTemplate(itemID) : GetItemTemplate(templateItemID)
    let pkt: any = ItemUpdatePacket()
    pkt.class = item.GetClass()
    pkt.subclass = item.GetSubClass()
    pkt.soundOverrideSubclass = item.GetSoundOverrideSubclass()
    pkt.name = item.GetName()
    pkt.displayID = item.GetDisplayInfoID()
    pkt.quality = item.GetQuality()
    pkt.flags = item.GetFlags()
    pkt.flags2 = item.GetFlags2()
    pkt.buyCount = item.GetBuyCount()
    pkt.buyPrice = item.GetBuyPrice()
    pkt.sellPrice = item.GetSellPrice()
    pkt.invType = item.GetInventoryType()
    pkt.allowClass = item.GetAllowableClass()
    pkt.allowRace = item.GetAllowableRace()
    pkt.itemLevel = item.GetItemLevel()
    pkt.reqLevel = item.GetRequiredLevel()
    pkt.reqSkill = item.GetRequiredSkill()
    pkt.reqSkillRank = item.GetRequiredSkillRank()
    pkt.reqSpel = item.GetRequiredSpell()
    pkt.reqHonorRank = item.GetRequiredHonorRank()
    pkt.reqCityRank = item.GetRequiredCityRank()
    pkt.reqRepFaction = item.GetRequiredReputationFaction()
    pkt.reqRepRank = item.GetRequiredReputationRank()
    pkt.maxCount = item.GetMaxCount()
    pkt.stackable = item.GetStackable()
    pkt.containerSlots = item.GetContainerSlots()
    pkt.statsCount = item.GetStatsCount()
    //come back for stats
    pkt.scalingStatDist = item.GetScalingStatDistribution()
    pkt.scalingStatValue = item.GetScalingStatValue()
    pkt.dmgMinA = item.GetDamageMinA()
    pkt.dmgMaxA = item.GetDamageMaxA()
    pkt.dmgTypeA = item.GetDamageTypeA()
    pkt.dmgMinB = item.GetDamageMinB()
    pkt.dmgMaxb = item.GetDamageMaxB()
    pkt.dmgTypeB = item.GetDamageTypeB()
    pkt.armor = item.GetArmor()
    pkt.hRes = item.GetHolyRes()
    pkt.fiRes = item.GetFireRes()
    pkt.nRes = item.GetNatureRes()
    pkt.frRes = item.GetFrostRes()
    pkt.sRes = item.GetShadowRes()
    pkt.aRes = item.GetArcaneRes()
    pkt.delay = item.GetDelay()
    pkt.ammotype = item.GetAmmoType()
    pkt.rangedModRange = item.GetRangedModRange()
    //come back for spells
    pkt.bonding = item.GetBonding()
    pkt.description = item.GetDescription()
    pkt.pageText = item.GetPageText()
    pkt.languageID = item.GetLanguageID()
    pkt.pageMaterial = item.GetPageMaterial()
    pkt.startQuest = item.GetStartQuest()
    pkt.lockID = item.GetLockID()
    pkt.material = item.GetMaterial()
    pkt.sheath = item.GetSheath()
    pkt.randProp = item.GetRandomProperty()
    pkt.randSuff = item.GetRandomSuffix()
    pkt.block = item.GetBlock()
    pkt.itemSet = item.GetItemSet()
    pkt.maxDurab = item.GetMaxDurability()
    pkt.area = item.GetArea()
    pkt.map = item.GetMap()
    pkt.bagFam = item.GetBagFamily()
    pkt.totemCat = item.GetTotemCategory()
    //come back for socket
    pkt.socketBonus = item.GetSocketBonus()
    pkt.gemProp = item.GetGemProperties()
    pkt.reqDisSkill = item.GetRequiredDisenchantSkill()
    pkt.armorDmgMod = item.GetArmorDamageModifier()
    pkt.dur = item.GetDuration()
    pkt.itemLimitCat = item.GetItemLimitCategory()
    pkt.holidayID = item.GetHolidayID()
    pkt.scriptID = item.GetScriptID()
    pkt.disID = item.GetDisenchantID()
    pkt.foodType = item.GetFoodType()
    pkt.minMoneyLoot = item.GetMinMoneyLoot()
    pkt.maxMoneyLoot = item.GetMaxMoneyLoot()
    pkt.flagsCu = item.GetFlagsCu()
}

function updateItem(itemID: number, pkt: any) {//ItemUpdatePacket
    let item: TSItemTemplate = (itemID > 0) ? GetItemTemplate(itemID) : CreateItemTemplate(startID++, templateItemID)
    item.SetClass(pkt.class)
    item.SetSubClass(pkt.subclass)
    item.SetSoundOverrideSubclass(pkt.soundOverrideSubclass)
    item.SetName(pkt.name)
    item.SetDisplayInfoID(pkt.displayID)
    item.SetQuality(pkt.quality)
    item.SetFlags(pkt.flags)
    item.SetFlags2(pkt.flags2)
    item.SetBuyCount(pkt.buyCount)
    item.SetBuyPrice(pkt.buyPrice)
    item.SetSellPrice(pkt.sellPrice)
    item.SetInventoryType(pkt.invType)
    item.SetAllowableClass(pkt.allowClass)
    item.SetAllowableRace(pkt.allowRace)
    item.SetItemLevel(pkt.itemLevel)
    item.SetRequiredLevel(pkt.reqLevel)
    item.SetRequiredSkill(pkt.reqSkill)
    item.SetRequiredSkillRank(pkt.reqSkillRank)
    item.SetRequiredSpell(pkt.reqSpel)
    item.SetRequiredHonorRank(pkt.reqHonorRank)
    item.SetRequiredCityRank(pkt.reqCityRank)
    item.SetRequiredReputationFaction(pkt.reqRepFaction)
    item.SetRequiredReputationRank(pkt.reqRepRank)
    item.SetMaxCount(pkt.maxCount)
    item.SetStackable(pkt.stackable)
    item.SetContainerSlots(pkt.containerSlots)
    item.SetStatsCount(pkt.statsCount)
    //come back for stats
    item.SetScalingStatDistribution(pkt.scalingStatDist)
    item.SetScalingStatValue(pkt.scalingStatValue)
    item.SetDamageMinA(pkt.dmgMinA)
    item.SetDamageMaxA(pkt.dmgMaxA)
    item.SetDamageTypeA(pkt.dmgTypeA)
    item.SetDamageMinB(pkt.dmgMinB)
    item.SetDamageMaxB(pkt.dmgMaxb)
    item.SetDamageTypeB(pkt.dmgTypeB)
    item.SetArmor(pkt.armor)
    item.SetHolyRes(pkt.hRes)
    item.SetFireRes(pkt.fiRes)
    item.SetNatureRes(pkt.nRes)
    item.SetFrostRes(pkt.frRes)
    item.SetShadowRes(pkt.sRes)
    item.SetArcaneRes(pkt.aRes)
    item.SetDelay(pkt.delay)
    item.SetAmmoType(pkt.ammotype)
    item.SetRangedModRange(pkt.rangedModRange)
    //come back for spells
    item.SetBonding(pkt.bonding)
    item.SetDescription(pkt.description)
    item.SetPageText(pkt.pageText)
    item.SetLanguageID(pkt.languageID)
    item.SetPageMaterial(pkt.pageMaterial)
    item.SetStartQuest(pkt.startQuest)
    item.SetLockID(pkt.lockID)
    item.SetMaterial(pkt.material)
    item.SetSheath(pkt.sheath)
    item.SetRandomProperty(pkt.randProp)
    item.SetRandomSuffix(pkt.randSuff)
    item.SetBlock(pkt.block)
    item.SetItemSet(pkt.itemSet)
    item.SetMaxDurability(pkt.maxDurab)
    item.SetArea(pkt.area)
    item.SetMap(pkt.map)
    item.SetBagFamily(pkt.bagFam)
    item.SetTotemCategory(pkt.totemCat)
    //come back for socket
    item.SetSocketBonus(pkt.socketBonus)
    item.SetGemProperties(pkt.gemProp)
    item.SetRequiredDisenchantSkill(pkt.reqDisSkill)
    item.SetArmorDamageModifier(pkt.armorDmgMod)
    item.SetDuration(pkt.dur)
    item.SetItemLimitCategory(pkt.itemLimitCat)
    item.SetHolidayID(pkt.holidayID)
    item.SetScriptID(pkt.scriptID)
    item.SetDisenchantID(pkt.disID)
    item.SetFoodType(pkt.foodType)
    item.SetMinMoneyLoot(pkt.minMoneyLoot)
    item.SetMaxMoneyLoot(pkt.maxMoneyLoot)
    item.SetFlagsCu(pkt.flagsCu)
}