import settings from "../utils/config";
import values from "../utils/values";
import constants from "../utils/constants";

register("tick", () => {
    if (values.inCH = true){
        //find bal
        const balDeadEntity = World.getAllEntitiesofType(Java.type("net.minecraft.entity.monster.EntityMagmaCube").class).find(cube => cube.getWidth().toFixed(1) != 1.5 && cube.getWidth().toFixed(1) != 0.0 && cube.getWidth().toFixed(1) != 13.3);
        const balAliveEntity = World.getAllEntitiesofType(Java.type("net.minecraft.entity.monster.EntityMagmaCube").class).find(cube => cube.getWidth().toFixed(1) = 13.3);
        if (balDeadEntity) {
            if (!values.balSpawnPosX || !values.balSpawnPosY || !values.balSpawnPosZ){
                ChatLib.chat("&b[&4Bal&6Addons&b]&r &4Bal&r &5spawn&r (dead bal) has been identified!")
                values.balSpawning = true;
                values.balSpawnPosX = balDead.getX();
                values.balSpawnPosY = balDead.getY();
                values.balSpawnPosZ = balDead.getZ();
                ChatLib.chat(`&b[&4Bal&6Addons&b]&r &5balPos&r set as ${balSpawnPosX}, ${balSpawnPosY}, ${balSpawnPosZ} `)
            }
        }
        else values.balSpawning = false;
        if (balAliveEntity){
            ChatLib.chat("&b[&4Bal&6Addons&7 Debug&b]&r &4Bal &5entity&r (alive bal) has been identified! prob looped alot lol")
            values.balAlive = true;
            values.balAlivePosX = balAlive.getX();
            values.balAlivePosY = balAlive.getY();
            values.balAlivePosZ = balAlive.getZ();
        }
        else values.balAlive = false;
        values.save();
    }
})

register("renderOverlay", RenderOverlays);

//call all renders here
function RenderOverlays(){
    //add renders as needed
    if (values.BalSpawnOverlayToggle = true) BalSpawnOverlay.draw();
    if (values.bal75OverlayToggle = true) Bal75Overlay.draw();
    if (values.bal50OverlayToggle = true) Bal50Overlay.draw();
    if (values.bal33OverlayToggle = true) Bal33Overlay.draw();
    if (values.balDeathOverlayToggle = true) BalDeathOverlay.draw();
}

register("chat", (message) => {
    //add message triggers here, turn on and off toggle to the render
    if(message.removeFormatting.includes(constants.BalSpawnMessage)){
        if(settings.boolBalSpawn == true){
            BalSpawnOverlay = new Text(settings.txtBalSpawn, 5, 5).setColor(settings.colorBalSpawn.getRGB());
            values.balSpawnOverlayToggle = true;
            values.save();
            setTimeout(() => {
                values.balSpawnOverlayToggle = false;
                values.save();
            }, 2000);
        }
    }

    if(message.removeFormatting.includes(constants.Bal75Message)){
        if(settings.boolBal75 == true){
            Bal75Overlay = new Text(settings.txtBal75, 5, 5).setColor(settings.colorBal75.getRGB());
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
            Bal50Overlay = new Text(settings.txtBal50, 5, 5).setColor(settings.colorBal50.getRGB());
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
            Bal33Overlay = new Text(settings.txtBal33, 5, 5).setColor(settings.colorBal33.getRGB());
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
            BalDeathOverlay = new Text(settings.txtBalDeath, 5, 5).setColor(settings.colorBalDeath.getRGB());
            values.balDeathOverlayToggle = true;
            values.save();
            setTimeout(() => {
                values.balDeathOverlayToggle = false;
                values.save();
            }, 2000);
        }
    }

}).setCriteria("${message}");
