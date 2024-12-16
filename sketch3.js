function setup() {
    createCanvas(450, 450);
    colorMode(HSB, 360, 100, 100,255); 
    noStroke(); 
  }
  
  function draw() {
    background(255);
  
    // second
    let hueValue = map(second(), 0, 59, 0, 360); 
    let alphaValue = map(second(), 0, 59, 50, 255); 
    fill(hueValue, 100, 100, alphaValue); 
    rect(0, 0, 450, 150); 
    rect(150, 0, 150, 450); 
    
    // minute
    let hueValue1 = map(minute(), 0, 59, 0, 360); 
     let alphaValue1 = map(minute(), 0, 59, 50, 255); 
    fill(hueValue1, 100, 100, alphaValue1); 
    rect(0, 150, 450, 150); 
    rect(0, 0, 150, 450);
    
  //hour
    let hueValue2 = map(hour(), 0, 59, 0, 360); 
    let alphaValue2 = map(hour(), 0, 59, 50, 255); 
    fill(hueValue2, 100, 100,alphaValue2); 
    rect(300, 0, 150, 450); 
    rect(0, 300, 450, 150);
  }