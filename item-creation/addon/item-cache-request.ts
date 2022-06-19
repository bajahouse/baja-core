// ============================================================================
//
// - Item Cache Updater -
//
//   This file forces the client to update item information on hover, removing need to update the whole server whenever a item changes
//
// - External scripts -
//   Livescripts: livescripts/item-cache
//
// ============================================================================

import { itemCache } from "../shared/Messages";

export function itemCacheRequest() {
    GameTooltip.HookScript("OnTooltipSetItem", (self) => {
        const itemID = self.GetItem()[1].split(':')[1]
        new itemCache(Number(itemID)).write().Send()
    });
}