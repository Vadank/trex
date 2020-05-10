var trex, ground, invisibleGround, gameState, t_rex, groundAnimation, cloudAnimation, trex_end;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var obstacleGroup, cloudGroup;


function preload()
{

    t_rex = loadAnimation("trex1.png", "trex2.png", "trex3.png");

    trex_end = loadAnimation("trex_collided.png")
        
        groundAnimation = loadAnimation("ground.png");

       cloudAnimation = loadAnimation("cloud.png");
        
    obstacle1 = loadAnimation("obstacle1.png");
    obstacle2 = loadAnimation("obstacle2.png");
    obstacle3 = loadAnimation("obstacle3.png");
    obstacle4 = loadAnimation("obstacle4.png");
    obstacle5 = loadAnimation("obstacle5.png");
    obstacle6 = loadAnimation("obstacle6.png");
 
    
}



function setup()
{

     cloudGroup = new Group();

    obstacleGroup = new Group();

   createCanvas(800, 800);

   //create a trex sprite
   trex = createSprite(200,380,20,50);
   
    trex.addAnimation("t-rex", t_rex);

    trex.addAnimation("trex_collided", trex_end)
   
   trex.debug = true
   
   trex.setCollider("circle", 8, -5, 50)
   
   //scale and position the trex
   
   trex.scale = 0.6;
   
   trex.x = 50;

   //create a ground sprite
  
   ground = createSprite(200,380,400,20);
   
   ground.addAnimation("ground2", groundAnimation);
   
   ground.x = ground.width /2;

   invisibleGround = createSprite(200,385,400,5);
   
   invisibleGround.visible = false;

   gameState = "play"
  
  

}






function draw() {

    //set background to white

    //0 - 255 is black to  white.
    background(100, 50, 255);





    if (gameState == "play") {

        ground.velocityX = -10;

        trex.changeAnimation("t-rex", t_rex)

        //console.log(trex.y);

        if (ground.x < 0) {

            ground.x = ground.width / 2;

        }


        //jump when the space key is pressed

        if (keyDown("space")) {

            trex.velocityY = -14
            console.log(trex.y)

        }


        if (trex.y <= 357.5) {

            trex.velocityY = trex.velocityY + 2

        }

        //spawn the clouds

        spawnClouds();

        spawnObstacles();

    }


        if (obstacleGroup.isTouching(trex)) {

            gameState = "end"


        }

    


    else if (gameState == "end") {

        ground.velocityX = 0;

        obstacleGroup.setVelocityXEach(0);

        cloudGroup.setVelocityXEach(0);

        trex.velocityY = 0;

        obstacleGroup.setLifetimeEach(-4);

        cloudGroup.setLifetimeEach(-1);

            trex.changeAnimation("trex_collided", trex_end)

    }

    trex.collide(invisibleGround);




         drawSprites();

}







function spawnClouds() {
  //write code here to spawn the clouds
  
  
  
  if (World.frameCount % 60 === 0) 
  {
    
    var cloud = createSprite(400,320,40,10);
    
    cloud.y = Math.round(random(280,320));
    
    cloud.addAnimation("cloudAnimation", cloudAnimation);

    cloud.scale = 0.5;
    
    cloud.velocityX = -10;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    
    //cloudGroup.add(cloud);
    
      trex.depth = trex.depth + 1;

      cloudGroup.add(cloud);
    
  }

}

  

function spawnObstacles()
 {
  
  if(World.frameCount%100 == 0)
  
  {
    
    var o = createSprite(400, 360);
    
    var od = Math.round(random(1, 6));

      switch (od) {

          case 1: o.addAnimation("obstacle1",obstacle1)

              break;

          case 2: o.addAnimation("obstacle2",obstacle2)

              break;

          case 3: o.addAnimation("obstacle3",obstacle3)

              break;

          case 4: o.addAnimation("obstacle4",obstacle4)

              break;

          case 5: o.addAnimation("obstacle5",obstacle5)

              break;

          case 6: o.addAnimation("obstacle6",obstacle6)


      }

    o.velocityX = -12;
    
    
    o.scale = 0.6;
    
    obstacleGroup.add(o);
    
  }
  
  
 }
 

