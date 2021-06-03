const startBtnEl = document.getElementById('start-btn');
const menuEl = document.getElementById('menu');
const gameEl = document.getElementById('game');
const hammerSoundEl = document.getElementById('hammer');
const ballEl = document.getElementById('ball');
let barEl = document.getElementById('bar');
const areaEl = document.getElementById('area');
const cssVars = document.documentElement;

hammerSoundEl.volume = 0.5;

let score = 0;
let scoreEl = document.getElementById('score');

let gameWidth = window.innerWidth;
let gameHeight = window.innerHeight;
let ballSpeed = window.innerWidth / gameWidth;
let ballSize = gameWidth / 20;
let barWidth = ballSize * 4;
let barHeight = ballSize;
cssVars.style.setProperty('--ball-speed', `${ballSpeed}s`);
cssVars.style.setProperty('--ball-size', `${gameWidth / 20}px`);
cssVars.style.setProperty('--bar-width', `${barWidth}px`);
cssVars.style.setProperty('--bar-height', `${barHeight}px`);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.addEventListener('resize', () => {
  ballSpeed = window.innerWidth / gameWidth;
  gameWidth = window.innerWidth;
  gameHeight = window.innerHeight;
  ballSize = gameWidth / 20;
  barWidth = ballSize * 4;
  barHeight = ballSize;
  cssVars.style.setProperty('--ball-speed', `${ballSpeed}s`);
  cssVars.style.setProperty('--ball-size', `${ballSize}px`);
  cssVars.style.setProperty('--bar-width', `${barWidth}px`);
  cssVars.style.setProperty('--bar-height', `${barHeight}px`);
});

function resetBar() {
  areaEl.removeChild(barEl);

  const newBar = document.createElement('div');
  newBar.id = 'bar';
  newBar.style.left = `${getRandomInt(20, 70)}%`;
  barEl = newBar;
  areaEl.appendChild(barEl);
}

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

startBtnEl.addEventListener('click', () => {
  menuEl.style.display = 'none';
  gameEl.style.display = 'flex';

  document.body.addEventListener('click', () => {
    const ballPos = ballEl.offsetLeft + (ballSize / 2);
    const barPosStart = barEl.offsetLeft - 50;
    const barPosEnd = barEl.offsetLeft + barEl.offsetWidth + 50;
  
    if(ballPos > barPosStart && ballPos < barPosEnd) {
      score++;
      hammerSoundEl.play();
    } else {
      score = 0;
    }
  
    resetBar();
  
    scoreEl.innerText = `Score: ${score}`;
  });

  requestAnimationFrame(gameLoop);
});