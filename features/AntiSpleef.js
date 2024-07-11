import settings from "../utils/config";

register("hitBlock", (block, event) =>{
    if (settings.boolAntiSpleef == true){
        let pl = Player.asPlayerMP();
        let x = block.x;
        let y = block.y;
        let z = block.z;
        let px = pl.getX();
        let py = pl.getY();
        let pz = pl.getZ();
        if (y >= py) return;
        if (x + 1 > px && x < px && z + 1 > pz && z < pz) return;
        cancel(event);
    }
})