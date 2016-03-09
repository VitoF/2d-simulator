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
        this.AverageSpeed = data.AverageSpeed;
        this.x = 400;
        this.y = 500;
        this.r = 1;
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
    rend(ctx){
        this.calculateCoords(); 
        
        if (this.imgReady){
            switch(this.r){
                case 0:
                    ctx.drawImage(this.img, 40, 0,
                                  this.width, this.height,
                                  this.x-this.width/2, this.y-this.height/2,
                                  this.width, this.height);
                    break;
                case 1:
                    ctx.drawImage(this.img, 0, 0,
                                  this.width, this.height,
                                  this.x-this.width/2, this.y-this.height/2,
                                  this.width, this.height);
                    break;
                case 2:
                    ctx.drawImage(this.img, 80, 0,
                                  this.width, this.height,
                                  this.x-this.width/2, this.y-this.height/2,
                                  this.width, this.height);
                    break;
                case 3:
                    ctx.drawImage(this.img, 120, 0,
                                  this.width, this.height,
                                  this.x-this.width/2, this.y-this.height/2,
                                  this.width, this.height);
                    break;
                case 4:
                    ctx.drawImage(this.img, 160, 0,
                                  this.width, this.height,
                                  this.x-this.width/2, this.y-this.height/2,
                                  this.width, this.height);
                    break;
            }
            
        }
    }
}
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
class Handling {
    constructor(car) {
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
class MainApp {
    constructor(dataObj, car, road) {
        this.carData = dataObj.car[car];
        this.roadData = dataObj.road[road];
        
        this.canvas = new Canvas('main_canvas');
        this.car = new Car(this.carData);
        this.road = new Road(this.roadData);
        this.handling = new Handling(this.car);
        this.collision = new Collision(this.roadData.hitches);
        
        var objects = [this.road, this.car];
        this.roadSpeed = this.roadData.speed;
        
        this.render = new Render(this.canvas, objects);
        
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
            this.collision.listenCollision(this.car.xl, this.car.xr, this.car.yt, this.goneDistance);
            if (!this.collision.isCollision){
                document.getElementById('gone_distance').innerHTML = Math.floor(this.goneDistance/10);
                this.goneDistance += (this.roadSpeed*10/3.6)*(delta/1000); //10px = 1m & roadSpeed in km/h
            }

            then = now;

            // Request to do this again ASAP
            requestAnimationFrame(main);
        };        

        var then = Date.now();
//        var oldCarY = this.car.y;
        main();
    }
    
    run() {
        this.gameLoop();
    }
}
class Render {
    constructor(canvas, objects) {
        this.canvas = canvas;
        this.ctx = canvas.ctx;
        this.objects = objects;
//        this.objectsPositions = objectsPositions;
    }
    run(gDistance) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.objects.forEach((obj)=>{
            switch(obj.id){
                case 'car':
                    obj.rend(this.ctx);
                case 'road':
                    obj.rend(this.ctx, gDistance);
                    
            }
        });
    }
}
class Road {
    constructor(roadData) {
        this.id = 'road';
        this.width = 360;
        this.slotHeight = 100;
        this.distance = roadData.distance;
        this.roadAverageSpeed = roadData.speed;
        this.roadSpeed = roadData.speed;
        this.slotsNumber = roadData.slotsNumber;
        this.slots = roadData.slots;
        this.hitches = roadData.hitches;
        this.texture = roadData.texture;
        this.hTexture = roadData.hTexture;
        this.currentSlot = 0;
        
        this.leftXorig = (800 - this.width)/2;
        this.leftX = this.leftXorig;
        this.changedSlots = {};
        
        this.imgReady = false;
        this.hImgReady = false;
        this.img = new Image();
        this.img.onload = () => {this.imgReady = true;}
        this.img.src = '../images/'+this.texture;
        this.hImg = new Image();
        this.hImg.onload = () => {this.hImgReady = true;}
        this.hImg.src = '../images/'+this.hTexture;
    }
    rend(ctx, gDistance){
//        this.leftX = this.leftXorig;
        this.currentSlot = Math.floor(gDistance/this.slotHeight);
        var curSlotDistance = Math.floor(this.slotHeight * this.currentSlot);
        
        if (!((this.currentSlot - 1) in this.changedSlots) && this.slots[(this.currentSlot-1)] == '1'){
            this.leftXorig -= 15;
            this.changedSlots[(this.currentSlot - 1)] = -15;
            console.log(this.changedSlots);
        }
        
        var curSlotY = gDistance - curSlotDistance + 600 - this.slotHeight;
        
        if (this.imgReady && this.hImgReady){
            for (let i=0; i<7; i++){
                //drawing road slots
                if ((this.currentSlot+i) in this.slots){
                    switch (this.slots[(this.currentSlot+i)]){
                        case "0":
                            ctx.drawImage(this.img, 0, 0,
                                          360, 100,
                                          this.leftX, (curSlotY-i*this.slotHeight),
                                          360, 100);
                            break;
                        case "1":
                            ctx.drawImage(this.img, 0, 100,
                                          360, 100,
                                          this.leftX, (curSlotY-i*this.slotHeight),
                                          360, 100);
//                            this.leftX-=15;
                            break;
                    }
                }else{
                    ctx.drawImage(this.img, 0, 0, this.width, this.slotHeight, this.leftX, (curSlotY-i*this.slotHeight), this.width, this.slotHeight);
                }
                
                //drawing hitches
                if ((this.currentSlot+i) in this.hitches){
                    this.hitches[(this.currentSlot+i)].forEach((v)=>{
                        switch (v.type){
                            case "police":
                                {
                                    let drawY = curSlotY-i*this.slotHeight + 25;
                                    let orient = v.misc!=1 ? 100 : 200;
                                    ctx.drawImage(this.hImg, orient, 0,
                                          100, 50,
                                          this.leftX+45*v.position, drawY,
                                          100, 50);
                                }
                                break;
                            case "truck":
                                {
                                    let drawY = curSlotY-i*this.slotHeight + 25;
                                    let orient = v.misc!=1 ? 50 : 100;
                                    ctx.drawImage(this.hImg, 0, orient,
                                          217, 50,
                                          this.leftX+45*v.position, drawY,
                                          217, 50);
                                }
                                break;
                            case "excavator":
                                {
                                    let drawY = curSlotY-i*this.slotHeight;
//                                    let orient = v.misc!=1 ? 50 : 100;
                                    ctx.drawImage(this.hImg, 0, 150,
                                          265, 100,
                                          this.leftX+45*v.position, drawY,
                                          265, 100);
                                }
                                break;
                        }
                    });
//                    var startY = curSlotY-i*this.slotHeight + 25;
                    /*switch (this.hitches[(this.currentSlot+i)]){
                        case "0":
                            ctx.drawImage(this.hImg, 0, 0,
                                          100, 50,
                                          this.leftX, startY,
                                          100, 50);
                            break;
                        case "1":
                            ctx.drawImage(this.hImg, 0, 0,
                                          100, 50,
                                          this.leftX+130, startY,
                                          100, 50);
                            break;
                        case "2":
                            ctx.drawImage(this.hImg, 0, 0,
                                          100, 50,
                                          this.leftX+230, startY,
                                          100, 50);
                            break;
                        case "3":
                            ctx.drawImage(this.hImg, 200, 0,
                                          100, 50,
                                          this.leftX+30, startY,
                                          100, 50);
                            break;
                        case "4":
                            ctx.drawImage(this.hImg, 100, 0,
                                          100, 50,
                                          this.leftX+130, startY,
                                          100, 50);
                            break;
                        case "5":
                            ctx.drawImage(this.hImg, 100, 0,
                                          100, 50,
                                          this.leftX+230, startY,
                                          100, 50);
                            break;
                        case "6":
                            ctx.drawImage(this.hImg, 0, 50,
                                          217, 50,
                                          this.leftX+3, startY,
                                          217, 50);
                            break;
                        case "7":
                            ctx.drawImage(this.hImg, 0, 100,
                                          217, 50,
                                          this.leftX+70, startY,
                                          217, 50);
                            break;
                        case "8":
                            ctx.drawImage(this.hImg, 0, 100,
                                          217, 50,
                                          this.leftX+138, startY,
                                          217, 50);
                            break;
                    }*/
                }
            }
        }
    }
}