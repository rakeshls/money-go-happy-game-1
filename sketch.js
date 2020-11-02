var bakground;
var monkey , monkey_running,monkeycollided;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var invisible;

var PLAY=1;

var END=0;

var gameState=1;

var bananaC;


function preload(){
  
    monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkeycollided = loadAnimation("sprite_1.png");

    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");
 
    
}



function setup() {
  
createCanvas(500,460);
    
monkey = createSprite(100,415,30,30);
monkey.addAnimation("monkey",monkey_running);
monkey.addAnimation("collided", monkeycollided);
monkey.debug = false;  
monkey.setCollider("rectangle",0,0,40,monkey.height);  
monkey.scale = 0.1;
  
ground = createSprite(100,450  ,900,10); 
   
FoodGroup = createGroup();
obstacleGroup = createGroup(); 
  
invisible = createSprite(250,460,500,5);
invisible.visible = false;
  
score = 0;
  
bananaC = 0;  
  }


function draw() {

background (255)
  
if(gameState===PLAY){
  
food();
obstacles();
  
if(monkey.isTouching(FoodGroup)){
  
FoodGroup.destroyEach();
bananaC = bananaC + 1;  
  
}
  
score = score + Math.round(getFrameRate()/67);
  
  if(monkey.isTouching(obstacleGroup)){
  
gameState=END;    
  
}      
}  
  
if(keyDown("space")){
monkey.velocityY = -15;   

}  
  
monkey.velocityY = monkey.velocityY + 0.8;  
  

  
monkey.collide(ground);
  
obstacleGroup.collide(invisible);  

ground.velocityX = -5;  
  
if (ground.x < 0){
ground.x = ground.width/2 ;
}
  
    
drawSprites();

fill("black "); 
textSize(15);  
text("SURVIVAL TIME : "+ score, 200,50); 
  
fill("black ");
textSize(13);
text("Banana Collect : "+ bananaC,220,70);
  
if(gameState===END){
  
monkey.changeAnimation("collided",monkeycollided);

fill("red")  
textSize(15);
text("GAME OVER!",200,200);  

ground.velocityX = 0;
monkey.velocityY = 0;  
FoodGroup.setVelocityXEach(0)
obstacleGroup.setVelocityXEach(0) 
  
obstacleGroup.setLifetimeEach(-1)
FoodGroup.setLifetimeEach(-1)
        
}  
  
}

function food(){
  
if(frameCount%100==0){
  
banana = createSprite(490,250,30,30);
banana.y = Math.round(random(220,300));  
banana.addImage("banana",bananaImage);  
banana.scale = 0.05;  
  
banana.velocityX = -5;  
banana.lifetime = 100;
FoodGroup.add(banana);  
  
}    
}

function obstacles(){
  
if(frameCount%300==0){
  
obstacle = createSprite(480,450,10,10);  
obstacle.addImage("obstacle",obstacleImage);
obstacle.scale = 0.1;  
  
obstacle.velocityX = -5;  
obstacle.lifetime = 100;  
obstacleGroup.add(obstacle);  
}    
}