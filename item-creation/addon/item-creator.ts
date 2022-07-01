import { itemUpdateID, itemUpdatePacket } from "../shared/Messages"

export function itemCreator()
{
    let info = new itemUpdatePacket();
    let mframe = CreateFrame("Frame", "torghastChoices", UIParent);
    mframe.SetWidth(512);
    mframe.SetHeight(512);
    mframe.SetPoint("CENTER", 0, 0);
    mframe.SetBackdrop({
        bgFile: "Interface/TutorialFrame/TutorialFrameBackground",
        edgeFile: "Interface/DialogFrame/UI-DialogBox-Border",
        tile: true,
        tileSize: 10,
        edgeSize: 10,
        insets: { left: 2, right: 2, top: 2, bottom: 2 },
    });
    mframe.SetBackdropColor(0, 0, 0, 1);
    mframe.Hide();
    mframe.EnableMouse(true);
    mframe.RegisterForDrag("LeftButton");
    mframe.SetMovable(true);
    mframe.SetScript("OnDragStart", (self) => {
        self.StartMoving();
    });
    mframe.SetScript("OnDragStop", (self) => {
        self.StopMovingOrSizing();
    });

    //button to hide
    //button to show
    //button to clear info
    //button to send packet looking for info
    //text boxes+description text for all item info
    
    OnCustomPacket(itemUpdateID, (packet) => {
        info.read(packet);
        updateUI()
    });
    function clearInfo()
    {
        info = new itemUpdatePacket()
        updateUI()
    }
    function updateUI()
    {
        //take all data from info, apply to all UI elements
    }
    function sendInfo()
    {
        //take all data from UI elements, apply to info, send
        clearInfo()
    }
}
