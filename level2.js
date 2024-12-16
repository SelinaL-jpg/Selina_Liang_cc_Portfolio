function level2() {

  let ballImages = [];
  let balls = [];
  let whiteCatImg;
  let gameState = "playing";
  let defaultFont;
  let remainingBalls;
  let player;
  let moveUp = false;
  let moveDown = false;
  let moveLeft = false;
  let moveRight = false;
  let level3Icon, homeIcon, backgroundImg;
  let homeIconX, homeIconY, homeIconW, homeIconH;

  const ballSettings = [
    { x: 0, y: 50, size: 70, img: "assets/harddrive.png" },
    { x: 170, y: 0, size: 280, img: "assets/labtop.png" },
    { x: 220, y: 170, size: 180, img: "assets/keyboard.png" },
    { x: 430, y: 200, size: 40, img: "assets/mouse.png" },
    { x: 80, y: 150, size: 100, img: "assets/notebook.png" },
    { x: 50, y: 250, size: 70, img: "assets/snacks.png" },
    { x: 550, y: 150, size: 30, img: "assets/pen.png" },
    { x: 480, y: 270, size: 150, img: "assets/paper.png" },
    { x: 280, y: 300, size: 70, img: "assets/paper2.png" },
    { x: 500, y: 10, size: 60, img: "assets/plant.png" },
    { x: 430, y: 120, size: 100, img: "assets/playstation.png" },
    { x: 100, y: 100, size: 10, img: "assets/something.png" },
    { x: 500, y: 300, size: 15, img: "assets/something2.png" },
    { x: 150, y: 300, size: 45, img: "assets/tag.png" },
  ];

  this.preload = function () {
    defaultFont = loadFont("assets/Silkscreen-Regular.ttf");
    backgroundImg = loadImage("assets/background_2.png");
    level1Icon = loadImage("assets/level1_icon.png");
    level2Icon = loadImage("assets/level2_icon.png");
    level3Icon = loadImage("assets/level3_icon.png");
    homeIcon = loadImage("assets/home.png");

    // balls
    for (let setting of ballSettings) {
      ballImages.push(loadImage(setting.img));
    }

    // cursor/cat
    whiteCatImg = loadImage("assets/white-cat.gif");
  }

  this.setup = function () {
    createCanvas(616, 380);
    player = new Player();
    this.initializeBalls();
  }

  this.draw = function () {
    if (gameState === "playing") {
      this.playGame();
    } else if (gameState === "end") {
      this.showEndScreen();
    }
  }

  class Player {
    constructor() {
      this.x = width / 2;
      this.y = height / 2;
      this.size = 50;
      this.speed = 5;
    }

    update() {
      if (moveUp) this.y -= this.speed;
      if (moveDown) this.y += this.speed;
      if (moveLeft) this.x -= this.speed;
      if (moveRight) this.x += this.speed;
    }

    display() {
      image(
        whiteCatImg,
        this.x - this.size / 2,
        this.y - this.size / 2,
        this.size,
        this.size
      );
    }

    resetPosition() {
      this.x = random(50, width - 50);
      this.y = random(50, height - 50);
    }
  }

  // balls
  this.initializeBalls = function () {
    balls = [];
    remainingBalls = ballSettings.length;
    for (let i = 0; i < ballSettings.length; i++) {
      let setting = ballSettings[i];
      let img = ballImages[i];
      balls.push({
        x: setting.x,
        y: setting.y,
        img: img,
        width: setting.size,
        height: setting.size * (img.height / img.width),
        pushed: false,
        vx: 0,
        vy: 0,
      });
    }
  }

  // game
  this.playGame = function () {
    image(backgroundImg, 0, 0, width, height);

    player.update();
    player.display();

    let allBallsPushed = true;
    remainingBalls = 0;

    for (let ball of balls) {
      if (!ball.pushed) {
        allBallsPushed = false;
        remainingBalls++;

        // show balls
        image(ball.img, ball.x, ball.y, ball.width, ball.height);

        // distance from ball to players
        let distance = dist(
          player.x,
          player.y,
          ball.x + ball.width / 2,
          ball.y + ball.height / 2
        );

        // if players hit the ball
        if (distance < player.size / 2 + ball.width / 2) {
          let angle = atan2(
            ball.y + ball.height / 2 - player.y,
            ball.x + ball.width / 2 - player.x
          );
          ball.vx += cos(angle) * 5;
          ball.vy += sin(angle) * 5;
        }

        // ball's position
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.vx *= 0.8;
        ball.vy *= 0.8;

        if (
          ball.x < -ball.width / 2 ||
          ball.x > width + ball.width / 2 ||
          ball.y < -ball.height / 2 ||
          ball.y > height + ball.height / 2
        ) {
          ball.pushed = true;
        }
      }
    }

    // score board
    fill("white");
    textSize(20);
    textAlign(LEFT, TOP);
    text(`Remaining: ${remainingBalls}`, 10, 10);

    if (allBallsPushed) {
      gameState = "end";
    }
  }

  this.showEndScreen = function () {
    background("#f1cfab");
    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    textFont(defaultFont);
    text("Mission Clear!", width / 2, height / 2 - 100);

    let level3TargetHeight = 40;
    let homeIconTargetHeight = 40;

    // Calculate icon sizes
    let level3IconWidth = (level3Icon.width / level3Icon.height) * level3TargetHeight;
    let homeIconWidth = (homeIcon.width / homeIcon.height) * homeIconTargetHeight;

    // Spacing
    let iconSpacing = 15;

    // Start positions
    let iconsStartY = height / 2 - (level3TargetHeight + homeIconTargetHeight + iconSpacing) / 2 + 90;

    // Save icon positions for mouse detection
    homeIconX = width / 2 - homeIconWidth / 2;
    homeIconY = iconsStartY + level3TargetHeight + iconSpacing;
    homeIconW = homeIconWidth; // Store width for detection
    homeIconH = homeIconTargetHeight; // Store height for detection

    level3IconX = width / 2 - level3IconWidth / 2;
    level3IconY = iconsStartY;
    level3IconW = level3IconWidth;
    level3IconH = level3TargetHeight;
    image(homeIcon, homeIconX, homeIconY, homeIconW, homeIconH);
    image(level3Icon, level3IconX, level3IconY, level3IconW, level3IconH);
  }

  this.mousePressed = function () {
    if (gameState === "end") {
      // Detect click on homeIcon
      if (
        mouseX > homeIconX &&
        mouseX < homeIconX + homeIconW &&
        mouseY > homeIconY &&
        mouseY < homeIconY + homeIconH
      ) {
        currentLevel = -1;
      }

      if (
        mouseX > level3IconX &&
        mouseX < level3IconX + level3IconW &&
        mouseY > level3IconY &&
        mouseY < level3IconY + level3IconH
      ) {
        currentLevel = 2;
      }
    }
  }

  // keypressed
  this.keyPressed = function () {
    if (gameState === "playing") {
      if (keyCode === UP_ARROW) moveUp = true;
      if (keyCode === DOWN_ARROW) moveDown = true;
      if (keyCode === LEFT_ARROW) moveLeft = true;
      if (keyCode === RIGHT_ARROW) moveRight = true;
    }
  }

  this.keyReleased = function () {
    if (keyCode === UP_ARROW) moveUp = false;
    if (keyCode === DOWN_ARROW) moveDown = false;
    if (keyCode === LEFT_ARROW) moveLeft = false;
    if (keyCode === RIGHT_ARROW) moveRight = false;
  }

  this.reset = function () {
    gameState = "playing";
    player.resetPosition();
    this.initializeBalls();
  }
}
