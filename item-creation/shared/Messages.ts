export const itemCacheID = 25;
export class itemCache {
    entry: uint32 = 0;

    constructor(entry: uint32) {
        this.entry = entry;
    }

    read(read: TSPacketRead): void {
        this.entry = read.ReadUInt32();
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(itemCacheID, 0);
        packet.WriteUInt32(this.entry);
        return packet;
    }
}


export const itemRequestID = 27;
export class itemRequest {
    entry: uint32 = 0;

    constructor(entry: uint32) {
        this.entry = entry;
    }

    read(read: TSPacketRead): void {
        this.entry = read.ReadUInt32();
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(itemRequestID, 0);
        packet.WriteUInt32(this.entry);
        return packet;
    }
}

export const itemUpdateID = 26;
export class itemUpdatePacket {
    entry: int32 = 0;
    class: int32 = 0;
    subclass: int32 = 0;
    soundOverrideSubclass: int32 = 0;
    name: TSString = '';
    displayID: int32 = 0;
    quality: int32 = 0;
    flags: int32 = 0;
    flags2: int32 = 0;
    buyCount: int32 = 0;
    buyPrice: int32 = 0;
    sellPrice: int32 = 0;
    invType: int32 = 0;
    allowClass: int32 = 0;
    allowRace: int32 = 0;
    itemLevel: int32 = 0;
    reqLevel: int32 = 0;
    reqSkill: int32 = 0;
    reqSkillRank: int32 = 0;
    reqSpel: int32 = 0;
    reqHonorRank: int32 = 0;
    reqCityRank: int32 = 0;
    reqRepFaction: int32 = 0;
    reqRepRank: int32 = 0;
    maxCount: int32 = 0;
    stackable: int32 = 0;
    containerSlots: int32 = 0;
    statsCount: int32 = 0;
    statType1: int32 = 0;
    statValue1: int32 = 0;
    statType2: int32 = 0;
    statValue2: int32 = 0;
    statType3: int32 = 0;
    statValue3: int32 = 0;
    statType4: int32 = 0;
    statValue4: int32 = 0;
    statType5: int32 = 0;
    statValue5: int32 = 0;
    statType6: int32 = 0;
    statValue6: int32 = 0;
    statType7: int32 = 0;
    statValue7: int32 = 0;
    statType8: int32 = 0;
    statValue8: int32 = 0;
    statType9: int32 = 0;
    statValue9: int32 = 0;
    statType10: int32 = 0;
    statValue10: int32 = 0;
    scalingStatDist: int32 = 0;
    scalingStatValue: int32 = 0;
    dmgMinA: int32 = 0;
    dmgMaxA: int32 = 0;
    dmgTypeA: int32 = 0;
    dmgMinB: int32 = 0;
    dmgMaxb: int32 = 0;
    dmgTypeB: int32 = 0;
    armor: int32 = 0;
    hRes: int32 = 0;
    fiRes: int32 = 0;
    nRes: int32 = 0;
    frRes: int32 = 0;
    sRes: int32 = 0;
    aRes: int32 = 0;
    delay: int32 = 0;
    ammotype: int32 = 0;
    rangedModRange: int32 = 0;
    spellID1: int32 = 0;
    SpellTrigger1: int32 = 0;
    SpellCharges1: int32 = 0;
    SpellPPMRate1: int32 = 0;
    SpellCooldown1: int32 = 0;
    SpellCategory1: int32 = 0;
    SpellCategoryCooldown1: int32 = 0;
    spellID2: int32 = 0;
    SpellTrigger2: int32 = 0;
    SpellCharges2: int32 = 0;
    SpellPPMRate2: int32 = 0;
    SpellCooldown2: int32 = 0;
    SpellCategory2: int32 = 0;
    SpellCategoryCooldown2: int32 = 0;
    spellID3: int32 = 0;
    SpellTrigger3: int32 = 0;
    SpellCharges3: int32 = 0;
    SpellPPMRate3: int32 = 0;
    SpellCooldown3: int32 = 0;
    SpellCategory3: int32 = 0;
    SpellCategoryCooldown3: int32 = 0;
    spellID4: int32 = 0;
    SpellTrigger4: int32 = 0;
    SpellCharges4: int32 = 0;
    SpellPPMRate4: int32 = 0;
    SpellCooldown4: int32 = 0;
    SpellCategory4: int32 = 0;
    SpellCategoryCooldown4: int32 = 0;
    spellID5: int32 = 0;
    SpellTrigger5: int32 = 0;
    SpellCharges5: int32 = 0;
    SpellPPMRate5: int32 = 0;
    SpellCooldown5: int32 = 0;
    SpellCategory5: int32 = 0;
    SpellCategoryCooldown5: int32 = 0;
    bonding: int32 = 0;
    description: string = '';
    pageText: int32 = 0;
    languageID: int32 = 0;
    pageMaterial: int32 = 0;
    startQuest: int32 = 0;
    lockID: int32 = 0;
    material: int32 = 0;
    sheath: int32 = 0;
    randProp: int32 = 0;
    randSuff: int32 = 0;
    block: int32 = 0;
    itemSet: int32 = 0;
    maxDurability: int32 = 0;
    area: int32 = 0;
    map: int32 = 0;
    bagFam: int32 = 0;
    totemCat: int32 = 0;
    //come back for socket
    socketBonus: int32 = 0;
    gemProp: int32 = 0;
    reqDisSkill: int32 = 0;
    armorDmgMod: int32 = 0;
    duration: int32 = 0;
    itemLimitCat: int32 = 0;
    holidayID: int32 = 0;
    scriptID: int32 = 0;
    disID: int32 = 0;
    foodType: int32 = 0;
    minMoneyLoot: int32 = 0;
    maxMoneyLoot: int32 = 0;
    flagsCu: int32 = 0;

    constructor() { }

    read(read: TSPacketRead): void {
        this.entry = read.ReadInt32()
this.class = read.ReadInt32()
this.subclass = read.ReadInt32()
this.soundOverrideSubclass = read.ReadInt32()
this.name = read.ReadString()
this.displayID = read.ReadInt32()
this.quality = read.ReadInt32()
this.flags = read.ReadInt32()
this.flags2 = read.ReadInt32()
this.buyCount = read.ReadInt32()
this.buyPrice = read.ReadInt32()
this.sellPrice = read.ReadInt32()
this.invType = read.ReadInt32()
this.allowClass = read.ReadInt32()
this.allowRace = read.ReadInt32()
this.itemLevel = read.ReadInt32()
this.reqLevel = read.ReadInt32()
this.reqSkill = read.ReadInt32()
this.reqSkillRank = read.ReadInt32()
this.reqSpel = read.ReadInt32()
this.reqHonorRank = read.ReadInt32()
this.reqCityRank = read.ReadInt32()
this.reqRepFaction = read.ReadInt32()
this.reqRepRank = read.ReadInt32()
this.maxCount = read.ReadInt32()
this.stackable = read.ReadInt32()
this.containerSlots = read.ReadInt32()
this.statsCount = read.ReadInt32()
this.statType1 = read.ReadInt32()
this.statValue1 = read.ReadInt32()
this.statType2 = read.ReadInt32()
this.statValue2 = read.ReadInt32()
this.statType3 = read.ReadInt32()
this.statValue3 = read.ReadInt32()
this.statType4 = read.ReadInt32()
this.statValue4 = read.ReadInt32()
this.statType5 = read.ReadInt32()
this.statValue5 = read.ReadInt32()
this.statType6 = read.ReadInt32()
this.statValue6 = read.ReadInt32()
this.statType7 = read.ReadInt32()
this.statValue7 = read.ReadInt32()
this.statType8 = read.ReadInt32()
this.statValue8 = read.ReadInt32()
this.statType9 = read.ReadInt32()
this.statValue9 = read.ReadInt32()
this.statType10 = read.ReadInt32()
this.statValue10 = read.ReadInt32()
this.scalingStatDist = read.ReadInt32()
this.scalingStatValue = read.ReadInt32()
this.dmgMinA = read.ReadInt32()
this.dmgMaxA = read.ReadInt32()
this.dmgTypeA = read.ReadInt32()
this.dmgMinB = read.ReadInt32()
this.dmgMaxb = read.ReadInt32()
this.dmgTypeB = read.ReadInt32()
this.armor = read.ReadInt32()
this.hRes = read.ReadInt32()
this.fiRes = read.ReadInt32()
this.nRes = read.ReadInt32()
this.frRes = read.ReadInt32()
this.sRes = read.ReadInt32()
this.aRes = read.ReadInt32()
this.delay = read.ReadInt32()
this.ammotype = read.ReadInt32()
this.rangedModRange = read.ReadInt32()
this.spellID1 = read.ReadInt32()
this.SpellTrigger1 = read.ReadInt32()
this.SpellCharges1 = read.ReadInt32()
this.SpellPPMRate1 = read.ReadInt32()
this.SpellCooldown1 = read.ReadInt32()
this.SpellCategory1 = read.ReadInt32()
this.SpellCategoryCooldown1 = read.ReadInt32()
this.spellID2 = read.ReadInt32()
this.SpellTrigger2 = read.ReadInt32()
this.SpellCharges2 = read.ReadInt32()
this.SpellPPMRate2 = read.ReadInt32()
this.SpellCooldown2 = read.ReadInt32()
this.SpellCategory2 = read.ReadInt32()
this.SpellCategoryCooldown2 = read.ReadInt32()
this.spellID3 = read.ReadInt32()
this.SpellTrigger3 = read.ReadInt32()
this.SpellCharges3 = read.ReadInt32()
this.SpellPPMRate3 = read.ReadInt32()
this.SpellCooldown3 = read.ReadInt32()
this.SpellCategory3 = read.ReadInt32()
this.SpellCategoryCooldown3 = read.ReadInt32()
this.spellID4 = read.ReadInt32()
this.SpellTrigger4 = read.ReadInt32()
this.SpellCharges4 = read.ReadInt32()
this.SpellPPMRate4 = read.ReadInt32()
this.SpellCooldown4 = read.ReadInt32()
this.SpellCategory4 = read.ReadInt32()
this.SpellCategoryCooldown4 = read.ReadInt32()
this.spellID5 = read.ReadInt32()
this.SpellTrigger5 = read.ReadInt32()
this.SpellCharges5 = read.ReadInt32()
this.SpellPPMRate5 = read.ReadInt32()
this.SpellCooldown5 = read.ReadInt32()
this.SpellCategory5 = read.ReadInt32()
this.SpellCategoryCooldown5 = read.ReadInt32()
this.bonding = read.ReadInt32()
this.description = read.ReadString()
this.pageText = read.ReadInt32()
this.languageID = read.ReadInt32()
this.pageMaterial = read.ReadInt32()
this.startQuest = read.ReadInt32()
this.lockID = read.ReadInt32()
this.material = read.ReadInt32()
this.sheath = read.ReadInt32()
this.randProp = read.ReadInt32()
this.randSuff = read.ReadInt32()
this.block = read.ReadInt32()
this.itemSet = read.ReadInt32()
this.maxDurability = read.ReadInt32()
this.area = read.ReadInt32()
this.map = read.ReadInt32()
this.bagFam = read.ReadInt32()
this.totemCat = read.ReadInt32()
//come back for sockets
this.socketBonus = read.ReadInt32()
this.gemProp = read.ReadInt32()
this.reqDisSkill = read.ReadInt32()
this.armorDmgMod = read.ReadInt32()
this.duration = read.ReadInt32()
this.itemLimitCat = read.ReadInt32()
this.holidayID = read.ReadInt32()
this.scriptID = read.ReadInt32()
this.disID = read.ReadInt32()
this.foodType = read.ReadInt32()
this.minMoneyLoot = read.ReadInt32()
this.maxMoneyLoot = read.ReadInt32()
this.flagsCu = read.ReadInt32()
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(itemUpdateID, 0);
        packet.WriteInt32(this.entry)
packet.WriteInt32(this.class)
packet.WriteInt32(this.subclass)
packet.WriteInt32(this.soundOverrideSubclass)
packet.WriteString(this.name)
packet.WriteInt32(this.displayID)
packet.WriteInt32(this.quality)
packet.WriteInt32(this.flags)
packet.WriteInt32(this.flags2)
packet.WriteInt32(this.buyCount)
packet.WriteInt32(this.buyPrice)
packet.WriteInt32(this.sellPrice)
packet.WriteInt32(this.invType)
packet.WriteInt32(this.allowClass)
packet.WriteInt32(this.allowRace)
packet.WriteInt32(this.itemLevel)
packet.WriteInt32(this.reqLevel)
packet.WriteInt32(this.reqSkill)
packet.WriteInt32(this.reqSkillRank)
packet.WriteInt32(this.reqSpel)
packet.WriteInt32(this.reqHonorRank)
packet.WriteInt32(this.reqCityRank)
packet.WriteInt32(this.reqRepFaction)
packet.WriteInt32(this.reqRepRank)
packet.WriteInt32(this.maxCount)
packet.WriteInt32(this.stackable)
packet.WriteInt32(this.containerSlots)
packet.WriteInt32(this.statsCount)
packet.WriteInt32(this.statType1)
packet.WriteInt32(this.statValue1)
packet.WriteInt32(this.statType2)
packet.WriteInt32(this.statValue2)
packet.WriteInt32(this.statType3)
packet.WriteInt32(this.statValue3)
packet.WriteInt32(this.statType4)
packet.WriteInt32(this.statValue4)
packet.WriteInt32(this.statType5)
packet.WriteInt32(this.statValue5)
packet.WriteInt32(this.statType6)
packet.WriteInt32(this.statValue6)
packet.WriteInt32(this.statType7)
packet.WriteInt32(this.statValue7)
packet.WriteInt32(this.statType8)
packet.WriteInt32(this.statValue8)
packet.WriteInt32(this.statType9)
packet.WriteInt32(this.statValue9)
packet.WriteInt32(this.statType10)
packet.WriteInt32(this.statValue10)
packet.WriteInt32(this.scalingStatDist)
packet.WriteInt32(this.scalingStatValue)
packet.WriteInt32(this.dmgMinA)
packet.WriteInt32(this.dmgMaxA)
packet.WriteInt32(this.dmgTypeA)
packet.WriteInt32(this.dmgMinB)
packet.WriteInt32(this.dmgMaxb)
packet.WriteInt32(this.dmgTypeB)
packet.WriteInt32(this.armor)
packet.WriteInt32(this.hRes)
packet.WriteInt32(this.fiRes)
packet.WriteInt32(this.nRes)
packet.WriteInt32(this.frRes)
packet.WriteInt32(this.sRes)
packet.WriteInt32(this.aRes)
packet.WriteInt32(this.delay)
packet.WriteInt32(this.ammotype)
packet.WriteInt32(this.rangedModRange)
packet.WriteInt32(this.spellID1)
packet.WriteInt32(this.SpellTrigger1)
packet.WriteInt32(this.SpellCharges1)
packet.WriteInt32(this.SpellPPMRate1)
packet.WriteInt32(this.SpellCooldown1)
packet.WriteInt32(this.SpellCategory1)
packet.WriteInt32(this.SpellCategoryCooldown1)
packet.WriteInt32(this.spellID2)
packet.WriteInt32(this.SpellTrigger2)
packet.WriteInt32(this.SpellCharges2)
packet.WriteInt32(this.SpellPPMRate2)
packet.WriteInt32(this.SpellCooldown2)
packet.WriteInt32(this.SpellCategory2)
packet.WriteInt32(this.SpellCategoryCooldown2)
packet.WriteInt32(this.spellID3)
packet.WriteInt32(this.SpellTrigger3)
packet.WriteInt32(this.SpellCharges3)
packet.WriteInt32(this.SpellPPMRate3)
packet.WriteInt32(this.SpellCooldown3)
packet.WriteInt32(this.SpellCategory3)
packet.WriteInt32(this.SpellCategoryCooldown3)
packet.WriteInt32(this.spellID4)
packet.WriteInt32(this.SpellTrigger4)
packet.WriteInt32(this.SpellCharges4)
packet.WriteInt32(this.SpellPPMRate4)
packet.WriteInt32(this.SpellCooldown4)
packet.WriteInt32(this.SpellCategory4)
packet.WriteInt32(this.SpellCategoryCooldown4)
packet.WriteInt32(this.spellID5)
packet.WriteInt32(this.SpellTrigger5)
packet.WriteInt32(this.SpellCharges5)
packet.WriteInt32(this.SpellPPMRate5)
packet.WriteInt32(this.SpellCooldown5)
packet.WriteInt32(this.SpellCategory5)
packet.WriteInt32(this.SpellCategoryCooldown5)
packet.WriteInt32(this.bonding)
packet.WriteString(this.description)
packet.WriteInt32(this.pageText)
packet.WriteInt32(this.languageID)
packet.WriteInt32(this.pageMaterial)
packet.WriteInt32(this.startQuest)
packet.WriteInt32(this.lockID)
packet.WriteInt32(this.material)
packet.WriteInt32(this.sheath)
packet.WriteInt32(this.randProp)
packet.WriteInt32(this.randSuff)
packet.WriteInt32(this.block)
packet.WriteInt32(this.itemSet)
packet.WriteInt32(this.maxDurability)
packet.WriteInt32(this.area)
packet.WriteInt32(this.map)
packet.WriteInt32(this.bagFam)
packet.WriteInt32(this.totemCat)
//sockets
packet.WriteInt32(this.socketBonus)
packet.WriteInt32(this.gemProp)
packet.WriteInt32(this.reqDisSkill)
packet.WriteInt32(this.armorDmgMod)
packet.WriteInt32(this.duration)
packet.WriteInt32(this.itemLimitCat)
packet.WriteInt32(this.holidayID)
packet.WriteInt32(this.scriptID)
packet.WriteInt32(this.disID)
packet.WriteInt32(this.foodType)
packet.WriteInt32(this.minMoneyLoot)
packet.WriteInt32(this.maxMoneyLoot)
packet.WriteInt32(this.flagsCu)
        return packet;
    }
}