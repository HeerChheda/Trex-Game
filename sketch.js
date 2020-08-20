var trex, trexRunning, ground, groundImage, invisibleGround,trexCollided;
var clouldImage, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var cloudsGroup, obstaclesGroup;

var end, reset, endImage, resetImage, jumpSound;

function preload () {
  trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexCollided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage ("cloud.png");
  obstacle1 = loadImage ("obstacle1.png");
  obstacle2 = loadImage ("obstacle2.png");
  obstacle3 = loadImage ("obstacle3.png");
  obstacle4 = loadImage ("obstacle4.png");
  obstacle5 = loadImage ("obstacle5.png");
  obstacle6 = loadImage ("obstacle6.png");
  
  endImage = loadImage("gameOver.png");
  resetImage = loadImage("restart.png");
  jumpSound = loadSound("jump.mp3");
}

function setup() {
  createCanvas(600, 200);
  //creating trex
  trex = createSprite(30, 180, 20, 20);
  trex.addAnimation("running", trexRunning);
  trex.addAnimation("collided", trexCollided);
  trex.scale = 0.5;
  
  end = createSprite(300, 100);
  end.scale = 0.5;
  end.addImage ("gameOver", endImage);
  
  reset = createSprite(300, 130);
  reset.scale = 0.5;
  reset.addImage ("restart", resetImage);
  
  ground = createSprite(300, 185, 600, 5);
  ground.addImage("image", groundImage);
  
  invisibleGround = createSprite(300, 195, 600, 5);
  invisibleGround.visible = false;
  
  ground.x = ground.width/2;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
}

function draw() {
  background(255);
  text("score : " + score , 500, 50);  
  
  if (gameState === PLAY) {
     if (keyDown ("space")&& trex.y >= 169) {
        trex.velocityY = -12;
       jumpSound.play();
      }  
    trex.velocityY = trex.velocityY + 0.8;
    ground.velocityX = -6;
    
    if (ground.x<0) {
      ground.x = ground.width/2;  
     }
    
    if (obstaclesGroup.isTouching(trex)) {
      gameState = END;
    }
    
    score = score+ Math.round(getFrameRate() / 60);
    
    end.visible = false;
    reset.visible = false;
    
    spawnClouds();
  
    spawnObstacles();
  }

   else if (gameState === END) {
     ground.velocityX = 0;
     trex.velocityY = 0;
     cloudsGroup.setVelocityXEach(0);
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setLifetimeEach(-1);
     obstaclesGroup.setLifetimeEach(-1);
  
    end.visible = true;
    reset.visible = true;
     
     trex.changeAnimation("collided", trexCollided);
     
     if(mousePressedOver(reset)) {
       restart();
     }
   }

  

  trex.collide(invisibleGround);
  
  drawSprites();
}

function restart() {
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running", trexRunning);
  score = 0;
  
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,100, 30, 30);
    cloud.velocityX = -6;
    cloud.addImage("clouds", cloudImage);
    cloud.y = Math.round(random(100, 150));
    cloud.scale = 0.5;
    
     //assign lifetime to the variable
    cloud.lifetime = 100;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
}

}

function spawnObstacles() {
  if (frameCount % 80 === 0) {
    var obstacle = createSprite(600,165, 30, 30);
    obstacle.velocityX = -6;
    obstacle.scale = 0.5;
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
      break; 
      case 2: obstacle.addImage(obstacle2);
      break;
      case 3: obstacle.addImage(obstacle3);
      break;
      case 4: obstacle.addImage(obstacle4);
      break; 
      case 5: obstacle.addImage(obstacle5);
      break; 
      case 6: obstacle.addImage(obstacle6);
      break; 
      default: break;
    }
     //assign lifetime to the variable
    obstacle.lifetime = 120;
    
    
    obstaclesGroup.add(obstacle);
  }
}



