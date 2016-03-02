"use strict";
class Canvas {
    constructor (htmlId, width, height){
        this.canvas = document.getElementById(htmlId);
        this.ctx = this.canvas.getContext("2d");
        this.width = width || 800;
        this.height = height || 600;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
}
class Car {
    constructor() {
        this.id = 'car';
        this.width = 40;
        this.height = 60;
        this.x = 0;
        this.y = 0;
        this.calculateCoords();
        
        this.imgReady = false;
        this.img = new Image();
        this.img.onload = () => {this.imgReady = true;}
        this.img.src = '../images/car.png';
    }
    calculateCoords() {
        this.xl = this.x - this.width/2;
        this.xr = this.x + this.width/2;
        this.yt = this.y - this.height/2;
        this.yb = this.y + this.height/2;        
    }
    rend(ctx, x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.calculateCoords(); 
        
        if (this.imgReady){
            switch(this.r){
                case 0:
                    ctx.drawImage(this.img, 40, 0, this.width, this.height, this.x, this.y, 40, 60);
                    break;
                case 1:
                    ctx.drawImage(this.img, 0, 0, this.width, this.height, this.x, this.y, 40, 60);
                    break;
                case 2:
                    ctx.drawImage(this.img, 80, 0, this.width, this.height, this.x, this.y, 40, 60);
                    break;
                case 3:
                    ctx.drawImage(this.img, 120, 0, this.width, this.height, this.x, this.y, 40, 60);
                    break;
                case 4:
                    ctx.drawImage(this.img, 160, 0, this.width, this.height, this.x, this.y, 40, 60);
                    break;
            }
            
        }
    }
}
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
class Render {
    constructor(canvas, objects, objectsPositions) {
        this.canvas = canvas;
        this.ctx = canvas.ctx;
        this.objects = objects;
        this.objectsPositions = objectsPositions;
    }
    run() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        objects.forEach((obj)=>{
            switch(obj.id){
                case 'car':
                    let carX = this.objectsPositions.car.coords[0];
                    let carY = this.objectsPositions.car.coords[1];
                    let carR = this.objectsPositions.car.coords[2];
                    obj.rend(this.ctx, carX, carY, carR);
                case 'road':
                    obj.rend(this.ctx);
            }
        });
    }
}
class Road {
    constructor(roadMap) {
        this.id = 'road';
        this.width = 400;
        this.slotHeight = 100;
        this.distance = roadMap.distance;
        this.slotsNumber = this.distance/this.slotHeight;
        this.currentSlot = 0;
        this.goneDistance = 0;
        
        this.imgReady = false;
        this.img = new Image();
        this.img.onload = () => {this.imgReady = true;}
        this.img.src = '../images/road.png';
    }
    rend(ctx,wentDistance){
        this.goneDistance = goneDistance;
        this.currentSlot = Math.ceil(goneDistance/this.slotHeight) <= this.slotsNumber-1 ? 
                            Math.ceil(goneDistance/this.slotHeight) :
                            this.slotsNumber - 1;
        
        if (this.imgReady){
            for(let i=currentSlot; i<=currentSlot+8; i++){
                let yi=
            }
            
            ctx.drawImage(this.img, 200, 0);
        }
        
        
    }
}
