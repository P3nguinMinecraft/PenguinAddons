import settings from "../utils/config";
import values from "../utils/values";
import constants from "../utils/constants";

BalSpawnOverlay = new Text();
Bal75Overlay = new Text();
Bal50Overlay = new Text();
Bal33Overlay = new Text();
BalDeathOverlay = new Text();
BalStatusOverlay = new Text();

register("tick", () => {
    if (values.inCH = true){
        //find bal
        const balDeadEntity = World.getAllEntitiesofType(Java.type("net.minecraft.entity.monster.EntityMagmaCube").class).find(cube => cube.getWidth().toFixed(1) != 1.5 && cube.getWidth().toFixed(1) != 0.0 && cube.getWidth().toFixed(1) != 13.3);
        const balAliveEntity = World.getAllEntitiesofType(Java.type("net.minecraft.entity.monster.EntityMagmaCube").class).find(cube => cube.getWidth().toFixed(1) = 13.3);
        if (balDeadEntity) {
            values.balDeadWidth = balDeadEntity.getWidth();
            values.save();
            if (values.balDeadWidth = 1.0){
                if (!values.balSpawning1_5Lock){
                    values.balSpawning1_5Lock = true;
                    values.save();
                    setTimeout(() => {
                        values.balSpawn1_5Lock = null;
                        values.save();
                    }, 4500);
                }
            }
            if (!values.balSpawnPosX || !values.balSpawnPosY || !values.balSpawnPosZ){
                ChatLib.chat("&b[&4Bal&6Addons&b]&r &4Bal&r &5spawn&r (dead bal) has been identified!")
                values.balSpawnPosX = balDead.getX();
                values.balSpawnPosY = balDead.getY();
                values.balSpawnPosZ = balDead.getZ();
                ChatLib.chat(`&b[&4Bal&6Addons&b]&r &5balPos&r set as ${balSpawnPosX}, ${balSpawnPosY}, ${balSpawnPosZ} `)
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

        }
        else {
            if (!values.balSpawning1_5Lock) values.balStatus = null;
        }
        if (balAliveEntity){
            ChatLib.chat("&b[&4Bal&6Addons&7 Debug&b]&r &4Bal &5entity&r (alive bal) has been identified! prob looped alot lol")
            values.balStatus = "alive";
            values.balAlivePosX = balAlive.getX();
            values.balAlivePosY = balAlive.getY();
            values.balAlivePosZ = balAlive.getZ();
        }
        else values.balStatus = null;
        values.save();
    }
})

register("renderOverlay", RenderOverlays);

//call all overlay renders here
function RenderOverlays(){
    //add renders as needed
    if (values.BalSpawnOverlayToggle = true) BalSpawnOverlay.draw();
    if (values.bal75OverlayToggle = true) Bal75Overlay.draw();
    if (values.bal50OverlayToggle = true) Bal50Overlay.draw();
    if (values.bal33OverlayToggle = true) Bal33Overlay.draw();
    if (values.balDeathOverlayToggle = true) BalDeathOverlay.draw();
    if (values.balStatusOverlayToggle = true) BalStatusOverlay.draw();
}

register("renderWorld", RenderWorld);

//call all world renders here
function RenderWorld(){
//add renders as needed


}

register("chat", (message) => {
    //add message triggers here, turn on and off toggle to the render, aswell as updating bal's status for the gui
    if(message.removeFormatting.includes(constants.BalSpawnMessage)){
        if(settings.boolBalSpawn == true){
            BalSpawnOverlay.setString(settings.txtBalSpawn).setX(5).setY(5).setColor(settings.colorBalSpawn.getRGB());
            values.balSpawnOverlayToggle = true;
            values.save();
            setTimeout(() => {
                values.balSpawnOverlayToggle = false;
                values.save();
            }, 2000);
        }

        //
    }

    if(message.removeFormatting.includes(constants.Bal75Message)){
        if(settings.boolBal75 == true){
            Bal75Overlay.setString(settings.txtBal75).setX(5).setY(5).setColor(settings.colorBal75.getRGB());
            values.bal75OverlayToggle = true;
            values.save();
            setTimeout(() => {
                values.bal75OverlayToggle = false;
                values.save();
            }, 2000);
        }
    }

    if(message.removeFormatting.includes(constants.Bal50Message)){
        if(settings.boolBal50 == true){
            Bal50Overlay.setString(settings.txtBal50).setX(5).setY(5).setColor(settings.colorBal50.getRGB());
            values.bal50OverlayToggle = true;
            values.save();
            setTimeout(() => {
                values.bal50OverlayToggle = false;
                values.save();
            }, 2000);
        }
    }

    if(message.removeFormatting.includes(constants.Bal33Message)){
        if(settings.boolBal33 == true){
            Bal33Overlay.setString(settings.txtBal33).setX(5).setY(5).setColor(settings.colorBal33.getRGB());
            values.bal33OverlayToggle = true;
            values.save();
            setTimeout(() => {
                values.bal33OverlayToggle = false;
                values.save();
            }, 2000);
        }
    }

    if(message.removeFormatting.includes(constants.BalDeathMessage)){
        if(settings.boolBalDeath == true){
            BalDeathOverlay.setString(settings.txtBalDeath).setX(5).setY(5).setColor(settings.colorBalDeath.getRGB());
            values.balDeathOverlayToggle = true;
            values.save();
            setTimeout(() => {
                values.balDeathOverlayToggle = false;
                values.save();
            }, 2000);
        }
    }

}).setCriteria("${message}");
