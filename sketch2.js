let earColor;
function setup() {
  createCanvas(400, 400);

  earColor=color(255,220,185)
}

function draw() {
  strokeWeight(5);
  background(255);
  
   
  // head
  fill(255, 220, 185); 
  ellipse(200, 200, 150, 200); 
  
  
   // mousesize
  let mouthSizeX=map(mouseX, 0, width, 5, 50); 
  let mouthSizeY=map(mouseY, 0, height, 5, 50); 
  
  let mouthSize=(mouthSizeX + mouthSizeY) / 2;
  
  // mouse
  fill(255, 100, 100); 
  ellipse(200, 260, mouthSize, mouthSize); 
  
  // ears
  
  if (mouthSize>10){
    let r=random(200,255)
    let g=random(100,200)
    let b=random(0,100)
    earColor=color(r,g,b);
}
  
  fill(earColor); 
  ellipse(130, 200, 40, 50); 
  ellipse(270, 200, 40, 50); 
  
  
  //eye
  let eyeSizeX=map(mouseX,0,width,10,40)
  let eyeSizeY=map(mouseY,0,width,10,40)
  let eyeSize=(eyeSizeX+eyeSizeY)/2
  
  //eye-white
  fill(255); 
  ellipse(170, 170, 40, eyeSize); 
  ellipse(230, 170, 40, eyeSize); 
  
  //eye-black
  fill(0); 
  ellipse(170, 170, 10, 10); 
  ellipse(230, 170, 10, 10); 
  

 
  // nose
  push()
  translate(0,15)
  fill(255, 180, 160); 
  triangle(195, 190, 205, 190, 200, 185); 
  pop()
  
  // eyebrow
  push()
  
  let eyeHeightX=map(mouseX,0,width,0,-10)
  let eyeHeightY=map(mouseY,0,width,0,-10)
  
  translate(0,eyeHeightY)
  translate(0,eyeHeightX)
  strokeWeight(5); 
  line(155, 150, 185, 160); 
  line(215, 160, 245, 150); 
  pop();
  

}