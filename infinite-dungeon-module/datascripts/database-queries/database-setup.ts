import { std } from "wow/wotlk";
//dungeon
std.SQL.Databases.world_dest.writeEarly("TRUNCATE TABLE `dungeon_spells`");

//teleports
std.SQL.game_tele
    .add(1451)
    .position_x.set(-8750.45)
    .position_y.set(-74.6418)
    .position_z.set(31.1351)
    .map.set(725)
    .name.set("dungeonStartArea");

std.SQL.game_tele
    .add(1452)
    .position_x.set(910)
    .position_y.set(157)
    .position_z.set(414)
    .map.set(726)
    .name.set("dungeonMap");
//base map info
std.DBC.MapDifficulty.add(1000)
    .MapID.set(725)
    .Difficulty.set(0)
    .Message.enGB.set(" ")
    .RaidDuration.set(0)
    .MaxPlayers.set(0)
    .Difficultystring.set(" ");
