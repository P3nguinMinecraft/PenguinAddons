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
console.log("[BalAddons] Loading 7");
import "./features/ChestHightlight"
console.log("[BalAddons] Loaded!")
ChatLib.chat("&b[&cBal&6Addons&b]&r Loaded!");

//register("tick", () => {
//   World.getAllEntitiesOfType(Java.type("net.minecraft.entity.monster.EntityMagmaCube").class).forEach(cube => {
//        if (cube.getWidth().toFixed(1) != 1.5 && cube.getWidth().toFixed(1) != 0.0) ChatLib.chat(`Bal Width: ${cube.getWidth().toFixed(1)}`)
//    })
//})
