/**
 * Muhammad Ali Farid - Web Developer Portfolio
 * Vanilla JavaScript (ES6+) for GitHub Pages Compatibility
 * Features: Dark/Light Mode, Mobile Navigation, Scrollspy, Modals, Form Handling, Scroll Reveal
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // DOM Elements
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const siteHeader = document.getElementById('site-header');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top');
  const contactForm = document.getElementById('contact-form');
  const formStatusMsg = document.getElementById('form-status-msg');
  const copyEmailBtn = document.getElementById('copy-email-btn');

  // Modal Elements
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBackdrop = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');

  // --------------------------------------------------------------------------
  // 1. Dark / Light Theme Management
  // --------------------------------------------------------------------------
  const STORAGE_KEY = 'portfolio-theme';

  function getPreferredTheme() {
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    if (storedTheme) {
      return storedTheme;
    }
    // Default to system preference, fallback to light
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'fa-solid fa-sun';
        themeToggleBtn?.setAttribute('aria-label', 'Switch to light mode');
        themeToggleBtn?.setAttribute('title', 'Switch to light mode');
      } else {
        themeIcon.className = 'fa-solid fa-moon';
        themeToggleBtn?.setAttribute('aria-label', 'Switch to dark mode');
        themeToggleBtn?.setAttribute('title', 'Switch to dark mode');
      }
    }
  }

  // Initialize theme immediately
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // Toggle button event
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // Listen to OS theme changes if user hasn't explicitly set preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. Mobile Navigation Drawer
  // --------------------------------------------------------------------------
  function toggleMobileMenu(open) {
    const isOpen = open !== undefined ? open : !mobileDrawer?.classList.contains('open');
    if (!mobileDrawer || !mobileMenuToggle) return;

    if (isOpen) {
      mobileDrawer.classList.add('open');
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
      mobileMenuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      document.body.style.overflow = 'hidden';
    } else {
      mobileDrawer.classList.remove('open');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mobileMenuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function () {
      toggleMobileMenu();
    });
  }

  // Close mobile drawer when any link is clicked
  mobileNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      toggleMobileMenu(false);
    });
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('open')) {
      toggleMobileMenu(false);
      mobileMenuToggle?.focus();
    }
  });

  // --------------------------------------------------------------------------
  // 3. Scroll Header & Back-To-Top
  // --------------------------------------------------------------------------
  function handleScroll() {
    const scrollY = window.scrollY;

    // Header shadow on scroll
    if (siteHeader) {
      if (scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Active Section Scrollspy
    highlightActiveNav();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. Scrollspy (Highlight Nav Link for Current Section)
  // --------------------------------------------------------------------------
  function highlightActiveNav() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. Scroll Reveal with IntersectionObserver
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  // --------------------------------------------------------------------------
  // 6. Project Modal Details Data & Handlers
  // --------------------------------------------------------------------------
  const projectDetails = {
    'smart-medico': {
      title: 'Smart Medico — Healthcare Management System',
      badge: 'Main Featured Project',
      tech: 'PHP · MySQL · PDO · HTML5 · CSS3 · JavaScript · Bootstrap · Font Awesome',
      description: 'Smart Medico is an end-to-end healthcare management web application engineered to bridge the communication gap between patients, healthcare providers, and clinical administrators. The platform organizes the full appointment lifecycle, patient record tracking, and doctor schedule management with secure session authentication.',
      features: [
        'Multi-Role Authentication & Access Control (Admin, Doctor, Patient portals)',
        'Patient Registration, Medical History, & Appointment Scheduling',
        'Doctor Dashboard: Manage pending appointments, patient consultations, & availability slots',
        'Admin Command Dashboard: Full management of doctors, patients, staff, and system inquiries',
        'Secure Database Access with PHP PDO & Prepared Statements to prevent SQL injection',
        'Inquiries & Queries Feedback ticketing system for public inquiries',
        'Exportable Appointment & Consultation activity reports',
        'Fully responsive UI styled with Bootstrap and custom CSS for mobile & desktop'
      ],
      architectureNotice: 'Note: Smart Medico is a PHP/MySQL backend application designed to run on a local Apache server (e.g. XAMPP) or standard PHP hosting. Because this portfolio is hosted statically on GitHub Pages, the project code and database schema are available on GitHub rather than executed live inside GitHub Pages.',
      githubUrl: 'https://github.com/YOUR_USERNAME/smart-medico'
    },
    'business-site': {
      title: 'Responsive Corporate Business Website',
      badge: 'Practice Project',
      tech: 'HTML5 · CSS3 · JavaScript (Vanilla)',
      description: 'A modern, responsive multi-section business website crafted with semantic HTML5, CSS Flexbox and Grid, and modular vanilla JavaScript. Features accessible navigation, interactive pricing tabs, dynamic FAQ accordions, and clean service showcases optimized for rapid loading.',
      features: [
        'Clean mobile-first responsive layout tested across screen sizes from 320px to 4K',
        'Semantic HTML5 structure with complete ARIA labels and focus states',
        'Interactive service cards and pricing tier comparisons',
        'Accessible client-side modal dialogs and FAQ accordion components',
        'Zero external runtime dependencies for maximum loading speed'
      ],
      githubUrl: 'https://github.com/YOUR_USERNAME/responsive-business-website'
    },
    'restaurant-site': {
      title: 'Artisanal Restaurant & Culinary Website',
      badge: 'Practice Project',
      tech: 'HTML5 · CSS3 · JavaScript (Vanilla)',
      description: 'An elegant dining and culinary showcase website with dynamic menu filtering, high-resolution visual layout, customer review cards, and an interactive reservation booking preview interface.',
      features: [
        'Interactive category menu filter (Breakfast, Lunch, Dinner, Beverages)',
        'Table reservation inquiry form with client-side datetime validation',
        'Responsive culinary gallery with smooth transitions and touch-friendly layout',
        'Location, operating hours, and contact details with accessible links'
      ],
      githubUrl: 'https://github.com/YOUR_USERNAME/restaurant-website'
    },
    'php-crud-app': {
      title: 'PHP / MySQL Data Management Application',
      badge: 'Database Project',
      tech: 'PHP · MySQL · PDO · Bootstrap · JavaScript',
      description: 'A structured database-driven web application demonstrating core CRUD (Create, Read, Update, Delete) workflows, relational database normalization, and secure authentication principles.',
      features: [
        'User registration and password hashing using bcrypt (password_hash)',
        'Session-based role access control and protected routes',
        'Full CRUD operations for record management with search and pagination',
        'Prepared statements with PDO for safe, SQL-injection-resistant database queries',
        'Relational data tables designed and managed via phpMyAdmin'
      ],
      githubUrl: 'https://github.com/YOUR_USERNAME/php-mysql-crud-app'
    }
  };

  function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data || !projectModal || !modalTitle || !modalBody) return;

    modalTitle.textContent = data.title;

    let featuresHtml = data.features
      .map(function (feat) {
        return '<li style="display:flex; align-items:flex-start; gap:10px; margin-bottom:10px; font-size:0.9rem; color:var(--text-secondary);">' +
          '<i class="fa-solid fa-circle-check" style="color:var(--accent-primary); margin-top:3px; flex-shrink:0;"></i>' +
          '<span>' + feat + '</span></li>';
      })
      .join('');

    let noticeHtml = data.architectureNotice
      ? '<div style="background-color:var(--bg-surface-subtle); border-left:3px solid var(--accent-primary); padding:14px; border-radius:var(--radius-md); font-size:0.84rem; color:var(--text-muted); line-height:1.5; margin-top:20px;">' +
        '<i class="fa-solid fa-circle-info" style="color:var(--accent-primary); margin-right:6px;"></i>' +
        data.architectureNotice +
        '</div>'
      : '';

    modalBody.innerHTML =
      '<div style="margin-bottom:16px;">' +
      '<div style="font-size:0.8rem; font-weight:700; color:var(--accent-primary); text-transform:uppercase; letter-spacing:0.06em; margin-bottom:6px;">' + data.badge + '</div>' +
      '<div style="font-size:0.84rem; color:var(--text-muted); margin-bottom:16px;"><strong>Technologies:</strong> ' + data.tech + '</div>' +
      '<p style="font-size:0.96rem; line-height:1.65; color:var(--text-secondary); margin-bottom:20px;">' + data.description + '</p>' +
      '</div>' +
      '<div style="margin-bottom:20px;">' +
      '<h4 style="font-size:1.05rem; font-weight:700; margin-bottom:12px; color:var(--text-primary);">Key Architectural Features:</h4>' +
      '<ul style="list-style:none; padding:0;">' + featuresHtml + '</ul>' +
      '</div>' +
      noticeHtml +
      '<div style="margin-top:24px; padding-top:20px; border-top:1px solid var(--border-subtle); display:flex; gap:12px; flex-wrap:wrap;">' +
      '<a href="' + data.githubUrl + '" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">' +
      '<i class="fa-brands fa-github"></i> View GitHub Repository' +
      '</a>' +
      '<button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById(\'project-modal\').classList.remove(\'active\')">' +
      'Close Overview' +
      '</button>' +
      '</div>';

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modalCloseBtn?.focus();
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Attach modal trigger listeners
  document.querySelectorAll('[data-project-trigger]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-trigger');
      if (projectId) {
        openProjectModal(projectId);
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', function (e) {
      if (e.target === modalBackdrop) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && projectModal?.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // --------------------------------------------------------------------------
  // 7. Static Contact Form Handling
  // --------------------------------------------------------------------------
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : 'Portfolio Inquiry';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        if (formStatusMsg) {
          formStatusMsg.className = 'form-status-msg';
          formStatusMsg.style.display = 'block';
          formStatusMsg.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
          formStatusMsg.style.color = '#dc2626';
          formStatusMsg.style.border = '1px solid rgba(239, 68, 68, 0.2)';
          formStatusMsg.textContent = 'Please fill out all required fields (Name, Email, and Message).';
        }
        return;
      }

      // Display transparent feedback for static GitHub Pages environment
      if (formStatusMsg) {
        formStatusMsg.className = 'form-status-msg success';
        formStatusMsg.innerHTML =
          '<strong>Ready to send!</strong> Opening your default email client with your message drafted. ' +
          '(You can also email directly to the address provided on the left).';
      }

      // Prepare mailto link with prefilled subject and body
      const encodedSubject = encodeURIComponent('[Portfolio Contact] ' + subject + ' - ' + name);
      const encodedBody = encodeURIComponent(
        'Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message
      );

      // Open mailto link
      setTimeout(function () {
        window.location.href = 'mailto:your-email@example.com?subject=' + encodedSubject + '&body=' + encodedBody;
      }, 600);
    });
  }

  // --------------------------------------------------------------------------
  // 8. Copy Email to Clipboard Helper
  // --------------------------------------------------------------------------
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', function () {
      const emailToCopy = 'your-email@example.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailToCopy).then(function () {
          const originalText = copyEmailBtn.innerHTML;
          copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
          setTimeout(function () {
            copyEmailBtn.innerHTML = originalText;
          }, 2000);
        }).catch(function () {
          fallbackCopyText(emailToCopy);
        });
      } else {
        fallbackCopyText(emailToCopy);
      }
    });
  }

  function fallbackCopyText(text) {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    tempTextArea.style.position = 'fixed';
    tempTextArea.style.opacity = '0';
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    try {
      document.execCommand('copy');
      if (copyEmailBtn) {
        const originalText = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        setTimeout(function () {
          copyEmailBtn.innerHTML = originalText;
        }, 2000);
      }
    } catch (err) {
      console.warn('Unable to copy text automatically', err);
    }
    document.body.removeChild(tempTextArea);
  }

  // Log portfolio readiness
  console.log('Muhammad Ali Farid Portfolio script initialized successfully. GitHub Pages compatible.');
})();
