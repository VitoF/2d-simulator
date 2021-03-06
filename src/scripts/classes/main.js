class MainApp {
    constructor(dataObj, car, road) {
        this.carData = dataObj.car[car];
        this.roadData = dataObj.road[road];
        this.handData = dataObj.handling["default"];
        this.hitchesData = dataObj.hitches;
        this.pause = true;
        
        this.canvas = new Canvas('main_canvas');
        this.car = new Car(this.carData);
        this.road = new Road(this.roadData);
        this.hitches = new Hitches(this.hitchesData, this.road);
        this.handling = new Handling(this.car, this.handData, this);
        this.collision = new Collision(this.roadData.slots, this.hitchesData.slots, this.hitchesData.items);
        
        var objects = [this.road, this.car, this.hitches];
        this.roadSpeed = this.roadData.speed;
        
        this.render = new Render(this.canvas, objects);
        
        this.goneDistance = 0;
        this.currentSlot = 0;
        
        
        // Cross-browser support for requestAnimationFrame
        requestAnimationFrame = window.requestAnimationFrame ||
                                window.webkitRequestAnimationFrame || 
                                window.msRequestAnimationFrame || 
                                window.mozRequestAnimationFrame;  
    }
    
    gameLoop() {
        var main = () => {
            var now = Date.now();
            var delta = now - then;
            
            this.currentSlot = Math.floor(this.goneDistance/100); //100 = slot height
            this.currentCarSlot = Math.floor((this.goneDistance+600-this.car.y)/100);
            
            this.handling.update();
            
            this.render.run(this.goneDistance, this.currentSlot);
            
            this.collision.listenCollision(this.currentCarSlot, this.goneDistance, this.car);
            if (!this.pause && !this.collision.isCollision && this.goneDistance < (this.road.distance*10 + 70)){
                document.getElementById('gone_distance').innerHTML = Math.floor(this.goneDistance/10);
                this.goneDistance += (this.roadSpeed*10/3.6)*(delta/1000); //10px = 1m & roadSpeed in km/h
            }else if(this.goneDistance >= (this.road.distance*10 + 70) && this.car.y >= -this.car.height){
                this.car.y -= this.roadSpeed * 0.08;
            }else if(this.pause){
                this.canvas.pauseMode();
            }

            then = now;

            // Request to do this again ASAP
            requestAnimationFrame(main);
        };        

        var then = Date.now();
        main();
    }
    
    run() {
        this.gameLoop();
    }
}