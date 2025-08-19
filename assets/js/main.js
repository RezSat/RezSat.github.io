// Custom cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
});

// Navigation functionality
const nav = document.querySelector('.main-nav');
const menuTrigger = document.querySelector('.menu-trigger');
const navLinks = document.querySelectorAll('.nav-link');
const navIndicator = document.querySelector('.nav-indicator');
const navProgress = document.querySelector('.nav-progress');
const sections = document.querySelectorAll('section[id]');

function updateNavigation() {
    const currentPos = window.scrollY + window.innerHeight / 2;
    
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (currentPos >= sectionTop && currentPos <= sectionBottom) {
            const currentLink = nav.querySelector(`[href="#${section.id}"]`);
            navLinks.forEach(link => link.style.opacity = '0.5');
            currentLink.style.opacity = '1';
            
            const linkBounds = currentLink.getBoundingClientRect();
            navIndicator.style.transform = `translateY(${linkBounds.top - nav.getBoundingClientRect().top}px)`;
        }
    });

    // Update progress bar
    const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    navProgress.style.setProperty('--progress', `${scrollProgress}%`);
}

menuTrigger?.addEventListener('click', () => {
    menuTrigger.classList.toggle('active');
    nav.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
        
        if (window.innerWidth <= 768) {
            menuTrigger.classList.remove('active');
            nav.classList.remove('active');
        }
    });
});

window.addEventListener('scroll', updateNavigation);
window.addEventListener('resize', updateNavigation);

// Initialize navigation
updateNavigation();

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.reveal');

function reveal() {
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.classList.add('active');
    }
  });
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// Smooth hover effect for cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.05), rgba(255,255,255,0.02))`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.background = 'rgba(255,255,255,0.03)';
  });
});
