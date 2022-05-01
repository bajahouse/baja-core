import { baseFarm } from "./farming-base";
import { RegisterFarmingInfo } from "./farming-classes";

export function Main(events: TSEvents) {
    RegisterFarmingInfo(events)
    baseFarm(events)
    
    //replace with purchasing later
    
}
