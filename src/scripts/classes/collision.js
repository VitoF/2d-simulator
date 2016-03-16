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