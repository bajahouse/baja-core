import { itemCache } from "../shared/Messages";

export function itemCacheRequest() {
    GameTooltip.HookScript("OnTooltipSetItem", (self) => {
        const itemID = self.GetItem()[1].split(':')[1]
        new itemCache(Number(itemID)).write().Send()
    });
}