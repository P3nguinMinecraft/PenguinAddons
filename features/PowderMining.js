import settings from "../utils/config";
import constants from "../utils/constants";
import values from "../utils/values";

const regex = /x(\d+(,\d+)?)/;
const flawlessRegex = /Flawless (\w+) Gemstone/;

let openCheck = false;
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

    if (msg.includes(constants.ChestOpenedMessage1) || msg.includes(constants.ChestOpenedMessage2)){
        openCheck = true;
        setTimeout(() => {openCheck = false;}, 100);
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
    let hasTreasures = false;
    let treasureCount = 0;

    // Mithril Powder
    if (treasures["Mithril Powder&r"]) {
        compactMessage += `${treasures["Mithril Powder&r"]} Mithril Powder&r`;
        treasureCount++;
        hasTreasures = true;
    }

    // Gemstone Powder
    if (treasures["Gemstone Powder&r"]) {
        if (treasureCount > 0 && hasTreasures) {
            compactMessage += "&e and &r";
        }
        compactMessage += `${treasures["Gemstone Powder&r"]} Gemstone Powder&r`;
        treasureCount++;
        hasTreasures = true;
    }

    // Other Crap
    for (let treasure in treasures) {
        if (treasure !== "Mithril Powder&r" && treasure !== "Gemstone Powder&r") {
            if (treasureCount > 0 && hasTreasures) {
                compactMessage += "&e, &r";
            }
            compactMessage += `${treasures[treasure]} ${treasure}`;
            treasureCount++;
            hasTreasures = true;
        }
    }

    // Apply 2x Message
    if ((treasures["Mithril Powder&r"] || treasures["Gemstone Powder&r"]) && values.doublePowder == true) {
        if (treasureCount > 0 && hasTreasures) {
            compactMessage += "&e and &r";
        }
        compactMessage += "&3 (2x Powder)&r";
    }

    compactMessage += "&e. &r";

    if (hasTreasures) {
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
}).setDelay("1");
