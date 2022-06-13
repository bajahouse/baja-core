//build addon, copy resulting lua to aio folder in default/datasets/realm/aio, run aio reload
// let MyAddon = CreateFrame("Frame", "MyAddonFrame")
// MyAddon.SetBackdrop({
//     edgeFile: 'Interface/Tooltips/UI-Tooltip-Border',
//     tile: true,
//     tileSize: 16,
//     edgeSize: 16,
//     insets: {
//         left: 4,
//         right: 4,
//         top: 4,
//         bottom: 4,
//     },
// })
// MyAddon.SetWidth(220)
// MyAddon.SetHeight(400)
// MyAddon.SetPoint("CENTER", UIParent, "CENTER")
// MyAddon.EnableMouse(true)
// MyAddon.SetMovable(true)
// MyAddon.RegisterForDrag("LeftButton")
// MyAddon.SetScript("OnDragStart", function (self) {
//     self.StartMoving()
// })
// MyAddon.SetScript("OnDragStop", function (self) {
//     self.StopMovingOrSizing()
// })
// MyAddon.SetFrameStrata("FULLSCREEN_DIALOG")

// let button = CreateFrame('Button', "MyAddonButton", MyAddon, "UIPanelButtonTemplate")
// button.SetHeight(24)
// button.SetWidth(60)
// button.SetPoint("BOTTOM", MyAddon, "BOTTOM", 0, 10)
// button.SetText("Close")

// OnCustomPacket(textMessageID, (packet) => {
//     let customPacket = new textMessage("", "");
//     customPacket.read(packet);
//     console.log('test from new code')
//     let pkt = new textMessage("test1", "test2").write().Send()
// })