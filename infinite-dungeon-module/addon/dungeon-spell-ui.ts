// ============================================================================
//
// - Dungeon Spell UI -
//
//   This file displays spell choices to the client for use in the dungeon spell choices.
//
// - External scripts -
//   Livescripts: livescripts/dungeon/*
//
// ============================================================================

import { spellChoicesID, spellChoices, spellChoice } from "../shared/Messages";

export function dungeonSpellUI() {
    let choiceSpells = [];
    let choiceRanks = [];
    let choiceDescs = [];
    let choiceButtons = [];
    let rankColors = ["FFFFFF", "1EFF0C", "0070FF", "A335EE", "FF8000"];
    let rankText = [
        rankColors[0] + "Common",
        rankColors[1] + "Uncommon",
        rankColors[2] + "Rare",
        rankColors[3] + "Epic",
        rankColors[4] + "Legendary",
    ];
    let mframe = CreateFrame("Frame", "torghastChoices", UIParent);
    mframe.SetWidth(512);
    mframe.SetHeight(350);
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

    OnCustomPacket(spellChoicesID, (packet) => {
        let customPacket = new spellChoices([], [], []);
        customPacket.read(packet);
        for (let i = 0; i < 3; i++) {
            choiceSpells.push(customPacket.spellIDs[i]);
            choiceDescs.push(customPacket.spellDescs[i]);
            choiceRanks.push(customPacket.spellRarity[i]);
        }
        showSpellChoiceUI();
    });

    function showSpellChoiceUI() {
        mframe.Show();
        let buttonIndex = 2;
        for (let i = 0; i < 3; i++) {
            let spellButton = CreateFrame("Button", choiceSpells[i], mframe);
            spellButton.SetSize(72, 72);
            spellButton.SetPoint(
                "TOP",
                mframe,
                "TOP",
                -0 + (spellButton.GetWidth() + 100) * (i - 1),
                -55
            );
            let info = GetSpellInfo(choiceSpells[i]);
            spellButton.SetNormalTexture(info[2]);
            spellButton.Show();
            spellButton.HookScript("OnEnter", (self) => {
                GameTooltip.ClearLines();
                GameTooltip.SetOwner(spellButton, "ANCHOR_CURSOR");
                GameTooltip.SetHyperlink("spell:" + self.GetName());
                GameTooltip.Show();
            });
            spellButton.HookScript("OnLeave", () => {
                GameTooltip.Hide();
            });

            let spellNameCentering = CreateFrame("Frame", "", spellButton);
            spellNameCentering.SetSize(100, 50);
            spellNameCentering.SetPoint("BOTTOM", spellButton, "TOP", 0, 0);

            let spellNameText = spellButton.CreateFontString(
                "",
                "OVERLAY",
                "QuestTitleFont"
            );
            spellNameText.SetWidth(140);
            spellNameText.SetPoint("CENTER", spellNameCentering, "CENTER", 0, 0);
            spellNameText.SetText(
                "|cff" + rankColors[choiceRanks[i]] + info[0] + "|r"
            );

            let spellDescText = spellButton.CreateFontString(
                "",
                "OVERLAY",
                "GameFontNormal"
            );
            spellDescText.SetWidth(150);
            spellDescText.SetPoint("TOP", spellButton, "BOTTOM", 0, -5);
            spellDescText.SetText(
                "|cff" + rankText[choiceRanks[i]] + "|r\n\n" + choiceDescs[i]
            );

            let choiceButton = CreateFrame("Button", buttonIndex.toString(), mframe);
            choiceButton.SetSize(150, 42);
            choiceButton.SetPoint(
                "BOTTOM",
                mframe,
                "BOTTOM",
                30 + (spellButton.GetWidth() + 100) * (i - 1),
                10
            );
            choiceButton.SetNormalTexture("Interface\\BUTTONS\\UI-Panel-Button-Up");
            let choiceButtonText = choiceButton.CreateFontString(
                "",
                "OVERLAY",
                "GameFontNormal"
            );
            choiceButtonText.SetPoint("TOP", -30, -8);
            choiceButtonText.SetText("Choose!");
            choiceButton.HookScript("OnClick", (frame, button, down) => {
                onChoice(frame.GetName());
            });
            choiceButtons.push(spellButton);
            choiceButtons.push(choiceButton);
            buttonIndex--;
        }
    }

    function onChoice(index) {
        choiceSpells = [];
        choiceRanks = [];
        choiceDescs = [];
        for (let i = 0; i < choiceButtons.length; i++) {
            choiceButtons[i].Hide();
        }
        choiceButtons = [];
        mframe.Hide();

        let pkt = new spellChoice(index);
        pkt.write().Send();
    }
}
