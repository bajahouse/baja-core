@CharactersTable
export class PlayerFarm extends DBEntry {
    constructor(player: uint64) {
        super();
        this.player = player;
    }
    @DBPrimaryKey
    player: uint64 = 0
    @DBField
    area: uint32 = 0;
    open: bool = false;

    static get(player: TSPlayer): PlayerFarm {
        return player.GetObject('FarmData', LoadDBEntry(new PlayerFarm(player.GetGUID())))
    }

    Open(player: TSPlayer) {
        this.open = true;
        PlayerCrops.get(player).forEach(x => x.Spawn(player));
        PlayerGobs.get(player).forEach(x => x.Spawn(player));
        PlayerCreatures.get(player).forEach(x => x.Spawn(player));
        player.SetPhaseMask(player.GetPhaseMask(), true, player.GetGUID());
    }

    Close(player: TSPlayer) {
        this.open = false;
        PlayerCrops.get(player).forEach(x => x.Despawn(player.GetMap()));
        PlayerGobs.get(player).forEach(x => x.Despawn(player.GetMap()));
        PlayerCreatures.get(player).forEach(x => x.Spawn(player));
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
export class PlayerCrops extends DBArrayEntry {
    constructor(player: uint64) {
        super();
        this.player = player;
    }

    @DBPrimaryKey
    player: uint64 = 0
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
    type: uint32 = 0;

    spawnMap: uint32 = 0;
    spawnGuid: uint64 = 0;
    spawnedEntry: uint32 = 0;

    GetActiveGOEntry(): uint32 {
        let type = CropTypes[this.type];
        let timeElapsed = GetUnixTime() - this.spawnTime;
        return (timeElapsed > type.stage1Growth) ? type.stage1Go : type.stage0Go
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
        let go = player.GetMap().SpawnGameObject(this.GetActiveGOEntry(), this.x, this.y, this.z, this.o)
        go.SetPhaseMask(1, true, player.GetGUID())
        this.spawnMap = player.GetMapID();
        this.spawnGuid = go.GetGUID();
        this.spawnedEntry = go.GetEntry();
    }

    static get(player: TSPlayer): DBContainer<PlayerCrops> {
        return player.GetObject(
            'CropData'
            , LoadDBArrayEntry(PlayerCrops, player.GetGUID())
        )
    }
}

export const CropTypes = CreateDictionary<uint32, CropType>({})
export class CropType {

    stage0Go: uint32
    stage1Go: uint32
    stage1Growth: uint32
    spell: uint32
    item: uint32

    constructor(res: TSDatabaseResult) {
        this.stage0Go = res.GetUInt32(1);
        this.stage1Go = res.GetUInt32(2);
        this.stage1Growth = res.GetUInt32(4);
        this.spell = res.GetUInt32(6);
        this.item = res.GetUInt32(7);
    }
}

export function RegisterFarmingInfo(events: TSEvents) {
    let q = QueryWorld('SELECT * from farming_crops')
    while (q.GetRow()) {
        CropTypes[q.GetUInt32(0)] = new CropType(q);
    }

    events.Player.OnSave(player => {
        PlayerCrops.get(player).Save();
        PlayerGobs.get(player).Save();
        PlayerCreatures.get(player).Save();
    })


    GetIDTag('farming-mod', 'plant-crop-spell').forEach(x => {
        events.SpellID.OnCast(x, spell => {
            let player = spell.GetCaster().ToPlayer();
            if (player.IsNull()) return;
            if (PlayerFarm.get(player).area != player.GetAreaID() && player.GetPhaseID() != player.GetGUID()) {
                player.SendBroadcastMessage(`You can only use this in your own farm!`)
                return
            }
            let cropData = PlayerCrops.get(player);
            if (cropData.Size() > 10) {
                player.SendBroadcastMessage(`You already have more than 10 crops active!`);
                return;
            }
            let crop = cropData.Add(new PlayerCrops(player.GetGUID()))
            crop.x = player.GetX();
            crop.y = player.GetY();
            crop.z = player.GetZ();
            crop.o = player.GetO();
            crop.spawnTime = GetUnixTime();
            crop.type = spell.GetSpellInfo().GetPriority();
            crop.MarkDirty();
            crop.Spawn(player)
        });
    })

    GetIDTag('farming-mod', 'plant-gob-spell').forEach(x => {
        events.SpellID.OnCast(x, spell => {
            let player = spell.GetCaster().ToPlayer();
            if (player.IsNull()) return;
            if (PlayerFarm.get(player).area != player.GetAreaID() && player.GetPhaseID() != player.GetGUID()) {
                player.SendBroadcastMessage(`You can only use this in your own farm!`)
                return
            }
            let gobData = PlayerGobs.get(player);
            let gob = gobData.Add(new PlayerGobs(player.GetGUID()))
            gob.entry = spell.GetSpellInfo().GetPriority();
            gob.x = spell.GetTargetDest().x
            gob.y = spell.GetTargetDest().y
            gob.z = spell.GetTargetDest().z
            gob.o = player.GetO();
            gob.MarkDirty();
            gob.Spawn(player)
        });
    })

    GetIDTag('farming-mod', 'plant-creature-spell').forEach(x => {
        events.SpellID.OnCast(x, spell => {
            let player = spell.GetCaster().ToPlayer();
            if (player.IsNull()) return;
            if (PlayerFarm.get(player).area != player.GetAreaID() && player.GetPhaseID() != player.GetGUID()) {
                player.SendBroadcastMessage(`You can only use this in your own farm!`)
                return
            }
            let creatureData = PlayerCreatures.get(player);
            let creature = creatureData.Add(new PlayerCreatures(player.GetGUID()))
            creature.entry = spell.GetSpellInfo().GetPriority();
            creature.x = player.GetX();
            creature.y = player.GetY();
            creature.z = player.GetZ();
            creature.o = player.GetO();
            creature.MarkDirty();
            creature.Spawn(player)
        });
    })
}

@CharactersTable
export class PlayerGobs extends DBArrayEntry {
    constructor(player: uint64) {
        super();
        this.player = player;
    }
    @DBPrimaryKey
    player: uint64 = 0
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

    spawnMap: uint32 = 0;
    spawnGuid: uint64 = 0;
    spawnedEntry: uint32 = 0;

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

    static get(player: TSPlayer): DBContainer<PlayerGobs> {
        return player.GetObject('GobData', LoadDBArrayEntry(PlayerGobs, player.GetGUID()))
    }
}

@CharactersTable
export class PlayerCreatures extends DBArrayEntry {
    constructor(player: uint64) {
        super();
        this.player = player;
    }
    @DBPrimaryKey
    player: uint64 = 0
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

    spawnMap: uint32 = 0;
    spawnGuid: uint64 = 0;
    spawnedEntry: uint32 = 0;

    Despawn(map: TSMap) {
        if (this.spawnGuid === 0 || this.spawnMap != map.GetMapID()) return;
        let go = map.GetCreature(this.spawnGuid);
        if (!go.IsNull()) {
            go.DespawnOrUnsummon(0);
        }
        this.spawnGuid = 0;
        this.spawnMap = 0;
    }

    Spawn(player: TSPlayer) {
        if (this.spawnGuid != 0) {
            return;
        }
        let go = player.GetMap().SpawnCreature(this.entry, this.x, this.y, this.z, this.o)
        go.SetPhaseMask(1, true, player.GetGUID())
        this.spawnMap = player.GetMapID();
        this.spawnGuid = go.GetGUID();
        this.spawnedEntry = go.GetEntry();
    }

    static get(player: TSPlayer): DBContainer<PlayerCreatures> {
        return player.GetObject('CreatureData', LoadDBArrayEntry(PlayerCreatures, player.GetGUID())
        )
    }
}