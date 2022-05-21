import { itemCreationSetup } from "./item-create/item-create-lib";
import { example } from "./example-usage";
import { reforging } from "./reforging/reforging";
import { itemCacheSend } from "./item-cache";

export function Main(events: TSEvents) {
    itemCreationSetup(events)
    example(events)
    reforging(events)
    itemCacheSend(events)
}

export function getRandNumber(max: uint32): uint32 {
    return Math.floor((Math.random() * (max - 0.001)))
}
