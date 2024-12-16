function setup() {
  createCanvas(400, 400);


}

function draw() {
  background(11111);
  
  strokeWeight(3)
  strokeJoin(ROUND)
  translate(45,45)
  //侧脸
  
  fill(245,245,245)
  push()
  fill(223,223,223)
  quad(44,50,74,62,74,101,44,89)
  quad(44,89,74,101,37,104,8,92)
  quad(8,92,37,104,37,134,8,123)
  pop()
  
  
  beginShape();
  vertex(37,104)
  vertex(37,134);
  vertex(133,126)
  vertex(133,56)
  vertex(74,62)
  vertex(74,101)
  endShape(CLOSE);
  
  push()
  fill(223,223,223)
  quad(44,50,74,62,134,57,99,45);
  pop()
//ears 
  push()
  fill(223,223,223)
  quad(77,5,117,2,117,42,77,46)
  pop()
  quad(94,18,94,60.5,133,57,133,15)
  
  //left leg
  push()
  fill(223,223,223)
  quad(46,133,46,260,67,267,67,131.5);
  quad(34,262,46,260,67,267,55,270)
  quad(34,262,34,275,55,282,55,270)
  pop()
  
  beginShape();
  vertex(55,270)
  vertex(55,282)
  vertex(86,275)
  vertex(86,190)
  vertex(67,183)
  vertex(67,267)
  endShape(CLOSE);
  
  //front body
  push()
  fill(223,223,223)
  quad(67,183,112,200,112,127.5,67,131.5)
  pop()
  
  //right leg
  push()
  fill(223,223,223)
  quad(112,127.5,112,285,133,292,133,125.5)
  quad(100,287,112,285,133,292,121,295)
  quad(121,295,100,287,100,300,121,307)
  pop()
  beginShape();
  vertex(121,307)
  vertex(121,295)
  vertex(133,292)
  vertex(133,125.5)
  vertex(152,124)
  vertex(152,300)
  vertex(152,300)
  endShape(CLOSE);
  
  //body
  quad(133,126,278,113,225,92,133,100)
  quad(278,113,279,195,152,206,152,124)
  
  //backleg left
  push()
  fill(223,223,223)
  quad(175,204,175,243,196,251,196,202)
  quad(163,246,175,243,196,250,183,253)
  quad(183,253,183,266,163,258,163,246)
  pop()
  beginShape()
  vertex(183,253)
  vertex(183,266)
  vertex(214,259)
  vertex(214,200.5)
  vertex(196,202)
  vertex(196,250)
  endShape(CLOSE)
  
  //backleg right
  push()
  fill(223,223,223)
  quad(239,198,239,268,260,276,260,196.5)
  quad(239,268,260,276,248,278,227,271)
  quad(227,271,227,283,248,291,248,278)
  pop()
  beginShape()
  vertex(248,278)
  vertex(248,291)
  vertex(279,284)
  vertex(279,195)
  vertex(260,196.5)
  vertex(260,276)
  vertex(248,278)
  vertex(248,291)
  endShape(CLOSE)
  
  //nose
  push();
  fill(0)
  triangle(8,92,37,104,19,110)
  pop()
  
  //eye
  push()
  fill(0)
  ellipse(100,90,13,13)
  pop()
  
}