const ballEl = document.getElementById('ball');
let barEl = document.getElementById('bar');
const areaEl = document.getElementById('area');
const cssVars = document.documentElement;

let score = 0;
let scoreEl = document.getElementById('score');

let gameWidth = window.innerWidth;
let gameHeight = window.innerHeight;
let ballSpeed = window.innerWidth / gameWidth;
let ballSize = gameWidth / 20;
cssVars.style.setProperty('--ball-speed', `${ballSpeed}s`);
cssVars.style.setProperty('--ball-size', `${gameWidth / 20}px`);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.addEventListener('resize', () => {
  ballSpeed = window.innerWidth / gameWidth;
  cssVars.style.setProperty('--ball-speed', `${ballSpeed}s`);
  gameWidth = window.innerWidth;
  gameHeight = window.innerHeight;
  cssVars.style.setProperty('--ball-size', `${gameWidth / 20}px`);
});

function resetBar() {
  areaEl.removeChild(barEl);

  const newBar = document.createElement('div');
  newBar.id = 'bar';
  newBar.style.left = `${getRandomInt(20, 70)}%`;
  barEl = newBar;
  areaEl.appendChild(barEl);
}

document.body.addEventListener('click', () => {
  const ballPos = ballEl.offsetLeft + (ballSize / 2);
  const barPosStart = barEl.offsetLeft - 50;
  const barPosEnd = barEl.offsetLeft + barEl.offsetWidth + 50;

  if(ballPos > barPosStart && ballPos < barPosEnd) {
    score++;
  } else {
    score = 0;
  }

  resetBar();

  scoreEl.innerText = `Score: ${score}`;
});

let previousTick = 0;

function gameLoop(dTime) {
  if(dTime > previousTick + 1000) {
    if(ballEl.classList.contains('slideRight')) {
      ballEl.classList.remove('slideRight');
      ballEl.classList.add('slideLeft');
    } else {
      ballEl.classList.remove('slideLeft');
      ballEl.classList.add('slideRight');
    }

    previousTick = dTime;
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);