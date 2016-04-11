var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext("2d");

var l1_pressed,r1_pressed,l2_pressed,r2_pressed;
var u1_pressed,d1_pressed,u2_pressed,d2_pressed;

var x1,y1,x2,y2,r_tyre;
var t1_ang = -Math.PI/6;
var t2_ang = -5.2*Math.PI/6;
var b1x,b1y,br,b2x,b2y;
var can_l = 60;
var b1motion,b2motion;
var g = 0.05;
var b1vx,b1vy,b2vx,b2vy;
var tank_speed = 1.1;
var b1_speed,b2_speed;
var bar_y;
var health1,health2;
var chance;
var sd2_pressed,su2_pressed;
var sd1_pressed,su1_pressed;

su1_pressed = sd1_pressed = su2_pressed = sd2_pressed = false;
b1_speed = b2_speed = 6;
bar_y = 200;
chance = 1;
health1 = health2 = 100;
b1motion = false;
b2motion = false;
br = 5;
x1 = 100;
y1 = 500;
x2 = 1000;
y2 = 500;
l1_pressed = r1_pressed = false;
l2_pressed = r2_pressed = false;
u1_pressed = d1_pressed = false;
u2_pressed = d2_pressed = false;
r_tyre =12.5;

function getRandomInt(min, max) {
	done=0;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getbar(){
	bar_y = getRandomInt(150,500);
}

function draw_barrier(){
	ctx.beginPath();
	ctx.rect((canvas.width-20)/2,550-bar_y,20,bar_y);
	ctx.fillStyle = 'brown';
	ctx.fill();
	ctx.closePath();
}

function draw_tank1(){

	if (r1_pressed==true){
		if (x1+100<(canvas.width-60)/2)	//boundations
		x1+=tank_speed;
	}
	if (l1_pressed==true){
		if (x1>20)	//boundations
		x1-=tank_speed;
	}
	if (u1_pressed==true) t1_ang-=0.005;
	if (d1_pressed==true) t1_ang+=0.005;
	if (su1_pressed==true && b1_speed<=9.9) b1_speed+=0.05;
	if (sd1_pressed==true && b1_speed>=1) b1_speed-=0.05;

	//cannon
	ctx.save();
	ctx.translate(x1+45, y1-5);
    ctx.rotate(t1_ang);
    ctx.fillStyle = "#1a1a00";
    ctx.fillRect(0,0, 60,8);
    ctx.restore();

	//Dome
	ctx.beginPath();
	ctx.arc(x1+50,y1,15,0,Math.PI,true);
	ctx.fillStyle = '#333300';
	ctx.fill();
	ctx.closePath();

	//tank rectangle
	ctx.beginPath();
	ctx.rect(x1,y1,100,50);
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#1a1a00';
	ctx.stroke();
	ctx.fillStyle = '#666600';
	ctx.fill();
	ctx.closePath();

	//tank tyre exterior
	ctx.beginPath();
	ctx.arc(x1,y1+50,r_tyre,0,Math.PI*2,false);
	ctx.arc(x1+2*r_tyre,y1+50,r_tyre,0,Math.PI*2,false);
	ctx.arc(x1+4*r_tyre,y1+50,r_tyre,0,Math.PI*2,false);
	ctx.arc(x1+6*r_tyre,y1+50,r_tyre,0,Math.PI*2,false);
	ctx.arc(x1+8*r_tyre,y1+50,r_tyre,0,Math.PI*2,false);
	ctx.rect(x1,y1+37,100,3);
	ctx.rect(x1,y1+59.5,100,3);
	ctx.fillStyle = '#1a1a00';
	ctx.fill();
	ctx.closePath();

	//tank tyre interior
	ctx.beginPath();
	ctx.arc(x1,y1+50,r_tyre/2,0,Math.PI*2,false);
	ctx.arc(x1+2*r_tyre,y1+50,r_tyre/2,0,Math.PI*2,false);
	ctx.arc(x1+4*r_tyre,y1+50,r_tyre/2,0,Math.PI*2,false);
	ctx.arc(x1+6*r_tyre,y1+50,r_tyre/2,0,Math.PI*2,false);
	ctx.arc(x1+8*r_tyre,y1+50,r_tyre/2,0,Math.PI*2,false);
	ctx.fillStyle = '#666600';
	ctx.fill();

	
	ctx.closePath();
}

function draw_ball1(){
    ctx.beginPath();
    ctx.arc(b1x,b1y,br,0,Math.PI*2,false);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
	b1vy-=g;
	b1x+=b1vx;
	b1y-=b1vy;

	if (b1y>=550){
		b1motion = false;
		chance = 2;
		getbar();
	}
	if (b1x+br>=(canvas.width-20)/2 && b1x+br<=(canvas.width-10)/2 && b1y>=550-bar_y) b1vx*=-7/8;
	if (b1x+br>=x2+35 && b1x+br<=x2+65 && b1y+br>=y2 && b1y+br<=y2+15){
		health2 -=20;
		b1motion = false; 
		chance = 2;
		getbar();
	}
	else if(b1x+br>=x2 && b1x<=x2+100 && b1y+br>=y2 && b1y+br<=y2+50){
		health2 -=10;
		b1motion = false; 
		chance = 2;
		getbar();
	}
	if (b1x-br>=x1+35 && b1x-br<=x1+65 && b1y+br>=y1 && b1y+br<=y1+15){
		health1 -=20;
		b1motion = false; 
		chance = 2;
		getbar();
	}
	else if(b1x>=x1 && b1x-br<=x1+100 && b1y-br>=y1 && b1y-br<=y1+50){
		health1 -=10;
		b1motion = false; 
		chance = 2;
		getbar();
	}
}

function shoot1(){
    var costh = Math.cos(t1_ang);
    var sinth = Math.sin(t1_ang);
    b1x = x1+45+can_l*costh;
    b1y = y1+can_l*sinth;

    b1vx = (b1_speed*costh);
    b1vy = -(b1_speed*sinth);
    b1motion = true;
}

function draw_tank2(){

	if (r2_pressed==true){
		if (x2+100<canvas.width-20)	//boundations
		x2+=tank_speed;
	}
	if (l2_pressed==true){
		if (x2>(canvas.width+60)/2)	//boundations
		x2-=tank_speed;
	}
	if (u2_pressed==true) t2_ang+=0.005;
	if (d2_pressed==true) t2_ang-=0.005;
	if (su2_pressed==true && b2_speed<=9.9) b2_speed+=0.05;
	if (sd2_pressed==true && b2_speed>=1) b2_speed-=0.05;

	//cannon
	ctx.save();
	ctx.translate(x2+45, y2-5);
    ctx.rotate(t2_ang);
    ctx.fillStyle = "#1a1a00";
    ctx.fillRect(0,0, 60,8);
    ctx.restore();

	//Dome
	ctx.beginPath();
	ctx.arc(x2+50,y2,15,0,Math.PI,true);
	ctx.fillStyle = '#333300';
	ctx.fill();
	ctx.closePath();

	//tank rectangle
	ctx.beginPath();
	ctx.rect(x2,y2,100,50);
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#1a1a00';
	ctx.stroke();
	ctx.fillStyle = '#666600';
	ctx.fill();
	ctx.closePath();

	//tank tyre exterior
	ctx.beginPath();
	ctx.arc(x2,y2+50,r_tyre,0,Math.PI*2,false);
	ctx.arc(x2+2*r_tyre,y2+50,r_tyre,0,Math.PI*2,false);
	ctx.arc(x2+4*r_tyre,y2+50,r_tyre,0,Math.PI*2,false);
	ctx.arc(x2+6*r_tyre,y2+50,r_tyre,0,Math.PI*2,false);
	ctx.arc(x2+8*r_tyre,y2+50,r_tyre,0,Math.PI*2,false);
	ctx.rect(x2,y2+37,100,3);
	ctx.rect(x2,y2+59.5,100,3);
	ctx.fillStyle = '#1a1a00';
	ctx.fill();
	ctx.closePath();

	//tank tyre interior
	ctx.beginPath();
	ctx.arc(x2,y2+50,r_tyre/2,0,Math.PI*2,false);
	ctx.arc(x2+2*r_tyre,y2+50,r_tyre/2,0,Math.PI*2,false);
	ctx.arc(x2+4*r_tyre,y2+50,r_tyre/2,0,Math.PI*2,false);
	ctx.arc(x2+6*r_tyre,y2+50,r_tyre/2,0,Math.PI*2,false);
	ctx.arc(x2+8*r_tyre,y2+50,r_tyre/2,0,Math.PI*2,false);
	ctx.fillStyle = '#666600';
	ctx.fill();

	
	ctx.closePath();
}

function draw_ball2(){
    ctx.beginPath();
    ctx.arc(b2x,b2y,br,0,Math.PI*2,false);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
	b2vy-=g;
	b2x-=b2vx;
	b2y-=b2vy;

	if (b2y>=550){
		b2motion = false;
		chance=1;
		getbar();
	}
	if (b2x-br<=(canvas.width+20)/2 && b2x-br>=(canvas.width-10)/2 && b2y>=550-bar_y) b2vx*=-7/8;
	if (b2x-br>=x1+35 && b2x-br<=x1+65 && b2y+br>=y1 && b2y+br<=y1+15){
		health1 -=20;
		b2motion = false; 
		chance = 1;
		getbar();
	}
	else if(b2x>=x1 && b2x-br<=x1+100 && b2y-br>=y1 && b2y-br<=y1+50){
		health1 -=10;
		b2motion = false; 
		chance = 1;
		getbar();
	}
	if (b2x+br>=x2+35 && b2x+br<=x2+65 && b2y+br>=y2 && b2y+br<=y2+15){
		health2 -=20;
		b2motion = false;  
		chance = 1;
		getbar();
	}
	else if(b2x+br>=x2 && b2x<=x2+100 && b2y+br>=y2 && b2y+br<=y2+50){
		health2 -=10;
		b2motion = false; 
		chance = 1;
		getbar();
	}
}

function shoot2(){
	var costh = Math.cos(t2_ang);
    var sinth = Math.sin(t2_ang);
    b2x = x2+45+can_l*costh;
    b2y = y2+can_l*sinth-9;


    b2vx = -(b2_speed*costh);
    b2vy = -(b2_speed*sinth);
    b2motion = true;
}

function draw_speed(){
	ctx.beginPath();
	ctx.rect(30,100,15,200);
	ctx.rect(1155,100,15,200);
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.closePath();

	var t1 = (b1_speed/10)*100;
	var t2 = (b2_speed/10)*100;

	ctx.beginPath();
	ctx.rect(32,300-2*t1,11,2*t1-2);
	ctx.rect(1157,300-2*t2,11,2*t2-2);
	ctx.fillStyle = '#999900';
	ctx.fill();
	ctx.closePath();
}

function draw_health(){

	ctx.beginPath();
	ctx.rect(30,20,554,15);
	ctx.rect(620,20,554,15);
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.rect(32,22,5.5*health1,11);
	ctx.rect(622,22,5.5*health2,11);
	ctx.fillStyle = '#4d4d00';
	ctx.fill();
	ctx.closePath();

}

function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);

	//ground
	ctx.beginPath();
	ctx.rect(0,550,canvas.width,canvas.height);
	ctx.fillStyle = '#408000';
	ctx.fill();
	ctx.closePath();

	if (b1motion==true){
		draw_ball1();
	}	
	if (b2motion==true){
		draw_ball2();
	}

	draw_health();
	draw_speed();
	draw_barrier();
	draw_tank1();
	draw_tank2();

}

function keyDownHandler(key){
	if (b1motion==false && chance==2){
		if (key.keyCode==39) r2_pressed = true;
		if (key.keyCode==37) l2_pressed = true;
		if (key.keyCode==38) u2_pressed = true;
		if (key.keyCode==40) d2_pressed = true;
		if (key.keyCode==191) su2_pressed = true;
		if (key.keyCode==17) sd2_pressed = true;
	}
	if (b2motion==false && chance==1){
		if (key.keyCode==68) r1_pressed = true;
		if (key.keyCode==65) l1_pressed = true;
		if (key.keyCode==87) u1_pressed = true;
		if (key.keyCode==83) d1_pressed = true;
		if (key.keyCode==84) su1_pressed = true;
		if (key.keyCode==71) sd1_pressed = true;
	}
	if (b1motion==false && b2motion==false){
		if (key.keyCode==32 && chance==1) shoot1(); 
		if (key.keyCode==13 && chance==2) shoot2(); 
	}

}

function keyUpHandler(key){
	if (key.keyCode==39) r2_pressed = false;
	if (key.keyCode==37) l2_pressed = false;
	if (key.keyCode==38) u2_pressed = false;
	if (key.keyCode==40) d2_pressed = false;
	if (key.keyCode==68) r1_pressed = false;
	if (key.keyCode==65) l1_pressed = false;
	if (key.keyCode==87) u1_pressed = false;
	if (key.keyCode==83) d1_pressed = false;
	if (key.keyCode==191) su2_pressed = false;
	if (key.keyCode==17) sd2_pressed = false;
	if (key.keyCode==84) su1_pressed = false;
	if (key.keyCode==71) sd1_pressed = false;
}

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
setInterval(draw,10);