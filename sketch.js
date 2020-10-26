
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup, ground;
var score, gameState, monkey;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
monkey=createSprite(80,340,10,50);
ground=createSprite(200,380,800,20);
monkey.addAnimation("monkey",monkey_running);
monkey.scale=0.1;
obstacleGroup=createGroup();
FoodGroup=createGroup();
gameState="play";
score=0;

  
}



function draw() {
  
  background(255);
  ground.velocityX=-5;
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(gameState==="play")
      {
        if(keyDown("space")&&monkey.collide(ground)){
        monkey.velocityY=-20;
      }
      monkey.velocityY=monkey.velocityY+2;
      
       if(World.frameCount%300===0){
          spawnObstacles();
       }
       if(World.frameCount%80===0){
          spawnBananas();
       }
       if(obstacleGroup.isTouching(monkey)){
         gameState="over";
         
       }
        if(FoodGroup.isTouching(monkey)){
          FoodGroup.destroyEach();
        }
       
       score=Math.floor(World.frameCount/World.frameRate);
  }
  
  console.log(World.frameRate/60);
 
  monkey.collide(ground);
         textSize(20);
  text("Survival Time: "+score,200,150);
  fill("red");
  
 if(gameState==="over"){ 
   monkey.velocityX=0;
         
         text("RIP",180,200);
     
         obstacleGroup.setVelocityEach(0,0);
         FoodGroup.setVelocityEach(0,0);
         obstacleGroup.setLifetimeEach(-1);
         FoodGroup.setLifetimeEach(-1);
         
 }
  
  
  
  
  drawSprites();
    
  
}
function spawnObstacles(){
 
  var obstacle=createSprite(400,353,10,10);
  obstacle.addImage(obstaceImage);
  obstacle.scale=0.1;
  obstacle.x=random(400,500);
  
  obstacleGroup.add(obstacle);
  obstacle.velocityX=-5;
  obstacle.lifetime=obstacle.x/5;
  
}
function spawnBananas(){
  var banana=createSprite(400,350,10,10);
  banana.y=random(250,300);

  banana.addImage(bananaImage);
  banana.scale=0.05;
  FoodGroup.add(banana);
  banana.velocityX=-5;
  banana.lifetime=banana.x/5;
 



  
}






