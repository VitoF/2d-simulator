class Car {
    constructor(data) {
        this.id = 'car';
        this.width = data.width;
        this.height = data.height;
        this.x = 400;
        this.y = 450;
        this.r = 1; //0-left, 1-default, 2-right, 3-up, 4-down, 5-wrecked after shock
        this.x0 = data.collision.x0;
        this.x1 = data.collision.x1;
        this.y0 = data.collision.y0;
        this.y1 = data.collision.y1;
        this.AverageSpeed = 100;
        
        this.imgReady = false;
        this.img = new Image();
        this.img.onload = () => {this.imgReady = true;}
        this.img.src = '../images/'+data.texture;
        this.textCoords = data.textureCoords;
    }
    rend(ctx){
        
        if (this.imgReady){
            let rot = "default";
            let syncX = 0;
            switch(this.r){
                case 0:
                    rot = "left"; syncX = -Math.floor(this.width/8);
                    break;
                case 1:
                    rot = "default"; syncX = 0;
                    break;
                case 2:
                    rot = "right"; syncX = 0;
                    break;
                case 3:
                    rot = "up"; syncX = -1;
                    break;
                case 4:
                    rot = "down"; syncX = -1;
                    break;
                case 5:
                    rot = "wreckedShock"; syncX = 0;
                    break;
                case 6:
                    rot = "wreckedTurn"; syncX = 0;
                    break;
                default:
                    rot = "default"; syncX = 0;
            }
            ctx.drawImage(this.img, this.textCoords[rot][0], this.textCoords[rot][1],
                          this.textCoords[rot][2], this.textCoords[rot][3],
                          this.x - Math.floor(this.textCoords[rot][2]/2) + syncX, this.y,
                          this.textCoords[rot][2], this.textCoords[rot][3]);
            
        }
    }
}