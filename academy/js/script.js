$(document).ready(function () {
  $('.reviews__wrapper').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    variableWidth: true,
    prevArrow:
      '<button type="button" class="slick-prev" style="background-color: #EAF3FF;"><img src="icons/arrow-left.png" alt="<"></button>',
    nextArrow:
      '<button type="button" class="slick-next" style="background-color: #EAF3FF;"><img src="icons/arrow-right.png" alt=">"></button>',
  });
});

const faqArrow = document.querySelectorAll('.faq__arrow');
const faqText = document.querySelectorAll('.faq__text');

faqArrow.forEach((el, i) =>
  el.addEventListener('click', function () {
    if (faqText[i].classList.contains('visible'))
      faqText[i].classList.remove('visible');
    else faqText[i].classList.add('visible');
  })
);
