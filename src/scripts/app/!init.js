
var canvas = new Canvas('main_canvas');
var car = new Car();


var roadMap = {
    distance: 10000 //10 = 1 meter
}
var road = new Road(roadMap);

var objects = [road, car];
var objectsPositions = {
    car: {
        coords: [400,300,1],
        speed: 100
    }
}

var handling = new Handling();

var render = new Render(canvas, objects, objectsPositions);

//setInterval(()=>{render.run();}, 33);
  

// The main game loop
var goneDistance = 0;

var main = () => {
	var now = Date.now();
	var delta = now - then;

//	update(delta / 1000);
	handling.update();
	render.run(goneDistance);
    goneDistance += 100*delta/1000;

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
requestAnimationFrame = window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame || 
                        window.msRequestAnimationFrame || 
                        window.mozRequestAnimationFrame;  
    
var then = Date.now();
main();

