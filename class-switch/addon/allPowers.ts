//mana,rage,energy,runic

let powerCount = 3 //change to 4 to enable runic power tracking, requires serverside changes
let colors = [
    [0, 0, 1],
    [1, 0, 0],
    [1, 1, 0],
    [0, 0.82, 1],
]

let statusBars = []

export function allPowers() {
    let mframe = CreateFrame("Frame", "powerBar", UIParent);
    mframe.SetWidth(140);
    mframe.SetHeight(24*powerCount);
    mframe.SetPoint("CENTER", -100, 0);
    mframe.EnableMouse(true);
    mframe.RegisterForDrag("LeftButton");
    mframe.SetMovable(true);
    mframe.SetScript("OnDragStart", (self) => {
        self.StartMoving();
    });
    mframe.SetScript("OnDragStop", (self) => {
        self.StopMovingOrSizing();
    });
    mframe.SetBackdrop({
        bgFile: "Interface/TutorialFrame/TutorialFrameBackground",
        edgeFile: "Interface/DialogFrame/UI-DialogBox-Border",
        tile: true,
        tileSize: 22,
        edgeSize: 22,
        insets: { left: 4, right: 4, top: 4, bottom: 4 },
    });
    mframe.SetBackdropColor(0, 0, 0, 1);
    mframe.Show()

    mframe.RegisterEvent("PLAYER_ENTERING_WORLD")
    mframe.SetScript("OnUpdate", updateBars);
    mframe.SetScript("OnEvent", (frame, event, arg1) => {
        if (event == "PLAYER_ENTERING_WORLD")
            onEnterWorld()
    })

    function onEnterWorld() {
        for (let i = 0; i < powerCount; i++) {
            statusBars.push(createStatusBar(mframe, colors[i], colors[i], i))
        }
        updateBars()
    }
}

function indexToPowerType(val: number) {
    if (val == 0 || val == 1)
        return val
    if (val == 2)
        return 3
    if (val == 3)
        return 6
}

function updateBars() {
    for (let i = 0; i < powerCount; i++) {
        statusBars[i][2].SetText(UnitPower("player", indexToPowerType(i)) + ' /' + UnitPowerMax("player", indexToPowerType(i)))
        statusBars[i][1].SetMinMaxValues(0, UnitPowerMax("player", indexToPowerType(i)))
        statusBars[i][1].SetValue(UnitPower("player", indexToPowerType(i)))
    }
}

function createStatusBar(parentFrame: WoWAPI.Frame, statusBarColors: number[], vertexColorsBG: number[], index: number) {
    let ilvlStatusBar = CreateFrame("StatusBar", '', parentFrame)
    ilvlStatusBar.SetPoint("TOP", parentFrame, "TOP", 0, -10 - (index * 18))
    ilvlStatusBar.SetWidth(120)
    ilvlStatusBar.SetHeight(18)
    ilvlStatusBar.SetStatusBarTexture("Interface\\TARGETINGFRAME\\UI-StatusBar")
    ilvlStatusBar.SetStatusBarColor(statusBarColors[0], statusBarColors[1], statusBarColors[2], 1)

    let ilvlStatusBarBg = ilvlStatusBar.CreateTexture('', "BACKGROUND")
    ilvlStatusBarBg.SetTexture("Interface\\TARGETINGFRAME\\UI-StatusBar")
    ilvlStatusBarBg.SetAllPoints()
    //ilvlStatusBarBg.SetVertexColor(vertexColorsBG[0], vertexColorsBG[1], vertexColorsBG[2])
    ilvlStatusBarBg.SetVertexColor(0, 0, 0)

    let ilvlStatusBarValue = ilvlStatusBar.CreateFontString('', "OVERLAY")
    ilvlStatusBarValue.SetPoint("CENTER")
    ilvlStatusBarValue.SetFont("Fonts\\FRIZQT__.TTF", 12, "OUTLINE")
    return [ilvlStatusBar, ilvlStatusBarValue]
}
