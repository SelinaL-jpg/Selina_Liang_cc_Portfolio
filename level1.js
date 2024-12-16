function level1() {
  let player;
  let bookshelves = [];
  let cakes = [];
  let score = 0;
  let gameEnded = false;
  let deskImg, catRightImg, catLeftImg, cakeImg, level2Icon, homepageIcon;
  let jumpPower = 15;
  let gravity = 0.7;
  let level2IconX, level2IconY, level2IconWidth, level2IconHeight = 40;
  let homepageIconX, homepageIconY, homepageIconWidth, homepageIconHeight = 40;

  const totalCakes = 10;
  const canvasWidth = 616;
  const canvasHeight = 380;
  const bookshelfHeights = [65, 70, 70, 70, 70];
  const cakeYOffset = -10;
  const catYOffset = 45;

  const bookshelfPositions = [
    { x: 250, y: 130 },
    { x: 450, y: 180 },
    { x: 500, y: 50 },
    { x: 130, y: 240 },
    { x: 50, y: 60 },
  ];

  const cakePositions = [
    [{ offsetX: 10 }, { offsetX: 60 }, { offsetX: 110 }],
    [{ offsetX: 5 }, { offsetX: 40 }],
    [{ offsetX: 45 }],
    [{ offsetX: 5 }, { offsetX: 60 }, { offsetX: 110 }],
    [{ offsetX: 85 }],
  ];

  this.preload = function () {
    deskImg = loadImage("assets/desk.png");
    catRightImg = loadImage("assets/white_cat_flip.gif");
    catLeftImg = loadImage("assets/white-cat.gif");
    cakeImg = loadImage("assets/cake.gif");
    level2Icon = loadImage("assets/level2_icon.png");
    homepageIcon = loadImage("assets/home.png");
    defaultFont = loadFont("assets/Silkscreen-Regular.ttf");

    this.initializeBookshelves();
  };

  this.setup = function () {
    this.reset()
  };

  this.initializeBookshelves = function () {
    for (let i = 0; i < bookshelfPositions.length; i++) {
      let bookshelfImg = loadImage(`assets/bookshelf${i + 1}.png`);
      bookshelves.push({
        img: bookshelfImg,
        x: bookshelfPositions[i].x,
        y: bookshelfPositions[i].y,
        targetHeight: bookshelfHeights[i],
      });
    }
  };

  this.initializeCakes = function () {
    cakes = [];
    for (let i = 0; i < bookshelves.length; i++) {
      let shelf = bookshelves[i];
      for (let cakeConfig of cakePositions[i]) {
        let cakeX = shelf.x + cakeConfig.offsetX;
        let cakeY = shelf.y - cakeYOffset;
        cakes.push({ x: cakeX, y: cakeY, visible: true });
      }
    }
  };

  this.draw = function () {
    if (gameEnded) {
      this.showEndScreen();
      return;
    }

    background("#f1cfab");
    this.displayDesk();
    this.displayBookshelvesAndCakes();
    this.displayPlayer();
    this.displayScore();
    this.movePlayer();
    this.checkCollisions();
  };

  this.displayDesk = function () {
    let deskHeight = (deskImg.height / deskImg.width) * canvasWidth;
    image(deskImg, 0, canvasHeight - deskHeight, canvasWidth, deskHeight);
  };

  this.displayBookshelvesAndCakes = function () {
    for (let i = 0; i < bookshelves.length; i++) {
      let shelf = bookshelves[i];
      let shelfWidth =
        (shelf.img.width / shelf.img.height) * shelf.targetHeight;
      image(shelf.img, shelf.x, shelf.y, shelfWidth, shelf.targetHeight);
      for (let cake of cakes) {
        if (cake.visible) {
          let cakeWidth = (cakeImg.width / cakeImg.height) * 25;
          image(cakeImg, cake.x, cake.y, cakeWidth, 25);
        }
      }
    }
  };

  this.displayPlayer = function () {
    let catWidth = (player.img.width / player.img.height) * player.height;
    image(
      player.img,
      player.x - catWidth / 2,
      player.y - player.height,
      catWidth,
      player.height
    );
  };

  this.displayScore = function () {
    textSize(20);
    fill(0);
    textAlign(LEFT, TOP);
    textFont(defaultFont);
    text(`Score: ${score}`, 10, 20);
  };

  this.movePlayer = function () {
    if (keyIsDown(LEFT_ARROW)) {
      player.x -= 5;
      player.img = catLeftImg;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      player.x += 5;
      player.img = catRightImg;
    }

    // gravity
    player.ySpeed += gravity;
    player.y += player.ySpeed;

    // drop on shelves
    if (player.y >= canvasHeight - 40) {
      player.y = canvasHeight - 40;
      player.ySpeed = 0;
      player.isJumping = false;
    }

    this.checkIfPlayerOnShelf();

    player.x = constrain(player.x, 0, canvasWidth);
  };

  this.checkIfPlayerOnShelf = function () {
    for (let shelf of bookshelves) {
      let shelfWidth =
        (shelf.img.width / shelf.img.height) * shelf.targetHeight;
      let landingHeight = shelf.y + catYOffset;

      // 检查小猫是否在书架的水平范围内，并且接近书架顶部，且必须是下落时
      if (
        player.x > shelf.x &&
        player.x < shelf.x + shelfWidth &&
        player.y >= landingHeight - 5 &&
        player.y <= landingHeight + 5 &&
        player.ySpeed > 0
      ) {
        player.ySpeed *= 0.2;
        player.y = landingHeight;
        player.ySpeed = 0;
        player.isJumping = false;
        return;
      }
    }
  };

  this.checkCollisions = function () {
    for (let i = 0; i < cakes.length; i++) {
      let cake = cakes[i];
      let cakeWidth = (cakeImg.width / cakeImg.height) * 25;
      let cakeHeight = 25;

      // cat's boundary&cake's
      if (
        cake.visible &&
        player.x < cake.x + cakeWidth &&
        player.x + player.width > cake.x &&
        player.y < cake.y + cakeHeight &&
        player.y + player.height > cake.y
      ) {
        cake.visible = false;
        score += 1;

        if (score >= totalCakes) {
          gameEnded = true;
        }
      }
    }
  };

  this.showEndScreen = function () {
    background("#f1cfab");
    textSize(32);
    fill("black");
    textAlign(CENTER, CENTER);
    textFont(defaultFont);
    text("Mission Clear!", width / 2, height / 2 - 100);

    level2IconWidth =
      (level2Icon.width / level2Icon.height) * level2IconHeight;
    homepageIconWidth =
      (homepageIcon.width / homepageIcon.height) * homepageIconHeight;

    let iconSpacing = 20;

    let iconsStartY =
      height / 2 -
      (level2IconHeight + homepageIconHeight + iconSpacing) / 2 +
      20;

    level2IconX = width / 2 - level2IconWidth / 2
    level2IconY = iconsStartY + 70
    image(
      level2Icon,
      level2IconX,
      level2IconY,
      level2IconWidth,
      level2IconHeight
    );


    homepageIconX = width / 2 - homepageIconWidth / 2
    homepageIconY = iconsStartY + homepageIconHeight + iconSpacing + 70

    image(
      homepageIcon,
      homepageIconX,
      homepageIconY,
      homepageIconWidth,
      homepageIconHeight
    );

  };

  this.mousePressed = function () {

    if (
      mouseX > level2IconX &&
      mouseX < level2IconX + level2IconWidth &&
      mouseY > level2IconY &&
      mouseY < level2IconY + level2IconHeight
    ) {
      currentLevel = 1;
      levels[currentLevel].reset()
    }

    if (
      mouseX > homepageIconX &&
      mouseX < homepageIconX + homepageIconWidth &&
      mouseY > homepageIconY &&
      mouseY < homepageIconY + homepageIconHeight
    ) {
      currentLevel = -1;
    }
  }

  this.keyPressed = function () {
    if (keyCode === UP_ARROW && !player.isJumping) {
      player.ySpeed = -jumpPower;
      player.isJumping = true;
    }
  };
  this.keyReleased = function () { }
  this.reset = function () {
    score = 0;
    gameEnded = false;
    player = {
      x: canvasWidth / 2,
      y: canvasHeight - 40,
      ySpeed: 0,
      isJumping: false,
      img: catRightImg,
      width: 40,
      height: 40,
    };
    this.initializeCakes();
  }
}
