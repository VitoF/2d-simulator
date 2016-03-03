class Handling {
    constructor(objCurData) {
        this.objCurData = objCurData;
        this.keysDown = {} ;
        var that = this;
        addEventListener("keydown", function (e) {
            that.keysDown[e.keyCode] = true;
        }, false);

        addEventListener("keyup", function (e) {
            delete that.keysDown[e.keyCode];
            that.objCurData.car.coords[2] = 1;
        }, false);
    }
    update(){
        if (38 in this.keysDown) { // Player holding up
            this.objCurData.car.coords[1] -= this.objCurData.car.speed * 0.03;
            this.objCurData.car.coords[2] = 3;
        }
        if (40 in this.keysDown) { // Player holding down
            this.objCurData.car.coords[1] += this.objCurData.car.speed * 0.03;
            this.objCurData.car.coords[2] = 4;
        }
        if (37 in this.keysDown) { // Player holding left
            this.objCurData.car.coords[0] -= this.objCurData.car.speed * 0.03;
            this.objCurData.car.coords[2] = 0;
        }
        if (39 in this.keysDown) { // Player holding right
            this.objCurData.car.coords[0] += this.objCurData.car.speed * 0.03;
            this.objCurData.car.coords[2] = 2;
        }
    }
}