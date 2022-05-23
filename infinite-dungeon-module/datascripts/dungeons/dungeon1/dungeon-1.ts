import { std } from "wow/wotlk";
import { MODNAME } from "../../modname";
import { baseMap } from "../base-map";

export let dungMap = std.Maps.create(MODNAME, 'dungeon-1').Type.DUNGEON.set(MODNAME, 'dungeon-1').MaxPlayers.set(5).Flags.set(13).CorpseMap.set(baseMap.ID).CorpsePos.set({ x: 900, y: 150 }).Name.enGB.set('dungeon')

std.SQL.instance_template.add(dungMap.ID).parent.set(baseMap.ID).script.set('')
std.DBC.MapDifficulty.add(1001)
    .MapID.set(dungMap.ID)
    .Difficulty.set(0)
    .Message.enGB.set(" ")
    .RaidDuration.set(0)
    .MaxPlayers.set(5)
    .Difficultystring.set(" ");
std.DBC.MapDifficulty.add(1002)
    .MapID.set(dungMap.ID)
    .Difficulty.set(1)
    .Message.enGB.set(" ")
    .RaidDuration.set(0)
    .MaxPlayers.set(5)
    .Difficultystring.set(" ");
std.DBC.MapDifficulty.add(1003)
    .MapID.set(dungMap.ID)
    .Difficulty.set(2)
    .Message.enGB.set(" ")
    .RaidDuration.set(0)
    .MaxPlayers.set(5)
    .Difficultystring.set(" ");
std.DBC.MapDifficulty.add(1004)
    .MapID.set(dungMap.ID)
    .Difficulty.set(3)
    .Message.enGB.set(" ")
    .RaidDuration.set(0)
    .MaxPlayers.set(5)
    .Difficultystring.set(" ");
std.SQL.game_tele
    .add(1452)
    .position_x.set(910)
    .position_y.set(157)
    .position_z.set(414)
    .map.set(dungMap.ID)
    .name.set("dungeonMap");