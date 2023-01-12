const leftArrow = document.querySelector('.team__arrow-l');
const rightArrow = document.querySelector('.team__arrow-r');
const sliderItems = document.querySelectorAll('.team__item');
const slider = document.querySelector('.team__slider');

const openBtn = document.querySelectorAll('.faq__btn');
const span = document.querySelectorAll('span');

let currentSlide = 0;
const slideNums = sliderItems.length;
sliderItems.forEach((slide, index) => {
  slide.style.transform = `translateX(${index * 100}%)`;
});

const moveToSlide = function (slide) {
  sliderItems.forEach((s, index) => {
    s.style.transform = `translateX(${(index - slide) * 100}%)`;
    if (!sliderItems[currentSlide].classList.contains('hidden')) {
      sliderItems[currentSlide].classList.add('active');
      sliderItems[
        currentSlide - 1 == -1 ? currentSlide + 2 : currentSlide - 1
      ].classList.remove('active');
      sliderItems[
        currentSlide + 1 == 3 ? currentSlide - 2 : currentSlide + 1
      ].classList.remove('active');
    }

    sliderItems[
      currentSlide - 1 == -1 ? currentSlide + 2 : currentSlide - 1
    ].classList.add('hidden');
    sliderItems[currentSlide].classList.remove('hidden');
    sliderItems[
      currentSlide + 1 == 3 ? currentSlide - 2 : currentSlide + 1
    ].classList.add('hidden');
  });
};

const nextSlide = function () {
  if (currentSlide === slideNums - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  moveToSlide(currentSlide);
};

const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = slideNums - 1;
  } else {
    currentSlide--;
  }

  moveToSlide(currentSlide);
};

leftArrow.addEventListener('click', previousSlide);
rightArrow.addEventListener('click', nextSlide);

console.log(openBtn);
openBtn.forEach((el, index) => {
  el.addEventListener('click', function () {
    if (!el.classList.contains('faq__btn-active')) {
      el.classList.toggle('faq__btn-active');
      span[index].textContent = '—';
      el.parentElement.parentElement.classList.add('active');
    } else {
      el.classList.toggle('faq__btn-active');
      span[index].textContent = '+';
      el.parentElement.parentElement.classList.remove('active');
    }
  });
});
