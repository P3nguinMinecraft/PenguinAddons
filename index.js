console.log("[BalAddons] Loading config")
import "./utils/config";
console.log("[BalAddons] Loading commands");
import "./utils/commands";
console.log("[BalAddons] Loading worldLoad");
import "./utils/worldLoad";
console.log("[BalAddons] Loading LobbySwap");
import "./features/LobbySwap";
console.log("[BalAddons] Loading BalStatus");
import "./features/BalStatus";
console.log("[BalAddons] Loading BalTimer");
import "./features/BalTimer";
console.log("[BalAddons] Loading ChestHighlight");
import "./features/ChestHighlight";
console.log("[BalAddons] Loaded!");
ChatLib.chat("&b[&cBal&6Addons&b]&r Loaded!");