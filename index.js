const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const ballRadius = 10; // 공의 반지름

let x = canvas.width / 2; // 공의 x좌표
let y = canvas.height - 30; // 공의 y좌표

let dx = 2; // 공의 x변화량
let dy = -2; // 공의 y변화량

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let score = 0;
let lives = 3;

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

const keyDownHandler = (e) => {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
};
const keyUpHandler = (e) => {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
};

const drawBricks = () => {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;

        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
};

const collisionDetection = () => {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;

          if (score == brickRowCount * brickColumnCount) {
            alert('YOU WIN, CONGRATULATIONS!');
            document.location.reload();
          }
        }
      }
    }
  }
};

const drawScore = () => {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText('Score: ' + score, 8, 20);
};

const drawLives = () => {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText('Lives: ' + lives, canvas.width - 65, 20);
};

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    // if()
    paddleX = relativeX - paddleWidth / 2;
  }
}

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 화면 클리어

  drawBall(); // 공을 화면에 표시한다
  drawPaddle();
  collisionDetection();
  drawBricks();
  drawScore();
  drawLives();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    // 죄우 벽면에 부딧힐 시 x 진행 방향을 반전 시킨다
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    // 위쪽 벽면에 부딧힐 시 y 진행 방향을 반전 시킨다
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX - ballRadius && x < paddleX + paddleWidth + ballRadius) {
      dy = -dy;
    } else {
      lives--;
      if (!lives) {
        alert('GAME OVER');
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 3;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 3;
  }

  x += dx;
  y += dy;

  requestAnimationFrame(draw);
};

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);
// setInterval(draw, 10);
draw();
