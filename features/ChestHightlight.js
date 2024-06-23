import settings from "../utils/config";
import constants from "../utils/constants";
import RenderLib from "../../RenderLib";

const foundChests = []; // List to store found chests

function findChests(radius){
    foundChests.length = 0; // Clear the list at the start of each tick
    let PlayerX = parseInt(Player.getX().toFixed(0));
    let PlayerY = parseInt(Player.getY().toFixed(0));
    let PlayerZ = parseInt(Player.getZ().toFixed(0));

    for (let x = -radius; x <= radius; x++) {
        for (let y = -radius; y <= radius; y++) {
            for (let z = -radius; z <= radius; z++) {
                let LocX = PlayerX + x;
                let LocY = PlayerY + y;
                let LocZ = PlayerZ + z;
                
                if (World.getBlockAt(LocX, LocY, LocZ).getType().getRegistryName().includes("minecraft:chest")) {
                    ChatLib.chat(`§cChest found at: §a${LocX}, ${LocY}, ${LocZ}`);
                    foundChests.push({ x: LocX + 0.5, y: LocY, z: LocZ + 0.5 }); // Add to list of chests per tick
                }
            }
        }
    }
};

register("renderWorld", () => {
    highlightBlocks();
});

function highlightBlocks() {
    foundChests.forEach(chest => {
        RenderLib.drawEspBox(chest.x, chest.y, chest.z, 1, 1, 1, 0, 0, 0.5, true); // x y z r g b a phase
    });
}
register("chat", (message) => {
    if(message.removeFormatting().includes(constants.ChestFoundMessage)){
        setTimeout(() => {
            if (settings.boolChestHighlight == true) findChests(settings.scanRadius);
        }, 50);
    }
    if(message.removeFormatting().includes(constants.ChestOpenedMessage)){
        setTimeout(() => {
            if (settings.boolChestHighlight == true) findChests(settings.scanRadius);
        }, 50);
    }
}).setCriteria("${message}");


