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