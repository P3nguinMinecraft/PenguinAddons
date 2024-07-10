import settings from "../utils/config";

register("hitBlock", (block, event) =>{
    if (settings.boolAntiSpleef == true){
        let x = block.getX();
        let y = block.getY();
        let z = block.getZ();
    }
})