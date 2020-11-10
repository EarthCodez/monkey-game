
var monkey , monkey_running;
var fruits ,bananaImage,obstacle, obstacleImage;
var score;
var ground;
var fruitgrp,obsgrp;
var backg,backgimg,backgnimg;
var gs=0;
var gamestate="wait";
var score=0;
var dn=true;
var scrcnt=0;
function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  backgimg=loadImage("background.jpg");
  backgnimg=loadImage("backgroundn.jpg");
}
function setup() {
  createCanvas(400,400);
  fruitgrp=createGroup();
  obsGroup=createGroup();
  ground=createSprite(200,280,400,1)
  monkey=createSprite(50,250,20,20)
  monkey.addAnimation("come_here",monkey_running);
  monkey.scale=0.08;
}


function draw() {
  var surtime=Math.ceil(scrcnt);
 background("blue")
  if(gamestate=="play"){
    obs();
     background(backg,200,200);
    scrcnt+=0.01;
      if(dn==true){
      backg=image(backgimg,gs,0,2900,400);
  }
  else if(dn==false){
    backg=image(backgnimg,gs,0,2900,400);
  }
      text("score:"+score,10,10);
   text("survival Time:"+surtime,300,10);
  textSize(15);
      if(frameCount/80%12==0){
    dn=!dn;
    }
    gs-=8;
      if(gs<-2300){
      gs=-8;
    }
    fruit();
        fill("white");
  if(monkey.isTouching(fruitgrp)){
    fruitgrp.destroyEach();
    score+=1;
  }}
 if(monkey.isTouching(obsGroup)){
   gamestate="end";
   monkey.y=250;
 }
 if(gamestate=="end"){
   text("click space to restart",10,200);
   scrcnt=0;
   score=0;
   monkey.y=250;
 }
  
  if(keyDown("space") && gamestate!="play"){
    gamestate="play";
  }
  if(gamestate=="wait"){
    text("the monkey is in cage press space to release him",10,200);
  }
  monkey.collide(ground);
  if(gamestate=="play"){
       monkey.velocityY = monkey.velocityY + 0.8
    if(keyDown("space")&&monkey.y>240){
      monkey.velocityY=-12;
    }
  }
  drawSprites();
}

function fruit(){
  var rndm=Math.round(random(1,4));
  if(frameCount%60==0){
    fruits=createSprite(600,Math.round(random(150,250)),20,20);
    fruits.setCollider("circle",0,0);
    fruits.velocityX=-8;
    fruits.addImage(bananaImage);
    fruits.scale=0.07;
    fruits.lifetime=200;
    fruitgrp.add(fruits);
}

}

function obs(){
  if(frameCount%100==0){
  obstacle=createSprite(600,265,20,20);
    obstacle.addImage(obstaceImage);
  obstacle.velocityX=-8;
  obstacle.lifetime=200;
    obstacle.scale=0.1;
    obsGroup.add(obstacle);
}
}


