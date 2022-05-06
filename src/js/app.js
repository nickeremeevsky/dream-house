import Swiper from 'swiper/bundle';
import ScrollReveal from 'scrollreveal';

// change background header
function scrollHeader() {
  const header = document.getElementById('header');
  // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 50) {
    header.classList.add('scroll-header');
  } else {
    header.classList.remove('scroll-header');
  }
}
window.addEventListener('scroll', scrollHeader);

// slider
let swiperPopular = new Swiper('.popular__container', {
  spaceBetween: 34,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  keyboard: {
    enabled: true,
  },

  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

let swiperPopularCard = new Swiper('.imageSwiper', {
  centeredSlides: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

// value accordion
const accordionItems = document.querySelectorAll('.value__accordion-item');

accordionItems.forEach((item) => {
  const accordionHeader = item.querySelector('.value__accordion-header');

  accordionHeader.addEventListener('click', () => {
    const openItem = document.querySelector('.accordion-open');

    toggleItem(item);

    if (openItem && openItem !== item) {
      toggleItem(openItem);
    }
  });
});

const toggleItem = (item) => {
  const accordionContent = item.querySelector('.value__accordion-content');

  if (item.classList.contains('accordion-open')) {
    accordionContent.removeAttribute('style');
    item.classList.remove('accordion-open');
  } else {
    accordionContent.style.height = accordionContent.scrollHeight + 'px';
    item.classList.add('accordion-open');
  }
};

// scroll section active link
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector('.nav__menu a[href*=' + sectionId + ']')
        .classList.add('active-link');
    } else {
      document
        .querySelector('.nav__menu a[href*=' + sectionId + ']')
        .classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', scrollActive);

// show scroll up
function scrollUp() {
  const scrollUp = document.getElementById('scroll-up');
  if (this.scrollY >= 460) {
    scrollUp.classList.add('show-scroll');
  } else {
    scrollUp.classList.remove('show-scroll');
  }
}
window.addEventListener('scroll', scrollUp);

// dark light theme
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-fill';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? 'ri-moon-fill' : 'ri-sun-fill';

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
    darkTheme
  );
  themeButton.classList[selectedIcon === 'ri-moon-fill' ? 'add' : 'remove'](
    iconTheme
  );
}

themeButton.addEventListener('click', () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});

// scroll reveal animation
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 3500,
  delay: 400,
  reset: true,
});

sr.reveal(
  '.home__title',
  '.popular__container',
  '.subscribe__container',
  '.footer__container'
);

sr.reveal('.home__description', { delay: 500 });
sr.reveal('.home__search', { delay: 600 });
sr.reveal('.home__value', { delay: 700 });
sr.reveal('.home__images', { delay: 800, origin: 'bottom' });
sr.reveal('.logos__img', { interval: 300 });
sr.reveal('.value__images', '.contact__content', {
  origin: 'left',
});
sr.reveal('.value__content', '.contact__images', {
  origin: 'right',
});
