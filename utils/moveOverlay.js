// stolen from turtleaddons yipee
import settings from "./config";
import values from "./values";

let gui = new Gui();

let overlays = [];
let draggingIndex = undefined;
let strings = [];

export default function moveOverlay() {
    gui.open();
}

register('step', () => {
    if (!gui.isOpen()) {
        overlays.length = 0;

        if (settings.boolBalStatusHUD) overlays.push(['BalStatusHUD', values.BalStatusHUDX, values.BalStatusHUDY, values.BalStatusHUDScale, `Bal Status: Example\nInformation: 69420 units`]);
        if (settings.boolBalCoordHUD) overlays.push(['BalCoordHUD', values.BalCoordHUDX, values.BalCoordHUDY, values.BalCoordHUDScale, `Bal Coordinates\nX: Number\nY: Another number\nZ: 69.42`]);
    }
}).setDelay(1)

register('renderOverlay', () => {
    if (!gui.isOpen()) return;
    strings.length = 0;

    Renderer.drawRect((128 << 24) | (0 << 16) | (0 <<  8) | 0, 0, 0, Renderer.screen.getWidth(), Renderer.screen.getHeight());
    Renderer.drawString('Use scroll to change scale.', (Renderer.screen.getWidth() / 2) - (Renderer.getStringWidth('Use scroll to change scale.') / 2), 20)
    
    overlays.forEach(overlay => {
        if (typeof settings[overlay[0]] == Boolean) settings[overlay[0]] = false
        else if (typeof settings[overlay[0]] == String) {
            strings.push(settings[overlay[0]]);
            settings[overlay[0]] = '';
        }
        Renderer.scale(overlay[3]);
        Renderer.drawString(overlay[4], overlay[1] / overlay[3], overlay[2] / overlay[3], true);
    })
})

register('guiClosed', () => {
    if (gui.isOpen()) overlays.forEach(overlay => {
        if (typeof settings[overlay[0]] == Boolean) settings[overlay[0]] = true
        else if (typeof settings[overlay[0]] == String) {
            settings[overlay[0]] = strings[0];
            strings.splice(0, 1);
        }
    })
})

register('guiMouseClick', (x, y) => {
    if (gui.isOpen()) {
        overlays.forEach((overlay, index) => {
            if (x > overlay[1] - 5 && x < overlay[1] - 5 + ((Renderer.getStringWidth(overlay[4]) + 10) * overlay[3]) && y > overlay[2] - 5 && y < overlay[2] + (10 * overlay[3])) draggingIndex = index;
        })
    }
})

register('guiMouseRelease', () => {
    if (gui.isOpen()) draggingIndex = undefined;
})

register("scrolled", (x, y, direction) => {
    if (gui.isOpen()) {
        overlays.forEach((overlay, index) => {
            if (direction == 1 && draggingIndex == index && overlay[3] > 0.2) {
                overlay[3] += 0.1;
                values[overlay[0] + 'Scale'] += 0.1;
                values.save();
            }

            if (direction == -1 && draggingIndex == index && overlay[3] > 0.3) {
                overlay[3] -= 0.1;
                values[overlay[0] + 'Scale'] -= 0.1;
                values.save();
            }
        })
    }
})

register('dragged', (dx, dy, x, y) => {
    if (gui.isOpen()) {
        overlays.forEach((overlay, index) => {
            if (draggingIndex == index) {
                overlay[1] += dx;
                overlay[2] += dy;
                values[overlay[0] + 'X'] += dx;
                values[overlay[0] + 'Y'] += dy;
                values.save();
            }
        })
    }
})