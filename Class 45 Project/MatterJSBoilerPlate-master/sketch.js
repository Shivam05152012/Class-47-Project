var PLAY = 1;
var END = 0;
var gameState= PLAY;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var fireball, fireballGroup;
var rocket;
var background;
var restartImg;

var score;
 
function preload()
{
  fireball=loadImage("Fireball.png");
  rocket=loadImage("Rocket.png");
  background=loadImage("SpaceBackground.jpg");
}

function setup() {
	createCanvas(800, 700);

    engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.

	fireball= createSprite(50, 50);
	fireball.addImage("fireball", fireball);
	fireball.scale= 0.03;
	 
    rocket= createSprite(800, 350, 150, 150);
	rocket.addImage("rocket", rocket);
	rocket.scale= 0.05;
	rocket.x= width /2;

	background= createSprite( 800, 700);
	background.addImage("background", background);

	restart = createSprite(400,350);
	restart.addImage(restartImg);

	gameOver.scale= 0.5;
	restart.scale= 0.5;

	fireballGroup= createGroup();

	rocket.setCollider("rectangle", 0,0, rocket.width, rocket.height);
    rocket.debug= false

	score=0;
    
	Engine.run(engine);
  }

  function draw() {
  rectMode(CENTER);
  background(0);
  
 if(keyDown("up")&& rocket >= 100){
	rocket.velocityY = -12;
}

  if(keyDown("down")&& rocket >= 100){
	rocket.velocityY= +12;
  }

 if(gameState === PLAY){
 background.velocityX = -4;
 score= score+ Math.round(frameCount/60);

 text("Score: "+ score, 500, 50);

 if(gameState === PLAY){
	gameOver.visible= false;
	restart.visible= false;
 }

	ground.velocityX= -(4 + 3* score/100)

	if(fireballGroup.isTouching(rocket)){
		gameState= END;
	}

	else if (gameState === END){
		gameOver.visible= true;
		restart.visible= true;
	}
 

 drawSprites();
}



spawnFireballs();

fireballGroup.setLifetimeEach(-1);
fireballGroup.setVelocityXEach(0);

drawSprites();

function spawnFireballs(){
	if(frameCount % 60 === 0){
		var fireball = createSprite(600, 165, 10, 40);
		fireball.velocityX= - (6+ score/100);

		var random= Math.round(random(1,6));
switch(random){
	case 1: fireball.addImage(fireball1);
	break;
	case 2: fireball.addImage(fireball2);
	break;
	case 3: fireball.addImage(fireball3);
	break;
	case 4: fireball.addImage(fireball4);
	break;
	case 5: fireball.addImage(fireball5);
	break;
	case 6: fireball.addImage(fireball6);
	break;
	default: break;
}
}
fireball.scale= 0.5;
fireball.lifetime= 300;

fireballGroupGroup.add(fireball);
}
}

function reset(){
	score= 0;
	gameState= PLAY
	fireballGroup.destroyEach()
}
