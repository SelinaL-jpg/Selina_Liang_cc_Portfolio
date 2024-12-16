let cols = 10;
let rows = 10;
let maxSize = 45; 
let minSize = 10; 
let animationSpeed = 0.03; 
let t = 0; 

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100); 
  noStroke(); 
  rectMode(CENTER);  
}

function draw() {
  background(180, 30, 90); 
  let xOffset = 50;
  let yOffset = 50;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = map(i, 0, cols - 1, xOffset, width - xOffset);  
      let y = map(j, 0, rows - 1, yOffset, height - yOffset);  

      let size = map(sin(t + (i * 0.5) + (j * 0.5)), -1, 1, minSize, maxSize);


      let hue = map(size, minSize, maxSize, 180, 220);
      let brightness = map(size, minSize, maxSize, 70, 100); 
      fill(hue, 50, brightness); 


      if (size > (maxSize + minSize) / 2) {
        rect(x, y, size, size); 
      } else {
        ellipse(x, y, size, size * 1.2); 
      }
    }
  }
  
  t += animationSpeed;
}
