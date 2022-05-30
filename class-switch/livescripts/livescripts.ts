import { rageGeneration } from "./rage-generation";
import { spellController } from "./class-controller";


export function Main(events: TSEvents) {
    spellController(events)
    rageGeneration(events)
}
