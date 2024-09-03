'use strict';
// Element
const allSection = document.querySelectorAll('section.element');
const joinButton = document.querySelector('.join__button');
const headerButton = document.querySelector('.header__btn');
const closeButton = document.querySelector('.message__closeBtn');
const messageEl = document.querySelector('.message');
const overlayEl = document.querySelector('.layout');
const headerIconEl = document.querySelector('.header__icon');
const headerList = document.querySelector('.header__list');
const btnToScroll = document.querySelector('.introduction__link');
const section1El = document.querySelector('#section--1');
const listOfLinkEl = document.querySelector('.header__list');
const tabs = document.querySelectorAll('.operation__button');
const tabsContainer = document.querySelector('.operation__buttons__section');
const tabsContent = document.querySelectorAll('.operation__text__section');
const headerEl = document.querySelector('.header');
const introSection = document.querySelector('.introduction');
const targetImages = document.querySelectorAll('img[data-img]');
const sliderEl = document.querySelector('.testimonial__slider');
const allSlide = document.querySelectorAll('.testimonial__slider__center');
const dotContainerEl = document.querySelector('.testimonial__dot__cont');
const btnRightSlide = document.querySelector('.testimonial__swap__right');
const btnLeftSlide = document.querySelector('.testimonial__swap__left');
// global variable
let currSlide = 0;
const maxSlide = allSlide.length;

// function and event handler

// open message method
const openMessage = function (e) {
  e.preventDefault();
  overlayEl.classList.remove('hidden');
  messageEl.classList.remove('hidden');
};

// joinButton and headerButton event handler
joinButton.addEventListener('click', openMessage);
headerButton.addEventListener('click', openMessage);

// close message method
const closeMessage = function () {
  overlayEl.classList.add('hidden');
  messageEl.classList.add('hidden');
};

// close button event handler
closeButton.addEventListener('click', closeMessage);
overlayEl.addEventListener('click', closeMessage);

//header icon event handler
headerIconEl.addEventListener('click', function () {
  headerList.classList.toggle('header__list--display');
});
headerList.addEventListener('click', function () {
  headerList.classList.add('header__list--display');
});

// learn more event handler
btnToScroll.addEventListener('click', function (e) {
  e.preventDefault();
  section1El.scrollIntoView({ behavior: 'smooth' });
});

// nav bar event handler
listOfLinkEl.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('header__item__a')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// tabbed component
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operation__button');

  if (!clicked) return;

  // Remove active class
  tabs.forEach(t => t.classList.remove('operation__button--active'));
  tabsContent.forEach(c => c.classList.add('none'));

  // Activate classes
  clicked.classList.add('operation__button--active');
  document
    .querySelector(`#text--${clicked.dataset.tab}`)
    .classList.remove('none');
});

// hover header element event handler
const handlerHover = function (e) {
  if (
    e.target.classList.contains('header__item__a') ||
    e.target.classList.contains('header__btn')
  ) {
    // you hover about a or button
    const link = e.target;
    const siblings = link
      .closest('.header')
      .querySelectorAll('.header__item__a');
    const logo = link.closest('.header').querySelector('img');
    const btn = link.closest('.header').querySelector('button');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
    if (btn !== link) btn.style.opacity = this;
  }
};
// when mouse hover
headerEl.addEventListener('mouseover', handlerHover.bind(0.5));
// when mouse over
headerEl.addEventListener('mouseout', handlerHover.bind(1));

// make sticky nav bar
const headerHeight = headerEl.getBoundingClientRect().height;
// function API
const obsCallback = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) headerEl.classList.add('sticky');
  else headerEl.classList.remove('sticky');
};
// object API
const obsObject = {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
};
// Intersection observer API
const observer = new IntersectionObserver(obsCallback, obsObject);
observer.observe(introSection);

// Reveling sections
const observeFunction = function (entries, observer) {
  const [entry] = entries;
  // if isIntersecting === false not make function
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('element--hidden');
  // to not repeat observer
  observer.unobserve(entry.target);
};

const sectionObs = new IntersectionObserver(observeFunction, {
  root: null,
  threshold: 0.15,
});
// observe about all sections and add element hidden class
allSection.forEach(section => {
  sectionObs.observe(section);
  section.classList.add('element--hidden');
});

// Lazy loading Image
const loadImg = function (entries, observe) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.img;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observe.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '50px',
});
// observe about all image
targetImages.forEach(img => imgObserver.observe(img));

// Slider
const createDot = function () {
  allSlide.forEach((_, i) => {
    dotContainerEl.insertAdjacentHTML(
      'beforeend',
      `<span class="dot dot--selected" data-slide="${i}"></span>`
    );
  });
};
const dotSelected = function (slide) {
  document
    .querySelectorAll('.dot')
    .forEach(dot => dot.classList.remove('dot--selected'));
  document
    .querySelector(`.dot[data-slide="${slide}"]`)
    .classList.add('dot--selected');
};
// function to swap slide
const gotoSlide = function (slide) {
  allSlide.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

const init = function () {
  gotoSlide(0);
  createDot();
  dotSelected(0);
};

init();
// function to get next slide
const nextSlide = function () {
  if (currSlide === maxSlide - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  gotoSlide(currSlide);
  dotSelected(currSlide);
};
// function to get previous slide
const previousSlide = function () {
  if (currSlide === 0) {
    currSlide = maxSlide - 1;
  } else {
    currSlide--;
  }
  gotoSlide(currSlide);
  dotSelected(currSlide);
};
// Event handler
// left and right button
btnRightSlide.addEventListener('click', nextSlide);
btnLeftSlide.addEventListener('click', previousSlide);
// global event
document.addEventListener('keydown', function (e) {
  e.key === 'ArrowRight' && nextSlide();
  e.key === 'ArrowLeft' && previousSlide();
});
// dot event handler
dotContainerEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('dot')) {
    const slide = e.target.dataset.slide;
    gotoSlide(slide);
    dotSelected(slide);
  }
});
