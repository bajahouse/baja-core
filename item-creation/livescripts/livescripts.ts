import { itemCreate } from "./item_create";

export function Main(events: TSEvents) {
    itemCreate(events)
}

export function getRandNumber(max: uint32): uint32 {
    return Math.floor(Math.random() * max)
}
