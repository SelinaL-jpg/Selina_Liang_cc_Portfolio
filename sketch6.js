let heartRateData = [
    [110, 75, 51],
    [86, 78, 50],
    [137, 80, 55],
    [143, 78, 47],
    [118, 75, 50],
    [135, 72, 55],
    [141, 70, 64]
  ];
  
  let weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  let currentDay = 0;
  let nextDay = 1; 
  let t = 1.0; 
  
  function setup() {
    createCanvas(600, 400);
    textAlign(CENTER, CENTER);
  }
  
  function draw() {
    background(240, 250, 255);
  
    fill(0);
    textSize(16);
    text("Animated Heart Rate Line Chart", width / 2, 30);
  
    drawHeartRateLine(t);
  
  
    textSize(14);
    fill(50);
    noStroke();
    text(`Day: ${weekDays[currentDay]}`, width / 2, height - 20);
  
  
    if (t < 1) {
      t += 0.04; 
    } else {
      currentDay = nextDay; 
    }
  }
  
  function drawHeartRateLine(progress) {
    let currentRates = heartRateData[currentDay];
    let nextRates = heartRateData[nextDay];
  
    stroke(0);
    strokeWeight(2);
    noFill();
  
    beginShape();
    for (let i = 0; i < currentRates.length; i++) {
      let x = 150 + i * 150; 
      let y = map(lerp(currentRates[i], nextRates[i], progress), 0, 150, height - 100, 100); 
      vertex(x, y);
    }
    endShape();
  
    for (let i = 0; i < currentRates.length; i++) {
      let x = 150 + i * 150;
      let y = map(lerp(currentRates[i], nextRates[i], progress), 0, 150, height - 100, 100);
      fill(100, 150, 255, 200);
      ellipse(x, y, 10, 10); 
    }
  
  
    fill(0);
    textSize(14);
    noStroke();
    let interpolatedRates = [
      lerp(currentRates[0], nextRates[0], progress),
      lerp(currentRates[1], nextRates[1], progress),
      lerp(currentRates[2], nextRates[2], progress)
    ];
    text(`Highest: ${interpolatedRates[0].toFixed(1)} bpm`, 150, height - 50);
    text(`Average: ${interpolatedRates[1].toFixed(1)} bpm`, 300, height - 50);
    text(`Lowest: ${interpolatedRates[2].toFixed(1)} bpm`, 450, height - 50);
  }
  
  function mousePressed() {
  
    if (t >= 1) {
      nextDay = (currentDay + 1) % heartRateData.length; 
      t = 0; 
    }
  }
  