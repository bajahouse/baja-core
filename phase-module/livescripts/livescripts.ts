import { baseFarm } from "./farming-base";
import { SetupFarmInfo } from "./farming-classes";
import { RegisterFarmingSpells } from "./farming-spell-scripts";

export function Main(events: TSEvents) {
    SetupFarmInfo(events)
    RegisterFarmingSpells(events)
    baseFarm(events)
}

export function getRandNumber(min: uint32, max: uint32): uint32 {
    return Math.floor((Math.random() * (max - min)) + min);
}