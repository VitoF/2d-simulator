class MainApp {
    constructor(dataObj, car, road) {
        this.carData = dataObj.car[car];
        this.roadData = dataObj.road[road];
        
        
        this.objCurData = {
            car: {
                coords: [400,300,1],
                speed: 100
            }
        }
        
        this.canvas = new Canvas('main_canvas');
        this.car = new Car(this.carData);
        this.road = new Road(this.roadData);
        this.handling = new Handling(this.objCurData);
        
        var objects = [this.road, this.car];
        this.roadSpeed = this.roadData.speed;
        
        this.render = new Render(this.canvas, objects, this.objCurData);
        
        this.goneDistance = 0;
        
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
            
            this.handling.update();
            this.render.run(this.goneDistance);
            document.getElementById('goneDistance').innerHtml = this.goneDistance;
            this.goneDistance += (this.roadSpeed*10/3.6)*(delta/1000); //10px = 1m & roadSpeed in km/h

            then = now;

            // Request to do this again ASAP
            requestAnimationFrame(main);
        };        

        var then = Date.now();
        main();
        console.log('here');
    }
    
    run() {
        this.gameLoop();
    }
}