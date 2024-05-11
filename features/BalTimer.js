import values from "../utils/values";

let balSizes = [0.5, 1.0, 1.5, 2.0, 2.6, 3.1, 3.6, 4.1, 4.6, 5.1, 5.6, 6.1, 6.6, 7.1, 7.7, 8.2, 8.7, 9.2, 9.7, 10.2, 10.7, 11.2, 11.7, 12.2, 12.8, 13.3];

register("tick", () => {
    if (values.inCH = true){
        if (values.balStatus == "spawning"){
            if (!values.balSpawningTimerTick > 0){
                values.balStatus = "alive";
            }
            values.balSpawningTimerTick--;
            let currentIndex = balSizes.indexOf(values.balDeadWidth);
            if (currentIndex !== previousIndex){
                if (currentIndex !== -1){
                    //sync timer accordingly
                    values.balSpawningTimerTick = 1000 - (currentIndex - 1) * 40;
                    console.log(`Current index of balSizes has changed to ${currentIndex}.`);
                    console.log(`Timer value successfully synced to ${values.balSpawningTimerTick}.`)
                }
                
                previousIndex = currentIndex; 
            }
            values.save();
        }
        else {
            values.balSpawningTimerTick = null;
            values.balSpawningTimerSecond = null;
            values.save();
        }
        if (values.balSpawningTimerTick){
            values.balSpawningTimerSecond = (values.balSpawningTimerTick/20).toFixed(2);
            values.save();
        }
    }
})
