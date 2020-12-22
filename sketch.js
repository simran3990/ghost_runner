var towerImg, tower;
var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;
var ghost,ghostImage;
var invisibleblock,invisibleblockGroup;
var gameState,PLAY,END;
gameState="PLAY";
var sound;


function preload(){
  towerImg = loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
  sound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,10,10);
  ghost.addImage("ghost",ghostImage);
  ghost.scale=0.3;
  
  
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleblockGroup=new Group();
  sound.loop();
}

function draw(){
  background(0);
   if(tower.y > 400){
      tower.y = 300
    }  
if(gameState==="PLAY"){
  if(keyDown("space")){
  ghost.velocityY=-3;
}
 ghost.velocityY=ghost.velocityY+1;
  
if(keyDown("left_arrow")){
  ghost.x=ghost.x-3;
}
if(keyDown("right_arrow")){
  ghost.x=ghost.x+3;
}  
if(climberGroup.isTouching(ghost)){
  ghost.velocityY=0;
}
if(invisibleblockGroup.isTouching(ghost)||ghost.y>600){
 ghost.destroy();
  gameState="END";
}  
 
 spawnDoor();
  drawSprites();
}
  else if(gameState==="END"){
    fill("red");  
    textSize(30);
    text("gameOver",230,250);
    
}
  
}
function spawnDoor(){
  if(frameCount %240===0){
    door=createSprite(200,-50,10,10);
    door.addImage("door",doorImage);
    door.x=Math.round(random(100,400));
    door.velocityY=1;
    door.lifetime=800;
    doorGroup.add(door);
  //making climber
    climber=createSprite(200,10,10,10);
    climber.addImage("climber",climberImage);
    climber.x=door.x;
    climber.velocityY=1;
    climber.lifetime=800;
    climberGroup.add(climber);
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    //making invisibleblock
    invisibleblock=createSprite(200,15,10,10);
    invisibleblock.width=climber.width;
    invisibleblock.height=2;
    invisibleblock.x=door.x;
    invisibleblock.velocityY=1;
    invisibleblock.debug=true;
    invisibleblockGroup.add(invisibleblock);
    
  }
}
