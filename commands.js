import settings from "./utils/config"
import values from "./utils/values"
register('command', () => {
    ChatLib.chat('&b[&cBal&6Addons&b]&r Opening BalAddons Config Gui...')
    settings.openGUI();
}).setName('baladdons').setAliases('ba','bal','balconfig')

let output = `blank somehow`

register('command', () => {
    output = `DEBUG DUMP \n` + 
    `balStatus: ${values.balStatus}, \n` +
             `balSpawning1_5Lock: ${values.balSpawning1_5Lock}, \n` +
             `balSpawnPosX: ${values.balSpawnPosX}, \n` +
             `balSpawnPosY: ${values.balSpawnPosY}, \n` +
             `balSpawnPosZ: ${values.balSpawnPosZ}, \n` +
             `balSpawnDist: ${values.balSpawnDist}, \n` +
             `balDeadWidth: ${values.balDeadWidth}, \n` +
             `balHealth: ${values.balHealth}, \n` +
             `balAlivePosX: ${values.balAlivePosX}, \n` +
             `balAlivePosY: ${values.balAlivePosY}, \n` +
             `balAlivePosZ: ${values.balAlivePosZ}, \n` +
             `area: ${values.area}, \n` +
             `inCH: ${values.inCH}, \n` +
             `balSpawnOverlayToggle: ${values.balSpawnOverlayToggle}, \n` +
             `bal75Overlaytoggle: ${values.bal75Overlaytoggle}, \n` +
             `bal50Overlaytoggle: ${values.bal50Overlaytoggle}, \n` +
             `bal33OverlayToggle: ${values.bal33OverlayToggle}, \n` +
             `balDeathOverlayToggle: ${values.balDeathOverlayToggle}, \n` +
             `balStatusOverlayToggle: ${values.balStatusOverlayToggle}, \n` +
             `balSpawningTimerWorldToggle: ${values.balSpawningTimerWorldToggle}, \n` +
             `balSpawningTimerTick: ${values.balSpawningTimerTick}, \n` +
             `balSpawningTimerSecond: ${values.balSpawningTimerSecond}, \n` +
             `balDeadTimerTick: ${values.balDeadTimerTick}, \n` +
             `balDeadTimerSecond: ${values.balDeadTimerSecond}, \n` +
             `balSpawningHUDToggle: ${values.balSpawningHUDToggle}, \n` +
             `balAliveHUDToggle: ${values.balAliveHUDToggle}, \n` +
             `balDeadHUDToggle: ${values.balDeadHUDToggle}`;
             World.playSound("random.successful_hit", 10, 1)
console.log(output);
ChatLib.chat(output);
}).setName('badebug');
