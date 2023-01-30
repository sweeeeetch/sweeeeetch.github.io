const age = document.querySelector("#age");
const height = document.querySelector("#height");
const weight = document.querySelector("#weight");
const activities = document.querySelectorAll('input[name="activity"]');
const btn = document.querySelector(".button");
const inputsGroup = document.querySelector(".inputs-group");
const switcher = document.querySelector(".switcher");
const result = document.querySelector(".counter__result");
const norm = document.querySelector("#calories-norm");
const min = document.querySelector("#calories-minimal");
const max = document.querySelector("#calories-maximal");
const reset = document.querySelector(".form__reset-button");

const ratios = [1.2, 1.375, 1.55, 1.725, 1.9];
// N = (10 *67) + (6,25 * 173) − (5 × 15) + 5

const mFormula = 10 * weight.value + 6.25 * height.value - 5 * age.value + 5;
const fFormula = 10 * weight.value + 6.25 * height.value - 5 * age.value - 161;
let mORf = 1;
let actIndex = 0;

switcher.addEventListener("change", function (e) {
  if (e.target.hasAttribute("checked")) mORf = 1;
  else mORf = 2;
  console.log(mORf);
});

if (age.value & height.value && weight.value) {
  btn.removeAttribute("disabled");
}

activities.forEach((el, i) =>
  el.addEventListener("click", function () {
    actIndex = i;
    console.log(actIndex);
  })
);

inputsGroup.addEventListener("change", function (e) {
  if (age.value && height.value && weight.value)
    btn.removeAttribute("disabled");
  if (age.value || height.value || weight.value)
    reset.removeAttribute("disabled");
});

btn.addEventListener("click", function (e) {
  e.preventDefault();
  result.style.visibility = "visible";
  result.style.opacity = 1;
  if (mORf == 1) {
    norm.textContent = Math.trunc(
      (10 * weight.value + 6.25 * height.value - 5 * age.value + 5) *
        ratios[actIndex]
    );
    min.textContent = Math.trunc(
      (10 * weight.value + 6.25 * height.value - 5 * age.value + 5) *
        ratios[actIndex] -
        ((10 * weight.value + 6.25 * height.value - 5 * age.value + 5) * 15) /
          100
    );
    max.textContent = Math.trunc(
      (10 * weight.value + 6.25 * height.value - 5 * age.value + 5) *
        ratios[actIndex] +
        ((10 * weight.value + 6.25 * height.value - 5 * age.value + 5) * 15) /
          100
    );
  } else {
    norm.textContent = Math.trunc(
      (10 * weight.value + 6.25 * height.value - 5 * age.value - 161) *
        ratios[actIndex]
    );
    min.textContent = Math.trunc(
      (10 * weight.value + 6.25 * height.value - 5 * age.value - 161) *
        ratios[actIndex] -
        ((10 * weight.value + 6.25 * height.value - 5 * age.value - 161) * 15) /
          100
    );
    max.textContent = Math.trunc(
      (10 * weight.value + 6.25 * height.value - 5 * age.value - 161) *
        ratios[actIndex] +
        ((10 * weight.value + 6.25 * height.value - 5 * age.value - 161) * 15) /
          100
    );
  }
});

const resetFunc = function () {
  age.value = "";
  height.value = "";
  weight.value = "";

  activities[0].checked = true;
  document.querySelector("#gender-male").checked = true;
  btn.setAttribute("disabled", true);
  reset.setAttribute("disabled", true);

  result.style.visibility = "hidden";
  result.style.opacity = 0;
};

reset.addEventListener("click", resetFunc);
