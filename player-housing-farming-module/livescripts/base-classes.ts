// ============================================================================
//
// - Base Classes -
//
//   This file creates the classes used for housing and farming
//
// - External scripts -
//   Livescripts: livescripts/*
//
// ============================================================================

function getRandNumber(min: number, max: number): number {
    return Math.floor((Math.random() * (max - min)) + min);
}

@CharactersTable
export class PlayerHouse extends DBEntry {
    @DBPrimaryKey
    playerGUID: uint64 = 0
    @DBField
    area: number = 0;
    open: bool = false;

    constructor(player: uint64) {
        super();
        this.playerGUID = player;
    }

    static get(player: TSPlayer): PlayerHouse {
        return player.GetObject('FarmingFarmData', LoadDBEntry(new PlayerHouse(player.GetGUID())))
    }

    Open(player: TSPlayer) {
        this.open = true;
        PlayerHouseCrops.get(player).forEach(x => x.Spawn(player));
        PlayerHouseGobs.get(player).forEach(x => x.Spawn(player));
        PlayerHouseCreatures.get(player).forEach(x => x.Spawn(player));
        player.SetPhaseMask(player.GetPhaseMask(), true, player.GetGUID());
    }

    Close(player: TSPlayer) {
        this.open = false;
        PlayerHouseCrops.get(player).forEach(x => x.Despawn(player.GetMap()));
        PlayerHouseGobs.get(player).forEach(x => x.Despawn(player.GetMap()));
        PlayerHouseCreatures.get(player).forEach(x => x.Spawn(player));
        player.SetPhaseMask(player.GetPhaseMask(), true, 0);
        if (!player.GetGroup().IsNull()) {
            player.GetGroup().GetMembers().forEach(x => {
                if (x.GetPhaseID() == player.GetGUID()) {
                    x.SetPhaseMask(x.GetPhaseMask(), true, 0);
                }
            })
        }
    }
}

@CharactersTable
export class PlayerHouseCrops extends DBArrayEntry {
    @DBPrimaryKey
    playerGUID: uint64 = 0
    @DBField
    x: float = 0;
    @DBField
    y: float = 0;
    @DBField
    z: float = 0;
    @DBField
    o: float = 0;
    @DBField
    spawnTime: uint64 = 0;
    @DBField
    type: number = 0;
    @DBField
    fertilizeMultiplier: float = 10.0;

    spawnMap: number = 0;
    spawnGuid: uint64 = 0;
    spawnedEntry: number = 0;

    constructor(playerGUID: uint64) {
        super();
        this.playerGUID = playerGUID;
    }

    Harvest(player: TSPlayer) {
        this.Despawn(player.GetMap());
        this.Delete()
        player.AddItem(CropTypes[this.type].harvestItem, getRandNumber(CropTypes[this.type].minHarvestItem, CropTypes[this.type].maxHarvestItem))
    }

    GetActiveGOEntry(): number {
        let type = CropTypes[this.type];
        let timeElapsed = (GetUnixTime() - this.spawnTime) * this.fertilizeMultiplier;
        return (timeElapsed > type.stage1GrowthTime) ? type.stage1Entry : type.stage0Entry
    }

    canGrow(player: TSPlayer) {
        let type = CropTypes[this.type];
        let timeElapsed = (GetUnixTime() - this.spawnTime) * this.fertilizeMultiplier;
        if (timeElapsed > type.stage1GrowthTime) {
            this.Despawn(player.GetMap())
            this.Spawn(player)
        }
    }

    Despawn(map: TSMap) {
        if (this.spawnGuid === 0 || this.spawnMap != map.GetMapID()) return;
        let go = map.GetGameObject(this.spawnGuid);
        if (!go.IsNull()) {
            go.RemoveFromWorld(true);
        }
        this.spawnGuid = 0;
        this.spawnMap = 0;
    }

    Spawn(player: TSPlayer) {
        if (this.spawnGuid != 0) {
            return;
        }
        let go = player.GetMap().SpawnGameObject(this.GetActiveGOEntry(), this.x, this.y, this.z, this.o)
        go.SetPhaseMask(1, true, player.GetGUID())
        this.spawnMap = player.GetMapID();
        this.spawnGuid = go.GetGUID();
        this.spawnedEntry = go.GetEntry();
    }

    static get(player: TSPlayer): DBContainer<PlayerHouseCrops> {
        return player.GetObject('FarmingCropData', LoadDBArrayEntry(PlayerHouseCrops, player.GetGUID()))
    }
}
export const CropSizes: TSDictionary<number, number> = CreateDictionary<number, number>({})
export const CropTypes: TSDictionary<number, CropType> = CreateDictionary<number, CropType>({})
export class CropType {
    stage0Entry: number
    stage1Entry: number
    stage1GrowthTime: number
    spellID: number
    harvestItem: number
    minHarvestItem: number
    maxHarvestItem: number

    constructor(res: TSDatabaseResult) {
        this.stage0Entry = res.GetUInt32(0);
        this.stage1Entry = res.GetUInt32(1);
        this.stage1GrowthTime = res.GetUInt32(2);
        this.spellID = res.GetUInt32(3);
        this.harvestItem = res.GetUInt32(4);
        this.minHarvestItem = res.GetUInt32(5);
        this.maxHarvestItem = res.GetUInt32(6);
    }
}

@CharactersTable
export class PlayerHouseGobs extends DBArrayEntry {
    constructor(playerGUID: uint64) {
        super();
        this.playerGUID = playerGUID;
    }
    @DBPrimaryKey
    playerGUID: uint64 = 0
    @DBField
    entry: float = 0;
    @DBField
    x: float = 0;
    @DBField
    y: float = 0;
    @DBField
    z: float = 0;
    @DBField
    o: float = 0;

    spawnMap: number = 0;
    spawnGuid: uint64 = 0;
    spawnedEntry: number = 0;

    Remove(map: TSMap) {
        this.Despawn(map)
        this.Delete()
    }

    Despawn(map: TSMap) {
        if (this.spawnGuid === 0 || this.spawnMap != map.GetMapID()) return;
        let go = map.GetGameObject(this.spawnGuid);
        if (!go.IsNull()) {
            go.RemoveFromWorld(false);
        }
        this.spawnGuid = 0;
        this.spawnMap = 0;
    }

    Spawn(player: TSPlayer) {
        if (this.spawnGuid != 0) {
            return;
        }
        let go = player.GetMap().SpawnGameObject(this.entry, this.x, this.y, this.z, this.o)
        go.SetPhaseMask(1, true, player.GetGUID())
        this.spawnMap = player.GetMapID();
        this.spawnGuid = go.GetGUID();
        this.spawnedEntry = go.GetEntry();
    }

    static get(player: TSPlayer): DBContainer<PlayerHouseGobs> {
        return player.GetObject('FarmingGobData', LoadDBArrayEntry(PlayerHouseGobs, player.GetGUID()))
    }
}

@CharactersTable
export class PlayerHouseCreatures extends DBArrayEntry {
    constructor(playerGUID: uint64) {
        super();
        this.playerGUID = playerGUID;
    }
    @DBPrimaryKey
    playerGUID: uint64 = 0
    @DBField
    entry: float = 0;
    @DBField
    x: float = 0;
    @DBField
    y: float = 0;
    @DBField
    z: float = 0;
    @DBField
    o: float = 0;

    spawnMap: number = 0;
    spawnGuid: uint64 = 0;
    spawnedEntry: number = 0;

    Despawn(map: TSMap) {
        if (this.spawnGuid === 0 || this.spawnMap != map.GetMapID()) return;
        let creature = map.GetCreature(this.spawnGuid);
        if (!creature.IsNull()) {
            creature.DespawnOrUnsummon(0);
        }
        this.spawnGuid = 0;
        this.spawnMap = 0;
    }

    Spawn(player: TSPlayer) {
        if (this.spawnGuid != 0) {
            return;
        }
        let creature = player.SpawnCreature(this.entry, this.x, this.y, this.z, this.o, 8, 0)
        creature.SetPhaseMask(1, true, player.GetGUID())
        this.spawnMap = player.GetMapID();
        this.spawnGuid = creature.GetGUID();
        this.spawnedEntry = creature.GetEntry();
    }

    static get(player: TSPlayer): DBContainer<PlayerHouseCreatures> {
        return player.GetObject('FarmingCreatureData', LoadDBArrayEntry(PlayerHouseCreatures, player.GetGUID())
        )
    }
}

export function SetupHouseInfo(events: TSEvents) {
    let q = QueryWorld('SELECT * from farming_crops')
    while (q.GetRow()) {
        CropTypes[q.GetUInt32(0)] = new CropType(q);
    }
    q = QueryWorld('SELECT * from farming_crops_size')
    while (q.GetRow()) {
        CropSizes[q.GetUInt32(0)] = q.GetUInt32(1);
    }

    events.Player.OnSave(player => {
        PlayerHouseCrops.get(player).Save();
        PlayerHouseGobs.get(player).Save();
        PlayerHouseCreatures.get(player).Save();
    })

}