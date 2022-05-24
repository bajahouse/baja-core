import { dungeon1 } from "./dungeon/dungeon-1";
import { dungeonBuffSystem } from "./dungeon/dungeon-master";

export function Main(events: TSEvents) {
    dungeon1(events)
    dungeonBuffSystem(events)
}
