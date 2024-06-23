console.log("[BalAddons] Loading 1");
import "./utils/config";
console.log("[BalAddons] Loading 2");
import "./features/LobbySwap";
console.log("[BalAddons] Loading 3");
import "./features/BalStatus";
console.log("[BalAddons] Loading 4");
import "./features/BalTimer"
console.log("[BalAddons] Loading 5");
import "./utils/WorldLoad";
console.log("[BalAddons] Loading 6");
import "./commands";
console.log("[BalAddons] Loaded!")

import RenderLib from "../RenderLib";

ChatLib.chat("&b[&cBal&6Addons&b]&r Loaded!");

//register("tick", () => {
//   World.getAllEntitiesOfType(Java.type("net.minecraft.entity.monster.EntityMagmaCube").class).forEach(cube => {
//        if (cube.getWidth().toFixed(1) != 1.5 && cube.getWidth().toFixed(1) != 0.0) ChatLib.chat(`Bal Width: ${cube.getWidth().toFixed(1)}`)
//    })
//})

// Set the radius to scan around the player
const scanRadius = 5;
const foundChests = []; // List to store found chests

register("tick", () => {
    let PlayerX = parseInt(Player.getX().toFixed(0));
    let PlayerY = parseInt(Player.getY().toFixed(0));
    let PlayerZ = parseInt(Player.getZ().toFixed(0));
    foundChests.length = 0; // Clear the list at the start of each tick

    for (let x = -scanRadius; x <= scanRadius; x++) {
        for (let y = -scanRadius; y <= scanRadius; y++) {
            for (let z = -scanRadius; z <= scanRadius; z++) {
                let LocX = PlayerX + x;
                let LocY = PlayerY + y;
                let LocZ = PlayerZ + z;
                
                let block = World.getBlockAt(LocX, LocY, LocZ);
                if (block.getType().getRegistryName().includes("minecraft:chest")) {
                    ChatLib.chat(`§cChest found at: §a${LocX}, ${LocY}, ${LocZ}`);
                    foundChests.push({ x: LocX, y: LocY, z: LocZ }); // Add to list of chests per tick
                }
            }
        }
    }
});

register("renderWorld", () => {
    highlightBlocks();
});

function highlightBlocks() {
    foundChests.forEach(chest => {
        RenderLib.drawEspBox(chest.x, chest.y, chest.z, 1.1, 1.1, 0, 1, 0, 0.5, true);
    });
}
