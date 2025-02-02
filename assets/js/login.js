document.addEventListener('DOMContentLoaded', () => {
  const hamMenu = document.querySelector('.ham-menu');
  const offScreenMenu = document.querySelector('.off-screen-menu');
  const logoText = document.querySelector('.logo-text');
  const loginForm = document.querySelector('.login-form');

  // Hamburger Menu Toggle
  hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
  });

  // Navigation Links Click Handler
  document.querySelectorAll('.menu-list a').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
      event.preventDefault();
      const page = this.getAttribute('href');
      window.location.href = `../pages/${page}`;
    });
  });

  // Observer for Dynamic Style Change
  const options = {
    root: null, // Observes viewport
    threshold: 0.5, // Trigger when 50% of the section is visible
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.id === 'login') {
          hamMenu.classList.add('light');
          hamMenu.classList.remove('dark');
          logoText.classList.add('light');
          logoText.classList.remove('dark');
        }
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, options);
  document.querySelectorAll('section').forEach((section) => observer.observe(section));

  // Login Form Validation
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Sample login credentials
    const sampleUser = {
      email: 'test@example.com',
      password: 'password123',
    };

    // Get input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate credentials
    if (email === sampleUser.email && password === sampleUser.password) {
      alert('Login successful! Redirecting...');
      window.location.href = '../pages/dashboard.html'; // Redirect to the dashboard page
    } else {
      alert('Invalid email or password. Please try again.');
    }
  });
});
