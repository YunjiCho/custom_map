//1728 969

var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;
var xPlus =70;
var yPlus = 70;
var engine;
var runner;
var world;
var rects = [];
var boundaries = [];
var ground;
var imageButtons = []; // 배열로 이미지 버튼을 저장할 변수 추가
var colorButtons = [];
var selectedImage = 0;
var selectedColor = 0;
var iconSize = 50; // Initial size of the image icons
var saves = [];
let sound;
let snowflakes = [];
let rainflakes = [];
var weather = 0; //눈 1 비 2
var weatherTime = 0;
var imageList = [
  "집",
  "편의점",
  "버스",
  "패스트푸드점",
  "도서관",
  "쇼핑몰",
  "교회",
  "축제",
  "공항",
  "택시 승강장",
  "지하철 역",
  "음식점",
  "피자 가게",
  "주유소",
  "공원",
  "꽃집",
  "세탁소",
  "회사",
  "병원",
  "빌딩",
];
var colorList = [
  "#E6623D",
  "#3B5098",
  "#935D9E",
  "#71B671",
  "#94979B",
  "#E5534E",
  "#F5D134",
  "#F5AB3D",
];
var isLoadClicked = 0;
var loading = -1;
var newRects = 0;
var images = [];

function preload() {
  sound = loadSound("sound.mp3");

  for (var i = 0; i < 20; i++) {
    images.push(loadImage(i + 1 + ".png"));
  }
}
function setup() {
  mapCanvas = createCanvas(1728, 969);
  mapCanvas.position( xPlus,yPlus);
  var wrate = 1728 / 1920;
  var hrate = 969 / 1080;
  var roadHeight = 30;
  engine = Matter.Engine.create();
  engine.world.gravity.y = 0;
  runner = Matter.Runner.create();
  world = engine.world;

  Matter.Runner.run(runner, engine);
  //텍스트 인풋
  input = createInput();
  input.position(1728 - 420-50+4+xPlus-10, 20+yPlus-8);
  //저장하기보튼
  button = createButton(" 저장하기 ");
  button.style("font-size", "15px");
  button.style("background-color", "#000000");
  button.style("border", "none");
  button.style("color", "white");
  button.position(1450+xPlus-10, 20+yPlus-8);
  button.mousePressed(savefun);
  // 불러오기 버튼
  loadButton = createButton(" 불러오기 ");
  loadButton.position(1728 - 95 + 20+xPlus-10, 20+yPlus-8);
  loadButton.style("font-size", "15px");
  loadButton.style("background-color", "ffffff");
  loadButton.style("border", "none");
  loadButton.mousePressed(loadfun); // 불러오기 버튼
  // 불러오기 버튼
  resetButton = createButton(" 다시그리기 ");
  resetButton.position(1728 - 160 - 10+xPlus-10, 20+yPlus-8);
  resetButton.style("font-size", "15px");
  resetButton.style("background-color", "ffffff");
  resetButton.style("border", "none");
  resetButton.mousePressed(resetfun); // 불러오기 버튼
  function resetfun() {
    for (var j = 0; j < rects.length; j++) {
      World.remove(world, rects[j].body);
    }
    rects = [];
  }
  function loadfun() {
    isLoadClicked = Math.abs(isLoadClicked - 1);
  }

  function savefun() {
    if (input.value() != "") {
      saves.push(new Save());
      input.value("");
      newRects = saves[saves.length - 1].rects;
      for (var j = 0; j < rects.length; j++) {
        World.remove(world, rects[j].body);
      }
      rects = [];
      loading = 0;
    }
  }
  function Save() {
    this.rects = rects;
    this.name = input.value();
  }
  console.log(saves);
  mainTitle = createElement("h2", "커스텀 지도 만들기");
  mainTitle.position(20+xPlus-10, 7+yPlus-10);
  askElement = createElement(
    "p",
    "원하는 요소를 원하는 만큼 눌러 </br>오로지 내가 원하는 것들로만 </br>이루어진 지도를 만들어보세요!"
  );
  askElement.position(20+xPlus-15, 70+yPlus-10);
  backElement = createElement(
    "p",
    "⬆⬇ 방향키: 아이콘 크기 설정</br>⬅ 방향키: 뒤로가기"
  );
  backElement.position(20+xPlus-10, 160+yPlus-10);
  askElement = createElement("p", "지도의 이름을 지어주세요 :");
  askElement.position(1055+xPlus-10,yPlus-4);
  boundaries.push(
    new Boundary(384 * wrate, 154 * hrate, 598 * wrate, roadHeight * hrate, 270)
  );
  boundaries.push(
    new Boundary(
      1020 * wrate,
      195 * hrate,
      728 * wrate,
      roadHeight * hrate,
      (15 * PI) / 180
    )
  );
  boundaries.push(
    new Boundary(356 * wrate, 623 * hrate, 580 * wrate, roadHeight * hrate, 270)
  );
  boundaries.push(
    new Boundary(
      725 * wrate,
      444 * hrate,
      207 * wrate,
      roadHeight * hrate,
      (12 * PI) / 180
    )
  );
  boundaries.push(
    new Boundary(
      916 * wrate,
      451 * hrate,
      209 * wrate,
      roadHeight * hrate,
      (-8 * PI) / 180
    )
  );
  boundaries.push(
    new Boundary(
      1485 * wrate,
      711 * hrate,
      908 * wrate,
      roadHeight * hrate,
      (15 * PI) / 180
    )
  );
  boundaries.push(
    new Boundary(
      1300 * wrate,
      895 * hrate,
      1316 * wrate,
      roadHeight * hrate,
      (13 * PI) / 180
    )
  );
  boundaries.push(
    new Boundary(
      695 * wrate,
      980 * hrate,
      1181 * wrate,
      roadHeight * hrate,
      (15 * PI) / 180
    )
  );
  boundaries.push(
    new Boundary(
      1685 * wrate,
      245 * hrate,
      637 * wrate,
      roadHeight * hrate,
      (1 * PI) / 180
    )
  );
  ///////////////////////////////

  boundaries.push(
    new Boundary(
      663 * wrate,
      209 * hrate,
      477 * wrate,
      roadHeight * hrate,
      (100 * PI) / 180
    )
  );
  boundaries.push(
    new Boundary(
      642 * wrate,
      566 * hrate,
      258 * wrate,
      roadHeight * hrate,
      (80 * PI) / 180
    )
  );
  boundaries.push(
    new Boundary(
      645 * wrate,
      957 * hrate,
      598 * wrate,
      roadHeight * hrate,
      (94 * PI) / 180
    )
  );
  boundaries.push(
    new Boundary(
      787 * wrate,
      306 * hrate,
      740 * wrate,
      roadHeight * hrate,
      (109 * PI) / 180
    )
  );
  boundaries.push(
    new Boundary(
      1096 * wrate,
      226 * hrate,
      492 * wrate,
      roadHeight * hrate,
      (109 * PI) / 180
    )
  );
  boundaries.push(
    new Boundary(
      1026 * wrate,
      534 * hrate,
      175 * wrate,
      roadHeight * hrate,
      (80 * PI) / 180
    )
  );
  boundaries.push(
    new Boundary(
      1000 * wrate,
      854 * hrate,
      503 * wrate,
      roadHeight * hrate,
      (100 * PI) / 180
    )
  );
  boundaries.push(
    new Boundary(
      1360 * wrate,
      549 * hrate,
      1114 * wrate,
      roadHeight * hrate,
      (90 * PI) / 180
    )
  );
  boundaries.push(
    new Boundary(
      1723 * wrate,
      125 * hrate,
      270 * wrate,
      roadHeight * hrate,
      (70 * PI) / 180
    )
  );
  boundaries.push(
    new Boundary(
      1753 * wrate,
      513 * hrate,
      513 * wrate,
      roadHeight * hrate,
      (95 * PI) / 180
    )
  );
  boundaries.push(
    new Boundary(
      1720 * wrate,
      968 * hrate,
      387 * wrate,
      roadHeight * hrate,
      (100 * PI) / 180
    )
  );
  textAlign(CENTER);
  textSize(50);
  // 왼쪽 화면에 이미지 버튼 생성
  for (var i = 0; i < 10; i++) {
    var imageButton = new ImageButton(
      20,
      70 * i + 250,
      50,
      50,
      i + 1 + ".png",
      i + 1
    );
    imageButtons.push(imageButton);
  }
  for (var i = 10; i < 20; i++) {
    var imageButton = new ImageButton(
      90,
      70 * i + 250 - 700,
      50,
      50,
      i + 1 + ".png",
      i + 1
    );
    imageButtons.push(imageButton);
  }
  var imageButton = new ImageButton(195, 705, 40, 40, "21.png", 21);

  imageButtons.push(imageButton);
  var imageButton = new ImageButton(195, 775, 40, 40, "22.png", 22);
  imageButtons.push(imageButton);

  for (var i = 0; i < 7; i++) {
    var colorButton = new ColorButton(198, 60 * i + 256, 35, 35, i);
    colorButtons.push(colorButton);
  }
}

// 이미지 버튼을 클릭했을 때의 동작
function mousePressed() {
  // Check if an image button was clicked
  var imageButtonClicked = false;
  var colorButtonClicked = false;

  for (var i = 0; i < imageButtons.length; i++) {
    if (imageButtons[i].clicked()) {
      if (i <= 19) {
        selectedImage = i;
        imageButtonClicked = true;
        break;
      }
      if (i == 20) {
        if (weather == 1) {
          weather = 0;
        } else {
          weather = 1;
        }
        weatherTime = 0;
        snowflakes = [];
        rainflakes = [];
        imageButtonClicked = true;
        break;
      }
      if (i == 21) {
        if (weather == 2) {
          weather = 0;
        } else {
          weather = 2;
        }
        weatherTime = 0;
        snowflakes = [];
        rainflakes = [];
        imageButtonClicked = true;
        break;
      }
    }
  }

  for (var i = 0; i < colorButtons.length; i++) {
    if (colorButtons[i].clicked()) {
      selectedColor = i;
      colorButtonClicked = true;
      break;
    }
  }

  for (var i = 0; i < saves.length; i++) {
    if (loadButtonClicked(i)) {
      // isLoadClicked = 0;
      newRects = saves[i].rects;
      for (var j = 0; j < rects.length; j++) {
        World.remove(world, rects[j].body);
      }
      rects = [];
      loading = 0;
      isLoadClicked = 0;
    }
  }

  if (!imageButtonClicked && !colorButtonClicked && !loadBackgroundClicked()) {
    // Create a new image icon at the mouse position
    rects.push(
      new Rect(
        mouseX,
        mouseY,
        iconSize,
        iconSize,
        imageButtons[selectedImage].imageUrl,
        selectedColor
      )
    );
    sound.play();
  }
}
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    // Delete the last added image icon
    if (rects.length > 0) {
      World.remove(world, rects[rects.length - 1].body);
      rects.pop();
    }
  } else if (keyCode === UP_ARROW) {
    // Increase the size of the image icons
    iconSize = min(100, iconSize + 5);
  } else if (keyCode === DOWN_ARROW) {
    // Decrease the size of the image icons
    iconSize = max(5, iconSize - 5);
  }
}
function draw() {
  Engine.update(engine);
  background(230);

  // 지도 위의 이미지들을 그리기
  for (var i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }
  for (var i = 0; i < rects.length; i++) {
    rects[i].show();
  }

  //좌측 배경
  leftBackground();
  rightBackground();
  // 왼쪽 화면의 이미지 버튼들을 그리기
  fill(240);
  ellipse(215, 725, 50, 50);
  ellipse(215, 795, 50, 50);

  for (var i = 0; i < imageButtons.length; i++) {
    imageButtons[i].show();
  }
  for (var i = 0; i < colorButtons.length; i++) {
    colorButtons[i].show();
  }
  //이미지 이름 표시
  for (var i = 0; i < 20; i++) {
    if (imageButtons[i].clicked()) {
      textSize(14);
      fill(0);
      noStroke();
      text(imageList[i], 45 + 70 * (i > 9), 70 * i + 250 - 700 * (i > 9));
      // 이미지 버튼 중 하나를 클릭했으면 반복문 종료
    }
  }
  if (loading != -1) {
    if (loading == newRects.length) {
      loading = -1;
      newRects = 0;
    } else {
      rects.push(
        new Rect(
          newRects[loading].body.position.x,
          newRects[loading].body.position.y,
          newRects[loading].w,
          newRects[loading].h,
          newRects[loading].imageUrl,
          newRects[loading].col
        )
      );
      loading = loading + 1;
    }
  }
  if (weather == 1) {
    // create a random number of snowflakes each frame
    for (let i = 0; i < random(5); i++) {
      snowflakes.push(new snowflake()); // append snowflake object
    }

    // loop through snowflakes with a for..of loop
    for (let flake of snowflakes) {
      flake.update(weatherTime / 60); // update snowflake position
      flake.display(); // draw snowflake
    }
    weatherTime++;
  }

  if (weather == 2) {
    // create a random number of snowflakes each frame
    for (let i = 0; i < random(40); i++) {
      rainflakes.push(new rainflake()); // append snowflake object
    }

    // loop through snowflakes with a for..of loop
    for (let flake of rainflakes) {
      flake.update(weatherTime / 60); // update snowflake position
      flake.display(); // draw snowflake
    }
    weatherTime++;
  }
}

// snowflake class
function snowflake() {
  // initialize coordinates

  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function (time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function () {
    fill(240);
    noStroke();
    ellipse(this.posX, this.posY, this.size);
  };
}

function rainflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function (time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += 40 * pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = rainflakes.indexOf(this);
      rainflakes.splice(index, 1);
    }
  };

  this.display = function () {
    fill(200);
    noStroke();
    rect(this.posX, this.posY, 1, this.size * 15);
  };
}

//좌측 배경
function leftBackground() {
  noStroke();
  strokeWeight(1.2);
  fill("ffffff");

  rect(0, 0, 260, height);
  stroke(0);
  line(15, 60, 245, 60);
  line(15, 150, 245, 150);
  line(15, 220, 245, 220);
  line(170, 240, 170, height);

  showPreview();

  // //아이콘 크기 바
  // fill(0);
  // rect(210, 780, 10, 140);
  // fill(255);
  // rect(200, 780 + (7 * (100 - iconSize)) / 5, 30, 10);
  // textSize(15);
  // fill(0);
  // noStroke();
  // text("아이콘 크기", 215, 760);
  // //
}

function rightBackground() {
  noStroke();
  //strokeWeight(1.2);
  fill("ffffff");
  rect(1728 - 700+15, 0, 740, 48);
  if (isLoadClicked == 1) {
    rect(1728 - 200, 41, 200, 17 + saves.length * 20);
    for (var i = 0; i < saves.length; i++) {
      textSize(15);
      fill(0);
      noStroke();
      textAlign(RIGHT);
      text(saves[i].name, 1700, 60 + i * 20);
      textAlign(CENTER);
    }
  }
  // if (saves.length > 0) {
  //   for (var i = 0; i < saves.length; i++) {
 // fill(0);
  //text(mouseX, 1000, 200);
  //text(mouseY, 1000, 250);
  //   }
  // }
}

function loadBackgroundClicked() {
  if (mouseX > 1728 - 620 && mouseX < 1728 && mouseY > 1 && mouseY < 41) {
    return true;
  }
  if (
    mouseX > 1728 - 200 &&
    mouseX < 1728 &&
    mouseY > 0 &&
    mouseY < 62 + saves.length * 20
  ) {
    return true;
  }
  return false;
}

function loadButtonClicked(i) {
  if (
    mouseX > 1550 &&
    mouseX < 1700 &&
    mouseY > 49 + i * 20 &&
    mouseY < 62 + i * 20
  ) {
    return true;
  }
  return false;
}

// 이미지 버튼 클래스
function ImageButton(x, y, w, h, imageUrl, imageNumber) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.imageUrl = imageUrl;
  this.imageNumber = imageNumber;
  var self = this;
  // 이미지 버튼을 그리는 함수
  this.show = function () {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
    // 이미지를 버튼 위에 그리기
    var img;

    function preload() {
      img = loadImage(self.imageUrl); // Access the imageUrl using 'self'
    }

    this.show = function () {
      if (this.imageNumber == 21) {
        img.loadPixels();
        for (var i = 0; i < img.pixels.length; i += 4) {
          hex = "#000000";
          red = parseInt(hex.substr(1, 2), 16);
          green = parseInt(hex.substr(3, 2), 16);
          blue = parseInt(hex.substr(5, 2), 16);
          img.pixels[i] = red; // Red 값
          img.pixels[i + 1] = green; // Green 값
          img.pixels[i + 2] = blue; // Blue 값

          // img.pixels[i + 3]는 알파 채널이므로 변경하지 않음
        }
        img.updatePixels();
      }
      if (this.imageNumber == 22) {
        img.loadPixels();
        for (var i = 0; i < img.pixels.length; i += 4) {
          hex = "#000000";
          red = parseInt(hex.substr(1, 2), 16);
          green = parseInt(hex.substr(3, 2), 16);
          blue = parseInt(hex.substr(5, 2), 16);
          img.pixels[i] = red; // Red 값
          img.pixels[i + 1] = green; // Green 값
          img.pixels[i + 2] = blue; // Blue 값

          // img.pixels[i + 3]는 알파 채널이므로 변경하지 않음
        }
        img.updatePixels();
      }
      push();
      translate(this.x, this.y);
      rotate(0);
      image(img, 0, 0, this.w, this.h);
      pop();
    };

    preload();
  };

  // 이미지 버튼이 클릭되었는지 확인하는 함수
  this.clicked = function () {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.w &&
      mouseY > this.y &&
      mouseY < this.y + this.h
    ) {
      return true;
    }
    return false;
  };
}

// 색 버튼 클래스
function ColorButton(x, y, w, h, colorNumber) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.colorNumber = colorNumber;
  var self = this;
  // 이미지 버튼을 그리는 함수
  this.show = function () {
    // stroke(1);
    noStroke();
    fill(colorList[colorNumber]);
    rect(this.x, this.y, this.w, this.h, 20, 20, 20, 20);
  };

  // 이미지 버튼이 클릭되었는지 확인하는 함수
  this.clicked = function () {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.w &&
      mouseY > this.y &&
      mouseY < this.y + this.h
    ) {
      return true;
    }
    return false;
  };
}

// 이미지를 가진 직사각형 클래스
function Rect(x, y, w, h, imageUrl, col) {
  var options = {
    friction: 0.9,
    restitution: 0,
  };

  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  this.imageUrl = imageUrl;
  this.col = col;

  var self = this; // Store a reference to 'this'

  // Load the image
  var img;

  function preload() {
    img = loadImage(self.imageUrl); // Access the imageUrl using 'self'
  }

  function setup() {
    // Set the sprite texture of the Matter.js body
    self.body.render.sprite.texture = img; // Access the body using 'self'
    self.body.render.sprite.xScale = self.w / img.width; // Access 'w' and 'img.width' using 'self'
    self.body.render.sprite.yScale = self.h / img.height; // Access 'h' and 'img.height' using 'self'
  }

  // Add the body to the physics world
  World.add(world, this.body);

  this.show = function () {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);

    // 이미지의 픽셀 데이터 가져오기
    img.loadPixels();
    for (var i = 0; i < img.pixels.length; i += 4) {
      hex = colorList[this.col];
      red = parseInt(hex.substr(1, 2), 16);
      green = parseInt(hex.substr(3, 2), 16);
      blue = parseInt(hex.substr(5, 2), 16);
      img.pixels[i] = red; // Red 값
      img.pixels[i + 1] = green; // Green 값
      img.pixels[i + 2] = blue; // Blue 값

      // img.pixels[i + 3]는 알파 채널이므로 변경하지 않음
    }
    img.updatePixels();

    image(img, 0, 0, this.w, this.h);
    pop();
  };

  preload();
  setup();
}

function showPreview() {
  var img = images[selectedImage];
  img.loadPixels();
  for (var i = 0; i < img.pixels.length; i += 4) {
    hex = colorList[selectedColor];
    red = parseInt(hex.substr(1, 2), 16);
    green = parseInt(hex.substr(3, 2), 16);
    blue = parseInt(hex.substr(5, 2), 16);
    img.pixels[i] = red; // Red 값
    img.pixels[i + 1] = green; // Green 값
    img.pixels[i + 2] = blue; // Blue 값

    // img.pixels[i + 3]는 알파 채널이므로 변경하지 않음
  }
  img.updatePixels();
  stroke(0);
  line(183, 845, 246, 845);

  stroke(0);
  line(183, 680, 246, 680);

  fill(255);
  noStroke();
  rect(171, 855, 89, 89);
  image(
    img,
    215 - Math.floor(iconSize / 2),
    900 - Math.floor(iconSize / 2),
    iconSize,
    iconSize
  );
}
