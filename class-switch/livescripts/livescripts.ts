import { rageGeneration } from "./rage-generation";
import { spellController } from "./spell-controller";


export function Main(events: TSEvents) {
    spellController(events)
    rageGeneration(events)
}
