import settings from "../utils/config";
import values from "../utils/values";
import constants from "../utils/constants";

let tempWidthComparator = null;

const BalSpawnOverlay = new Text("");
const Bal75Overlay = new Text("");
const Bal50Overlay = new Text("");
const Bal33Overlay = new Text("");
const BalDeathOverlay = new Text("");
const BalStatusOverlay = new Text("");
const BalSpawningHUD = new Text("");
const BalAliveHUD = new Text("");
const BalDeadHUD = new Text("");

register("tick", () => {
    if (values.inCH == true){
        //find bal
        const balEntity = World.getAllEntitiesOfType(Java.type("net.minecraft.entity.monster.EntityMagmaCube").class).find(cube => cube.getWidth().toFixed(1) !== "1.5" && cube.getWidth().toFixed(1) !== "0.0");
        if (balEntity){
            values.balWidth = balEntity.getWidth().toFixed(1);
            values.balFound = true;
        }
        else {
            values.balWidth = null;
            values.balFound = false;
        }
        values.save();
        if (values.balWidth !== 13.3 && values.balStatus !== "dead"){ // not alive
            if (values.balWidth == 1.0){
                if (!values.balSpawning1_5Lock){
                    values.balSpawning1_5Lock = true;
                    setTimeout(() => {
                        values.balSpawning1_5Lock = null;
                        values.save();
                    }, 4500);
                }
            }
            values.save();
            if ((!values.balSpawnPosX || !values.balSpawnPosY || !values.balSpawnPosZ) && values.balWidth < 12.8 && values.balWidth !== null) {
                ChatLib.chat("&b[&cBal&6Addons&b]&r &4Bal&r &5spawn&r (dead bal) has been identified!");
                values.balSpawnPosX = balEntity.getX();
                values.balSpawnPosY = balEntity.getY();
                values.balSpawnPosZ = balEntity.getZ();
                ChatLib.chat(`&b[&cBal&6Addons&b]&r &5balPos&r set as ${values.balSpawnPosX}, ${values.balSpawnPosY}, ${values.balSpawnPosZ}`);
            }
            
            if(tempWidthComparator){
                if(tempWidthComparator < values.balDeadWidth){ //bal size increased
                    values.balStatus = "spawning";
                    console.log("comparator spawning")
                }
                else if(tempWidthComparator > values.balDeadWidth){ //bal size decreased
                    values.balStatus = "dying";
                    console.log("comparator dying")
                }
            }
            else tempWidthComparator = values.balDeadWidth;
        }
        if (values.balWidth == 13.3){
            values.balStatus = "alive";
            values.balAlivePosX = balEntity.getX();
            values.balAlivePosY = balEntity.getY();
            values.balAlivePosZ = balEntity.getZ();
            console.log("width alive")
        }
        if(!values.balWidth && !values.balSpawning1_5Lock){
            values.balStatus = "dead";
        }
        if (values.balSpawnPosX && values.balSpawnPosY && values.balSpawnPosZ){
            values.balSpawnDist = Player.asPlayerMP().distanceTo(values.balSpawnPosX, values.balSpawnPosY, values.balSpawnPosZ).toFixed(1);
        }
        values.save();
        //ChatLib.chat(values.balSpawningTimerSecond)
    }
});

register("renderOverlay", RenderOverlays);

//call all overlay renders here
function RenderOverlays(){
    if (values.inCH == true){
        //add renders as needed
        if (values.BalSpawnOverlayToggle == true) BalSpawnOverlay.draw();
        if (values.bal75OverlayToggle == true) Bal75Overlay.draw();
        if (values.bal50OverlayToggle == true) Bal50Overlay.draw();
        if (values.bal33OverlayToggle == true) Bal33Overlay.draw();
        if (values.balDeathOverlayToggle == true) BalDeathOverlay.draw();
        if (values.balStatusOverlayToggle == true) BalStatusOverlay.draw();
        if (values.balSpawningHUDToggle == true) BalSpawningHUD.draw();
        if (values.balAliveHUDToggle == true) BalAliveHUD.draw();
        if (values.balDeadHUDToggle == true) BalDeadHUD.draw();
    }
}

register("renderWorld", RenderWorld);

//call all world renders here
function RenderWorld(){
    if (values.inCH == true){
        //add renders as needed
        if (values.balSpawningTimerWorldToggle == true) Tessellator.drawString(`${balSpawningTimerSecond} seconds`, values.balSpawnPosX, values.balSpawnPosY, values.balSpawnPosZ, Renderer.WHITE, true, 1.5, true)
        if (values.balDeadTimerWorldToggle == true) Tessellator.drawString(`${balDeadTimerSecond} seconds`, values.balSpawnPosX, values.balSpawnPosY, values.balSpawnPosZ, Renderer.WHITE, true, 1.5, true)
            // Tessellator.scale
        if (values.balSpawnPosX && values.balSpawnPosY && values.balSpawnPosZ && (settings.boolBalWaypoint = true)) Tessellator.drawString(`Bal ${values.balSpawnDist}m`, values.balSpawnPosX, values.balSpawnPosY, values.balSpawnPosZ, Renderer.WHITE, true, 1.5, true)
    }
}

register("chat", (message) => {
    //add message triggers here, turn on and off toggle to the render, aswell as updating bal's status for the gui
    if(message.removeFormatting().includes(constants.BalSpawnMessage)){
        if(settings.boolBalSpawn == true){
            console.log("balspawn")
            BalSpawnOverlay.setString(settings.txtBalSpawn).setX(200).setY(200).setScale(3).setColor(settings.colorBalSpawn.getRGB());
            values.balSpawnOverlayToggle = true;
            values.balStatus = "spawning";
            console.log("message spawning")
            values.balHealth = 250;
            values.save();
            setTimeout(() => {
                values.balSpawnOverlayToggle = false;
                values.save();
            }, 1500);
        }

        //start spawning timer
    }

    if(message.removeFormatting().includes(constants.Bal75Message)){
        if(settings.boolBal75 == true){
            console.log("bal75")
            Bal75Overlay.setString(settings.txtBal75).setX(200).setY(200).setScale(3).setColor(settings.colorBal75.getRGB());
            values.bal75OverlayToggle = true;
            values.balHealth = 187;
            values.save();
            setTimeout(() => {
                values.bal75OverlayToggle = false;
                values.save();
            }, 1500);
        }
    }

    if(message.removeFormatting().includes(constants.Bal50Message)){
        if(settings.boolBal50 == true){
            console.log("bal50")
            Bal50Overlay.setString(settings.txtBal50).setX(200).setY(200).setScale(3).setColor(settings.colorBal50.getRGB());
            values.bal50OverlayToggle = true;
            values.balHeatlh = 125;
            values.save();
            setTimeout(() => {
                values.bal50OverlayToggle = false;
                values.save();
            }, 1500);
        }
    }

    if(message.removeFormatting().includes(constants.Bal33Message)){
        if(settings.boolBal33 == true){
            console.log("bal33")
            Bal33Overlay.setString(settings.txtBal33).setX(200).setY(200).setScale(3).setColor(settings.colorBal33.getRGB());
            values.bal33OverlayToggle = true;
            values.balHealth = 83;
            values.save();
            setTimeout(() => {
                values.bal33OverlayToggle = false;
                values.save();
            }, 1500);
        }
    }

    if(message.removeFormatting().includes(constants.BalDeathMessage)){
        if(settings.boolBalDeath == true){
            console.log("baldeath")
            BalDeathOverlay.setString(settings.txtBalDeath).setX(200).setY(200).setScale(3).setColor(settings.colorBalDeath.getRGB());
            values.balDeathOverlayToggle = true;
            values.balHealth = 0;
            values.balStatus = "dying";
            console.log("message dying")
            values.save();
            setTimeout(() => {
                values.balDeathOverlayToggle = false;
                values.save();
            }, 1500);
        }
    }

}).setCriteria("${message}");

//balStatus listeners

register("tick", () => {
    if (values.balStatus == "spawning"){
        values.BalSpawningHUDToggle = true;
        values.balAliveHUDToggle = false;
        values.balDeadHUDToggle = false;
        values.save();
        BalSpawningHUD.setString(`Bal Status: Spawning\nTimer: ${values.balSpawningTimerSecond} sec`).setX(200).setY(300).setColor(settings.colorBalHUD.getRGB());
    }
    if (values.balStatus == "alive"){
        values.BalSpawningHUDToggle = false;
        values.balAliveHUDToggle = true;
        values.balDeadHUDToggle = false;
        values.save();
        BalAliveHUD.setString(`Bal Status: Alive\nHP Estimate: ${values.balHealth} HP`).setX(200).setY(300).setColor(settings.colorBalHUD.getRGB()); 
    }
    if (values.balStatus == "dead"){
        values.BalSpawningHUDToggle = false;
        values.balAliveHUDToggle = false;
        values.balDeadHUDToggle = true;
        values.save();
        BalSpawningHUD.setString(`Bal Status: Dead\nTimer: ${values.balDeadTimerSecond} sec`).setX(200).setY(300).setColor(settings.colorBalHUD.getRGB()); 
    }
})
