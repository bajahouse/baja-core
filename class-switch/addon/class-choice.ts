import { classSwap, unlockClassInfo, unlockClassInfoID } from "../shared/Messages"

let unlocked = []
let curClassID = 1

let names = [
    "Warrior",
    "Paladin",
    "Hunter",
    "Rogue",
    "Priest",
    "DK",
    "Shaman",
    "Mage",
    "Warlock",
    "Druid",
]

let textures = [
    "inv_sword_27",
    "inv_hammer_01",
    "inv_weapon_bow_07",
    "inv_throwingknife_04",
    "inv_staff_30",
    "Spell_Deathknight_ClassIcon",
    "inv_jewelry_talisman_04",
    "inv_staff_13",
    "spell_nature_drowsy",
    "inv_misc_monsterclaw_04",
]

export function ClassSelector() {
    let pkt = new classSwap(50)
    pkt.write().Send()

    let allButtons = []
    let shown = false
    let mframe = CreateFrame("Frame", "ClassSelector", UIParent)
    mframe.SetSize(350, 256)
    mframe.SetPoint("CENTER", -100, 0)
    mframe.EnableMouse(true)
    mframe.RegisterForDrag("LeftButton")
    mframe.SetMovable(true)
    mframe.SetScript("OnDragStart", (self) => {
        self.StartMoving()
    })
    mframe.SetScript("OnDragStop", (self) => {
        self.StopMovingOrSizing()
    })
    mframe.SetBackdrop({
        bgFile: "Interface/TutorialFrame/TutorialFrameBackground",
        edgeFile: "Interface/DialogFrame/UI-DialogBox-Border",
        tile: true,
        tileSize: 22,
        edgeSize: 22,
        insets: { left: 4, right: 4, top: 4, bottom: 4 },
    })
    mframe.SetBackdropColor(0, 0, 0, 1)
    mframe.Hide()

    let currentClass = CreateFrame("Button", 'curclass', mframe)
    currentClass.SetPoint("TOP", mframe, "TOP", 0, -25)
    currentClass.SetSize(64, 64)
    let curClassTexture = currentClass.CreateTexture("tex1", "BACKGROUND")

    //curClassTexture.SetTexture("Interface\\Icons\\Ability_Creature_Cursed_04")
    curClassTexture.SetAllPoints(currentClass)
    curClassTexture.SetPoint("CENTER", 0, 0)

    let showBtn = CreateFrame("Button", "show", UIParent)
    showBtn.SetSize(22, 22)
    showBtn.SetPoint("TOPRIGHT", -140, -45)
    let showTex = showBtn.CreateTexture("", "BACKGROUND")
    showTex.SetTexture("Interface\\BUTTONS\\UI-GroupLoot-Dice-Up.blp")
    showTex.SetAllPoints(showBtn)
    showBtn.HookScript("OnClick", (frame, evName, btnDown) => {
        if (shown) {
            shown = false
            clearButtons()
            mframe.Hide()
        } else {
            shown = true
            if (curClassID == 11)
                curClassTexture.SetTexture('Interface\\Icons\\' + textures[curClassID - 2])
            else
                curClassTexture.SetTexture('Interface\\Icons\\' + textures[curClassID - 1])
            createButtons()
            mframe.Show()
        }
    })

    let exitButn = CreateFrame("Button", "", mframe)
    exitButn.SetPoint("TOPRIGHT", mframe, "TOPRIGHT")
    exitButn.SetSize(50, 50)
    let exittex = exitButn.CreateTexture("", "BACKGROUND")
    exittex.SetTexture("Interface\\BUTTONS\\UI-Panel-MinimizeButton-Up.blp")
    exittex.SetAllPoints(exitButn)
    exittex.SetPoint("CENTER", 0, 0)
    exitButn.HookScript("OnClick", (frame, evName, btnDown) => {
        shown = false
        mframe.Hide()
    })

    function createButtons() {
        for (let i = 0; i < 10; i++) {
            let button = CreateFrame("Button", 'class' + i, mframe)
            button.SetPoint("CENTER", mframe, "CENTER", -120 + (i % 5) * 60, 60 + -65 * (Math.floor(i / 5) + 1))
            button.SetSize(50, 50)
            button.SetBackdrop({
                bgFile: "Interface/TutorialFrame/TutorialFrameBackground",
                //edgeFile: "Interface/DialogFrame/UI-DialogBox-Border",
                tile: true,
                tileSize: 22,
                edgeSize: 22,
                insets: { left: 4, right: 4, top: 4, bottom: 4 },
            })
            button.SetBackdropColor(0, 0, 0, 1)
            let tex = button.CreateTexture("tex1", "BACKGROUND")
            tex.SetTexture('Interface\\Icons\\' + textures[i])
            tex.SetAllPoints(button)
            tex.SetPoint("CENTER", 0, 0)
            let text1 = button.CreateFontString("", "OVERLAY", "GameFontNormal")
            text1.SetPoint("BOTTOM", 0, -10)
            text1.SetText(names[i])

            if (i == 9) {//druid
                button.SetID(i + 2)
                if (unlocked[i + 2] == 0)//disables
                {
                    button.Disable()
                    tex.SetAlpha(0.6)
                }
            } else {
                button.SetID(i + 1)
                if (unlocked[i + 1] == 0)//disables
                {
                    button.Disable()
                    tex.SetAlpha(0.6)
                }
            }

            // button.HookScript("OnEnter", (self) => {
            //     GameTooltip.ClearLines()
            //     GameTooltip.SetOwner(button, 'ANCHOR_CURSOR')
            //     GameTooltip.SetHyperlink("item:" + parseInt(self.GetName()))
            //     GameTooltip.Show()
            // })
            // button.HookScript("OnLeave", () => {
            //     GameTooltip.Hide()
            // })
            button.HookScript("OnClick", () => {
                let pkt = new classSwap(button.GetID())
                pkt.write().Send()
                curClassID = button.GetID()
                if (button.GetID() == 11)
                    curClassTexture.SetTexture('Interface\\Icons\\' + textures[button.GetID() - 2])
                else
                    curClassTexture.SetTexture('Interface\\Icons\\' + textures[button.GetID() - 1])
            })
            allButtons.push(button)
        }
    }


    function clearButtons() {
        for (let i = 0; i < allButtons.length; i++) {
            allButtons[i].Hide()
        }
        allButtons = []
    }

    OnCustomPacket(unlockClassInfoID, (pkt => {
        let pkta = new unlockClassInfo(0, [0])
        pkta.read(pkt)
        unlocked = pkta.currentUnlocks
        curClassID = pkta.currentClassChoice
    }))
}