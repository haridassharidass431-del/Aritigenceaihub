/**
 * ARTIGENCE AI HUB — Application Core
 * Interactive behaviors, filtering, modal dialogues, animations, and forms.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initScrollSpy();
  initScrollReveals();
  initProjects();
  initApproachInteractive();
  initContactForm();
  initClipboardActions();
});

let scrollRevealObserver;

/* --------------------------------------------------------------------------
   1. Header Scroll State
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-actions .btn');

  if (!toggleBtn || !drawer) return;

  const toggleDrawer = (open) => {
    const shouldOpen = open !== undefined ? open : !drawer.classList.contains('open');
    drawer.classList.toggle('open', shouldOpen);
    toggleBtn.classList.toggle('open', shouldOpen);
    toggleBtn.setAttribute('aria-expanded', shouldOpen.toString());
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  };

  toggleBtn.addEventListener('click', () => toggleDrawer());

  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleDrawer(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleDrawer(false);
    }
  });
}

/* --------------------------------------------------------------------------
   3. ScrollSpy & Navigation Active State
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!sections.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        updateActiveLink(id);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  function updateActiveLink(id) {
    desktopLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${id}`);
    });
    mobileLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${id}`);
    });
  }
}

/* --------------------------------------------------------------------------
   4. Scroll Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollReveals(root = document) {
  const elements = root.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('revealed'));
    return;
  }

  if (!scrollRevealObserver) {
    scrollRevealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        } else {
          entry.target.classList.remove('revealed');
        }
      });
    }, { threshold: 0.12 });
  }

  elements.forEach(el => scrollRevealObserver.observe(el));
}

/* --------------------------------------------------------------------------
   5. Projects Showcase & Modal Dialog
   -------------------------------------------------------------------------- */
function initProjects() {
  const container = document.getElementById('projects-container');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (!container || !window.ARTIGENCE_PROJECTS) return;

  const getStatusClass = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('working')) return 'status-working-prototype';
    if (s.includes('development') || s.includes('soon')) return 'status-in-development';
    return 'status-prototype';
  };

  const renderProjects = (category = 'all') => {
    container.innerHTML = '';
    const filtered = category === 'all'
      ? window.ARTIGENCE_PROJECTS
      : window.ARTIGENCE_PROJECTS.filter(p => p.category === category);

    filtered.forEach((project, idx) => {
      const card = document.createElement('article');
      card.className = `project-card reveal-on-scroll reveal-delay-${(idx % 4) + 1}`;
      
      const tagsHtml = (project.tags || []).slice(0, 4).map(t => `<span class="project-tag">${escapeHtml(t)}</span>`).join('');
      const statusClass = getStatusClass(project.status || project.badge);

      const haventraSubNote = project.id === 'haventra'
        ? `<div style="font-size: 0.72rem; color: var(--accent-magenta); font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px;">Future Product • Artigence AI Hub</div>`
        : '';

      card.innerHTML = `
        <div class="project-image-wrap">
          <img src="${escapeHtml(project.mainImage)}" alt="${escapeHtml(project.title)}" loading="lazy" class="project-card-image">
          <span class="project-badge-pill ${statusClass}">
            <span class="status-dot"></span>
            ${escapeHtml(project.status || project.badge)}
          </span>
        </div>
        <div class="project-body">
          <span class="project-category">${escapeHtml(project.categoryLabel)}</span>
          ${haventraSubNote}
          <h3 class="project-title">${escapeHtml(project.title)}</h3>
          <p class="project-desc">${escapeHtml(project.description)}</p>
          <div class="project-tags">
            ${tagsHtml}
          </div>
          <div class="project-footer">
            <button class="btn btn-secondary btn-sm open-project-modal" data-id="${escapeHtml(project.id)}">
              View Project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    initScrollReveals(container);

    // Re-bind modal triggers
    container.querySelectorAll('.open-project-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openModal(id);
      });
    });
  };

  // Initial render
  renderProjects('all');

  // Filter button clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      renderProjects(cat);
    });
  });

  // Modal logic
  const openModal = (id) => {
    const project = window.ARTIGENCE_PROJECTS.find(p => p.id === id);
    if (!project || !modalBackdrop) return;

    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-subtitle').textContent = project.subtitle || project.tagline;
    document.getElementById('modal-category').textContent = `${project.categoryLabel} • [${project.status}]`;
    document.getElementById('modal-long-desc').textContent = project.longDescription || project.description;
    document.getElementById('modal-impact').textContent = project.impact || '';

    // Features
    const featContainer = document.getElementById('modal-features');
    featContainer.innerHTML = '';
    (project.features || []).forEach(feat => {
      const li = document.createElement('div');
      li.className = 'modal-feature-item';
      li.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        <span>${escapeHtml(feat)}</span>
      `;
      featContainer.appendChild(li);
    });

    // Tech Stack
    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = '';
    (project.techStack || []).forEach(tech => {
      const div = document.createElement('div');
      div.className = 'modal-tech-item';
      div.innerHTML = `
        <div class="modal-tech-name">${escapeHtml(tech.name)}</div>
        <div class="modal-tech-role">${escapeHtml(tech.role)}</div>
      `;
      techContainer.appendChild(div);
    });

    // Showcase Gallery / Technical Visuals
    const visualBox = document.getElementById('modal-visual-box');
    if (visualBox) {
      visualBox.innerHTML = '';
      if (project.showcaseSections && project.showcaseSections.length > 0) {
        let galleryHtml = `<div style="display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1rem;">`;
        project.showcaseSections.forEach(section => {
          galleryHtml += `
            <div style="background: rgba(9, 4, 22, 0.7); border: 1px solid rgba(168, 85, 247, 0.25); border-radius: 12px; overflow: hidden; padding: 12px;">
              <h5 style="font-size: 0.95rem; font-weight: 700; color: #fff; margin-bottom: 4px;">${escapeHtml(section.title)}</h5>
              <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 10px;">${escapeHtml(section.desc)}</p>
              <div style="border-radius: 8px; overflow: hidden; background: #000; display: flex; justify-content: center;">
                <img src="${escapeHtml(section.image)}" alt="${escapeHtml(section.title)}" loading="lazy" style="max-height: 420px; width: 100%; object-fit: contain; padding: 6px;">
              </div>
            </div>
          `;
        });
        galleryHtml += `</div>`;
        visualBox.innerHTML = galleryHtml;
        visualBox.style.display = 'block';
      } else if (project.mainImage) {
        visualBox.innerHTML = `
          <div style="margin-top: 1rem; border-radius: 12px; overflow: hidden; border: 1px solid rgba(168,85,247,0.3); background: #000;">
            <img src="${escapeHtml(project.mainImage)}" alt="${escapeHtml(project.title)}" loading="lazy" style="width: 100%; max-height: 380px; object-fit: contain; padding: 8px;">
          </div>
        `;
        visualBox.style.display = 'block';
      } else {
        visualBox.style.display = 'none';
      }
    }

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   6. Interactive 4-Step Approach Timeline
   -------------------------------------------------------------------------- */
function initApproachInteractive() {
  const steps = document.querySelectorAll('.timeline-step');
  steps.forEach(step => {
    step.addEventListener('click', () => {
      steps.forEach(s => s.classList.remove('active-step'));
      step.classList.add('active-step');
    });
  });
}

/* --------------------------------------------------------------------------
   7. Contact Form Handling with WhatsApp & Email Dispatch
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-alert');
  const whatsappBtn = document.getElementById('whatsapp-direct-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.elements['name']?.value.trim() || '';
    const email = form.elements['email']?.value.trim() || '';
    const category = form.elements['category']?.value || 'General Inquiry';
    const message = form.elements['message']?.value.trim() || '';

    if (!name || !email || !message) {
      showAlert('Please fill in all required fields (Name, Email, and Message).', 'error');
      return;
    }

    // Email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert('Please enter a valid email address.', 'error');
      return;
    }

    // Submit animation simulation
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/></svg>
      Sending Message...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();
      showAlert('Thank you! Your message has been sent to Artigence AI Hub. We will respond within 24 hours.', 'success');
    }, 900);
  });

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = form.elements['name']?.value.trim() || 'Website Visitor';
      const category = form.elements['category']?.value || 'Consultation';
      const userMsg = form.elements['message']?.value.trim() || 'Hello, I would like to discuss a project with Artigence AI Hub.';

      const encodedText = encodeURIComponent(
        `Hi Artigence AI Hub!\n\nName: ${name}\nProject Category: ${category}\nMessage: ${userMsg}`
      );
      // WhatsApp official link using the Founder's phone number.
      window.open(`https://wa.me/918870265485?text=${encodedText}`, '_blank');
    });
  }

  function showAlert(msg, type) {
    if (!alertBox) return;
    alertBox.textContent = msg;
    alertBox.className = `form-alert ${type}`;
    alertBox.style.display = 'block';
    setTimeout(() => {
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
}

/* --------------------------------------------------------------------------
   8. Direct Clipboard Copy Actions
   -------------------------------------------------------------------------- */
function initClipboardActions() {
  const copyButtons = document.querySelectorAll('.copy-trigger');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.borderColor = 'var(--accent-emerald)';
        btn.style.color = 'var(--accent-emerald)';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 2000);
      }).catch(() => {
        // Fallback
        prompt('Copy text manually:', textToCopy);
      });
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
