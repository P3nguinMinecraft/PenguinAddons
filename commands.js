import settings from "./utils/config"
import values from "./utils/values"
import { lobbySwap } from "./features/LobbySwap"
register('command', (parameters) => {
    const bahelp = new TextComponent("&b[&cBal&6Addons&b]&r &c/baladdons &r&e&oHover for more details.").setHoverValue("&r&4Command: &7&o&n/baladdons &eAliases: &7&o&n/ba, /bal, /baladdon. &bProper use is &7&o&n'/baladdons &a&o&n(parameter)'. &6Parameter: &8Tab for all possible parameters. &dNothing/Help: &7Opens this help page. &dConfig: &7Opens config. &dValues: &7Dumps all values for debug purposes. &dVersion: &7Prints module version.");
    const lshelp = new TextComponent("&b[&cBal&6Addons&b]&r &c/lobbyswap &r&e&oHover for more details.").setHoverValue("&r&4Command: &7&o&n/lobbyswap &eAliases: &7&o&n/ls, /lswap, /swap, /lobbyhop, /lh. &bProper use is &7&o&n'/lobbyswap &a&o&n(location) (swap location)'. &6Location: &8Skyblock Island you want to lobby hop in. &dSwap Location: &8Skyblock Island you want to use as a middleman. &4Both Location and Swap Location need to be unlocked travel scrolls (or default) that is compatible with &7&o/warp &c&o{name}. &8Use 'name' in the command. Exp: Switching crystal hollows lobby and using hub as a middleman: &7&o/lobbyswap &ach hub");
    if (parameters == null) {
        ChatLib.chat("&b[&cBal&6Addons&b]&r &eCommand Help")
        ChatLib.chat(bahelp)
        ChatLib.chat(lshelp)
        return;
    }
    switch (parameters.toString().toLowerCase()) {
        case "config":
            ChatLib.chat('&b[&cBal&6Addons&b]&r Opening BalAddons Config Gui...')
            settings.openGUI();
            return;
        case "help":
            ChatLib.chat("&b[&cBal&6Addons&b]&r &eCommand Help")
            ChatLib.chat(bahelp)
            ChatLib.chat(lshelp)
            break;
        case "soundtest":
            World.playSound("random.successful_hit", 10, 1)
            break;
        case "values": 
            let output = `&4DEBUG VALUE DUMP &r\n` + 
                `balStatus: ${values.balStatus}, \n` +
                `balFound: ${values.balFound}, \n` +
                `balSpawning1_5Lock: ${values.balSpawning1_5Lock}, \n` +
                `balSpawnPosX: ${values.balSpawnPosX}, \n` +
                `balSpawnPosY: ${values.balSpawnPosY}, \n` +
                `balSpawnPosZ: ${values.balSpawnPosZ}, \n` +
                `balSpawnDist: ${values.balSpawnDist}, \n` +
                `balWidth: ${values.balWidth}, \n` +
                `balHealth: ${values.balHealth}, \n` +
                `balAlivePosX: ${values.balAlivePosX}, \n` +
                `balAlivePosY: ${values.balAlivePosY}, \n` +
                `balAlivePosZ: ${values.balAlivePosZ}, \n` +
                `area: ${values.area}, \n` +
                `inCH: ${values.inCH}, \n` +
                `tempswap: ${values.tempswap}, \n` +
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
            ChatLib.chat(output);
            break;
        case "version":
            ChatLib.chat(`&b[&cBal&6Addons&b]&r &3Version: &d${values.version}`)
            break;
        default: 
            ChatLib.chat("&b[&cBal&6Addons&b]&r Parameters not supported.")
            break;
    }
}).setName('baladdons').setAliases('ba','bal','baladdon').setTabCompletions('config','help','values','version')

register("command", (location, swap) => {
    lobbySwap(location, swap)
}).setName("lobbyswap").setAliases("ls", "lswap", "swap", "lobbyhop", "lh");