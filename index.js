let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

let ballRadius = 10; // 공의 반지름

let x = canvas.width / 2; // 공의 x좌표
let y = canvas.height - 30; // 공의 y좌표

let dx = 2; // 공의 x변화량
let dy = -2; // 공의 y변화량

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

// 화면에 공을 표시한다
const drawBall = () => {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
};

const drawPaddle = () => {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 화면 클리어

  drawBall(); // 공을 화면에 표시한다

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    // 죄우 벽면에 부딧힐 시 x 진행 방향을 반전 시킨다
    dx = -dx;
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    // 상하 벽면에 부딧힐 시 y 진행 방향을 반전 시킨다
    dy = -dy;
  }

  x += dx;
  y += dy;
};

const keyDownHandler = (e) => {
  if (e.keyCode == 39) {
    rightPressed = true;
    console.log('right');
  } else if (e.keyCode == 37) {
    leftPressed = true;
    console.log('left');
  }
};

const keyUpHandler = (e) => {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
};

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
setInterval(draw, 10);
