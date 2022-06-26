import { dumpPlayerInventory } from "./dump-player-inventory"
import { itemRandomEnchantVisual } from "./randomenchants"
import { nakedPlayersFix } from "./naked-players-fix"

export function Main(events: TSEvents) {
    itemRandomEnchantVisual(events)
    dumpPlayerInventory(events)
    nakedPlayersFix(events)
}
