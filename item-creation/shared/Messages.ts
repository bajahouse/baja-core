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

export const itemUpdateID = 26;
export class itemUpdatePacket {
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
    //come back for stats
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
    //come back for spells
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
    maxDurab: int32 = 0;
    area: int32 = 0;
    map: int32 = 0;
    bagFam: int32 = 0;
    totemCat: int32 = 0;
    //come back for socket
    socketBonus: int32 = 0;
    gemProp: int32 = 0;
    reqDisSkill: int32 = 0;
    armorDmgMod: int32 = 0;
    dur: int32 = 0;
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
        //come back for stats                                         = read.ReadInt32()
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
        //come back for spells                                        = read.ReadInt32()
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
        this.maxDurab = read.ReadInt32()
        this.area = read.ReadInt32()
        this.map = read.ReadInt32()
        this.bagFam = read.ReadInt32()
        this.totemCat = read.ReadInt32()
        //come back for socket
        this.socketBonus = read.ReadInt32()
        this.gemProp = read.ReadInt32()
        this.reqDisSkill = read.ReadInt32()
        this.armorDmgMod = read.ReadInt32()
        this.dur = read.ReadInt32()
        this.itemLimitCat = read.ReadInt32()
        this.holidayID = read.ReadInt32()
        this.scriptID = read.ReadInt32()
        this.disID = read.ReadInt32()
        this.minMoneyLoot = read.ReadInt32()
        this.maxMoneyLoot = read.ReadInt32()
        this.flagsCu = read.ReadInt32()
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(itemUpdateID, 0);
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
        packet.WriteInt32(this.scalingStatDist)
        //come back for stats

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
        packet.WriteInt32(this.bonding)
        //come back for spells
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
        packet.WriteInt32(this.maxDurab)
        packet.WriteInt32(this.area)
        packet.WriteInt32(this.map)
        packet.WriteInt32(this.bagFam)
        packet.WriteInt32(this.totemCat)
        packet.WriteInt32(this.socketBonus)
        //come back for socket
        packet.WriteInt32(this.gemProp)
        packet.WriteInt32(this.reqDisSkill)
        packet.WriteInt32(this.armorDmgMod)
        packet.WriteInt32(this.dur)
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