import { std } from "wow/wotlk";
import { MODNAME } from "../modname";

export let baseMap = std.Maps.create(MODNAME, 'basemap')
    .Type.PLAIN.set()
    .Name.enGB.set('Starting Map')
    .MinimapIconScale.set(1)
    .Directory.set('dungeonbasemap')

std.DBC.MapDifficulty.add(1000)
    .MapID.set(baseMap.ID)
    .Difficulty.set(0)
    .Message.enGB.set(" ")
    .RaidDuration.set(0)
    .MaxPlayers.set(0)
    .Difficultystring.set(" ");
std.SQL.game_tele
    .add(1451)
    .position_x.set(-8750.45)
    .position_y.set(-74.6418)
    .position_z.set(31.1351)
    .map.set(baseMap.ID)
    .name.set("dungeonStartArea");
    
    export let dungeonStartObj = std.GameObjectTemplates.Rituals.create(
        MODNAME,
        "dungeonstartobj",
        177193
    );
    dungeonStartObj.Name.enGB.set("Mystical Starting Stone");
    dungeonStartObj.Spawns.add(MODNAME, 'dungeon-start-spawn', { map: baseMap.ID, x: -8739.3, y: -62.6, z: 31.14, o: 4.13 });