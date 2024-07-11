import settings from "../utils/config";
import constants from "../utils/constants";
import values from "../utils/values";

const regex = /x(\d+(,\d+)?)/;
const flawlessRegex = /Flawless (\w+) Gemstone/;

let tempSwitch = settings.boolCompactPowder;
let deleteMsg = false;
let treasures = {};

register("chat", (message, event) => {
    let amount = null;
    let msg = message.removeFormatting();

    if (deleteMsg == true) {
        cancel(event);
        let matchmsg = regex.exec(msg);
        if (matchmsg) amount = parseInt(matchmsg[1].replace(",", ""));
        else amount = 1;
    }

    if (msg.includes(constants.PowderChestMessageLine)){
        if (settings.boolCompactPowder == true){
            if (deleteMsg == false){
                deleteMsg = true;
                cancel(event);
            }
            else {
                sendCompactMessage();
            }
        }
    }

    if (msg.includes("Mithril Powder")){
        if (values.doublePowder == true) amount *= 2;
        treasures["Mithril Powder&r"] = `&a${amount}`;
    }
    else if (msg.includes("Gemstone Powder")){
        if (values.doublePowder == true) amount *= 2;
        treasures["Gemstone Powder&r"] = `&d${amount}`;
    }
    else if (msg.includes("Essence") && settings.boolCompactEssence == true){
        if (msg.includes("Gold")){
            treasures["Gold Essence&r"] = `&e${amount}`;
        }
        else treasures["Diamond Essence&r"] = `&b${amount}`;
    }
    else if (msg.includes("Flawless") && settings.boolCompactFlawless == true){
        let flawlessMatch = flawlessRegex.exec(msg);
        treasures[`Flawless ${flawlessMatch[1]} Gemstone&r`] = `&5${amount}`;
    }
    else if (msg.includes("Goblin Egg") && settings.boolCompactEgg == true){
        if (msg.includes("Green")){
            treasures["Green Goblin Egg&r"] = `&a${amount}`;
        }
        else if (msg.includes("Yellow")){
            treasures["Yellow Goblin Egg&r"] = `&e${amount}`;
        }
        else if (msg.includes("Red")){
            treasures["Red Goblin Egg&r"] = `&c${amount}`;
        }
        else if (msg.includes("Blue")){
            treasures["Blue Goblin Egg&r"] = `&9${amount}`;
        }
        else {
            treasures["Goblin Egg&r"] = `&3${amount}`;
        }
    }
    else if (settings.boolCompactRobot == true){
        if (msg.includes("Control Switch")){
            treasures["Control Switch&r"] = `&9${amount}`;
        }
        else if (msg.includes("Electron Transmitter")){
            treasures["Electron Transmitter&r"] = `&9${amount}`;
        }
        else if (msg.includes("FTX 3090")){
            treasures["FTX 3090&r"] = `&9${amount}`;
        }
        else if (msg.includes("Robotron Reflector")){
            treasures["Robotron Reflector&r"] = `&9${amount}`;
        }
        else if (msg.includes("Superlite Motor")){
            treasures["Superlite Motor&r"] = `&9${amount}`;
        }
        else if (msg.includes("Synthetic Heart")){
            treasures["Synthetic Heart&r"] = `&9${amount}`;
        }
    }
    else if (msg.includes("Treasurite") && settings.boolCompactTreasurite == true){
        treasures["Treasurite&r"] = `&5${amount}`;
    }

}).setCriteria("${message}");

function sendCompactMessage(){
    let compactMessage = "&eYou received &r";
    let treasureCount = 0;

    // Mithril Powder
    if (treasures["Mithril Powder&r"]) {
        compactMessage += `${treasures["Mithril Powder&r"]} Mithril Powder&r`;
        treasureCount++;
    }

    // Gemstone Powder
    if (treasures["Gemstone Powder&r"]) {
        if (treasureCount > 0) {
            compactMessage += "&e and &r";
        }
        compactMessage += `${treasures["Gemstone Powder&r"]} Gemstone Powder&r`;
        treasureCount++;
    }

    // Other Crap
    for (let treasure in treasures) {
        if (treasure !== "Mithril Powder&r" && treasure !== "Gemstone Powder&r") {
            if (treasureCount > 0) {
                compactMessage += "&e, &r";
            }
            compactMessage += `${treasures[treasure]} ${treasure}`;
            treasureCount++;
        }
    }

    compactMessage += "&e. &r";

    // Apply 2x Message
    if ((treasures["Mithril Powder&r"] || treasures["Gemstone Powder&r"]) && values.doublePowder == true) {
        compactMessage += "&3 (2x Powder)&r";
    }

    if (treasureCount > 0) {
        ChatLib.chat(compactMessage);
    }

    // Reset values
    treasures = {};
    deleteMsg = false;
}

register("step", () =>{
    if (values.inCH == true){
        if (TabList.getNames().join("").includes("2x Powder")){
            values.doublePowder = true;
        }
        else values.doublePowder = false;
    }
    values.save();

    if (tempSwitch !== settings.boolCompactPowder){
        if (settings.boolCompactPowder == true) deleteMsg = false;
        tempSwitch = settings.boolCompactPowder;
    }
    
}).setDelay("1");
