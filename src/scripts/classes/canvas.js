class Canvas {
    constructor (htmlId, width, height){
        this.canvas = document.getElementById(htmlId);
        this.ctx = this.canvas.getContext("2d");
        this.width = width || 800;
        this.height = height || 600;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
}