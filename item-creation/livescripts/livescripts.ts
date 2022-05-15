import { itemCreationSetup } from "./item_create";
import { example } from "./item_examples";

export function Main(events: TSEvents) {
    itemCreationSetup(events)
    example(events)
}

export function getRandNumber(max: uint32): uint32 {
    return Math.floor((Math.random() * max)-0.0001)
}
