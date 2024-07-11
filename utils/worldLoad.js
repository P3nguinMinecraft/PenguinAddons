import values from "./values";
import { resetChests } from "../features/ChestHighlight";
register("worldLoad", () => {
    setTimeout(() => {
        //if (values.area.includes("Crystal Hollows")){ //apparently area is the biomes not "Crystal Hollows"
        if (TabList.getNames().join("").includes("Crystal Hollows")){
            values.inCH = true;
            console.log("[PenguinAddons] You are in the Crystal Hollows. Bal features enabled.");
            if (TabList.getNames().join("").includes("2x Powder")){
                ChatLib.chat("&b[&cPenguin&6Addons&b]&r &32x Powder!");
                values.doublePowder = true;
            }
            else values.doublePowder = false;
        }
        else values.inCH = false
        
        values.save();
    },3000)
    if(values.tempswap){
        console.log(`[PenguinAddons] Rewarping to ${values.tempswap} in 3 seconds.`);
        setTimeout(() => {
            ChatLib.command(`warp ${values.tempswap}`);
            values.tempswap = null;
            values.save();
        },3000)
    }
})

register("worldLoad", () => {
    values.version = "0.0.2";
    values.balStatus = null;
    values.balFound = null;
    values.balSpawning1_5Lock = null;
    values.balSpawnPosX = null;
    values.balSpawnPosY = null;
    values.balSpawnPosZ = null;
    values.balSpawnDist = null;
    values.balWidth = null;
    values.balHealth = null;
    values.balAlivePosX = null;
    values.balAlivePosY = null;
    values.balAlivePosZ = null;
    values.area = null;
    values.inCH = null;
    values.balSpawnOverlayToggle = false;
    values.bal75Overlaytoggle = false;
    values.bal50Overlaytoggle = false;
    values.bal33OverlayToggle = false;
    values.balDeathOverlayToggle = false;
    values.balStatusOverlayToggle = false;
    values.balSpawningTimerWorldToggle = false;
    values.balSpawningTimerTick = null;
    values.balSpawningTimerSecond = null;
    values.balDeadTimerWorldToggle = false;
    values.balDeadTimerTick = null;
    values.balDeadTimerSecond = null;
    values.balSpawningHUDToggle = false;
    values.balAliveHUDToggle = false;
    values.balDeadHUDToggle = false;

    values.save();

    resetChests();
    console.log("[PenguinAddons] Registered WorldLoad, variables reset");
})
