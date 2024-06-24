import values from "./values";
import { getArea } from "./skyblock";
register("WorldLoad", () => {
    setTimeout(() => {
        //if (values.area.includes("Crystal Hollows")){ //apparently area is the biomes not "Crystal Hollows"
        if (TabList.getNames().join("").includes("Crystal Hollows")){
            values.inCH = true
            ChatLib.chat("&b[&cBal&6Addons&b]&r You are in the &eCrystal Hollows&r. &4Bal&r features enabled.")
        }
        else values.inCH = false
        values.save();
    },3000)
    if(values.tempswap){
        console.log(`[BalAddons] Rewarping to ${values.tempswap} in 3 seconds.`);
        setTimeout(() => {
            ChatLib.command(`warp ${values.tempswap}`);
            values.tempswap = null;
            values.save();
        },3000)
    }
})

register("WorldLoad", () => {
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
    console.log("[BalAddons] Registered WorldLoad, variables reset");
})
