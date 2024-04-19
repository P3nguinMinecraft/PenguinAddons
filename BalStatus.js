import settings from "../utils/config";
import values from "../utils/values";
import constants from "../utils/constants";

register("tick", () => {
    if (values.inCH = true){
        //find bal
        const balDead = World.getAllEntitiesofType(Java.type("net.minecraft.entity.monster.EntityMagmaCube").class).find(cube => cube.getWidth().toFixed(1) != 1.5 && cube.getWidth().toFixed(1) != 0.0 && cube.getWidth().toFixed(1) != 13.3);
        const balAlive = World.getAllEntitiesofType(Java.type("net.minecraft.entity.monster.EntityMagmaCube").class).find(cube => cube.getWidth().toFixed(1) = 13.3);
        if (balDead) {
            ChatLib.chat("&b[&4Bal&6Addons&b]&r &4Bal&r &5spawn&r (dead bal) has been identified!")
            values.balSpawning = true;
            values.balSpawnPosX = balDead.getX();
            values.balSpawnPosY = balDead.getY();
            values.balSpawnPosZ = balDead.getZ();
            ChatLib.chat(`&b[&4Bal&6Addons&b]&r &5balPos&r set as ${balSpawnPosX}, ${balSpawnPosY}, ${balSpawnPosZ} `)
        }
        else values.balSpawning = false;
        if (balAlive){
            ChatLib.chat("&b[&4Bal&6Addons&b]&r &4Bal &5entity&r (alive bal) has been identified!")
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
    if (values.BalSpawnOverlayToggle = true){
        BalSpawnOverlay = new Text(settings.txtBalSpawn, 5, 5).setColor(settings.colorBalSpawn.getRGB());
        BalSpawnOverlay.draw();
    }
    
}
register("chat", (message) => {
    //add message triggers here, turn on and off toggle to the render
    if(message == constants.BalSpawnMessage){
        values.balSpawnOverlayToggle = true;
        values.save();
        setTimeout(() => {
            values.balSpawnOverlayToggle = false;
            values.save();
        }, 2000);
    }
   // if(message == constants.Bal)

}).setCriteria("${message}");
