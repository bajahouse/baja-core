import { dumpPlayerInventory } from "./dump-player-inventory"
import { itemRandomEnchantVisual } from "./randomenchants"

export function Main(events: TSEvents) {
    itemRandomEnchantVisual(events)
    dumpPlayerInventory(events)
}
