
var s;
var scl = 20;
var food;

function setup(){
	createCanvas(600, 600);
	s = new snake();
	frameRate(10);
	food = createVector(random(width), random(height));


}

function pickLocation(){
	var cols = floor(width/scl);
	var rows = floor(height/scl);
	pickLocation();
	food.multi(scl);
}

function draw(){
	background(51);
	s.death();
	s.update();
	s.show();
	fill(255, 0, 100);
	rect(food.x, food.y, scl, scl);

	if(s.eat(food)){
		pickLocation();
	}
}

function keyPressed(){
	if(keyCode === UP_ARROW){
		s.dir(0, -1);
	} else if(keyCode=== DOWN_ARROW){
		s.dir(0, 1);
	} else if(keyCode === RIGHT_ARROW){
		s.dir(1, 0);
	} else if(keyCode === LEFT_ARROW){
		s.dir(-1, 0);
	}
}



function snake(){
	this.x = 0;
	this.y = 0;
	this.xspeed = 1;
	this.yspeed = 0;
	this.total = 0;
	this.tail = [];

	this.death = function(){
		for(var i = 0; i < this.total.length; i++){
			var pos = this.tail[i];
			var d = dist(this.x, this.y, pos.x, pos.y);
			if(d < 1){
				console.log("starting over");
				this.total=0;
				this.tail = [];
		    }
		}
	}

	this.eat = function(pos){
		var d = dist(this.x, this.y, pos.x, pos.y);
		if(d < 1){
			this.total++;
			return true;
		} else {
			return false;
		}
	}

	this.dir = function(x, y){
		this.xspeed = x;
		this.yspeed = y;
	}

	this.update = function(){

		if(this.total===this.tail.length){

			for (var j = 0; j < this.tail.length-1; j++){
				this.tail[j] = this.tail[j+1];
			}
		}

		this.tail[this.total-1] = createVector(this.x, this.y);

		for(var i=0; i < this.total-1; i++){
			this.tail[i] = this.tail[i+1];
		}

		this.tail[this.total-1] = createVector(this.x, this.y);

		this.x = this.x + this.xspeed*scl;
		this.y = this.y + this.yspeed*scl;

		this.x = constrain(this.x, 0, width-scl);
		this.y = constrain(this.y, 0, height-scl);


	}

	this.show = function(){
		for (var j = 0; j < this.total; j++){
			rect(this.tail[j].x, this.tail[i].y, scl, scl);
		}

		fill(255);
		rect(this.x, this.y, scl, scl);
	}
}