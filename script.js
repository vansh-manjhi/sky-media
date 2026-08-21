/* Script for Sky Media - Black, White & Orange Theme & Animations */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. Page 1 Background Animation Canvas (Interactive Floating Particles & Mesh)
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.4 ? 'rgba(255, 85, 0, 0.4)' : 'rgba(255, 255, 255, 0.25)'
      });
    }

    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting lines
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 85, 0, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw & update particles
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });

      requestAnimationFrame(animateCanvas);
    }

    animateCanvas();
  }

  // 3. GSAP Scroll Animations
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Entrance
    gsap.from('.hero-badge', { opacity: 0, y: -20, duration: 0.8, ease: 'power3.out' });
    gsap.from('.hero-title', { opacity: 0, y: 30, duration: 1, delay: 0.2, ease: 'power3.out' });
    gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.8, delay: 0.4, ease: 'power3.out' });
    gsap.from('.hero-cta-group', { opacity: 0, y: 20, duration: 0.8, delay: 0.6, ease: 'power3.out' });

    // PAGE 2: Services Cutout POP ANIMATION
    const serviceCards = [
      { el: '#pop-card-1', finalX: -260, finalY: -80 }, // Top-Left (Reelmaking)
      { el: '#pop-card-2', finalX: 260, finalY: -80 },  // Top-Right (Video Editing)
      { el: '#pop-card-3', finalX: -260, finalY: 80 },  // Bottom-Left (Management)
      { el: '#pop-card-4', finalX: 260, finalY: 80 }   // Bottom-Right (Shooting)
    ];

    // Set initial position behind cutout
    serviceCards.forEach(card => {
      gsap.set(card.el, { x: 0, y: 0, scale: 0, opacity: 0 });
    });

    // Trigger Pop-out animation on Scroll to Page 2
    ScrollTrigger.create({
      trigger: '#services-cutout-section',
      start: 'top 75%',
      onEnter: () => {
        serviceCards.forEach((card, idx) => {
          gsap.to(card.el, {
            x: card.finalX,
            y: card.finalY,
            scale: 1,
            opacity: 1,
            duration: 0.9,
            delay: idx * 0.12,
            ease: 'back.out(1.8)'
          });
        });
      },
      onLeaveBack: () => {
        serviceCards.forEach(card => {
          gsap.to(card.el, { x: 0, y: 0, scale: 0, opacity: 0, duration: 0.4 });
        });
      }
    });

    // Page 4: Growth Metric Cards Reveal
    gsap.utils.toArray('.metric-card').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 85%' },
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
      });
    });

    // Page 5: BTS Video Cards Entrance
    gsap.utils.toArray('.bts-card').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 85%' },
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out'
      });
    });

    // Section Headers Reveal
    gsap.utils.toArray('.section-header').forEach((header) => {
      gsap.from(header, {
        scrollTrigger: { trigger: header, start: 'top 85%' },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      });
    });
  }

  // 4. Video Lightbox Modal Player
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('modal-iframe');
  const closeBtn = document.getElementById('close-modal');
  const triggers = document.querySelectorAll('.trigger-video-modal');

  const defaultVideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const videoSrc = trigger.dataset.videoUrl || defaultVideoUrl;
      iframe.src = videoSrc;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      if (window.gsap) {
        gsap.fromTo(modal.querySelector('.modal-box'), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.3 });
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  function closeModal() {
    if (!modal) return;
    iframe.src = "";
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  // 5. Contact Form Handler
  const contactForm = document.getElementById('skymedia-contact-form');
  const formSuccess = document.getElementById('form-success-msg');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.classList.add('hidden');
      formSuccess.classList.remove('hidden');
      formSuccess.classList.add('flex');
      if (window.gsap) {
        gsap.fromTo(formSuccess, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4 });
      }
    });
  }

  // 6. Mobile Menu Toggle
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });
  }
});
