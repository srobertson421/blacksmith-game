const ballEl = document.getElementById('ball');
const cssVars = document.documentElement.style;

let gameWidth = window.innerWidth;
let gameHeight = window.innerHeight;
let ballSpeed = 1;
let ballSize = gameWidth / 20;

window.addEventListener('resize', () => {
  ballSpeed = window.innerWidth / gameWidth;
  cssVars.setProperty('--ball-speed', `${ballSpeed}s`);
  gameWidth = window.innerWidth;
  gameHeight = window.innerHeight;
  cssVars.setProperty('--ball-size', `${gameWidth / 20}px`);
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