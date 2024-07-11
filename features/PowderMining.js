import settings from "../utils/config";
import constants from "../utils/constants";
import values from "../utils/values";

const regex = /x(\d+(,\d+)?)/;
const flawlessRegex = /Flawless (\w+) Gemstone/;

let openCheck = false;
let deleteMsg = false;
let mpowder = 0;
let gpowder = 0;
let treasures = {};


register("chat", (message, event) => {
    let amount = null;
    if (deleteMsg == true) cancel(event);
    let msg = message.removeFormatting();
    let matchmsg = regex.exec(msg);
    if (matchmsg) amount = parseInt(matchmsg[0].split("x")[1].replace(",", ""));
    else amount = 1;

    if (msg.includes(constants.ChestOpenedMessage1) || msg.includes(constants.ChestOpenedMessage2)){
        openCheck = true;
        setTimeout(() => {openCheck = false;}, 100);
    }
    if (msg.includes(constants.PowderChestMessageLine)){
        if (settings.boolCompactPowder == true){
            if (deleteMsg == false){
                deleteMsg = true;
                cancel(event);
                setTimeout(() => {
                    deleteMsg = false;
                },100)
            }
            else {
                deleteMsg = false;
                sendCompactMessage();
            }
        }
    }

    if (msg.includes("Mithril Powder")){
        mpowder = amount;
        if (values.doublePowder == true) mpowder *= 2;
    }
    else if (msg.includes("Gemstone Powder")){
        gpowder = amount;
        if (values.doublePowder == true) gpowder *= 2;
    }
    else if (msg.includes("Essence") && settings.boolCompactEssence == true){
        if (msg.includes("Gold")){
            treasures["Gold Essence&r"] = `&e${amount}`;
        }
        else treasures["Diamond Essence&r"] = `&b${amount}`;
    }
    else if (msg.includes("Flawlesss") && settings.boolCompactFlawless == true){
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
    for (let treasure in treasures) {
        compactMessage += `${treasures[treasure]} ${treasure}`;
        treasureCount++;
        if (treasureCount < Object.keys(treasures).length) {
            compactMessage += "&e, &r";
        }
    }

    if (mpowder > 0){
        if (treasureCount > 0) {
            compactMessage += "&e and &r";
        }
        compactMessage += `&a${mpowder} Mithril Powder&r`;
    }
  
    if (gpowder > 0){
        if (treasureCount > 0 || mpowder > 0) {
            compactMessage += "&e and &r";
        }
        compactMessage += `&d${gpowder} Gemstone Powder&r`;
    }

    if ((mpowder > 0 || gpowder > 0) && values.doublePowder == true) compactMessage += "&3(2x Powder)&r"
  
    compactMessage += "&e. &r";
    if (mpowder > 0 || gpowder > 0 || treasureCount > 0) {
        ChatLib.chat(compactMessage);
    }

    // reset values
    mpowder = 0;
    gpowder = 0;
    treasures = {};

}

register("step", () =>{
    if (values.inCH == true){
        if (TabList.getNames().join("").includes("2x Powder")){
            values.doublePowder = true;
        }
        else values.doublePowder = false;
    }
    values.save();
}).setDelay("1")