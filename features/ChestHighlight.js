import RenderLibV2 from "../../RenderLibV2";
import settings from "../utils/config";
import constants from "../utils/constants";
import values from "../utils/values";

const rightClick = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag", null)
rightClick.setAccessible(true);

let foundChests = new Set();
let tempbool = settings.boolChestHighlight;
let holdingPowderDrill = false;
let lookTarget = null;
let originalSlot = null;
let drillSlot = null;
let openCooldown = false;
let highlightWidth = 0;
let highlightHeight = 0;
let highlightOffset = 0;

function findChests(radius){
    const PlayerPos = Player.asPlayerMP();
    const currentChests = new Set(); // Create a new set for the current tick
    World.getWorld().field_147482_g.forEach(entity => {
        if (entity instanceof Java.type("net.minecraft.tileentity.TileEntityChest")){
            if (entity.field_145987_o > 0) return;
            const xn = entity.func_174877_v().func_177958_n();
            const yn = entity.func_174877_v().func_177956_o();
            const zn = entity.func_174877_v().func_177952_p();
            if (PlayerPos.distanceTo(xn, yn, zn).toFixed(1) > radius) return;
            currentChests.add({ x: xn + 0.5, y: yn, z: zn + 0.5 }); // Add to set of chests per tick
        }
    });

    // Remove chests from the foundChests set that are within radius blocks of the player
    foundChests = new Set([...foundChests].filter(chest => {
        return PlayerPos.distanceTo(chest.x, chest.y, chest.z) > radius;
    }));
    values.save();

    // Add all the currentChests to foundChests
    foundChests = new Set([...foundChests, ...currentChests]);
    values.save();
}

export function resetChests(){
    foundChests.clear();
}

function getDrillStatus(){
    if (Player.getHeldItem() && Player.getHeldItem().getID() == 409) {
        holdingPowderDrill = Player.getHeldItem().getLore().some((line) => {
            return line.includes("Mithril Powder") || line.includes("Gemstone Powder");
        });
    }
    else holdingPowderDrill = false;
}

function getSlot(){
    originalSlot = Player.getHeldItemIndex();
    let itemList = Player.getInventory().getItems();
    drillSlot = originalSlot;
    if (!holdingPowderDrill){
        for (let i = 0; i < 8; i++){
            let isDrill = 0;
            let isPowder = itemList[i].getLore().some((line) => {
                return line.includes("Mithril Powder") || line.includes("Gemstone Powder");
            });
            if (isPowder ) isDrill++;
            if (itemList[i].getID() == 409) isDrill++;
            if (isDrill == 2){
                drillSlot = i;
                break;
            }
        }
    }
}

register("renderWorld", () => {
    if (values.inCH ){
        if (settings.boolChestHighlightPhase ){
            highlightWidth = 0.875;
            highlightHeight = 0.875;
            highlightOffset = 0;
        }
        else {
            highlightWidth = 0.88;
            highlightHeight = 0.95;
            highlightOffset = 0.05
        }
        if (tempbool !== settings.boolChestHighlight){
            if (settings.boolChestHighlight ) findChests(settings.scanRadius);
            tempbool = settings.boolChestHighlight;
        }
        if (settings.boolChestHighlight){
            let chestCount = 0;
            if (Player.lookingAt() instanceof Block)
                lookTarget = Player.lookingAt();
            else lookTarget = null;
            foundChests.forEach(chest => { null;
                chestCount++;
                if (lookTarget && chest.x == lookTarget.x + 0.5 && chest.y == lookTarget.y && chest.z == lookTarget.z + 0.5){
                    if (settings.boolAutoOpenChest ){
                        Player.setHeldItemIndex(drillSlot);
                        if (!openCooldown){
                            rightClick.invoke(Client.getMinecraft());
                            openCooldown = true;
                            setTimeout(() => { openCooldown = false }, 100);
                        }
                    }
                    else {
                        getDrillStatus();
                        if (holdingPowderDrill )
                            RenderLibV2.drawInnerEspBox(chest.x, chest.y - highlightOffset, chest.z, highlightWidth, highlightHeight, 0, 1, 0, 1, settings.boolChestHighlightPhase); // x y z width height r g b a phase, thats green btw
                        else
                            RenderLibV2.drawInnerEspBox(chest.x, chest.y - highlightOffset, chest.z, highlightWidth, highlightHeight, 1, 1, 0, 1, settings.boolChestHighlightPhase); // x y z width height r g b a phase, thats yellow btw
                    }
                }
                else {
                    if (settings.boolAutoOpenChest ){
                        Player.setHeldItemIndex(settings.powderToolSlot-1);
                    }
                    RenderLibV2.drawInnerEspBox(chest.x, chest.y - highlightOffset, chest.z, highlightWidth, highlightHeight, 1, 0, 0, 1, settings.boolChestHighlightPhase); // x y z width height r g b a phase, thats red btw
                }
            });
            if (!chestCount > 0){
                if (settings.boolAutoOpenChest  && !openCooldown){
                    Player.setHeldItemIndex(settings.powderToolSlot-1);
                }
            }
        }
    }
});

register("chat", (message, event) => {
    if (message.removeFormatting().includes(constants.ChestFoundMessage)){
        getSlot();
        setTimeout(() => {
            if (settings.intChestScanMethod == 0) findChests(settings.scanRadius);
        }, 100);
    }

    if (message.removeFormatting().includes(constants.ChestOpenedMessage1) || message.removeFormatting().includes(constants.ChestOpenedMessage2)){
        if (settings.intChestScanMethod == 0) findChests(settings.scanRadius);
    }
}).setCriteria("${message}");

register("step", () => {
    if (settings.intChestScanMethod == 1 && values.inCH ) findChests(settings.scanRadius);
}).setDelay(1);