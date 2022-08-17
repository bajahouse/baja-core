import { baseHouse } from "./housing-base";
import { SetupHouseInfo } from "./base-classes";
import { RegisterFarmingSpells } from "./spell-scripts";

export function Main(events: TSEvents) {
    SetupHouseInfo(events)
    RegisterFarmingSpells(events)
    baseHouse(events)
}
