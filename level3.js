function level3() {

  let player;
  let obstacles = [];
  let score = 0;
  let gameEnded = false;
  let sceneImg, catImg;
  let obstacleImgs = {};
  let obstacleNames = ["mouse", "notebook", "paper2", "plant", "playstation", "snacks", "keyboard"];
  let jumpPower = 15;
  let gravity = 0.7;
  let obstacleSpeed = 2;
  let maxJumps = 2;
  let jumpCount = 0;
  let obstacleSpawnTimer = 0;
  let nextSpawnInterval = 0;
  let homeIconX, homeIconY, homeIconW, homeIconH;
  let homeIcon;

  const canvasWidth = 616;
  const canvasHeight = 380;
  const playerStartX = 80;
  const playerStartY = canvasHeight - 75;
  const endScore = 15;
  const obstacleGroundOffset = 80;
  const spawnIntervalRange = [90, 120];

  this.preload = function () {
    sceneImg = loadImage("assets/scene3.png");
    catImg = loadImage("assets/white_cat_flip.gif");

    obstacleImgs.mouse = loadImage("assets/mouse.png");
    obstacleImgs.notebook = loadImage("assets/notebook.png");
    obstacleImgs.paper2 = loadImage("assets/paper2.png");
    obstacleImgs.plant = loadImage("assets/plant.png");
    obstacleImgs.playstation = loadImage("assets/playstation.png");
    obstacleImgs.snacks = loadImage("assets/snacks.png");
    obstacleImgs.keyboard = loadImage("assets/keyboard.png");
    homeIcon = loadImage("assets/home.png");
  }

  this.setup = function () {
    createCanvas(canvasWidth, canvasHeight);
    this.reset();
  }

  this.reset = function () {
    player = new Player();
    obstacles = [];
    score = 0;
    gameEnded = false;
    obstacleSpawnTimer = 0;
    this.setNextSpawnInterval();
  }

  this.draw = function () {
    if (gameEnded) {
      this.showEndScreen();
      return;
    }

    image(sceneImg, 0, 0, canvasWidth, canvasHeight);

    player.display();
    this.displayObstacles();
    this.displayScore();

    player.move();
    this.moveObstacles();
    this.checkCollisions();
    this.handleObstacleSpawning();
  }

  // player
  class Player {
    constructor() {
      this.x = playerStartX;
      this.y = playerStartY;
      this.ySpeed = 0;
      this.width = 40;
      this.height = 40;
    }

    display() {
      image(catImg, this.x, this.y - this.height, this.width, this.height);
    }
    //gravity
    move() {
      this.ySpeed += gravity;
      this.y += this.ySpeed;

      if (this.y >= playerStartY) {
        this.y = playerStartY;
        this.ySpeed = 0;
        jumpCount = 0;
      }
    }

    jump() {
      if (jumpCount < maxJumps) {
        this.ySpeed = -jumpPower;
        jumpCount++;
      }
    }
  }

  // items
  class Obstacle {
    constructor(img, x, height) {
      this.img = img;
      this.width = (img.width / img.height) * height;
      this.height = height;
      this.x = x;
      this.y = canvasHeight - height - obstacleGroundOffset;
      this.passed = false;
    }

    display() {
      image(this.img, this.x, this.y, this.width, this.height);
    }

    move() {
      this.x -= obstacleSpeed;
    }

    isOutOfBounds() {
      return this.x + this.width < 0;
    }
  }

  this.displayObstacles = function () {
    for (let obstacle of obstacles) {
      obstacle.display();
    }
  }

  this.moveObstacles = function () {
    obstacles = obstacles.filter(obstacle => {
      obstacle.move();
      return !obstacle.isOutOfBounds();
    });
  }

  this.displayScore = function () {
    textSize(20);
    fill(0);
    textAlign(LEFT, CENTER);
    text(`Remaining: ${score}`, 10, 20);
  }

  this.handleObstacleSpawning = function () {
    obstacleSpawnTimer++;

    // use frame counts to make items
    if (obstacleSpawnTimer >= nextSpawnInterval) {
      obstacleSpawnTimer = 0;
      this.spawnObstacle();
      this.setNextSpawnInterval();
    }
  }

  this.spawnObstacle = function () {
    // choose item
    let randomIndex = floor(random(obstacleNames.length));
    let obstacleImg = obstacleImgs[obstacleNames[randomIndex]];
    let targetHeight = random(25, 50);
    let x = canvasWidth + random(50, 100);
    obstacles.push(new Obstacle(obstacleImg, x, targetHeight));
  }

  this.setNextSpawnInterval = function () {
    nextSpawnInterval = floor(random(spawnIntervalRange[0], spawnIntervalRange[1]));
  }

  this.checkCollisions = function () {
    for (let obstacle of obstacles) {
      if (!obstacle.passed && player.x + player.width > obstacle.x && player.x < obstacle.x + obstacle.width) {
        if (player.y + player.height < obstacle.y) {
          // pass item
          obstacle.passed = true;
          score += 1;
        } else {
          // not pass
          obstacle.passed = true;
          score -= 1;
        }
      }
    }

    if (score >= endScore) {
      gameEnded = true;
    }
  }

  this.showEndScreen = function () {
    background("#f1cfab");
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255);
    text("Mission Clear!", canvasWidth / 2, canvasHeight / 2 - 100);

    // score
    textSize(24);
    fill(0);
    text(`Final Score: ${score}`, canvasWidth / 2, canvasHeight / 2);

    let homeIconTargetHeight = 40;

    // Calculate icon sizes
    let homeIconWidth = (homeIcon.width / homeIcon.height) * homeIconTargetHeight;

    // Spacing
    let iconSpacing = 15;

    // Start positions
    let iconsStartY = height / 2 - (40 + homeIconTargetHeight + iconSpacing) / 2 + 90;

    // Save icon positions for mouse detection
    homeIconX = width / 2 - homeIconWidth / 2;
    homeIconY = iconsStartY + 40 + iconSpacing;
    homeIconW = homeIconWidth; // Store width for detection
    homeIconH = homeIconTargetHeight; // Store height for detection
    image(homeIcon, homeIconX, homeIconY, homeIconW, homeIconH);
  }

  this.mousePressed = function () { 
    if (gameEnded) {
      if (
        mouseX > homeIconX &&
        mouseX < homeIconX + homeIconW &&
        mouseY > homeIconY &&
        mouseY < homeIconY + homeIconH
      ) {
        currentLevel = -1;
      }
    }
  }
  this.keyPressed = function () {
    if (keyCode === UP_ARROW) {
      player.jump();
    }
  }
  this.keyReleased = function () { }
}
