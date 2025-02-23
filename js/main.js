/* Initialize AOS */
AOS.init();

/* Canvas-based Soap Bubble Animation */
const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let globalTime = 0;
const bubbles = [];
const numBubbles = 50;

class Bubble {
  constructor() {
    this.reset();
    this.timeOffset = Math.random() * Math.PI * 2;
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * canvas.height;
    this.radius = Math.random() * 20 + 10;
    this.speed = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.5;
  }
  update() {
    this.y -= this.speed;
    if (this.y < -this.radius) {
      this.reset();
      this.y = canvas.height + this.radius;
    }
  }
  draw() {
    const timeValue = globalTime + this.timeOffset;
    function subtleIridescenceColor(alpha, offset) {
      let r = 173, g = 216, b = 230;
      let pinkTint = Math.sin(timeValue + offset) * 20;
      let yellowTint = Math.cos(timeValue + offset) * 8;
      r = Math.min(255, r + pinkTint);
      g = Math.min(255, g + yellowTint);
      return `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}, ${alpha})`;
    }
    const grad = ctx.createRadialGradient(
      this.x - this.radius / 3, this.y - this.radius / 3, this.radius / 5,
      this.x, this.y, this.radius
    );
    grad.addColorStop(0, `rgba(255,255,255,${this.alpha})`);
    grad.addColorStop(0.3, subtleIridescenceColor(this.alpha * 0.8, 0));
    grad.addColorStop(0.5, subtleIridescenceColor(this.alpha * 0.7, 1));
    grad.addColorStop(0.7, subtleIridescenceColor(this.alpha * 0.6, 2));
    grad.addColorStop(0.9, subtleIridescenceColor(this.alpha * 0.5, 3));
    grad.addColorStop(1, `rgba(135,206,235,0)`);
  
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  
    ctx.strokeStyle = `rgba(255,255,255,${this.alpha * 0.8})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function initBubbles() {
  for (let i = 0; i < numBubbles; i++) {
    bubbles.push(new Bubble());
  }
}

function animateBubbles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach(bubble => {
    bubble.update();
    bubble.draw();
  });
  globalTime += 0.005;
  requestAnimationFrame(animateBubbles);
}

initBubbles();
animateBubbles();

/* Modern Animated Hamburger Menu */
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});
