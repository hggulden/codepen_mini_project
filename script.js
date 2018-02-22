//global var
var orgimage=null;
var grayimage=null;
var redimage=null;
var rbimage=null;
var blrimage=null;
var outputImg=null; 
var filtimage=null;
//upload image and show dimensions
function uploadimage(){
var imgcanvas=document.getElementById("can");
var fileInput=document.getElementById("input");
orgimage=new SimpleImage(fileInput);
grayimage=new SimpleImage(fileInput);
redimage=new SimpleImage(fileInput);
rbimage=new SimpleImage(fileInput);
blrimage=new SimpleImage(fileInput);
filtimage=new SimpleImage(fileInput);
outputImg=new SimpleImage(fileInput);
orgimage.drawTo(imgcanvas);
} 
//img size
  function imgSize(){
if (orgimage!==null && orgimage.complete()) { 
var w = orgimage.getWidth(); 
var h = orgimage.getHeight(); document.getElementById("note").innerHTML="Dimension:"+w+"X"+h; } else { alert("image not loaded") } }

//makes gray
function makeGray(){
if (orgimage==null || !orgimage.complete()){
   alert("Image not loaded"); 
  }
var canvas = document.getElementById("can");
for (var pix of grayimage.values()){
var avg=(pix.getRed()+pix.getGreen()+pix.getBlue())/3;
  pix.setRed(avg);
  pix.setGreen(avg);
  pix.setBlue(avg);
}
grayimage.drawTo(canvas);
}
//make red
function makeRed(){
if (orgimage==null || !orgimage.complete()){
   alert("Image not loaded"); 
  }
var canvas = document.getElementById("can");
for (var pix of redimage.values()){
var avg=(pix.getRed()+pix.getGreen()+pix.getBlue())/3;
if (pix.getY()<=redimage.getHeight()){
  //sets red
  if(avg<128){
      pix.setRed(avg*2);
      pix.setGreen(0);
      pix.setBlue(0);
    }else{
        pix.setRed(255);
        pix.setGreen(2*avg-255);
        pix.setBlue(2*avg-255);
    }}   
}
redimage.drawTo(canvas);
}

//Blur image
function imgBlur(){
  if (orgimage==null || !orgimage.complete()){
   alert("Image not loaded"); 
  }
var canvas=document.getElementById("can");
var w=orgimage.getWidth();
var h=orgimage.getHeight();
for (var pixel of orgimage.values()){
var x= pixel.getX(); 
var y= pixel.getY(); 
var rdm=Math.random(); 
if (rdm>0.5){ 
outputImg.setPixel (x,y,pixel);
}
if (rdm<=0.5){
  var rd=rdm*10;
  var coord=Math.round(rd);
  var newX=coord;
  var newY=coord;
  if(x+newX<w/10){
    XnearPix=x+newX;
  }else{
    XnearPix=x-newX;}
  if(y+newY<h/10){
    YnearPix=y+newY;
  }else{
    YnearPix=y-newY;}
  var nearPix= orgimage.getPixel(XnearPix,YnearPix);
    outputImg.setPixel(x,y,nearPix);
  }
}
  outputImg.drawTo(canvas);
}
//custom filter
function FilterImage(){
if (orgimage==null || !orgimage.complete()){
   alert("Image not loaded"); 
  }
var canvas=document.getElementById("can");
var w = filtimage.getWidth();
var h = filtimage.getHeight();
outputImg= new SimpleImage(w,h); 
for (var pixel of filtimage.values()){
var x= pixel.getX(); 
var y= pixel.getY(); 
var rdm=Math.random(); 
if (rdm>0.3){ 
newR=pixel.getRed()-50;
newG=pixel.getGreen()-10;
newB=pixel.getBlue()-100;
pixel.setRed(newG);
pixel.setGreen(newB);
pixel.setBlue(newR);
outputImg.setPixel (x,y,pixel); 

}
if(rdm<0.2&&rdm>0.1){
newR=pixel.getRed()-10;
newG=pixel.getGreen()+10;
newB=pixel.getBlue()+100;
pixel.setRed(newR);
pixel.setGreen(newG);
pixel.setBlue(newB);
    outputImg.setPixel (x/2,y/2,pixel);
if(rdm<0.3){
newR=pixel.getRed();
newG=pixel.getGreen();
newB=pixel.getBlue();
pixel.setRed(newB);
pixel.setGreen(newR);
pixel.setBlue(newG);
outputImg.setPixel (x/1/3,y/1/3,pixel); 
}
} }
outputImg.drawTo(canvas); 
}

//make rainbow
function makeRbow(){
if (orgimage==null || !orgimage.complete()){
   alert("Image not loaded"); 
  }
var canvas = document.getElementById("can");
for (var pix of rbimage.values()){
var avg=(pix.getRed()+pix.getGreen()+pix.getBlue())/3;
if (pix.getY()<=rbimage.getHeight()/7){
  //sets red
  if(avg<128){
      pix.setRed(avg*2);
      pix.setGreen(0);
      pix.setBlue(0);
    }else{
        pix.setRed(255);
        pix.setGreen(2*avg-255);
        pix.setBlue(2*avg-255);
    }}
if((pix.getY()>rbimage.getHeight()/7)&&(pix.getY()<=rbimage.getHeight()/(7/6))){ 
  //sets yellow
if(avg<128){
    pix.setRed(2*avg);
    pix.setGreen(2.*avg);
    pix.setBlue(0);}
else{
       pix.setRed(255);
       pix.setGreen(255);
       pix.setBlue(2*avg - 255);      
}}
if(pix.getY()>(rbimage.getHeight()/(7/2))&&(pix.getY())<=(rbimage.getHeight()/(7/3))){ 
  //sets blue
  if(avg<128){
    pix.setRed(0);
    pix.setGreen(0);
    pix.setBlue(2*avg);}
else{
       pix.setRed(2*avg-255);
       pix.setGreen(2*avg-255);
       pix.setBlue(255);      
}}
if(pix.getY()>rbimage.getHeight()/(7/3)&&pix.getY()<=(rbimage.getHeight()/(7/4))){
  //sets orange
if(avg<128){
    pix.setRed(2*avg);
    pix.setGreen(avg*0.8);
    pix.setBlue(0);}
else{
       pix.setRed(255);
       pix.setGreen(1.2*avg-50);
       pix.setBlue(2*avg-255);  }}
if(pix.getY()>rbimage.getHeight()/(7/4)&&pix.getY()<=(rbimage.getHeight()/(7/5))){
  if(avg<128){
    pix.setRed(0);
    pix.setGreen(2*avg);
    pix.setBlue(0);}
else{
       pix.setRed(2*avg-255);
       pix.setGreen(255);
       pix.setBlue(2*avg-255);  }
}
  if(pix.getY()>rbimage.getHeight()/(7/5)&&pix.getY()<=(rbimage.getHeight()/(7/6))){
  if(avg<128){
    pix.setRed(0.8*avg);
    pix.setGreen(0);
    pix.setBlue(2*avg);}
else{
       pix.setRed(1.2*avg-55);
       pix.setGreen(2*avg-255);
       pix.setBlue(255);  }
}
  if(pix.getY()>rbimage.getHeight()/(7/6)&&pix.getY()<=rbimage.getHeight()){
  if(avg<128){
    pix.setRed(1.6*avg);
    pix.setGreen(0);
    pix.setBlue(1.6*avg);}
else{
       pix.setRed(0.4*avg+153);
       pix.setGreen(2*avg-255);
       pix.setBlue(0.4*avg+153);  }
}
}
  rbimage.drawTo(canvas);
}
//reset image
function doReset(){
var content=document.getElementById("can");
var ctx = content.getContext("2d");  ctx.clearRect(0,0,content.width,content.height);
orgimage.drawTo(content);
}
//clear canvas

function doClear(){
var content=document.getElementById("can");
var ctx = content.getContext("2d");  ctx.clearRect(0,0,content.width,content.height);
orgimage=null;
filtimage=null;
}