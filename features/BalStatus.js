import settings from "../utils/config";
import values from "../utils/values";
import constants from "../utils/constants";

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
        const balDeadEntity = World.getAllEntitiesofType(Java.type("net.minecraft.entity.monster.EntityMagmaCube").class).find(cube => cube.getWidth().toFixed(1) !== "1.5" && cube.getWidth().toFixed(1) !== "0.0" && cube.getWidth().toFixed(1) !== "13.3");
        const balAliveEntity = World.getAllEntitiesofType(Java.type("net.minecraft.entity.monster.EntityMagmaCube").class).find(cube => cube.getWidth().toFixed(1) == "13.3");
        if (balDeadEntity) {
            values.balDeadWidth = balDeadEntity.getWidth();
            values.save();
            if (values.balDeadWidth == 1.0){
                if (!values.balSpawning1_5Lock){
                    values.balSpawning1_5Lock = true;
                    values.save();
                    setTimeout(() => {
                        values.balSpawning1_5Lock = null;
                        values.save();
                    }, 4500);
                }
            }
            if (!values.balSpawnPosX || !values.balSpawnPosY || !values.balSpawnPosZ){
                ChatLib.chat("&b[&4Bal&6Addons&b]&r &4Bal&r &5spawn&r (dead bal) has been identified!")
                values.balSpawnPosX = balDeadEntity.getX();
                values.balSpawnPosY = balDeadEntity.getY();
                values.balSpawnPosZ = balDeadEntity.getZ();
                ChatLib.chat(`&b[&4Bal&6Addons&b]&r &5balPos&r set as ${values.balSpawnPosX}, ${values.balSpawnPosY}, ${values.balSpawnPosZ} `)
            }
            if(!values.balStatus){
                if(tempWidthComparator){
                    if(tempWidthComparator < values.balDeadWidth){ //bal size increased
                        values.balStatus = "spawning";
                        values.save();
                    }
                    if(tempWidthComparator > values.balDeadWidth){ //bal size decreased
                        values.balStatus = "dying";
                        values.save();
                    }
                }
                else tempWidthComparator = values.balDeadWidth;
            }
        
            //spawning timer
            if(values.balStatus == "spawning"){

            }
        }
        else {
            if (!values.balSpawning1_5Lock) values.balStatus = null;
        }

        if (balAliveEntity){
            ChatLib.chat("&b[&4Bal&6Addons&7 Debug&b]&r &4Bal &5entity&r (alive bal) has been identified! prob looped alot lol")
            values.balStatus = "alive";
            values.balAlivePosX = balAliveEntity.getX();
            values.balAlivePosY = balAliveEntity.getY();
            values.balAlivePosZ = balAliveEntity.getZ();
        }
        else values.balStatus = null;
        values.save();
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
        if (values.balSpawningTimerWorldToggle == true) Tessellator.drawString(`${balSpawningTimerValue} seconds`, values.balSpawnPosX, values.balSpawnPosY, values.balSpawnPosZ, Renderer.WHITE, true, 1.5, true)
        // Tessellator.scale
    }
}

register("chat", (message) => {
    //add message triggers here, turn on and off toggle to the render, aswell as updating bal's status for the gui
    if(message.removeFormatting().includes(constants.BalSpawnMessage)){
        if(settings.boolBalSpawn == true){
            BalSpawnOverlay.setString(settings.txtBalSpawn).setX(5).setY(5).setColor(settings.colorBalSpawn.getRGB());
            values.balSpawnOverlayToggle = true;
            values.balStatus = "spawning";
            values.save();
            setTimeout(() => {
                values.balSpawnOverlayToggle = false;
                values.save();
            }, 2000);
        }

        //start spawning timer
    }

    if(message.removeFormatting().includes(constants.Bal75Message)){
        if(settings.boolBal75 == true){
            Bal75Overlay.setString(settings.txtBal75).setX(5).setY(5).setColor(settings.colorBal75.getRGB());
            values.bal75OverlayToggle = true;
            values.balHealth = 187;
            values.save();
            setTimeout(() => {
                values.bal75OverlayToggle = false;
                values.save();
            }, 2000);
        }
    }

    if(message.removeFormatting().includes(constants.Bal50Message)){
        if(settings.boolBal50 == true){
            Bal50Overlay.setString(settings.txtBal50).setX(5).setY(5).setColor(settings.colorBal50.getRGB());
            values.bal50OverlayToggle = true;
            values.balHeatlh = 125;
            values.save();
            setTimeout(() => {
                values.bal50OverlayToggle = false;
                values.save();
            }, 2000);
        }
    }

    if(message.removeFormatting().includes(constants.Bal33Message)){
        if(settings.boolBal33 == true){
            Bal33Overlay.setString(settings.txtBal33).setX(5).setY(5).setColor(settings.colorBal33.getRGB());
            values.bal33OverlayToggle = true;
            values.balHealth = 83;
            values.save();
            setTimeout(() => {
                values.bal33OverlayToggle = false;
                values.save();
            }, 2000);
        }
    }

    if(message.removeFormatting().includes(constants.BalDeathMessage)){
        if(settings.boolBalDeath == true){
            BalDeathOverlay.setString(settings.txtBalDeath).setX(5).setY(5).setColor(settings.colorBalDeath.getRGB());
            values.balDeathOverlayToggle = true;
            values.balHealth = 0;
            values.save();
            setTimeout(() => {
                values.balDeathOverlayToggle = false;
                values.save();
            }, 2000);
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
        BalSpawningHUD.setString(`Bal Status: Spawning\r\nTimer: ${values.balSpawningTimerSecond} sec`).setX(5).setY(5).setColor(settings.colorBalHUD.getRGB());
    }
    if (values.balStatus == "alive"){
        values.BalSpawningHUDToggle = false;
        values.balAliveHUDToggle = true;
        values.balDeadHUDToggle = false;
        values.save();
        BalAliveHUD.setString(`Bal Status: Alive\r\nHP Estimate: ${values.balHealth} HP`).setX(5).setY(5).setColor(settings.colorBalHUD.getRGB()); 
    }
    if (values.balStatus == "dead"){
        values.BalSpawningHUDToggle = false;
        values.balAliveHUDToggle = false;
        values.balDeadHUDToggle = true;
        values.save();
        BalSpawningHUD.setString(`Bal Status: Dead\r\nTimer: ${values.balDeadTimerSecond} sec`).setX(5).setY(5).setColor(settings.colorBalHUD.getRGB()); 
    }
})
