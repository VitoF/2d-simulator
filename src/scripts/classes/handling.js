class Handling {
    constructor(car) {console.log(car);
        this.car = car;
        this.keysDown = {} ;
        var that = this;
        addEventListener("keydown", function (e) {
            that.keysDown[e.keyCode] = true;
        }, false);

        addEventListener("keyup", function (e) {
            delete that.keysDown[e.keyCode];
            that.car.r = 1;
        }, false);
    }
    update(){
        if (38 in this.keysDown) { // Player holding up
            this.car.y -= this.car.AverageSpeed * 0.03;
            this.car.r = 3;
        }
        if (40 in this.keysDown) { // Player holding down
            this.car.y += this.car.AverageSpeed * 0.03;
            this.car.r = 4;
        }
        if (37 in this.keysDown) { // Player holding left
            this.car.x -= this.car.AverageSpeed * 0.03;
            this.car.r = 0;
        }
        if (39 in this.keysDown) { // Player holding right
            this.car.x += this.car.AverageSpeed * 0.03;
            this.car.r = 2;
        }
        
    }
}