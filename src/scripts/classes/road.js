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