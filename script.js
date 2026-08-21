/* Script for Sky Media - Black, White & Orange Theme & Animations (Fully Responsive) */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. GSAP Scroll Animations
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Entrance
    gsap.from('.hero-badge', { opacity: 0, y: -20, duration: 0.8, ease: 'power3.out' });
    gsap.from('.hero-title', { opacity: 0, y: 30, duration: 1, delay: 0.2, ease: 'power3.out' });
    gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.8, delay: 0.4, ease: 'power3.out' });
    gsap.from('.hero-cta-group', { opacity: 0, y: 20, duration: 0.8, delay: 0.6, ease: 'power3.out' });

    // PAGE 2: Services Cutout POP ANIMATION (Responsive offsets for Mobile vs Desktop)
    function getServiceOffsets() {
      const isMobile = window.innerWidth < 768;
      const offsetX = isMobile ? 92 : 260;
      const offsetY = isMobile ? 125 : 80;

      return [
        { el: '#pop-card-1', finalX: -offsetX, finalY: -offsetY }, // Top-Left (Reelmaking)
        { el: '#pop-card-2', finalX: offsetX, finalY: -offsetY },  // Top-Right (Video Editing)
        { el: '#pop-card-3', finalX: -offsetX, finalY: offsetY },  // Bottom-Left (Management)
        { el: '#pop-card-4', finalX: offsetX, finalY: offsetY }   // Bottom-Right (Shooting)
      ];
    }

    let serviceCards = getServiceOffsets();

    // Set initial position behind cutout
    function resetCutoutCards() {
      serviceCards.forEach(card => {
        gsap.set(card.el, { x: 0, y: 0, scale: 0, opacity: 0 });
      });
    }

    resetCutoutCards();

    // Update offsets on window resize
    window.addEventListener('resize', () => {
      serviceCards = getServiceOffsets();
    });

    // Trigger Pop-out animation on Scroll to Page 2
    ScrollTrigger.create({
      trigger: '#services',
      start: 'top 75%',
      onEnter: () => {
        serviceCards.forEach((card, idx) => {
          gsap.to(card.el, {
            x: card.finalX,
            y: card.finalY,
            scale: 1,
            opacity: 1,
            duration: 0.85,
            delay: idx * 0.1,
            ease: 'back.out(1.7)'
          });
        });
      },
      onLeaveBack: () => {
        serviceCards.forEach(card => {
          gsap.to(card.el, { x: 0, y: 0, scale: 0, opacity: 0, duration: 0.35 });
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

  // 3. Video Lightbox Modal Player
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

  // 4. Contact Form Handler
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

  // 5. Mobile Menu Toggle & Auto-Close on Link Click
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });

    const drawerLinks = mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.add('hidden');
      });
    });
  }
});
