import { std } from 'wow/wotlk'

std.SQL.Databases.world_dest.writeEarly(`DROP TABLE IF EXISTS \`aio_addons\`;
CREATE TABLE \`aio_addons\`  (
  \`name\` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  \`addonText\` longtext CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;
`)

function addAddon(name: string, code: string) {
    std.SQL.Databases.world_dest.write(`INSERT INTO \`aio_addons\` (\`name\`, \`addonText\`) VALUES ('` + name + `', '` + code + `');`)
}

let code = `
print("this is lua stored in the database and sent from the server to the client and executed, a first step to AIO")
MyAddon = CreateFrame("Frame", "MyAddonFrame")
MyAddon:SetBackdrop({edgeFile = "Interface/Tooltips/UI-Tooltip-Border", tile = true, tileSize = 16, edgeSize = 16, insets = {left = 4, right = 4, top = 4, bottom = 4}})
MyAddon:SetWidth(220)
MyAddon:SetHeight(400)
MyAddon:SetPoint("CENTER", UIParent, "CENTER")
MyAddon:EnableMouse(true)
MyAddon:SetMovable(true)
MyAddon:RegisterForDrag("LeftButton")
MyAddon:SetScript(
    "OnDragStart",
    function(____self)
        ____self:StartMoving()
    end
)
MyAddon:SetScript(
    "OnDragStop",
    function(____self)
        ____self:StopMovingOrSizing()
    end
)
MyAddon:SetFrameStrata("FULLSCREEN_DIALOG")
button = CreateFrame("Button", "MyAddonButton", MyAddon, "UIPanelButtonTemplate")
button:SetHeight(24)
button:SetWidth(60)
button:SetPoint("BOTTOM", MyAddon, "BOTTOM", 0, 10)
button:SetText("Close")
`
addAddon("test2", code)