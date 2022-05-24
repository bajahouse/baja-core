let turnSpeed = 34; //bigger = slower
let dragSpeed = 100; //bigger = slower
let zoomSpeed = 0.5; //smaller = slower

export function SetupModelZoomDragRotation(model: WoWAPI.DressUpModel) {
    model.SetPosition(0, 0, 0);
    model.EnableMouse(true);
    model.EnableMouseWheel(true);
    model.SetScript("OnMouseDown", function (self, button) {
        let startPos = GetCursorPosition();
        if (button == "LeftButton") {
            model.SetScript("OnUpdate", function (self: WoWAPI.DressUpModel) {
                let curX = GetCursorPosition()[0];
                self.SetFacing((curX - startPos[0]) / turnSpeed + self.GetFacing());
                startPos[0] = curX;
            });
        } else if (button == "RightButton") {
            model.SetScript("OnUpdate", function (self: WoWAPI.DressUpModel) {
                let cursorPos = GetCursorPosition();
                let pos = self.GetPosition();
                pos[1] = (cursorPos[0] - startPos[0]) / dragSpeed + pos[1];
                pos[2] = (cursorPos[1] - startPos[1]) / dragSpeed + pos[2];
                self.SetPosition(pos[0], pos[1], pos[2]);
                startPos[0] = cursorPos[0];
                startPos[1] = cursorPos[1];
            });
        }
    });
    model.SetScript("OnMouseUp", function (self: WoWAPI.DressUpModel, button) {
        self.SetScript("OnUpdate", null);
    });
    model.SetScript("OnMouseWheel", function (self: WoWAPI.DressUpModel, zoom) {
        let pos = model.GetPosition();
        if (zoom == 1) {
            pos[0] += zoomSpeed;
        } else {
            pos[0] -= zoomSpeed;
        }
        self.SetPosition(pos[0], pos[1], pos[2]);
    });
}