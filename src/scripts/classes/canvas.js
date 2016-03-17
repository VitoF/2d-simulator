class Canvas {
    constructor (htmlId, width, height){
        this.canvas = document.getElementById(htmlId);
        this.ctx = this.canvas.getContext("2d");
        this.width = width || 800;
        this.height = height || 600;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        this.pauseImgReady = false;
        this.pauseImg = new Image();
        this.pauseImg.onload = () => {this.pauseImgReady = true;}
        this.pauseImg.src = '../images/pause_mode.png';
    }
    pauseMode(){
        if (this.pauseImgReady){
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0,0,800,600);
            this.ctx.drawImage(this.pauseImg, 210, 240);
        }
        
//        var pauseImg = new Image(); var that = this;
////        pauseImg.src = '../images/pause_mode.png';
//        pauseImg.onload = () => {//console.log('ddd');
////            this.ctx.fillStyle = 'red';
//            that.ctx.fillRect(20,20,100,50);
////            this.ctx.drawImage(pauseImg, 20, 20);
//        }
    }
}