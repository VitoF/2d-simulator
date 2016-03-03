class Render {
    constructor(canvas, objects, objectsPositions) {
        this.canvas = canvas;
        this.ctx = canvas.ctx;
        this.objects = objects;
        this.objectsPositions = objectsPositions;
    }
    run(gDistance) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.objects.forEach((obj)=>{
            switch(obj.id){
                case 'car':
                    let carX = this.objectsPositions.car.coords[0];
                    let carY = this.objectsPositions.car.coords[1];
                    let carR = this.objectsPositions.car.coords[2];
                    obj.rend(this.ctx, carX, carY, carR);
                case 'road':
                    obj.rend(this.ctx, gDistance);
                    
            }
        });
    }
}