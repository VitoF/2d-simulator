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
        this.width = data.width;
        this.height = data.height;
        this.x = 400;
        this.y = 450;
        this.r = 1; //0-left, 1-default, 2-right, 3-up, 4-down, 5-wrecked after shock
        this.x0 = data.collision.x0;
        this.x1 = data.collision.x1;
        this.y0 = data.collision.y0;
        this.y1 = data.collision.y1;
        this.AverageSpeed = 100;
        
        this.imgReady = false;
        this.img = new Image();
        this.img.onload = () => {this.imgReady = true;}
        this.img.src = '../images/'+data.texture;
        this.textCoords = data.textureCoords;
    }
    rend(ctx){
        
        if (this.imgReady){
            let rot = "default";
            let syncX = 0;
            switch(this.r){
                case 0:
                    rot = "left"; syncX = -Math.floor(this.width/8);
                    break;
                case 1:
                    rot = "default"; syncX = 0;
                    break;
                case 2:
                    rot = "right"; syncX = 0;
                    break;
                case 3:
                    rot = "up"; syncX = -1;
                    break;
                case 4:
                    rot = "down"; syncX = -1;
                    break;
                case 5:
                    rot = "wreckedShock"; syncX = 0;
                    break;
                default:
                    rot = "default"; syncX = 0;
            }
            ctx.drawImage(this.img, this.textCoords[rot][0], this.textCoords[rot][1],
                          this.textCoords[rot][2], this.textCoords[rot][3],
                          this.x - Math.floor(this.textCoords[rot][2]/2) + syncX, this.y,
                          this.textCoords[rot][2], this.textCoords[rot][3]);
            
        }
    }
}
class Collision {
    constructor (roadSlots, hitchesSlots, hitchesItems){
        this.roadSlots = roadSlots;
        this.hitchesSlots = hitchesSlots;
        this.hitchesItems = hitchesItems;
        this.isCollision = false;
        this.typeCollision = "none";
    }
    listenCollision (curCarSlot, goneDistance, carObj){
        this.isCollision = false;
        this.typeCollision = "none";
        
        var carX = carObj.x,
            carY = carObj.y,
            carX0 = carX + carObj.x0,
            carX1 = carX + carObj.x1,
            carY0 = carY + carObj.y0,
            carY1 = carY + carObj.y1;
        
        //shock collision
        var slot;
        if (curCarSlot in this.hitchesSlots){  slot = curCarSlot; }
        if (curCarSlot-1 in this.hitchesSlots){ slot = curCarSlot-1; }
        if (curCarSlot in this.hitchesSlots || curCarSlot-1 in this.hitchesSlots){
            
            var slotX = this.roadSlots[slot].position * 60 + 100,
                slotY = 500 - (slot*100 - goneDistance);
            
            this.hitchesSlots[slot].forEach((hi)=>{
                var colAreaGot = this.hitchesItems[hi.type].collision.area;
                
                for(let i=0; i<colAreaGot.length; i++){
                    let colX0 = slotX + colAreaGot[i].x0 + hi.position * 45,
                        colX1 = slotX + colAreaGot[i].x1 + hi.position * 45,
                        colY0 = slotY + colAreaGot[i].y0,
                        colY1 = slotY + colAreaGot[i].y1;
                    if (carY0 <= colY1 && carY1 >= colY0 && carX0 <= colX1 && carX1 >= colX0){
                        this.isCollision = true;
                        this.typeCollision = "shock";
                        carObj.r = 5;
                    }
                }
            });
        }
        //turnover
        var roadX0 = this.roadSlots[curCarSlot].position * 60 + 100,
            roadX1 = roadX0 + this.roadSlots[curCarSlot].width;
        if (carX0 < roadX0 || carX1 > roadX1){
            this.isCollision = true;
            this.typeCollision = "turnover";
            carObj.r = 5;
        }
        
    }
}
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
                if (key == e.keyCode) { // Player holding PAUSE
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
class Hitches {
    constructor(hitchesData, roadObj){
        this.id = "hitches";
        this.roadObj = roadObj;
        this.currentSlot = 0;
        this.items = hitchesData.items;        
        this.texture = hitchesData.hTexture;
        this.slots = hitchesData.slots;
        
        this.ImgReady = false;
        
        this.Img = new Image();
        this.Img.onload = () => {this.ImgReady = true;}
        this.Img.src = '../images/'+this.texture;
    }
    rend(ctx, gDistance, curSlot){
        this.currentSlot = curSlot;
        //drawing hitches
        
        for (let i=0; i<7; i++){
            if ((this.currentSlot+i) in this.slots){
                this.slots[this.currentSlot+i].forEach((hi)=>{
                    let hiW = this.items[hi.type].width;
                    let hiH = this.items[hi.type].height;
                    let hiTx = this.items[hi.type].tX;
                    let hiTy = this.items[hi.type].tY;;
                    let hiDrX = (this.roadObj.slots[this.currentSlot+i].position * 60 + 100) + hi.position * 45;
                    let hiDrY = Math.floor((100 - hiH)/2) + gDistance - (100 * this.currentSlot) + 500 - i*100;
                    
                    ctx.drawImage(this.Img, hiTx, hiTy,
                                  hiW, hiH,
                                  hiDrX, hiDrY,
                                  hiW, hiH);
                });
            }
        }
    }
}
class MainApp {
    constructor(dataObj, car, road) {
        this.carData = dataObj.car[car];
        this.roadData = dataObj.road[road];
        this.handData = dataObj.handling["default"];
        this.hitchesData = dataObj.hitches;
        this.pause = false;
        
        this.canvas = new Canvas('main_canvas');
        this.car = new Car(this.carData);
        this.road = new Road(this.roadData);
        this.hitches = new Hitches(this.hitchesData, this.road);
        this.handling = new Handling(this.car, this.handData, this);
        this.collision = new Collision(this.roadData.slots, this.hitchesData.slots, this.hitchesData.items);
        
        var objects = [this.road, this.car, this.hitches];
        this.roadSpeed = this.roadData.speed;
        
        this.render = new Render(this.canvas, objects);
        
        this.goneDistance = 0;
        this.currentSlot = 0;
        
        
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
            
            this.currentSlot = Math.floor(this.goneDistance/100); //100 = slot height
            this.currentCarSlot = Math.floor((this.goneDistance+600-this.car.y)/100);
            
            this.handling.update();
            
            this.render.run(this.goneDistance, this.currentSlot);
            
            this.collision.listenCollision(this.currentCarSlot, this.goneDistance, this.car);
            if (!this.pause && !this.collision.isCollision){
                document.getElementById('gone_distance').innerHTML = Math.floor(this.goneDistance/10);
                this.goneDistance += (this.roadSpeed*10/3.6)*(delta/1000); //10px = 1m & roadSpeed in km/h
            }

            then = now;

            // Request to do this again ASAP
            requestAnimationFrame(main);
        };        

        var then = Date.now();
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
    }
    run(gDistance, curSlot) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.objects.forEach((obj)=>{
            switch(obj.id){
                case 'car':
                    obj.rend(this.ctx);
                case 'road':
                    obj.rend(this.ctx, gDistance, curSlot);
                case 'hitches':
                    obj.rend(this.ctx, gDistance, curSlot);
                    
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
        this.roadSpeed = roadData.speed;
        
        this.slotsNumber = roadData.slotsNumber;
        this.slots = this.modifySlots(roadData.slots);
        
        this.texture = roadData.texture;
        this.lTexture = roadData.lTexture;
        
        this.currentSlot = 0;
        
        this.imgReady = false;
        this.lImgReady = false;
        
        this.img = new Image();
        this.img.onload = () => {this.imgReady = true;}
        this.img.src = '../images/'+this.texture;
        
        
        this.lImg = new Image();
        this.lImg.onload = () => {this.lImgReady = true;}
        this.lImg.src = '../images/'+this.lTexture;
    }
    
    modifySlots(slotsData){
        
        for(let slot=0; slot<this.slotsNumber; slot++){
            if (!slotsData[slot]){
                slotsData[slot] = {
                    position: slotsData.default.position,
                    type: slotsData.default.type,
                    width: slotsData.default.width
                }
            }
            
            if(slot>0 && slot<this.slotsNumber-1){
                switch (slotsData[slot].type) {
                    case 1:
                        slotsData[slot].position = slotsData[slot-1].position - 1;
                        slotsData[slot].width = 420;
                        break;
                    case 0:
                        slotsData[slot].position = slotsData[slot-1].position;
                        slotsData[slot].width = 360;
                        break;
                }
                        
            }
        }
//        console.log(slotsData);
        return slotsData;
    }
    
    rend(ctx, gDistance, curSlot){
        this.currentSlot = curSlot;
        var curSlotDistance = Math.floor(this.slotHeight * this.currentSlot);        
                
        var curSlotY = gDistance - curSlotDistance + 600 - this.slotHeight;
        
        if (this.imgReady && this.lImgReady){
            //drawing land
            for (let lW=0; lW<800; lW+=200){
                for (let lH=0; lH<800; lH+=200){
                    ctx.drawImage(this.lImg, 0, 0,
                                  200, 200,
                                  lW, (curSlotY-(6+(this.currentSlot % 2))*this.slotHeight + lH),
                                  200, 200);                    
                }
            }
            //drawing road
            for (let i=0; i<7; i++){
                //drawing road slots
                let leftPos, slotWidth;
                
                if ((this.currentSlot+i) in this.slots){
                    leftPos = 100 + this.slots[(this.currentSlot+i)].position * 60;
                    switch (this.slots[(this.currentSlot+i)].type){
                        case 0:
                            ctx.drawImage(this.img, 0, 0,
                                          360, 100,
                                          leftPos, (curSlotY-i*this.slotHeight),
                                          360, 100);
                            break;
                        case 1:
                            ctx.drawImage(this.img, 0, 100,
                                          420, 100,
                                          leftPos, (curSlotY-i*this.slotHeight),
                                          420, 100);
                            break;
                    }
                }else{
                    leftPos = 220;
                    ctx.drawImage(this.img, 0, 0, this.width, this.slotHeight, leftPos, (curSlotY-i*this.slotHeight), this.width, this.slotHeight);
                }
            }
        }
    }
}