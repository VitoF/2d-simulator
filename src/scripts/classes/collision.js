class Collision {
    constructor (hitchesData){
        this.hitchesData = hitchesData;
        this.isCollision = false;
    }
    listenCollision (carXl, carXr, carY, gDistance){
        this.isCollision = false;
        var carSlot = Math.floor((600 - carY + gDistance)/100);
        if(carSlot in this.hitchesData){
//            var hitchType = this.hitchesData[carSlot];
            this.hitchesData[carSlot].forEach((v)=>{
                switch (v.type){
                    case "police":{
                        let ColXL = 220 + v.position*45 + 20;
                        let ColXR = 220 + v.position*45 + 20 + 60;
                        let CarCurY = gDistance + 600 - carY;
                        let ColYB = carSlot * 100 + 35;
                        
                        if (CarCurY >= ColYB && carXr >= ColXL && carXl <= ColXR){
                            this.isCollision = true;
                            this.collisionType = 4;
                            console.log('collision');
                        }
                    }
                        break;
                    case "truck":{
                        let ColXL = 220 + v.position*45 + 15;
                        let ColXR = 220 + v.position*45 + 20 + 185;
                        let CarCurY = gDistance + 600 - carY;
                        let ColYB = carSlot * 100 + 35;
                        
                        if (CarCurY >= ColYB && carXr >= ColXL && carXl <= ColXR){
                            this.isCollision = true;
                            this.collisionType = 4;
                            console.log('collision');
                        }
                    }
                        break;
                    case "excavator":{
                        let ColXL1 = 220 + v.position*45 + 15;
                        let ColXR1 = 220 + v.position*45 + 20 + 100;
                        let ColXL2 = 220 + v.position*45 + 15 + 195;
                        let ColXR2 = 220 + v.position*45 + 20 + 230;
                        let CarCurY = gDistance + 600 - carY;
                        let ColYB = carSlot * 100 + 10;
                        
                        if ((CarCurY >= ColYB && carXr >= ColXL1 && carXl <= ColXR1) || 
                        (CarCurY >= ColYB && carXr >= ColXL2 && carXl   <= ColXR2)){
                            this.isCollision = true;
                            this.collisionType = 4;
                            console.log('collision');
                        }
                    }
                        break;
                }
            });
            /*switch (hitchType){
                case "3":{
                    let colY = carSlot * 100 + 35;
                    let colXl = 270;
                    let colXr = 330;
                    let carCurY = gDistance + 600 - carY;
                    if (carCurY >= colY && carXr >= colXl && carXl <= colXr){
                        this.isCollision = true;
                        this.collisionType = 4;
                        console.log('collision');
                    }
                }
                    break;
                case "4":{
                    let colY = carSlot * 100 + 35;
                    let colXl = 370;
                    let colXr = 430;
                    let carCurY = gDistance + 600 - carY;
                    if (carCurY >= colY && carXr >= colXl && carXl <= colXr){
                        this.isCollision = true;
                        this.collisionType = 4;
                        console.log('collision');
                    }
                }
                    break;
                case "5":{
                    let colY = carSlot * 100 + 35;
                    let colXl = 470;
                    let colXr = 530;
                    let carCurY = gDistance + 600 - carY;
                    if (carCurY >= colY && carXr >= colXl && carXl <= colXr){
                        this.isCollision = true;
                        this.collisionType = 4;
                        console.log('collision');
                    }
                }
                    break;
            }*/
        }
    }
}