// ============================================================================
// -  By: @tester -
//
// - Dump Target Inventory -
//
//   This file allows a GM to view the inventory/bank of a target player.
//
// - External scripts -
//  - none
//
// ============================================================================

export function dumpPlayerInventory(events: TSEvents) {
    events.Player.OnCommand((player, command, found) => {
        if (command.get().startsWith('dumpinv') && player.IsGM()) {
            found.set(true)
            let tar = player.GetSelection()
            if (!tar || !tar.IsPlayer())
                return
            let target = tar.ToPlayer()!

            player.SendBroadcastMessage('main inventory')
            for (let x = 19; x <= 22; x++) {
                for (let i = 0; i <= 35; ++i) {
                    let item = target.GetItemByPos(x, i);
                    if (item) {
                        player.SendBroadcastMessage('Entry: ' + item.GetEntry() + ' Name: ' + item.GetName() + ' Count: ' + item.GetCount());
                    }
                }
            }
            player.SendBroadcastMessage('bank')
            for (let x = 67; x <= 74; x++) {
                for (let i = 0; i <= 35; ++i) {
                    let item = target.GetItemByPos(x, i);
                    if (item) {
                        player.SendBroadcastMessage('Entry: ' + item.GetEntry() + ' Name: ' + item.GetName() + ' Count: ' + item.GetCount());
                    }
                }
            }
            player.SendBroadcastMessage('misc')
            for (let i = 0; i <= 117; ++i) {
                let item = target.GetItemByPos(255, i);
                if (item) {
                    player.SendBroadcastMessage('Entry: ' + item.GetEntry() + ' Name: ' + item.GetName() + ' Count: ' + item.GetCount());
                }
            }
        }
    })
}