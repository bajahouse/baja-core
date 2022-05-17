import { itemCreationSetup } from "./item-create/item-create-lib";
import { example } from "./example-usage";
import { reforging } from "./reforging/reforging";

export function Main(events: TSEvents) {
    itemCreationSetup(events)
    example(events)
    reforging(events)
}

export function getRandNumber(max: uint32): uint32 {
    return Math.floor((Math.random() * (max-0.001)))
}
