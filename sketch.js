var obs1
var obs2 
var obs3
var obs4
var obs5
var obs6

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, gameOver;
var ctrexi;
var restarti;
var gameoveri;

var count = 0;






var ObstaclesGroup;
var obstacleI
var CloudsGroup;
var trex;
var trexI;
var ground;
var groundI
var invground
var cloudI;

function preload(){
trexI = loadAnimation("trex1.png", "trex3.png", "trex4.png");
groundI = loadImage("ground2.png");
  cloudI = loadImage("cloud.png");
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  ctrexi = loadAnimation("trex_collided.png");
  restarti = loadImage("restart.png");
  gameoveri = loadImage("gameOver.png");
  

}


function setup() {
  createCanvas(400, 400);
  trex = createSprite(50, 380, 30, 30)
trex.addAnimation("run", trexI)
  trex.scale = 0.5
  ground = createSprite(200, 380, 400, 20);
  ground.addImage("floor", groundI);
  invground = createSprite(200, 390, 400, 10);
  invground.visible = false;
  CloudsGroup = new Group();
  ObstaclesGroup = new Group();
  
   restart = createSprite(200,340);
  restart.visible = false;
gameOver = createSprite(200,300);
gameOver.visible = false
 
 
  
}

function draw() {
  background(270);
  
  trex.collide(invground);
  
  textSize(18);
textFont("Georgia");
textStyle(BOLD); 
  text("count:" + count, 250, 100);
  
  
  if(gameState === PLAY){
  
   if(ObstaclesGroup.isTouching(trex)){
      gameState = END;}  
  
  count = count + Math.round(World.frameRate/29);
  
  
  if(keyDown("space") && trex.y >= 359){
    trex.velocityY = -14  ;
  }
  trex.velocityY = trex.velocityY + 1;
  
  ground.velocityX = -6;
   if (ground.x < 0){
    ground.x = ground.width/2;}
  
  

  spawnClouds();
  spawnObstacles();
  }
  
  else if(gameState === END) {
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    restart.visible = true
     gameOver.visible = true
    restart.addImage("press", restarti);
    
    //change the trex animation
    trex.addAnimation("trex_collided", ctrexi);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    //place gameOver and restart icon on the screen
    
    
    
    gameOver.addImage("gameOver", gameoveri);
    gameOver.scale = 0.5;
    restart.addAnimation("restart");
    restart.scale = 0.5;
  }
  
  if(mousePressedOver(restart)){
    Restart();
   }
  
  
  drawSprites();
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(400,320,40,10);
    cloud.y = random(280,320);
     cloud.addImage("cloudI", cloudI );
  
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 135 ;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = -6 
    
    //generate random obstacles    
    var rand = Math.round(random(1,6));
    switch(rand) { case 1: obstacle.addImage(obs1);
        break; case 2: obstacle.addImage(obs2);
        break; case 3: obstacle.addImage(obs3);
        break; case 4: obstacle.addImage(obs4);
        break; case 5: obstacle.addImage(obs5);
        break; case 6: obstacle.addImage(obs6);
        break;
        default:break; }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
    
  }
}

function Restart(){
  gameState = PLAY
ObstaclesGroup.destroyEach();
CloudsGroup.destroyEach()
trex.addAnimation("trex", trexI)
restart.visible = false
gameOver.visible = false
count = 0;
}
