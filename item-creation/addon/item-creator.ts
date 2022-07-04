import { itemUpdateID, itemUpdatePacket } from "../shared/Messages"

export function itemCreator() {
    let shown = false
    let info = new itemUpdatePacket();
    let mframe = CreateFrame("Frame", "torghastChoices", UIParent);
    mframe.SetWidth(1500);
    mframe.SetHeight(900);
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

    let showBtn = CreateFrame("Button", "show", UIParent)
    showBtn.SetWidth(22)
    showBtn.SetHeight(22)
    showBtn.SetPoint("TOPRIGHT", -5, -105)
    let showTex = showBtn.CreateTexture("", "BACKGROUND")
    showTex.SetTexture("Interface\\BUTTONS\\UI-GroupLoot-Dice-Up.blp")
    showTex.SetAllPoints(showBtn)
    showBtn.HookScript("OnClick", (frame, evName, btnDown) => {
        if (shown) {
            mframe.Hide()
        } else {
            mframe.Show()
            clearInfo()
        }
    })

    let exitButn = CreateFrame("Button", "", mframe)
    exitButn.SetPoint("TOPRIGHT", mframe, "TOPRIGHT")
    exitButn.SetWidth(50)
    exitButn.SetHeight(50)
    let exittex = exitButn.CreateTexture("", "BACKGROUND")
    exittex.SetTexture("Interface\\BUTTONS\\UI-Panel-MinimizeButton-Up.blp")
    exittex.SetAllPoints(exitButn)
    exittex.SetPoint("CENTER", 0, 0)
    exitButn.HookScript("OnClick", (frame, evName, btnDown) => {
        shown = false
        mframe.Hide()
    })

    
    //button to clear info
    //button to send packet looking for info
    //text boxes+description text for all item info
    let nameBox = createTextBoxAndText('Name: ',0,0)


    OnCustomPacket(itemUpdateID, (packet) => {
        info.read(packet);
        updateUI()
    });
    function clearInfo() {
        info = new itemUpdatePacket()
        updateUI()
    }
    function updateUI() {
        //take all data from info, apply to all UI elements
    }
    function sendInfo() {
        //take all data from UI elements, apply to info, send
        clearInfo()
    }
    function createTextBoxAndText(name: string,x:number,y:number) {
        let textbox = CreateFrame('EditBox', name + 'editbox', mframe)
        textbox.SetSize(200,30)
        textbox.SetFont("Fonts\\ARIALN.TTF", 14)
        textbox.SetMaxLetters(50)
        textbox.SetMultiLine(false)

        let text = textbox.CreateFontString('', "OVERLAY", 'GameTooltipText');
        text.SetPoint('TOPLEFT', mframe, 'TOPLEFT',x+10,y-20)
        text.SetText(name)

        textbox.SetPoint('LEFT', text, 'RIGHT',5,0)

        let searchtexBox = textbox.CreateTexture("", "BACKGROUND")
        searchtexBox.SetTexture("Interface\\COMMON\\Common-Input-Border.blp")
        searchtexBox.SetPoint("CENTER", textbox, "CENTER",-5,-5)
        searchtexBox.SetSize(textbox.GetWidth(), textbox.GetHeight())

        return textbox
    }
}
