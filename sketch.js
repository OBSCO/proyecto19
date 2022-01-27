//Cambios realizados: agragar 3 sprites(bordes)en la parte superior y en los 2 laterales para cuando el "ghost"
//los toque pierda, sonidos agregados: jumpSound(al momento de saltar), dieSound(al momento de morir)
//Puntuacion: la puntuacion se agrego para que aparesca cuando el jugador muere y asi poder saber su puntuacion hasta 
//que se haya perdido, la puntuacion va de 0.5 en 0.5 y es algo rapida






var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var spookySound;

var pared1;
var pared2;
var pared3;

var score;

var jumpSound;
var dieSound;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 2;

  pared1 = createSprite(530,300,1,1000);
  pared1.visible = false;
  pared2 = createSprite(80,300,1,1000);
  pared2.visible = false;
  pared3 = createSprite(300,10,1000,1);
  pared3.visible = false;
  doorsGroup = new Group();
  climbersGroup = new Group();

  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);

  ghost.scale = 0.3;
  
  invisibleBlockGroup = new Group();

  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");

  score = 0;
  
}

function draw() {
  background("black");
   
  text("Puntuación: "+ score, width/2,50);

  if(gameState == "play"){
    
    score = score +0.5;

  if(keyDown("left_arrow")){
    ghost.x = ghost.x -3;
  }

  if(keyDown("right_arrow")){
    ghost.x = ghost.x +3;
  }
  if(keyDown("space")){
    ghost.velocityY = -10;
   jumpSound.play();
   ghost.changeAnimation("ghost-jumping.png");
  }
  ghost.velocityY = ghost.velocityY +0.8;
  
  if(tower.y > 500){
      tower.y = 200
    }

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      dieSound.play();
      gameState = "end";
    }
    if(pared1.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      dieSound.play();
      gameState = "end";
    }

    if(pared2.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      dieSound.play();
      gameState = "end";
    }

    if(pared3.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      dieSound.play();
      gameState = "end";
    }

    spawnDoors();
    drawSprites();
  }
  if(gameState == "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("fin del juego",230,250);
  }
}

function spawnDoors(){
  if(frameCount % 260 == 0){
    door = createSprite(200,-50)
    door.addImage(doorImg);
    door.x = Math.round(random(120,400));

    climber = createSprite(200,10);
    climber.addImage(climberImg);

    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
 
    door.velocityY = 2;
    climber.velocityY = 2;
    climber.x = door.x;

    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 2;

    ghost.depth = door.depth && climber.depth;
    ghost.depth = ghost.depth +1;

    door.lifetime = 700;
    doorsGroup.add(door);

    climber.lifetime= 700;
    climbersGroup.add(climber);

    invisibleBlock.debug = false;
    invisibleBlockGroup.add(invisibleBlock);
  }
}