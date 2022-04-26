'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const navLink = document.querySelectorAll('.nav__link');
const navLinks = document.querySelectorAll('.nav__links');
const allSections = document.querySelectorAll('.section');

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Scrolling button
btnScrollTo.addEventListener('click', function (e) {
  const scroll = section1.getBoundingClientRect();
  // console.log(scroll);
  const options = {
    top: scroll.top + window.pageYOffset,
    left: scroll.left + window.pageXOffset,
    behavior: 'smooth',
  };
  window.scrollTo(options);
});

// Hover navbar
nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    navLink.forEach(el => {
      if (el !== e.target) el.style.opacity = '0.2';
    });
    nav.querySelector('img').style.opacity = '0.2';
  }
});

nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    navLink.forEach(el => {
      if (el !== e.target) el.style.opacity = '1';
    });
    nav.querySelector('img').style.opacity = '1';
  }
});

nav.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Operations Tabbed
document
  .querySelector('.operations__tab-container')
  .addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');

    if (!clicked) return;

    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));

    tabsContent.forEach(tab =>
      tab.classList.remove('operations__content--active')
    );

    if (clicked.classList.contains('operations__tab')) {
      clicked.classList.add('operations__tab--active');
      document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');
    }
  });

// Sticky Nav
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerNav = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerNav.observe(header);

// Reveal sections

const showSections = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionsObserver = new IntersectionObserver(showSections, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionsObserver.observe(section);
});

const featuresImg = document.querySelector('.features').querySelectorAll('img');

console.log(featuresImg);

const imgLazy = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function (e) {
    entry.target.classList.remove('lazy-img');
  });
};

const imgObserver = new IntersectionObserver(imgLazy, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

featuresImg.forEach(img => {
  imgObserver.observe(img);
});

// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot dots__dot--active" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };

  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();
