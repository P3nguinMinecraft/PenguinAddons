import settings from "../utils/config";
import values from "../utils/values";
export default function lobbySwap(location, swap) {
  let swaptoggle = null;
  const hoverableErrorForm = new TextComponent("&b[&cBal&6Addons&b]&r &cInvalid use of /lobbyswap. &r&e&oHover for more details.").setHoverValue("&r&4Command: &7&o&n/lobbyswap &eAliases: &7&o&n/ls, /lswap, /swap, /lobbyhop, /lh. &bProper use is &7&o&n'/lobbyswap &a&o&n(location) (swap location)'. &6Location: &8Skyblock Island you want to lobby hop in. &dSwap Location: &8Skyblock Island you want to use as a middleman. &4Both Location and Swap Location need to be unlocked travel scrolls (or default) that is compatible with &7&o/warp &c&o{name}. &8Use 'name' in the command. Exp: Switching crystal hollows lobby and using hub as a middleman: &7&o/lobbyswap &ach hub");
  const hoverableErrorDefault = new TextComponent("&b[&cBal&6Addons&b]&r &cInvalid use of &n&7&o/lobbyswap. &eYou are missing one or more default location/swap location values. Go to the config with &7&n&o/baladdons &e to add them, &aor provide the location and swap location in the command. ");

  // Toggle the swap
  swaptoggle = null;

  // Check if location is not provided or swap is provided but location isn't
  if (!location && !swap) {
    // Case 3: Neither location nor swap provided
    // Use default location and swap from settings
    if(!settings.defaultLocation || !settings.defaultSwap){
      ChatLib.chat(hoverableErrorDefault);
      swaptoggle = false;
    }
    else {
      location = settings.defaultLocation;
      swap = settings.defaultSwap;
      swaptoggle = true;
    }
  } 
  else if (location && !swap) {
    // Case 2: Only location is provided, swap is not provided
    // Use provided location, use swap from settings
    if(!settings.defaultSwap){
      ChatLib.chat(hoverableErrorDefault);
      swaptoggle = false;
     }
    else {
      swap = settings.defaultSwap;
      swaptoggle = true;
    }
  } 
  else if (location && swap) {
      // Case 1: Both location and swap are provided
      // Do nothing, use provided location and swap
      swaptoggle = true;
  } 
  else {
      // Invalid combination, handle accordingly
      ChatLib.chat(hoverableErrorForm);
      swaptoggle = false;
      return;
  }

  if(swaptoggle = true){
    // Chat message indicating the swap
    ChatLib.chat(`&b[&cBal&6Addons&b]&r Lobby swapping to &e${swap}&r and back to &e${location}&r!`);
    values.tempswap = location;
    values.save();
    // Execute the warp command to swap to the specified location
    ChatLib.command(`warp ${swap}`,false);
    // ChatTriggers will only send the command once world is loaded, so in WorldLoad.js
  }
}
