import { std } from "wow/wotlk";
import { MODNAME } from "../../modname";

std.Maps.load(726).Type.DUNGEON.set(MODNAME,'map726').MaxPlayers.set(5).Flags.set(13).CorpseMap.set(725).CorpsePos.set({ x: 900, y: 150 }).Name.enGB.set('dungeon')
std.SQL.instance_template.add(726).parent.set(725).script.set('')
std.DBC.MapDifficulty.add(1001)
    .MapID.set(726)
    .Difficulty.set(0)
    .Message.enGB.set(" ")
    .RaidDuration.set(0)
    .MaxPlayers.set(5)
    .Difficultystring.set(" ");
std.DBC.MapDifficulty.add(1002)
    .MapID.set(726)
    .Difficulty.set(1)
    .Message.enGB.set(" ")
    .RaidDuration.set(0)
    .MaxPlayers.set(5)
    .Difficultystring.set(" ");
std.DBC.MapDifficulty.add(1003)
    .MapID.set(726)
    .Difficulty.set(2)
    .Message.enGB.set(" ")
    .RaidDuration.set(0)
    .MaxPlayers.set(5)
    .Difficultystring.set(" ");
std.DBC.MapDifficulty.add(1004)
    .MapID.set(726)
    .Difficulty.set(3)
    .Message.enGB.set(" ")
    .RaidDuration.set(0)
    .MaxPlayers.set(5)
    .Difficultystring.set(" ");

