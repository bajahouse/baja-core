import { std } from "wow/wotlk";
import { MODNAME } from "../modname";

export let baseMap = std.Maps.create(MODNAME, 'basemap')
    .Type.PLAIN.set()
    .Name.enGB.set('Starting Map')
    .MinimapIconScale.set(1)
    .Directory.set('stormwind')

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
    