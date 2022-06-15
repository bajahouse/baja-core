import { textMessage, textMessageID } from "../shared/Messages";

let loaded = false
let addonTexts = []
let addonNames = []

let EventFrame = CreateFrame('Frame')
EventFrame.RegisterEvent('PLAYER_ENTERING_WORLD')
EventFrame.SetScript('OnEvent', function () {
    if (!loaded) {
        loaded = true
        //request addon texts
        new textMessage("", "").write().Send()
    }
})

function executeAddons() {
    for (let i = 0; i < addonTexts.length; i++) {
        assert(loadstring(addonTexts[i]))()
    }
}

let choiceButton = CreateFrame("Button", 'reloadUI', UIParent);
choiceButton.SetSize(150, 42);
choiceButton.SetPoint("CENTER");
choiceButton.SetNormalTexture("Interface\\BUTTONS\\UI-Panel-Button-Up");
let choiceButtonText = choiceButton.CreateFontString("", "OVERLAY", "GameFontNormal");
choiceButtonText.SetPoint("TOP", -30, -8);
choiceButtonText.SetText("ReloadUI");
choiceButton.Hide()
choiceButton.SetScript("OnClick", (frame, button, down) => {
    loaded = false
    ReloadUI()
});

OnCustomPacket(textMessageID, (packet) => {
    let customPacket = new textMessage("", "");
    customPacket.read(packet);

    if (customPacket.name == "AIO_FORCE_RELOAD") {
        choiceButton.Show()
        return
    }

    if (customPacket.shouldClear == 1) {
        addonTexts = []
        addonNames = []
    }

    addonTexts.push(customPacket.addonText)
    addonNames.push(customPacket.name)

    if (customPacket.isLast == 1) {
        executeAddons()
    }
})