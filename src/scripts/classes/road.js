class Road {
    constructor(roadMap) {
        this.id = 'road';
        this.width = 400;
        this.slotHeight = 100;
        this.distance = roadMap.distance;
        
        this.imgReady = false;
        this.img = new Image();
        this.img.onload = () => {this.imgReady = true;}
        this.img.src = '../images/road.png';
    }
    rend(ctx, gDistance){console.log(gDistance);
        
        if (this.imgReady){
            var currentSlotY = 600 + (gDistance - Math.floor(gDistance/100)) - 100;
            for(let i=0; i<7; i++){
                let yi = currentSlotY - i*100;
                ctx.drawImage(this.img, 200, yi);
            }

        }
        
        
    }
}