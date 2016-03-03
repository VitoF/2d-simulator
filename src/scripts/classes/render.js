class Render {
    constructor(canvas, objects) {
        this.canvas = canvas;
        this.ctx = canvas.ctx;
        this.objects = objects;
//        this.objectsPositions = objectsPositions;
    }
    run(gDistance) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.objects.forEach((obj)=>{
            switch(obj.id){
                case 'car':
                    obj.rend(this.ctx);
                case 'road':
                    obj.rend(this.ctx, gDistance);
                    
            }
        });
    }
}