import settings from "../utils/config";
import constants from "../utils/constants";

const mithrilRegex = /Mithril Powder x(\d+)(,\d+)?/;
const gemstoneRegex = /Gemstone Powder x(\d)+(,\d+)?/;
const goblinEggRegex = /Goblin Egg x\d+/;

let openCheck = false;
let deleteMsg = false;
let mpowder = 0;
let gpowder = 0;
let treasures = {};


register("chat", (message, event) => {
    if (deleteMsg == true) cancel(event);
    let msg = message.removeFormatting();
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
        let matchmsg = msg.match(mithrilRegex);
        let mithrilAmount = parseInt(matchmsg[0].split("x")[1].replace(",", ""));
        mpowder += mithrilAmount;
        ChatLib.chat(`Received ${mithrilAmount} Mithril Powder`);
    }
    else if (msg.includes("Gemstone Powder")){
        let matchmsg = msg.match(gemstoneRegex);
        let gemstoneAmount = parseInt(matchmsg[0].split("x")[1].replace(",", ""));
        gpowder += gemstoneAmount;
        ChatLib.chat(`Received ${gemstoneAmount} Gemstone Powder`);
    }
    else if (msg.includes("Goblin Egg") && settings.boolCompactEgg == true){
        let matchmsg = msg.match(goblinRegex);
        let eggAmount = parseInt(matchmsg[0].split("x")[1]);
        if (msg.includes("Green")){
            treasures["Green Goblin Egg&r"] = `&a${eggAmount}`;
        }
        else if (msg.includes("Yellow")){
            treasures["Yellow Goblin Egg&r"] = `&e${eggAmount}`;
        }
        else if (msg.includes("Red")){
            treasures["Red Goblin Egg&r"] = `&c${eggAmount}`;
        }
        else if (msg.includes("Blue")){
            treasures["Blue Goblin Egg&r"] = `&9${eggAmount}`;
        }
        else {
            treasures["Goblin Egg&r"] = `&3${eggAmount}`;
        }
    }


}).setCriteria("${message}");

function sendCompactMessage(){
    let compactMessage = "&eYou received &r";

    if (mpowder > 0){
        compactMessage += `&a${mpowder} Mithril Powder&r`;
    }
  
    if (gpowder > 0){
        if (mpowder > 0) {
          compactMessage += "&e and &r";
        }
        compactMessage += `&5${gpowder} Gemstone Powder&r`;
    }
  
    let treasureCount = 0;
    for (let treasure in treasures) {
        compactMessage += `${treasures[treasure]} ${treasure}`;
        treasureCount++;
        if (treasureCount < Object.keys(treasures).length) {
            compactMessage += ", ";
        }
    }
  
    if (treasureCount > 0) {
        if (mpowder > 0 || gpowder > 0) {
          compactMessage += " and ";
        }
    }
  
    compactMessage += ".";
    if (mpowder > 0 || gpowder > 0 || treasureCount > 0) {
        ChatLib.chat(compactMessage);
    }

    // reset values
    mpowder = 0;
    gpowder = 0;
    treasures = {};

}