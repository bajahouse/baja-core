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

import { itemClassInfo, qualityMultiplier, statCounts, statChoices, statToWeight, armorScalar, baseNameDict, displayDict, prefixPostfixArray, getRandNumber } from "./const-creations";
import { itemRequest, itemRequestID, itemUpdateID, itemUpdatePacket } from "../../shared/Messages";

let startID = 200000
const templateItemID = 38
//dont touch

export function itemCreationSetup(events: TSEvents) {
    setupStartingID()
    setupBaseNameDict()
    setupPrefixPostfixDict()
    setupDisplayIDDict()

    events.CustomPacket.OnReceive(itemUpdateID, (opcode, packet, player) => {
        let pkt = new itemUpdatePacket()
        pkt.read(packet)
        updateItem(pkt)
    })
    events.CustomPacket.OnReceive(itemRequestID, (opcode, packet, player) => {
        let pkt = new itemRequest(0)
        pkt.read(packet)
        createItemPacket(pkt.entry).write().SendToPlayer(player)
    })
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
    let pkt: itemUpdatePacket = new itemUpdatePacket()
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
    pkt.statType1 = item.GetStatType(0)
    pkt.statValue1 = item.GetStatValue(0)
    pkt.statType2 = item.GetStatType(1)
    pkt.statValue2 = item.GetStatValue(1)
    pkt.statType3 = item.GetStatType(2)
    pkt.statValue3 = item.GetStatValue(2)
    pkt.statType4 = item.GetStatType(3)
    pkt.statValue4 = item.GetStatValue(3)
    pkt.statType5 = item.GetStatType(4)
    pkt.statValue5 = item.GetStatValue(4)
    pkt.statType6 = item.GetStatType(5)
    pkt.statValue6 = item.GetStatValue(5)
    pkt.statType7 = item.GetStatType(6)
    pkt.statValue7 = item.GetStatValue(6)
    pkt.statType8 = item.GetStatType(7)
    pkt.statValue8 = item.GetStatValue(7)
    pkt.statType9 = item.GetStatType(8)
    pkt.statValue9 = item.GetStatValue(8)
    pkt.statType10 = item.GetStatType(9)
    pkt.statValue10 = item.GetStatValue(9)
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
    pkt.spellID1 = item.GetSpellID(0)
    pkt.SpellTrigger1 = item.GetSpellTrigger(0)
    pkt.SpellCharges1 = item.GetSpellCharges(0)
    pkt.SpellPPMRate1 = item.GetSpellPPMRate(0)
    pkt.SpellCooldown1 = item.GetSpellCooldown(0)
    pkt.SpellCategory1 = item.GetSpellCategory(0)
    pkt.SpellCategoryCooldown1 = item.GetSpellCategoryCooldown(0)
    pkt.spellID2 = item.GetSpellID(1)
    pkt.SpellTrigger2 = item.GetSpellTrigger(1)
    pkt.SpellCharges2 = item.GetSpellCharges(1)
    pkt.SpellPPMRate2 = item.GetSpellPPMRate(1)
    pkt.SpellCooldown2 = item.GetSpellCooldown(1)
    pkt.SpellCategory2 = item.GetSpellCategory(1)
    pkt.SpellCategoryCooldown2 = item.GetSpellCategoryCooldown(1)
    pkt.spellID3 = item.GetSpellID(2)
    pkt.SpellTrigger3 = item.GetSpellTrigger(2)
    pkt.SpellCharges3 = item.GetSpellCharges(2)
    pkt.SpellPPMRate3 = item.GetSpellPPMRate(2)
    pkt.SpellCooldown3 = item.GetSpellCooldown(2)
    pkt.SpellCategory3 = item.GetSpellCategory(2)
    pkt.SpellCategoryCooldown3 = item.GetSpellCategoryCooldown(2)
    pkt.spellID4 = item.GetSpellID(3)
    pkt.SpellTrigger4 = item.GetSpellTrigger(3)
    pkt.SpellCharges4 = item.GetSpellCharges(3)
    pkt.SpellPPMRate4 = item.GetSpellPPMRate(3)
    pkt.SpellCooldown4 = item.GetSpellCooldown(3)
    pkt.SpellCategory4 = item.GetSpellCategory(3)
    pkt.SpellCategoryCooldown4 = item.GetSpellCategoryCooldown(3)
    pkt.spellID5 = item.GetSpellID(4)
    pkt.SpellTrigger5 = item.GetSpellTrigger(4)
    pkt.SpellCharges5 = item.GetSpellCharges(4)
    pkt.SpellPPMRate5 = item.GetSpellPPMRate(4)
    pkt.SpellCooldown5 = item.GetSpellCooldown(4)
    pkt.SpellCategory5 = item.GetSpellCategory(4)
    pkt.SpellCategoryCooldown5 = item.GetSpellCategoryCooldown(4)
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
    pkt.maxDurability = item.GetMaxDurability()
    pkt.area = item.GetArea()
    pkt.map = item.GetMap()
    pkt.bagFam = item.GetBagFamily()
    pkt.totemCat = item.GetTotemCategory()
    //come back for socket
    pkt.socketBonus = item.GetSocketBonus()
    pkt.gemProp = item.GetGemProperties()
    pkt.reqDisSkill = item.GetRequiredDisenchantSkill()
    pkt.armorDmgMod = item.GetArmorDamageModifier()
    pkt.duration = item.GetDuration()
    pkt.itemLimitCat = item.GetItemLimitCategory()
    pkt.holidayID = item.GetHolidayID()
    pkt.scriptID = item.GetScriptID()
    pkt.disID = item.GetDisenchantID()
    pkt.foodType = item.GetFoodType()
    pkt.minMoneyLoot = item.GetMinMoneyLoot()
    pkt.maxMoneyLoot = item.GetMaxMoneyLoot()
    pkt.flagsCu = item.GetFlagsCu()
    return pkt
}

function updateItem(pkt: itemUpdatePacket) {
    let item: TSItemTemplate = (pkt.entry > 0) ? GetItemTemplate(pkt.entry) : CreateItemTemplate(startID++, templateItemID)
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
    item.SetStatType(0, pkt.statType1)
    item.SetStatValue(0, pkt.statValue1)
    item.SetStatType(1, pkt.statType2)
    item.SetStatValue(1, pkt.statValue2)
    item.SetStatType(2, pkt.statType3)
    item.SetStatValue(2, pkt.statValue3)
    item.SetStatType(3, pkt.statType4)
    item.SetStatValue(3, pkt.statValue4)
    item.SetStatType(4, pkt.statType5)
    item.SetStatValue(4, pkt.statValue5)
    item.SetStatType(5, pkt.statType6)
    item.SetStatValue(5, pkt.statValue6)
    item.SetStatType(6, pkt.statType7)
    item.SetStatValue(6, pkt.statValue7)
    item.SetStatType(7, pkt.statType8)
    item.SetStatValue(7, pkt.statValue8)
    item.SetStatType(8, pkt.statType9)
    item.SetStatValue(8, pkt.statValue9)
    item.SetStatType(9, pkt.statType10)
    item.SetStatValue(9, pkt.statValue10)
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
    item.SetSpellID(0, pkt.spellID1)
    item.SetSpellTrigger(0, pkt.SpellTrigger1)
    item.SetSpellCharges(0, pkt.SpellCharges1)
    item.SetSpellPPMRate(0, pkt.SpellPPMRate1)
    item.SetSpellCooldown(0, pkt.SpellCooldown1)
    item.SetSpellCategory(0, pkt.SpellCategory1)
    item.SetSpellCategoryCooldown(0, pkt.SpellCategoryCooldown1)
    item.SetSpellID(1, pkt.spellID2)
    item.SetSpellTrigger(1, pkt.SpellTrigger2)
    item.SetSpellCharges(1, pkt.SpellCharges2)
    item.SetSpellPPMRate(1, pkt.SpellPPMRate2)
    item.SetSpellCooldown(1, pkt.SpellCooldown2)
    item.SetSpellCategory(1, pkt.SpellCategory2)
    item.SetSpellCategoryCooldown(1, pkt.SpellCategoryCooldown2)
    item.SetSpellID(2, pkt.spellID3)
    item.SetSpellTrigger(2, pkt.SpellTrigger3)
    item.SetSpellCharges(2, pkt.SpellCharges3)
    item.SetSpellPPMRate(2, pkt.SpellPPMRate3)
    item.SetSpellCooldown(2, pkt.SpellCooldown3)
    item.SetSpellCategory(2, pkt.SpellCategory3)
    item.SetSpellCategoryCooldown(2, pkt.SpellCategoryCooldown3)
    item.SetSpellID(3, pkt.spellID4)
    item.SetSpellTrigger(3, pkt.SpellTrigger4)
    item.SetSpellCharges(3, pkt.SpellCharges4)
    item.SetSpellPPMRate(3, pkt.SpellPPMRate4)
    item.SetSpellCooldown(3, pkt.SpellCooldown4)
    item.SetSpellCategory(3, pkt.SpellCategory4)
    item.SetSpellCategoryCooldown(3, pkt.SpellCategoryCooldown4)
    item.SetSpellID(4, pkt.spellID5)
    item.SetSpellTrigger(4, pkt.SpellTrigger5)
    item.SetSpellCharges(4, pkt.SpellCharges5)
    item.SetSpellPPMRate(4, pkt.SpellPPMRate5)
    item.SetSpellCooldown(4, pkt.SpellCooldown5)
    item.SetSpellCategory(4, pkt.SpellCategory5)
    item.SetSpellCategoryCooldown(4, pkt.SpellCategoryCooldown5)
    item.SetBonding(pkt.bonding)
    //item.SetDescription(pkt.description)
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
    item.SetMaxDurability(pkt.maxDurability)
    item.SetArea(pkt.area)
    item.SetMap(pkt.map)
    item.SetBagFamily(pkt.bagFam)
    item.SetTotemCategory(pkt.totemCat)
    //come back for socket
    item.SetSocketBonus(pkt.socketBonus)
    item.SetGemProperties(pkt.gemProp)
    item.SetRequiredDisenchantSkill(pkt.reqDisSkill)
    item.SetArmorDamageModifier(pkt.armorDmgMod)
    item.SetDuration(pkt.duration)
    item.SetItemLimitCategory(pkt.itemLimitCat)
    item.SetHolidayID(pkt.holidayID)
    item.SetScriptID(pkt.scriptID)
    item.SetDisenchantID(pkt.disID)
    item.SetFoodType(pkt.foodType)
    item.SetMinMoneyLoot(pkt.minMoneyLoot)
    item.SetMaxMoneyLoot(pkt.maxMoneyLoot)
    item.SetFlagsCu(pkt.flagsCu)
}