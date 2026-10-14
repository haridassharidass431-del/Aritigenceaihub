/**
 * ARTIGENCE AI HUB — Neural Constellation Canvas
 * High-performance, lightweight particle network reflecting AI connectivity.
 */

class NeuralCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -1000, y: -1000, radius: 140 };
    this.isActive = true;
    this.animationFrameId = null;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    if (!this.reducedMotion) {
      this.animate();
    } else {
      this.drawStatic();
    }
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
  }

  createParticles() {
    this.particles = [];
    // Dynamic density: less on small screens, optimal on large
    const count = this.width < 768 ? 28 : Math.min(Math.floor((this.width * this.height) / 18000), 65);
    
    // Violet, cyan and magenta hues matching Artigence theme
    const colors = [
      'rgba(168, 85, 247, 0.75)',  // Neon Violet
      'rgba(139, 92, 246, 0.65)',  // Electric Purple
      'rgba(192, 132, 252, 0.8)',  // Bright Lavender
      'rgba(56, 189, 248, 0.55)',  // Cyber Cyan accent
    ];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    }, { passive: true });

    const parent = this.canvas.parentElement;
    parent.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    }, { passive: true });

    parent.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });

    // Pause when hero is not visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isActive = entry.isIntersecting;
        if (this.isActive && !this.animationFrameId && !this.reducedMotion) {
          this.animate();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(parent);

    // Pause on background tab
    document.addEventListener('visibilitychange', () => {
      this.isActive = !document.hidden;
      if (this.isActive && !this.animationFrameId && !this.reducedMotion) {
        this.animate();
      }
    });
  }

  animate() {
    if (!this.isActive) {
      this.animationFrameId = null;
      return;
    }

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Connect & draw lines
    const maxDist = this.width < 768 ? 100 : 135;
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];

      // Update position
      p1.x += p1.vx;
      p1.y += p1.vy;
      p1.pulse += p1.pulseSpeed;

      // Wrap around edges smoothly
      if (p1.x < -10) p1.x = this.width + 10;
      if (p1.x > this.width + 10) p1.x = -10;
      if (p1.y < -10) p1.y = this.height + 10;
      if (p1.y > this.height + 10) p1.y = -10;

      // Connect with other particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.28;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
          this.ctx.lineWidth = 0.85;
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }

      // Connect with mouse cursor
      const mdx = p1.x - this.mouse.x;
      const mdy = p1.y - this.mouse.y;
      const mdist = Math.hypot(mdx, mdy);
      if (mdist < this.mouse.radius) {
        const mAlpha = (1 - mdist / this.mouse.radius) * 0.45;
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(192, 132, 252, ${mAlpha})`;
        this.ctx.lineWidth = 1.1;
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.stroke();

        // Gentle attraction
        p1.x -= mdx * 0.012;
        p1.y -= mdy * 0.012;
      }

      // Draw particle node
      const currentRadius = p1.radius + Math.sin(p1.pulse) * 0.5;
      this.ctx.beginPath();
      this.ctx.arc(p1.x, p1.y, Math.max(0.8, currentRadius), 0, Math.PI * 2);
      this.ctx.fillStyle = p1.color;
      this.ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
      this.ctx.shadowBlur = 8;
      this.ctx.fill();
      this.ctx.shadowBlur = 0; // reset
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  drawStatic() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (const p of this.particles) {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new NeuralCanvas('hero-particles');
});
