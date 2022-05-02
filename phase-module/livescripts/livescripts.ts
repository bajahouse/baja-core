import { baseFarm } from "./farming-base";
import { RegisterFarmingInfo } from "./farming-classes";

export function Main(events: TSEvents) {
    RegisterFarmingInfo(events)
    baseFarm(events)
}

export function getRandNumber(min:uint32, max:uint32):uint32
{
    return Math.floor((Math.random() * (max - min)) + min);
}