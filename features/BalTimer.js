import values from "../utils/values";

const balSizes = [0.5, 1.0, 1.5, 2.0, 2.6, 3.1, 3.6, 4.1, 4.6, 5.1, 5.6, 6.1, 6.6, 7.1, 7.7, 8.2, 8.7, 9.2, 9.7, 10.2, 10.7, 11.2, 11.7, 12.2, 12.8, 13.3];
let previousIndex = -1;

register("tick", () => {
    if (!values.inCH) return;
    if (values.balStatus == "spawning"){
        values.balSpawningTimerWorldToggle = true;
        if (!values.balSpawningTimerTick || !values.balSpawningTimerSecond){ //if never defined (just started spawning) set to base, 50 seconds
            values.balSpawningTimerTick = 1000;
            values.balSpawningTimerSecond = (1000/20).toFixed(2);
            values.save()
            ChatLib.chat("timer set")
        }
        if (values.balSpawningTimerTick) values.balSpawningTimerTick--;
        if (!(values.balSpawningTimerTick > 0)){ //once it hits zero set bal status to alive
            values.balStatus = "alive";
            return;
        }
        let currentIndex = balSizes.indexOf(values.balDeadWidth);
        if (currentIndex !== previousIndex){
            if (currentIndex !== -1){
                //sync timer accordingly
                values.balSpawningTimerTick = 1000 - (currentIndex - 1) * 40; //formula for time, might be wrong
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
            values.balSpawningTimerWorldToggle = false;
    }
    if (values.balSpawningTimerTick){
        values.balSpawningTimerSecond = (values.balSpawningTimerTick/20).toFixed(2);
    }
    
    
    if (values.balStatus == "dead"){
        values.balDeadTimerWorldToggle = true;
        if (values.balDeadTimerTick > 0) values.balDeadTimerTick--;
        if (!values.balDeadTimerTick || !values.balDeadTimerSecond){ //if never defined (just died) set to base, 300 seconds
            values.balDeadTimerTick = 6000;
            values.balDeadTimerSecond = (6000/20).toFixed(2);
        }
        values.save();
    }
    else {
        values.balDeadTimerTick = null;
        values.balDeadTimerSecond = null;
        values.balDeadTimerWorldToggle = false;
    }

    if (values.balDeadTimerTick){
        values.balDeadTimerSecond = (values.balDeadTimerTick/20).toFixed(2);
    }
    values.save();
})
