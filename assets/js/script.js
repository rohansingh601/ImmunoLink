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
//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}

// Create observer
const observer = new IntersectionObserver(observerCallback, options);

// Observe each section
document.querySelectorAll('section').forEach((section) => {
  observer.observe(section);
});


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
  