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