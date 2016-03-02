class Handling {
    constructor() {
        this.keysDown = {} ;
        var that = this;
        addEventListener("keydown", function (e) {
            that.keysDown[e.keyCode] = true;
        }, false);

        addEventListener("keyup", function (e) {
            delete that.keysDown[e.keyCode];
            objectsPositions.car.coords[2] = 1;
        }, false);
    }
    update(){
        if (38 in this.keysDown) { // Player holding up
            objectsPositions.car.coords[1] -= objectsPositions.car.speed * 0.03;
            objectsPositions.car.coords[2] = 3;
        }
        if (40 in this.keysDown) { // Player holding down
            objectsPositions.car.coords[1] += objectsPositions.car.speed * 0.03;
            objectsPositions.car.coords[2] = 4;
        }
        if (37 in this.keysDown) { // Player holding left
            objectsPositions.car.coords[0] -= objectsPositions.car.speed * 0.03;
            objectsPositions.car.coords[2] = 0;
        }
        if (39 in this.keysDown) { // Player holding right
            objectsPositions.car.coords[0] += objectsPositions.car.speed * 0.03;
            objectsPositions.car.coords[2] = 2;
        }
    }
}