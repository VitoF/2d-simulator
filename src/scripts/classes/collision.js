class Collision {
    constructor (hitchesData){
        this.hitchesData = hitchesData;
    }
    listenCollision (carXl, carXr, carY, gDistance){
        var carSlot = Math.floor((600 - carY + gDistance)/100);
        if(carSlot in this.hitchesData){
            var hitchType = this.hitchesData[carSlot];
            switch (hitchType){
                case "4":
                    let colY = carSlot * 100 + 35;
                    let colXl = 370;
                    let colXr = 430;
                    let carCurY = gDistance + 600 - carY;
                    if (carCurY >= colY && carXr >= colXl && carXl <= colXr){
                        console.log('col');
                    }
                    break;
            }
        }
    }
}