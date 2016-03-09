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