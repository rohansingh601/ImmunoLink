const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');
const logoText = document.querySelector('.logo-text');

// Define observer options
const options = {
  root: null, // Observes viewport
  threshold: 0.5, // Trigger when 50% of the section is visible
};

// Callback function for Intersection Observer
const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.id === 'hero') {
        // Apply light styles for hero section
        hamMenu.classList.add('light');
        hamMenu.classList.remove('dark');
        logoText.classList.add('light');
        logoText.classList.remove('dark');
      } else if (entry.target.id === 'content') {
        // Apply dark styles for content section
        hamMenu.classList.add('dark');
        hamMenu.classList.remove('light');
        logoText.classList.add('dark');
        logoText.classList.remove('light');
      } else if (entry.target.id == 'about') {
        hamMenu.classList.add('light');
        hamMenu.classList.remove('dark');
        logoText.classList.add('light');
        logoText.classList.remove('dark');
      } else if (entry.target.id == 'services') {
        hamMenu.classList.add('dark');
        hamMenu.classList.remove('light');
        logoText.classList.add('dark');
        logoText.classList.remove('light');
      }
    }
  });
};


hamMenu.addEventListener('click', () => {
  hamMenu.classList.toggle('active');
  offScreenMenu.classList.toggle('active');
});

// Smooth scroll for section navigation (optional)
document.querySelectorAll('a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

document.querySelectorAll('.menu-list a').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
      event.preventDefault();
      const page = this.getAttribute('href');
      window.location.href = page; // Redirect to the selected page
    });
  });
  