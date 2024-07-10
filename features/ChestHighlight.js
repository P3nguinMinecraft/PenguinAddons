import RenderLib from "../../RenderLib";
import settings from "../utils/config";
import constants from "../utils/constants";
let foundChests = new Set();
let tempbool = settings.boolChestHighlight;

function findChests(radius){
    const PlayerPos = Player.asPlayerMP();
    const currentChests = new Set(); // Create a new set for the current tick
    World.getWorld().field_147482_g.forEach(entity => {
        if (entity instanceof Java.type("net.minecraft.tileentity.TileEntityChest")){
            if (entity.field_145987_o > 0) return;
            const xn = entity.func_174877_v().func_177958_n();
            const yn = entity.func_174877_v().func_177956_o();
            const zn = entity.func_174877_v().func_177952_p();
            if (PlayerPos.distanceTo(xn, yn, zn).toFixed(1) > radius) return;
            currentChests.add({ x: xn + 0.5, y: yn, z: zn + 0.5 }); // Add to set of chests per tick
        }
    });

    // Remove chests from the foundChests set that are within radius blocks of the player
    foundChests = new Set([...foundChests].filter(chest => {
        return PlayerPos.distanceTo(chest.x, chest.y, chest.z) > radius;
    }));

    // Add all the currentChests to foundChests
    foundChests = new Set([...foundChests, ...currentChests]);
}

export function resetChests(){
    foundChests.clear();
}

register("renderWorld", () => {
    if (tempbool !== settings.boolChestHighlight){
        if (settings.boolChestHighlight == true) findChests(settings.scanRadius);
        tempbool = settings.boolChestHighlight;
    }
    if (settings.boolChestHighlight){
        foundChests.forEach(chest => {
            RenderLib.drawInnerEspBox(chest.x, chest.y, chest.z, 0.875, 0.875, 0.875, 0, 0, 1, true); // x y z r g b a phase
        });
    }
});

register("chat", (message, event) => {
    if (message.removeFormatting().includes(constants.ChestFoundMessage)){
        setTimeout(() => {
            if (settings.boolChestHighlight == true) findChests(settings.scanRadius);
        }, 100);
    }

    if (message.removeFormatting().includes(constants.ChestOpenedMessage1) || message.removeFormatting().includes(constants.ChestOpenedMessage2)){
        if (settings.boolChestHighlight == true) findChests(settings.scanRadius);
    }
}).setCriteria("${message}");

register("step", () => {
    if (settings.boolLoopChestHighlight == true) findChests(settings.scanRadius);
}).setDelay(1);