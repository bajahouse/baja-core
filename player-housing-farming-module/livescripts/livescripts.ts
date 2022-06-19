import { baseHouse } from "./housing-base";
import { SetupHouseInfo } from "./base-classes";
import { RegisterFarmingSpells } from "./spell-scripts";

export function Main(events: TSEvents) {
    SetupHouseInfo(events)
    RegisterFarmingSpells(events)
    baseHouse(events)
}

export function getRandNumber(min: uint32, max: uint32): uint32 {
    return Math.floor((Math.random() * (max - min)) + min);
}