class Car {
    constructor() {
        this.id = 'car';
        this.width = 40;
        this.height = 60;
        this.x = 0;
        this.y = 0;
        this.calculateCoords();
        
        this.imgReady = false;
        this.img = new Image();
        this.img.onload = () => {this.imgReady = true;}
        this.img.src = '../images/car.png';
    }
    calculateCoords() {
        this.xl = this.x - this.width/2;
        this.xr = this.x + this.width/2;
        this.yt = this.y - this.height/2;
        this.yb = this.y + this.height/2;        
    }
    rend(ctx, x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.calculateCoords(); 
        
        if (this.imgReady){
            switch(this.r){
                case 0:
                    ctx.drawImage(this.img, 40, 0, this.width, this.height, this.x, this.y, 40, 60);
                    break;
                case 1:
                    ctx.drawImage(this.img, 0, 0, this.width, this.height, this.x, this.y, 40, 60);
                    break;
                case 2:
                    ctx.drawImage(this.img, 80, 0, this.width, this.height, this.x, this.y, 40, 60);
                    break;
                case 3:
                    ctx.drawImage(this.img, 120, 0, this.width, this.height, this.x, this.y, 40, 60);
                    break;
                case 4:
                    ctx.drawImage(this.img, 160, 0, this.width, this.height, this.x, this.y, 40, 60);
                    break;
            }
            
        }
    }
}