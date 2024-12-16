const canvasWidth = 616;
const canvasHeight = 380;

let customFont;
let level1Icon, level2Icon, level3Icon;
let keyboardIcon, cursorImg;
let level1IconX, level1IconY, level1IconWidth, level1IconHeight;
let level2IconX, level2IconY, level2IconWidth, level2IconHeight;
let level3IconX, level3IconY, level3IconWidth, level3IconHeight;
let levels = [];
levels.push(new level1());
levels.push(new level2());
levels.push(new level3());
let currentLevel = -1;

function preload() {
  customFont = loadFont("assets/Silkscreen-Regular.ttf");
  level1Icon = loadImage("assets/level1_icon.png");
  level2Icon = loadImage("assets/level2_icon.png");
  level3Icon = loadImage("assets/level3_icon.png");
  keyboardIcon = loadImage("assets/keyboard_up.png");
  cursorImg = loadImage("assets/cursor.png");

  for (let i = 0; i < levels.length; i++) {
    levels[i].preload();
  }
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  noCursor();

  for (let i = 0; i < levels.length; i++) {
    levels[i].setup();
  }
}

function draw() {
  if (currentLevel == -1) {
    showOpeningScreen();
  } else {
    levels[currentLevel].draw();
  }

  image(cursorImg, mouseX - 8, mouseY - 5, 30, 30);
}

function showOpeningScreen() {
  background("#f1cfab");
  textFont(customFont);
  textSize(32);
  fill(0);
  textAlign(CENTER, TOP);
  text("Cats Secret Mission", width / 2, height / 2 - 150);

  let level1TargetHeight = 40; // 第一个图标的高度
  let level2TargetHeight = 40; // 第二个图标的高度
  let level3TargetHeight = 40; // 第三个图标的高度

  level1IconWidth = (level1Icon.width / level1Icon.height) * level1TargetHeight;
  let level2IconWidthCalculated =
    (level2Icon.width / level2Icon.height) * level2TargetHeight;
  level3IconWidth = (level3Icon.width / level3Icon.height) * level3TargetHeight;

  //icon spacing
  let iconSpacing = 10;
  let iconsStartY =
    height / 2 -
    (level1TargetHeight +
      level2TargetHeight +
      level3TargetHeight +
      2 * iconSpacing) /
      2 +
    25;

  level1IconX = width / 2 - level1IconWidth / 2;
  level1IconY = iconsStartY;
  level1IconHeight = level2TargetHeight;
  //icon1
  image(
    level1Icon,
    level1IconX,
    level1IconY,
    level1IconWidth,
    level1IconHeight
  );
  //icon2
  level2IconX = width / 2 - level2IconWidthCalculated / 2; // 记录位置
  level2IconY = iconsStartY + level1TargetHeight + iconSpacing;
  level2IconWidth = level2IconWidthCalculated;
  level2IconHeight = level2TargetHeight;
  image(
    level2Icon,
    level2IconX,
    level2IconY,
    level2IconWidth,
    level2IconHeight
  );

  level3IconX = width / 2 - level3IconWidth / 2;
  level3IconY =
    iconsStartY + level1TargetHeight + level2TargetHeight + 2 * iconSpacing;
  level3IconHeight = level3TargetHeight;
  // icon3
  image(
    level3Icon,
    level3IconX,
    level3IconY,
    level3IconWidth,
    level3IconHeight
  );

  //lower text
  textSize(15);
  let textContent = "Press to Control the cat";
  let imgPosition = 6;
  let textBeforeImg = textContent.substring(0, imgPosition);
  let textAfterImg = textContent.substring(imgPosition);

  let xStart = width / 2 - 140;
  let yStart = height / 2 + 140;

  fill(0);
  textAlign(LEFT, CENTER);
  text(textBeforeImg, xStart, yStart);

  let imgX = xStart + textWidth(textBeforeImg);
  image(keyboardIcon, imgX, yStart - 12, 34, 24);
  text(textAfterImg, imgX + 44, yStart);
}

function mousePressed() {
  if (currentLevel != -1) {
    levels[currentLevel].mousePressed();
  } else {
    if (
      mouseX > level1IconX &&
      mouseX < level1IconX + level1IconWidth &&
      mouseY > level1IconY &&
      mouseY < level1IconY + level1IconHeight
    ) {
      currentLevel = 0;
      levels[currentLevel].reset();
    }

    if (
      mouseX > level2IconX &&
      mouseX < level2IconX + level2IconWidth &&
      mouseY > level2IconY &&
      mouseY < level2IconY + level2IconHeight
    ) {
      currentLevel = 1;
      levels[currentLevel].reset();
    }

    if (
      mouseX > level3IconX &&
      mouseX < level3IconX + level3IconWidth &&
      mouseY > level3IconY &&
      mouseY < level3IconY + level3IconHeight
    ) {
      currentLevel = 2;
      levels[currentLevel].reset();
    }
  }
}

function keyPressed() {
  if (currentLevel != -1) {
    levels[currentLevel].keyPressed();
  }
}

function keyReleased() {
  if (currentLevel != -1) {
    levels[currentLevel].keyReleased();
  }
}