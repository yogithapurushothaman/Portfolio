document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // MOBILE MENU TOGGLE
  // ==========================================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileMenuBtn.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars-staggered';
      }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileMenuBtn.querySelector('i');
        icon.className = 'fa-solid fa-bars-staggered';
      });
    });
  }

  // ==========================================================================
  // STICKY HEADER
  // ==========================================================================
  const header = document.getElementById('site-header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // ==========================================================================
  // TYPING ANIMATION (Hero Tagline)
  // ==========================================================================
  const typingTextElement = document.getElementById('hero-typing-text');
  const taglines = [
    "Java | Python | Web Tech",
    "B.Tech CSE Student",
    "Software Developer",
    "Database Integrator"
  ];
  let taglineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  const typeEffect = () => {
    const currentTagline = taglines[taglineIndex];
    
    if (isDeleting) {
      // Deleting text
      typingTextElement.textContent = `> ${currentTagline.substring(0, charIndex - 1)}`;
      charIndex--;
      typingSpeed = 50; // Speed up deleting
    } else {
      // Typing text
      typingTextElement.textContent = `> ${currentTagline.substring(0, charIndex + 1)}`;
      charIndex++;
      typingSpeed = 120; // Normal typing speed
    }

    if (!isDeleting && charIndex === currentTagline.length) {
      // Pause at full word
      typingSpeed = 2000; // Pause for 2s before deleting
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      taglineIndex = (taglineIndex + 1) % taglines.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
  };

  if (typingTextElement) {
    typeEffect();
  }

  // ==========================================================================
  // ACTIVE NAVIGATION LINK HIGHLIGHTER
  // ==========================================================================
  const sections = document.querySelectorAll('section');
  
  const highlightMenu = () => {
    let scrollPos = window.scrollY + 250; // Add offset for earlier detection
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightMenu);
  highlightMenu();

  // ==========================================================================
  // SYSTEM MATRIX GRAPH SCROLL REVEAL ANIMATION
  // ==========================================================================
  const skillsSection = document.getElementById('skills');
  const matrixRows = document.querySelectorAll('.matrix-row');

  if (skillsSection && matrixRows.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          matrixRows.forEach((row, index) => {
            setTimeout(() => {
              row.classList.add('visible');
            }, index * 100);
          });
        }
      });
    }, {
      threshold: 0.15 // Trigger when 15% of section is visible
    });

    observer.observe(skillsSection);
  }

  // ==========================================================================
  // INTERACTIVE STACK FILTER DASHBOARD
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-pill');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // Filter matrix rows
        matrixRows.forEach(row => {
          const categories = row.getAttribute('data-categories') || '';
          if (filter === 'all' || categories.split(' ').includes(filter)) {
            row.classList.remove('fade-out');
            row.classList.add('highlight');
          } else {
            row.classList.add('fade-out');
            row.classList.remove('highlight');
          }
        });
      });
    });
  }

  // ==========================================================================
  // RESUME DOWNLOAD MOCK & TOAST NOTIFICATION
  // ==========================================================================
  const resumeBtn = document.getElementById('btn-download-resume');

  // Custom Toast System
  const showToast = (message, duration = 3000) => {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      document.body.appendChild(toastContainer);
      
      // Add dynamic styling for toast container
      const style = document.createElement('style');
      style.textContent = `
        #toast-container {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          pointer-events: none;
        }
        .toast {
          background-color: var(--bg-card);
          border: 1px solid var(--accent-color);
          box-shadow: var(--shadow-glow), 0 4px 12px rgba(0,0,0,0.5);
          color: var(--text-primary);
          padding: 1rem 1.5rem;
          border-radius: 8px;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          transform: translateY(100px);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .toast.show {
          transform: translateY(0);
          opacity: 1;
        }
        .toast-icon {
          color: var(--accent-color);
          font-size: 1.1rem;
        }
      `;
      document.head.appendChild(style);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="fa-solid fa-circle-info toast-icon"></i>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove toast
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, duration);
  };

  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Simulate file creation and download
      const resumeContent = `
========================================
SANJAY R - RESUME (SIMULATED DOWNLOAD)
========================================
Title: B.Tech Computer Science & Engineering Student
Institution: SRM Institute of Science and Technology
Location: Chennai, India
Email: sanjaydevi1021@gmail.com
GitHub: https://github.com/
LinkedIn: https://www.linkedin.com/in/sanjayr21/

CORE SKILLS:
- Languages: Java, Python, C++, HTML5, CSS3, SQL (MySQL)
- Concepts: Data Structures & Algorithms, Object-Oriented Programming (OOP), Database Management

PROJECTS:
1. Personal Portfolio Website (HTML5, CSS3, JavaScript)
2. Student Database System (Java, MySQL, JDBC)

Thank you for downloading my portfolio resume!
========================================
      `.trim();
      
      const blob = new Blob([resumeContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.href = url;
      tempLink.download = 'Sanjay_R_Resume.txt';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      URL.revokeObjectURL(url);
      
      showToast('Downloaded Sanjay R\'s Resume (Sanjay_R_Resume.txt)');
    });
  }

});
