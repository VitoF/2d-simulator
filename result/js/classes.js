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
    constructor(data) {
        this.id = 'car';
        this.width = data.iw;
        this.height = data.ih;
        this.speed = data.speed;
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
class MainApp {
    constructor(dataObj, car, road) {
        this.carData = dataObj.car[car];
        this.roadData = dataObj.road[road];
        
        
        this.objCurData = {
            car: {
                coords: [400,300,1],
                speed: 100
            }
        }
        
        this.canvas = new Canvas('main_canvas');
        this.car = new Car(this.carData);
        this.road = new Road(this.roadData);
        this.handling = new Handling(this.objCurData);
        
        var objects = [this.road, this.car];
        this.roadSpeed = this.roadData.speed;
        
        this.render = new Render(this.canvas, objects, this.objCurData);
        
        this.goneDistance = 0;
        
        // Cross-browser support for requestAnimationFrame
        requestAnimationFrame = window.requestAnimationFrame ||
                                window.webkitRequestAnimationFrame || 
                                window.msRequestAnimationFrame || 
                                window.mozRequestAnimationFrame;  
    }
    
    gameLoop() {
        var main = () => {
            var now = Date.now();
            var delta = now - then;
            
            this.handling.update();
            this.render.run(this.goneDistance);
            document.getElementById('goneDistance').innerHtml = this.goneDistance;
            this.goneDistance += (this.roadSpeed*10/3.6)*(delta/1000); //10px = 1m & roadSpeed in km/h

            then = now;

            // Request to do this again ASAP
            requestAnimationFrame(main);
        };        

        var then = Date.now();
        main();
        console.log('here');
    }
    
    run() {
        this.gameLoop();
    }
}
class Render {
    constructor(canvas, objects, objectsPositions) {
        this.canvas = canvas;
        this.ctx = canvas.ctx;
        this.objects = objects;
        this.objectsPositions = objectsPositions;
    }
    run(gDistance) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.objects.forEach((obj)=>{
            switch(obj.id){
                case 'car':
                    let carX = this.objectsPositions.car.coords[0];
                    let carY = this.objectsPositions.car.coords[1];
                    let carR = this.objectsPositions.car.coords[2];
                    obj.rend(this.ctx, carX, carY, carR);
                case 'road':
                    obj.rend(this.ctx, gDistance);
                    
            }
        });
    }
}
class Road {
    constructor(roadData) {
        this.id = 'road';
        this.width = 400;
        this.slotHeight = 100;
        this.distance = roadData.distance;
        this.roadSpeed = roadData.speed;
        this.slotsNumber = roadData.slotsNumber;
        this.slots = roadData.slots;
        this.texture = roadData.texture;
        this.currentSlot = 0;
        
        this.imgReady = false;
        this.img = new Image();
        this.img.onload = () => {this.imgReady = true;}
        this.img.src = '../images/'+this.texture;
    }
    rend(ctx, gDistance){
        this.currentSlot = Math.floor(gDistance/this.slotHeight);
        var curSlotDistance = Math.floor(this.slotHeight * this.currentSlot);
        
        var curSlotY = gDistance - curSlotDistance + 600 - this.slotHeight;
        
        if (this.imgReady){
            for (let i=0; i<7; i++){
                if ((this.currentSlot+i) in this.slots){
                    switch ((this.currentSlot+i)){
                        case "0":
                            ctx.drawImage(this.img, 0, 0, this.width, this.slotHeight, 200, (curSlotY-i*this.slotHeight), this.width, this.slotHeight);
                            break;
                    }
                }else{
                    ctx.drawImage(this.img, 0, 0, this.width, this.slotHeight, 200, (curSlotY-i*this.slotHeight), this.width, this.slotHeight);
                }
            }
        }
    }
}