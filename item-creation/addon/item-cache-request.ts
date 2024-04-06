import { itemCache } from "../shared/Messages";
let lastItemID = "0"
export function itemCacheRequest() {
    GameTooltip.HookScript("OnTooltipSetItem", (self) => {
        const itemID = self.GetItem()[1].split(':')[1]
        if (itemID != lastItemID) {
            new itemCache(Number(itemID)).write().Send()
            lastItemID = itemID
        }
    });
}