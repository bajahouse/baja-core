import { rageGeneration } from "./rage-generation";
import { spellController } from "./class-controller";
import { runicPower } from "./runic-power";


export function Main(events: TSEvents) {
    spellController(events)
    rageGeneration(events)
    runicPower(events)
}
