class Road {
    constructor(roadData) {
        this.id = 'road';
        this.width = 360;
        this.slotHeight = 100;
        this.distance = roadData.distance;
        this.roadSpeed = roadData.speed;
        
        this.slotsNumber = roadData.slotsNumber;
        this.slots = this.modifySlots(roadData.slots);
        
        this.signs = roadData.signs;
        
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
                let leftPos;
                
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
                
                //draw start and finish
                if ((this.currentSlot+i) == 5){
                    let signLeftPos = leftPos + (this.slots[(this.currentSlot+i)].width - this.signs.start[2])/2,
                        signTopPos = curSlotY + (100 - this.signs.start[3])/2;
                        
                    ctx.drawImage(this.img, this.signs.start[0], this.signs.start[1],
                                          this.signs.start[2], this.signs.start[3],
                                          signLeftPos, (signTopPos-i*this.slotHeight),
                                          this.signs.start[2], this.signs.start[3]);
                }
                if ((this.currentSlot+i) == this.slotsNumber-1){
                    let signLeftPos = leftPos + (this.slots[(this.currentSlot+i)].width - this.signs.finish[2])/2,
                        signTopPos = curSlotY + (100 - this.signs.finish[3])/2;
                        
                    ctx.drawImage(this.img, this.signs.finish[0], this.signs.finish[1],
                                          this.signs.finish[2], this.signs.finish[3],
                                          signLeftPos, (signTopPos-i*this.slotHeight),
                                          this.signs.finish[2], this.signs.finish[3]);
                }
            }
        }
    }
}