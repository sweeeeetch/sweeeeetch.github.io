const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const closeElem = document.querySelector('.menu__close');
const menuLink = document.querySelectorAll('.menu__link');
const counters = document.querySelectorAll('.skills-bar__percent');
const lines = document.querySelectorAll('.skills-bar__indic_orange');

counters.forEach((item, i) => {
  lines[i].style.width = item.innerHTML;
});

hamburger.addEventListener('click', () => {
  menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
  menu.classList.remove('active');
});

menuLink.forEach(menu.addEventListener('click', () => {
  menu.classList.remove('active');
})); 