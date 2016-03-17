class Handling {
    constructor(car, handData, mainAppObj) {
        this.handKeys = handData;
        this.car = car;
        this.keysDown = {};
        
        this.moveUp = false;
        this.moveDown = false;
        this.moveLeft = false;
        this.moveRight = false;
        
        this.listenKeys(mainAppObj);
    }
    
    listenKeys(mainAppObj) {
        addEventListener("keydown", (e) => {
            this.handKeys.up.forEach((key)=>{
                if (key == e.keyCode && !mainAppObj.pause) { // Player holding up
                    this.moveUp = true;
                }
            });
            this.handKeys.down.forEach((key)=>{
                if (key == e.keyCode && !mainAppObj.pause) { // Player holding up
                    this.moveDown = true;
                }
            });
            this.handKeys.left.forEach((key)=>{
                if (key == e.keyCode && !mainAppObj.pause) { // Player holding up
                    this.moveLeft = true;
                }
            });
            this.handKeys.right.forEach((key)=>{
                if (key == e.keyCode && !mainAppObj.pause) { // Player holding up
                    this.moveRight = true;
                }
            });
        }, false);

        addEventListener("keyup", (e) => {
            this.handKeys.up.forEach((key)=>{
                if (key == e.keyCode) { // Player holding up
                    this.moveUp = false;
                    this.car.r = 1;
                }
            });
            this.handKeys.down.forEach((key)=>{
                if (key == e.keyCode) { // Player holding up
                    this.moveDown = false;
                    this.car.r = 1;
                }
            });
            this.handKeys.left.forEach((key)=>{
                if (key == e.keyCode) { // Player holding up
                    this.moveLeft = false;
                    this.car.r = 1;
                }
            });
            this.handKeys.right.forEach((key)=>{
                if (key == e.keyCode) { // Player holding up
                    this.moveRight = false;
                    this.car.r = 1;
                }
            });
            this.handKeys.menu.forEach((key)=>{
                if (key == e.keyCode) { // Player pressed PAUSE
                    mainAppObj.pause = mainAppObj.pause === false ? true : false;
                    this.moveUp = false;
                    this.moveDown = false;
                    this.moveLeft = false;
                    this.moveRight = false;
                    this.car.r = 1;
                }
            });
        }, false);
    }
    
    update(){
        if (this.moveUp === true) { // Player holding up
            if (this.car.y>40){
                this.car.y -= this.car.AverageSpeed * 0.03;
                this.car.r = 3;
            }else {
                this.car.r = 1;
            }
        }
        
        if (this.moveDown === true) { // Player holding down
            if (this.car.y<560){
                this.car.y += this.car.AverageSpeed * 0.03;
                this.car.r = 4;
            }else {
                this.car.r = 1;
            }
        }
        
        if (this.moveLeft === true) { // Player holding left
            if (this.car.x>40){
                this.car.x -= this.car.AverageSpeed * 0.03;
                this.car.r = 0;
            }else {
                this.car.r = 1;
            }
        }
        
        if (this.moveRight === true) { // Player holding right
            if (this.car.x<760){
                this.car.x += this.car.AverageSpeed * 0.03;
                this.car.r = 2;
            }else {
                this.car.r = 1;
            }
        }
        
    }
}