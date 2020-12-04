
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground;
var invisibleGround;
var survivalTime = 0;
var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}



function setup() {
  createCanvas(500, 220);
  
  ground = createSprite(200, 200, 550, 10)
  ground.x = ground.width/2;
  ground.velocityX = -6;
  
  monkey = createSprite(50, 165, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  

  
  invisibleGround = createSprite(200, 200, 600, 10);
  //invisibleGround.visible = false;

  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background("white")
  
  //if(jungle.x < 0){
   // jungle.x = 270;
  //}

  
  if(ground.x<0){
    ground.x = ground.width/2;
    }
  

  if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -10;
    }
    
  monkey.velocityY = monkey.velocityY+0.5
  monkey.collide(invisibleGround);
  
  if (FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score+1
  }
  
  stroke("white");
  textSize(15);
  fill("black");
  text("Score:"+score, 420, 20);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()); 
  text("Survival Time:"+survivalTime, 220, 20);
  
  
  spawnBanana();
  spawnObstacle();
  
  drawSprites();
}

function spawnBanana(){
  if(frameCount%80 === 0){
    banana = createSprite(500, 80, 10, 10);
    banana.y = Math.round(random(80,150));
    banana.addImage( bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 160;
    FoodGroup.add(banana);
  }
}

function spawnObstacle(){
  if(frameCount%200 === 0){
    obstacle = createSprite(500, 170, 10, 10)
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -6;
    obstacle.lifetime = 170;
    
    obstacleGroup.add(obstacle);
  }
}


