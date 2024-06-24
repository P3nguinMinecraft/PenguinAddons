import PogObject from "../../PogData";

const overlayConfig = new PogObject("BalAddons", {
    BalStatusHUDX: Renderer.screen.getWidth()/2,
    BalStatusHUDY: Renderer.screen.getHeight()/2,
    BalStatusHUDScale: 1,

    BalCoordHUDX: Renderer.screen.getWidth()/2,
    BalCoordHUDY: Renderer.screen.getHeight()/2,
    BalCoordHUDScale: 1,

});

export default overlayConfig;