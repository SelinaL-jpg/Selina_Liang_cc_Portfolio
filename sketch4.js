let showHalo = false;
let haloAlpha = 0; 
let haloFadingIn = false; 
let haloFadingOut = false;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(173, 216, 230);


  if (haloFadingIn) {
    haloAlpha += 5; 
    if (haloAlpha >= 255) {
      haloAlpha = 255; 
      haloFadingIn = false;
      showHalo = true;  
    }
  }


  if (haloFadingOut) {
    haloAlpha -= 5;  
    if (haloAlpha <= 0) {
      haloAlpha = 0;
      haloFadingOut = false;
      showHalo = false;  
    }
  }


  if (haloAlpha > 0) {
    drawHalo(300, 100, 200, haloAlpha); 
  }


  drawAngel();
}

function drawAngel() {
  //long hair
  push();
  noStroke();
  fill('yellow');
  translate(300, 90);
  quad(-45, 0, -45, 80, 45, 80, 45, 0);
  pop();

  //head
  push();
  noStroke();
  fill('yellow');
  ellipse(300, 90, 90, 90);
  pop();

  //face
  push();
  noStroke();
  fill(255, 224, 189);
  ellipse(300, 100, 70, 70);
  pop();

  //band-left
  push();
  translate(290, 90);
  rotate(radians(45));
  noStroke();
  fill('yellow');
  ellipse(-11, 0, 20, 50);
  pop();

  //band-right
  push();
  translate(310, 90);
  rotate(radians(-45));
  noStroke();
  fill('yellow');
  ellipse(11, 0, 20, 50);
  pop();

  //bow
  drawBow(300, 45);
}

function drawBow(x, y) {
  fill(0);
  noStroke();
  triangle(x - 40, y - 25, x, y, x - 40, y + 25);
  triangle(x + 40, y - 25, x, y, x + 40, y + 25);
  rect(x - 10, y - 10, 20, 20, 5);

  //neck
  push();
  noStroke();
  fill(255, 224, 189);
  translate(300, 130);
  quad(-10, -10, 10, -10, 10, 20, -10, 20);
  pop();

  //arm
  drawArmtop(300, 150);
}

function drawArmtop(x, y) {
  fill('white');
  noStroke();
  ellipse(x - 60, y + 106, 50, 50);
  ellipse(x + 60, y + 106, 50, 50);

  //body
  push();
  fill('white');
  noStroke();
  translate(300, 150);
  quad(-90, 0, -60, 130, 60, 130, 90, 0);
  pop();

  //arm
  drawArmbottom(300, 150);
}

function drawArmbottom(x, y) {
  fill('white');
  noStroke();
  quad(x - 115, y + 24, x - 85, y + 10, x - 65, y + 120, x - 86, y + 106);
  ellipse(x - 90, y + 24, 50, 50);
  quad(x + 115, y + 24, x + 85, y + 10, x + 65, y + 120, x + 86, y + 106);
  ellipse(x + 90, y + 24, 50, 50);

  //dress
  fill(255);
  noStroke();
  translate(100, 130);
  beginShape();
  vertex(138, 150);
  vertex(261, 150);
  vertex(300, 450);
  vertex(100, 450);
  endShape(CLOSE);
}

function drawHalo(x, y, maxRadius, alpha) {
  for (let r = maxRadius; r > 0; r -= 5) {
    let inter = map(r, 0, maxRadius, 1, 0);
    let c = lerpColor(color(255, 215, 0), color(255, 255, 224), inter);
    c.setAlpha(alpha);  
    fill(c);
    noStroke();
    ellipse(x, y+150, r * 2, r * 2);
  }
}

function mousePressed() {
  if (!showHalo && !haloFadingIn) {
    haloFadingIn = true; 
  } else if (showHalo && !haloFadingOut) {
    haloFadingOut = true;  
  }
}
