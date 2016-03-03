class Road {
    constructor(roadData) {
        this.id = 'road';
        this.width = 400;
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
        this.currentSlot = Math.floor(gDistance/this.slotHeight);
        var curSlotDistance = Math.floor(this.slotHeight * this.currentSlot);
        
        var curSlotY = gDistance - curSlotDistance + 600 - this.slotHeight;
        
        if (this.imgReady && this.hImgReady){
            for (let i=0; i<7; i++){
                //drawing road slots
                if ((this.currentSlot+i) in this.slots){
                    switch ((this.currentSlot+i)){
                        case "0":
                            ctx.drawImage(this.img, 0, 0, this.width, this.slotHeight, 250, (curSlotY-i*this.slotHeight), this.width, this.slotHeight);
                            break;
                    }
                }else{
                    ctx.drawImage(this.img, 0, 0, this.width, this.slotHeight, 250, (curSlotY-i*this.slotHeight), this.width, this.slotHeight);
                }
                
                //drawing hitches
                if ((this.currentSlot+i) in this.hitches){
                    var startY = curSlotY-i*this.slotHeight + 25;
                    var startX = 250;
                    switch (this.hitches[(this.currentSlot+i)]){
                        case "0":
                            ctx.drawImage(this.hImg, 0, 0,
                                          100, 50,
                                          startX, startY,
                                          100, 50);
                            break;
                        case "1":
                            ctx.drawImage(this.hImg, 0, 0,
                                          100, 50,
                                          startX+100, startY,
                                          100, 50);
                            break;
                        case "2":
                            ctx.drawImage(this.hImg, 0, 0,
                                          100, 50,
                                          startX+200, startY,
                                          100, 50);
                            break;
                        case "3":
                            ctx.drawImage(this.hImg, 100, 0,
                                          100, 50,
                                          startX+0, startY,
                                          100, 50);
                            break;
                        case "4":
                            ctx.drawImage(this.hImg, 100, 0,
                                          100, 50,
                                          startX+100, startY,
                                          100, 50);
                            break;
                        case "5":
                            ctx.drawImage(this.hImg, 100, 0,
                                          100, 50,
                                          startX+200, startY,
                                          100, 50);
                            break;
                    }
                }
            }
        }
    }
}