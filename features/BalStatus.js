import settings from "../utils/config";
import constants from "../utils/constants";
import values from "../utils/values";

let tempWidthComparator = null;
let deadHUD = false

const BalSpawnOverlay = new Text(""); // spawn alert
const Bal75Overlay = new Text(""); // 75 alert
const Bal50Overlay = new Text(""); // 50 alert
const Bal33Overlay = new Text(""); // 33 alert
const BalDeathOverlay = new Text(""); // death alert
const BalStatusHUD = new Text(""); // status HUD
const BalCoordHUD = new Text(""); // coord HUD

register("tick", () => {
    if (!values.inCH) return;
    //find bal
    let balEntity = World.getAllEntitiesOfType(Java.type("net.minecraft.entity.monster.EntityMagmaCube").class).find(cube => cube.getWidth().toFixed(1) !== "1.5" && cube.getWidth().toFixed(1) !== "0");
    if (balEntity){ 
        console.log(balEntity.getWidth().toFixed(1));
        values.balWidth = balEntity.getWidth().toFixed(1);
        values.balFound = true;
        console.log(`${balEntity.getX()} ${balEntity.getY()} ${balEntity.getZ()}`)
    }
    else {
        if (values.balWidth){
            values.balWidth = null;
            console.log("width set null");
        }
        values.balFound = false;
    }
    values.save();
    if (values.balWidth !== 13.3){ // not alive, entity exists but not full size
        if (values.balWidth == 1.0 || values.balWidth == 2.0){
            if (!values.balSpawning1_5Lock){
                values.balSpawning1_5Lock = true;
                setTimeout(() => {
                    values.balSpawning1_5Lock = null;
                    values.save();
                }, 4500);
            }
        }
        values.save();
        if ((!values.balSpawnPosX || !values.balSpawnPosY || !values.balSpawnPosZ) && values.balWidth < 13.3 && values.balWidth !== null){
            ChatLib.chat("&b[&cPenguin&6Addons&b]&r &4Bal&r &5spawn&r (dead bal) has been identified!");
            setTimeout(() => {
                values.balSpawnPosX = balEntity.getX();
                values.balSpawnPosY = balEntity.getY();
                values.balSpawnPosZ = balEntity.getZ();
                ChatLib.chat(`&b[&cPenguin&6Addons&b]&r &5balPos&r set as ${values.balSpawnPosX}, ${values.balSpawnPosY}, ${values.balSpawnPosZ}`);
            }, 500)
        }
        
        if(tempWidthComparator){
            if(tempWidthComparator < values.balWidth){ //bal size increased
                values.balStatus = "spawning";
                console.log(`comparator spawning, temp is ${tempWidthComparator} and width is ${values.balWidth}`)
                tempWidthComparator = values.balWidth;
            }
            else if(tempWidthComparator > values.balWidth){ //bal size decreased
                values.balStatus = "dying";
                console.log(`comparator dying, temp is ${tempWidthComparator} and width is ${values.balWidth}`)
                tempWidthComparator = values.balWidth;
            }
        }
        else tempWidthComparator = values.balWidth;
    }
    if (values.balWidth == 13.3){
        if (values.balStatus !== "alive"){
            values.balStatus = "alive";
            console.log("width alive")
        }
        values.balAlivePosX = balEntity.getX().toFixed(2);
        values.balAlivePosY = balEntity.getY().toFixed(2);
        values.balAlivePosZ = balEntity.getZ().toFixed(2);
        BalCoordHUD.setString(`Bal Coordinates\nX: ${values.balAlivePosX}\nY: ${values.balAlivePosY}\nZ: ${values.balAlivePosZ}`).setX(values.BalCoordHUDX).setY(values.BalCoordHUDY).setScale(values.balCoordHUDScale).setColor(settings.colorBalCoordHUD.getRGB())
    }
    if(!values.balWidth && !values.balSpawning1_5Lock && values.balStatus !== "dead"){
        values.balStatus = "dead";
        console.log("width dead")
    }
    if (values.balSpawnPosX && values.balSpawnPosY && values.balSpawnPosZ){
        values.balSpawnDist = Player.asPlayerMP().distanceTo(values.balSpawnPosX, values.balSpawnPosY, values.balSpawnPosZ).toFixed(1);
    }
    values.save();

});

register("renderOverlay", RenderOverlays);

//call all overlay renders here
function RenderOverlays(){
    if (!values.inCH) return;

    //add renders as needed
    if (values.BalSpawnOverlayToggle && settings.boolBalSpawn) BalSpawnOverlay.draw();
    if (values.bal75OverlayToggle && settings.boolBal75) Bal75Overlay.draw();
    if (values.bal50OverlayToggle && settings.boolBal50) Bal50Overlay.draw();
    if (values.bal33OverlayToggle && settings.boolBal33) Bal33Overlay.draw();
    if (values.balDeathOverlayToggle && settings.boolBalDeath) BalDeathOverlay.draw();
    if (values.balStatusHUDToggle && settings.boolBalStatusHUD) BalStatusHUD.draw();
    if (values.balCoordHUDToggle && settings.boolBalCoordHUD) BalCoordHUD.draw();
}

register("renderWorld", RenderWorld);

//call all world renders here
function RenderWorld(){
    if (!values.inCH) return;

    //add renders as needed
    if (values.balSpawningTimerWorldToggle && settings.boolBalSpawnTimer) Tessellator.drawString(`${balSpawningTimerSecond} seconds`, values.balSpawnPosX, values.balSpawnPosY, values.balSpawnPosZ, Renderer.WHITE, true, 1.5, true)
    if (values.balDeadTimerWorldToggle && settings.boolBalDeadTimer) Tessellator.drawString(`${values.balDeadTimerSecond} seconds`, values.balSpawnPosX, values.balSpawnPosY, values.balSpawnPosZ, Renderer.WHITE, true, 1.5, true)
        // Tessellator.scale
    if (values.balSpawnPosX && values.balSpawnPosY && values.balSpawnPosZ && (settings.boolBalWaypoint = true)) Tessellator.drawString(`Bal ${values.balSpawnDist}m`, values.balSpawnPosX, values.balSpawnPosY, values.balSpawnPosZ, Renderer.WHITE, true, 1.5, true)
}

register("chat", (message) => {
    if (!values.inCH) return;

    //add message triggers here, turn on and off toggle to the render, aswell as updating bal's status for the gui
    if(message.removeFormatting().includes(constants.BalSpawnMessage)){
        console.log("balspawn")
        BalSpawnOverlay.setString(settings.txtBalSpawn).setX(Renderer.screen.getWidth()/2).setY(Renderer.screen.getHeight()/2).setScale(5).setColor(settings.colorBalSpawn.getRGB()).setAlign("CENTER");
        values.balSpawnOverlayToggle = true;
        values.balStatus = "spawning";
        console.log("message spawning")
        values.balHealth = 200;
        values.save();
        setTimeout(() => {
            values.balSpawnOverlayToggle = false;
            values.save();
        }, 1500);
    }

    if(message.removeFormatting().includes(constants.Bal75Message)){
        console.log("bal75")
        Bal75Overlay.setString(settings.txtBal75).setX(Renderer.screen.getWidth()/2).setY(Renderer.screen.getHeight()/2).setScale(5).setColor(settings.colorBal75.getRGB()).setAlign("CENTER");
        values.bal75OverlayToggle = true;
        values.balHealth = 150;
        values.save();
        setTimeout(() => {
            values.bal75OverlayToggle = false;
            values.save();
        }, 1500);
    }

    if(message.removeFormatting().includes(constants.Bal50Message)){
        console.log("bal50")
        Bal50Overlay.setString(settings.txtBal50).setX(Renderer.screen.getWidth()/2).setY(Renderer.screen.getHeight()/2).setScale(5).setColor(settings.colorBal50.getRGB()).setAlign("CENTER");
        values.bal50OverlayToggle = true;
        values.balHeatlh = 100;
        values.save();
        setTimeout(() => {
            values.bal50OverlayToggle = false;
            values.save();
        }, 1500);
    }

    if(message.removeFormatting().includes(constants.Bal33Message)){
        console.log("bal33")
        Bal33Overlay.setString(settings.txtBal33).setX(Renderer.screen.getWidth()/2).setY(Renderer.screen.getHeight()/2).setScale(5).setColor(settings.colorBal33.getRGB()).setAlign("CENTER");
        values.bal33OverlayToggle = true;
        values.balHealth = 66;
        values.save();
        setTimeout(() => {
            values.bal33OverlayToggle = false;
            values.save();
        }, 1500);
    }
    
    if(message.removeFormatting().includes(constants.BalDeathMessage)){
        console.log("baldeath")
        BalDeathOverlay.setString(settings.txtBalDeath).setX(Renderer.screen.getWidth()/2).setY(Renderer.screen.getHeight()/2).setScale(5).setColor(settings.colorBalDeath.getRGB());
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

}).setCriteria("${message}");

//balStatus listeners

register("tick", () => {
    if (!values.inCH) return;

    if (values.balStatus == "spawning"){
        values.BalStatusHUDToggle = true;
        values.save();
        BalStatusHUD.setString(`Bal Status: Spawning\nTimer: ${values.balSpawningTimerSecond} sec`).setX(values.BalStatusHUDX).setY(values.BalStatusHUDY).setScale(values.BalStatusHUDScale).setColor(settings.colorBalStatusHUD.getRGB());
    }
    else if (values.balStatus == "alive"){
        values.BalStatusHUDToggle = true;
        values.save();
        BalStatusHUD.setString(`Bal Status: Alive\nHP Estimate: ${values.balHealth} HP`).setX(values.BalStatusHUDX).setY(values.BalStatusHUDY).setScale(values.BalStatusHUDScale).setColor(settings.colorBalStatusHUD.getRGB()); 
    }
    else if (values.balStatus == "dead" && deadHUD){
        values.BalStatusHUDToggle = true;
        values.save();
        BalStatusHUD.setString(`Bal Status: Dead\nTimer: ${values.balDeadTimerSecond} sec`).setX(values.BalStatusHUDX).setY(values.BalStatusHUDY).setScale(values.BalStatusHUDScale).setColor(settings.colorBalStatusHUD.getRGB()); 
    }
    else {
        values.BalStatusHUDToggle = false;
        values.save();
    }
})

register("worldLoad", () => {
    deadHUD = false
    setTimeout(() => {
        deadHUD = true
    },3000)
})