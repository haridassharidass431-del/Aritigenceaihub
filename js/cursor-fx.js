/**
 * ARTIGENCE AI HUB — Premium Ethereal Cursor & Micro-Spark Interaction
 * Subtle purple/violet glow, micro particle light trail & high-tech electric pulse.
 * Elegant, non-distracting, performance-optimized, and disabled on touch devices.
 */

class CursorFx {
  constructor() {
    // Only initialize on desktop devices with hover & fine pointer, and without reduced motion
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer || isReducedMotion) {
      return;
    }

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'cursor-fx-canvas';
    this.canvas.style.cssText = `
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 9998;
    `;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.mouse = { x: -500, y: -500, prevX: -500, prevY: -500, speed: 0 };
    this.trail = [];
    this.sparks = [];
    this.isActive = true;
    this.isMoving = false;
    this.idleTimer = null;
    this.animationId = null;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    window.addEventListener('mousemove', (e) => {
      const dx = e.clientX - this.mouse.x;
      const dy = e.clientY - this.mouse.y;
      this.mouse.speed = Math.min(Math.hypot(dx, dy), 40);

      this.mouse.prevX = this.mouse.x;
      this.mouse.prevY = this.mouse.y;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      this.isMoving = true;
      clearTimeout(this.idleTimer);
      this.idleTimer = setTimeout(() => {
        this.isMoving = false;
      }, 120);

      // Spawn subtle trail particle
      if (this.mouse.speed > 1.5) {
        this.addTrailParticle();
      }

      // Occasionally trigger a subtle electric micro-spark
      if (Math.random() < 0.22 && this.mouse.speed > 5) {
        this.addMicroSpark();
      }

      if (!this.animationId) {
        this.animate();
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      this.mouse.x = -500;
      this.mouse.y = -500;
      this.isMoving = false;
    });

    // Pause on hidden tab
    document.addEventListener('visibilitychange', () => {
      this.isActive = !document.hidden;
      if (this.isActive && !this.animationId) {
        this.animate();
      }
    });
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  addTrailParticle() {
    this.trail.push({
      x: this.mouse.x + (Math.random() - 0.5) * 6,
      y: this.mouse.y + (Math.random() - 0.5) * 6,
      size: Math.random() * 2.2 + 1.2,
      alpha: 0.65,
      decay: 0.025 + Math.random() * 0.02,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      color: Math.random() > 0.4 ? 'rgba(168, 85, 247,' : 'rgba(56, 189, 248,'
    });

    if (this.trail.length > 35) {
      this.trail.shift();
    }
  }

  addMicroSpark() {
    const segments = [];
    let curX = this.mouse.x;
    let curY = this.mouse.y;
    const angle = Math.random() * Math.PI * 2;
    const totalLen = 14 + Math.random() * 18;
    const steps = 3;

    for (let i = 0; i < steps; i++) {
      const stepDist = totalLen / steps;
      curX += Math.cos(angle) * stepDist + (Math.random() - 0.5) * 8;
      curY += Math.sin(angle) * stepDist + (Math.random() - 0.5) * 8;
      segments.push({ x: curX, y: curY });
    }

    this.sparks.push({
      startX: this.mouse.x,
      startY: this.mouse.y,
      segments,
      alpha: 0.7,
      decay: 0.12
    });
  }

  animate() {
    if (!this.isActive) {
      this.animationId = null;
      return;
    }

    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Subtle cursor ambient violet glow
    if (this.mouse.x > 0 && this.mouse.y > 0) {
      const glowGrad = this.ctx.createRadialGradient(
        this.mouse.x, this.mouse.y, 0,
        this.mouse.x, this.mouse.y, 75
      );
      glowGrad.addColorStop(0, 'rgba(168, 85, 247, 0.16)');
      glowGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.06)');
      glowGrad.addColorStop(1, 'rgba(168, 85, 247, 0)');

      this.ctx.fillStyle = glowGrad;
      this.ctx.beginPath();
      this.ctx.arc(this.mouse.x, this.mouse.y, 75, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // 2. Render micro electric sparks
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const s = this.sparks[i];
      s.alpha -= s.decay;

      if (s.alpha <= 0) {
        this.sparks.splice(i, 1);
        continue;
      }

      this.ctx.beginPath();
      this.ctx.strokeStyle = `rgba(192, 132, 252, ${s.alpha})`;
      this.ctx.lineWidth = 1;
      this.ctx.shadowColor = '#c084fc';
      this.ctx.shadowBlur = 6;
      this.ctx.moveTo(s.startX, s.startY);
      for (const pt of s.segments) {
        this.ctx.lineTo(pt.x, pt.y);
      }
      this.ctx.stroke();
      this.ctx.shadowBlur = 0;
    }

    // 3. Render light trail particles
    for (let i = this.trail.length - 1; i >= 0; i--) {
      const p = this.trail[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;
      p.size = Math.max(0, p.size - 0.04);

      if (p.alpha <= 0 || p.size <= 0) {
        this.trail.splice(i, 1);
        continue;
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `${p.color} ${p.alpha})`;
      this.ctx.shadowColor = '#a855f7';
      this.ctx.shadowBlur = 8;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }

    // Stop animation loop if mouse has stopped and all particles are gone
    if (!this.isMoving && this.trail.length === 0 && this.sparks.length === 0) {
      this.animationId = null;
      return;
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CursorFx();
});
