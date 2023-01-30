import "../scss/style.scss";

const question = document.querySelector(".question");
const weather = document.querySelector(".weather");
const btn = document.querySelector(".question__btn");
const errGeo = document.querySelector(".error-geo");

const nDate = new Date();

const datacodes = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  45: 3,
  48: 3,
  51: 6,
  53: 6,
  55: 6,
  61: 6,
  63: 6,
  65: 6,
  66: 6,
  67: 6,
  71: 7,
  73: 7,
  75: 7,
  77: 7,
  80: 6,
  81: 6,
  82: 6,
  85: 7,
  86: 7,
  95: 9,
  96: 9,
  99: 9,
};

const weekdays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const readyWeakdays = [];

const weakday = nDate.getDay(); // ['Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
console.log(weakday);
console.log(weakday);
for (let i = weakday + 1; i < weakday + 7; i++) {
  readyWeakdays.push(weekdays[i % 7]);
}
console.log(readyWeakdays);

function getDirection(degs) {
  if (degs <= 30) return "С";
  if (degs <= 60) return "СВ";
  if (degs <= 120) return "В";
  if (degs <= 150) return "ВЮ";
  if (degs <= 210) return "Ю";
  if (degs <= 240) return "ЮЗ";
  if (degs <= 300) return "З";
  if (degs <= 330) return "ЗС";
  if (degs <= 360) return "С";
}

const getUserPos = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
async function getWheater() {
  const data = new Date();
  const tData = new Date(Date.now() + 604800000);
  const tYear = tData.getFullYear();
  const tMonth = (tData.getMonth() + 1).toString().padStart(2, "0");
  const tDay = tData.getDate().toString().padStart(2, "0");
  const year = data.getFullYear();
  const month = (data.getMonth() + 1).toString().padStart(2, "0");
  const day = data.getDate().toString().padStart(2, "0");
  try {
    const userPos = await getUserPos();
    question.classList.add("inactive");
    const { latitude: lat, longitude: lng } = userPos.coords;
    // https://api.open-meteo.com/v1/forecast?latitude=43.12&longitude=131.89&hourly=temperature_2m,relativehumidity_2m,precipitation,visibility,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant&current_weather=true&windspeed_unit=ms&timeformat=unixtime&timezone=auto&start_date=2023-01-29&end_date=2023-02-05
    const wheaterResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${Number(lat).toFixed(
        2
      )}&longitude=${Number(lng).toFixed(
        2
      )}&hourly=temperature_2m,relativehumidity_2m,precipitation,visibility,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant&current_weather=true&windspeed_unit=ms&timeformat=unixtime&timezone=auto&start_date=${year}-${month}-${day}&end_date=${tYear}-${tMonth}-${tDay}`
    );
    weather.classList.add("active");
    if (!wheaterResponse.ok) throw new Error("Ошибка получения погоды!");
    const geocodingData = await wheaterResponse.json();
    displayWheather(geocodingData);
  } catch (e) {
    if (e.code == 1) {
      console.log(1);
      errGeo.style.display = "block";
      setTimeout(function () {
        errGeo.style.display = "none";
      }, 3000);
    }
  }
}

console.log(new Date(1674914400 * 1000));

function displayWheather(data) {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();
  const time = new Intl.DateTimeFormat(navigator.language, {
    hour12: false,
    hour: "2-digit",
    minute: "numeric",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(now);
  const html = `      
    <div class="weather__main">
      <h1 class="weather__title">Прогноз погоды на <span class="time">${time}</span></h1>
      <div class="weather__timezone">Временная зона: ${data.timezone}/${
    data.timezone_abbreviation
  }, Высота: ${data.elevation}</div>
    </div>
    <div class="weather__current">
    <img src="icons/dailyIcons/${
      datacodes[data.daily.weathercode[1]]
    }.png" alt="" class="weather__current-left-img">  <!-- img -->
        <div class="weather__current-left">
          <div class="weather__current-left-temp text">${
            data.current_weather.temperature
          }${data.hourly_units.temperature_2m}</div  ><!-- temp -->
          <div class="weather__current-left-wind text">${
            data.current_weather.windspeed
          }${
    data.hourly_units.windspeed_10m
  }</div  ><!-- wind & direction & speed -->
        </div>
        <div class="weather__current-right">
          <div class="weather__current-right-precipitations text">Осадки: ${
            data.hourly.relativehumidity_2m[0]
          }${data.hourly_units.precipitation}</div>  <!-- precipitations -->
          <div class="weather__current-right-visibility text">Видимость: ${
            data.hourly.visibility[0]
          }m</div>  <!-- visibility -->
          <div class="weather__current-right-humidity text">Влажность: ${
            data.hourly.relativehumidity_2m[0]
          }%</div>  <!-- humidity -->
        </div>
      </div>
    <div class="weather__next">

      <h3 class="weather__subtitle">На следующие 5 часов</h3> 
      <div class="weather__next-hours">
        <div class="weather__next-hour" data-hour="1">
          <div class="weather__next-hour-text text-title"><p>Время:</p></div>  <!-- hour -->
          <div class="weather__next-hour-temp text-2"><p>Температура:</p></div>  <!-- temp  -->
          <div class="weather__next-hour-prec text-2"><p>Осадки и Влажность:</p></div>  <!-- precipitation & humidity -->
          <div class="weather__next-hour-wind text-2"><p>Скорость и направление ветра:</p></div>  <!-- wind speed & direction -->
        </div>
        <div class="weather__next-hour" data-hour="1">
          <div class="weather__next-hour-text text-title">${(hour + 1 > 24
            ? hour + 1 - 24
            : hour + 1
          )
            .toString()
            .padStart(2, "0")}:00</div>  <!-- hour -->
          <div class="weather__next-hour-temp text-2">${
            data.hourly.temperature_2m[2]
          }${data.hourly_units.temperature_2m}</div>  <!-- temp  -->
          <div class="weather__next-hour-prec text-2">${
            data.hourly.precipitation[2]
          }mm, ${
    data.hourly.relativehumidity_2m[2]
  }%</div>  <!-- precipitation & humidity -->
          <div class="weather__next-hour-wind text-2">${
            data.hourly.windspeed_10m[2]
          } ${data.hourly_units.windspeed_10m}   |   ${
    data.hourly.winddirection_10m[2]
  }${getDirection(
    data.hourly.winddirection_10m[2]
  )}<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="30px" height="30px" viewBox="0 0 24 24" style="transform: rotate(${
    data.hourly.winddirection_10m[2]
  }deg); position: absolute; top: -5px;" id="up-arrow" data-name="Flat Line" class="icon flat-line"><line id="primary" x1="12" y1="21" x2="12" y2="3" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/><polyline id="primary-2" data-name="primary" points="15 6 12 3 9 6" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/></svg></div>  <!-- wind speed & direction -->
        </div>
        <div class="weather__next-hour" data-hour="2">
          <div class="weather__next-hour-text text-title">${(hour + 2 > 24
            ? hour + 2 - 24
            : hour + 2
          )
            .toString()
            .padStart(2, "0")}:00</div>  <!-- hour -->
          <div class="weather__next-hour-temp text-2">${
            data.hourly.temperature_2m[3]
          }${data.hourly_units.temperature_2m}</div>  <!-- temp  -->
          <div class="weather__next-hour-prec text-2">${
            data.hourly.precipitation[3]
          }mm, ${
    data.hourly.relativehumidity_2m[3]
  }%</div>  <!-- precipitation & humidity -->
          <div class="weather__next-hour-wind text-2">${
            data.hourly.windspeed_10m[3]
          } ${data.hourly_units.windspeed_10m}   |   ${
    data.hourly.winddirection_10m[3]
  }${getDirection(
    data.hourly.winddirection_10m[3]
  )}<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="30px" height="30px" viewBox="0 0 24 24" style="transform: rotate(${
    data.hourly.winddirection_10m[3]
  }deg); position: absolute; top: -5px;" id="up-arrow" data-name="Flat Line" class="icon flat-line"><line id="primary" x1="12" y1="21" x2="12" y2="3" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/><polyline id="primary-2" data-name="primary" points="15 6 12 3 9 6" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/></svg></div>  <!-- wind speed & direction -->
        </div>
        <div class="weather__next-hour" data-hour="3">
          <div class="weather__next-hour-text text-title">${(hour + 3 > 24
            ? hour + 3 - 24
            : hour + 3
          )
            .toString()
            .padStart(2, "0")}:00</div>  <!-- hour -->
          <div class="weather__next-hour-temp text-2">${
            data.hourly.temperature_2m[4]
          }${data.hourly_units.temperature_2m}</div>  <!-- temp  -->
          <div class="weather__next-hour-prec text-2">${
            data.hourly.precipitation[4]
          }mm, ${
    data.hourly.relativehumidity_2m[4]
  }%</div>  <!-- precipitation & humidity -->
          <div class="weather__next-hour-wind text-2">${
            data.hourly.windspeed_10m[4]
          } ${data.hourly_units.windspeed_10m}   |   ${
    data.hourly.winddirection_10m[4]
  }${getDirection(
    data.hourly.winddirection_10m[4]
  )}<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="30px" height="30px" viewBox="0 0 24 24" style="transform: rotate(${
    data.hourly.winddirection_10m[4]
  }deg); position: absolute; top: -5px;" id="up-arrow" data-name="Flat Line" class="icon flat-line"><line id="primary" x1="12" y1="21" x2="12" y2="3" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/><polyline id="primary-2" data-name="primary" points="15 6 12 3 9 6" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/></svg></div>  <!-- wind speed & direction -->
        </div>
        <div class="weather__next-hour" data-hour="4">
          <div class="weather__next-hour-text text-title">${(hour + 4 > 24
            ? hour + 4 - 24
            : hour + 4
          )
            .toString()
            .padStart(2, "0")}:00</div>  <!-- hour -->
          <div class="weather__next-hour-temp text-2">${
            data.hourly.temperature_2m[5]
          }${data.hourly_units.temperature_2m}</div>  <!-- temp  -->
          <div class="weather__next-hour-prec text-2">${
            data.hourly.precipitation[5]
          }mm, ${
    data.hourly.relativehumidity_2m[5]
  }%</div>  <!-- precipitation & humidity -->
          <div class="weather__next-hour-wind text-2">${
            data.hourly.windspeed_10m[5]
          } ${data.hourly_units.windspeed_10m}   |   ${
    data.hourly.winddirection_10m[5]
  }${getDirection(
    data.hourly.winddirection_10m[5]
  )}<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="30px" height="30px" viewBox="0 0 24 24" style="transform: rotate(${
    data.hourly.winddirection_10m[5]
  }deg); position: absolute; top: -5px;" id="up-arrow" data-name="Flat Line" class="icon flat-line"><line id="primary" x1="12" y1="21" x2="12" y2="3" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/><polyline id="primary-2" data-name="primary" points="15 6 12 3 9 6" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/></svg></div>  <!-- wind speed & direction -->
        </div>
        <div class="weather__next-hour" data-hour="5">
          <div class="weather__next-hour-text text-title">${(hour + 5 > 24
            ? hour + 5 - 24
            : hour + 5
          )
            .toString()
            .padStart(2, "0")}:00</div>  <!-- hour -->
          <div class="weather__next-hour-temp text-2">${
            data.hourly.temperature_2m[6]
          }${data.hourly_units.temperature_2m}</div>  <!-- temp  -->
          <div class="weather__next-hour-prec text-2">${
            data.hourly.precipitation[6]
          }mm, ${
    data.hourly.relativehumidity_2m[6]
  }%</div>  <!-- precipitation & humidity -->
          <div class="weather__next-hour-wind text-2">${
            data.hourly.windspeed_10m[6]
          } ${data.hourly_units.windspeed_10m}   |   ${
    data.hourly.winddirection_10m[6]
  }${getDirection(
    data.hourly.winddirection_10m[6]
  )}<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="30px" height="30px" viewBox="0 0 24 24" style="transform: rotate(${
    data.hourly.winddirection_10m[6]
  }deg); position: absolute; top: -5px;" id="up-arrow" data-name="Flat Line" class="icon flat-line"><line id="primary" x1="12" y1="21" x2="12" y2="3" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/><polyline id="primary-2" data-name="primary" points="15 6 12 3 9 6" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/></svg></div>  <!-- wind speed & direction -->
        </div>
      </div>
    </div>
    <div class="weather__week">
      <h3 class="weather__subtitle">На неделю</h3>
      <div class="weather__week-wrapper">
      <div class="weather__weak-day">
        <div class="weather__weak-day-text text-title">${
          readyWeakdays[0]
        }</div>  <!-- day -->
        <img src="icons/dailyIcons/${
          datacodes[data.daily.weathercode[2]]
        }.png" alt="" class="weather__weak-day-img">  <!-- img -->
        <div class="weather__weak-day-temp text-small">
          Max temp: ${data.daily.temperature_2m_max[2]}°C, min temp: ${
    data.daily.temperature_2m_min[2]
  }${data.daily.temperature_2m_max[2]}°C
        </div>  <!-- temp -->
      </div>
      <div class="weather__weak-day">
        <div class="weather__weak-day-text text-title">${
          readyWeakdays[1]
        }</div>  <!-- day -->
        <img src="icons/dailyIcons/${
          datacodes[data.daily.weathercode[3]]
        }.png" alt="" class="weather__weak-day-img">  <!-- img -->
        <div class="weather__weak-day-temp text-small">
          Max temp: ${data.daily.temperature_2m_max[3]}°C, min temp: ${
    data.daily.temperature_2m_min[3]
  }${data.daily.temperature_2m_max[3]}°C
        </div>  <!-- temp -->
      </div>
      <div class="weather__weak-day">
        <div class="weather__weak-day-text text-title">${
          readyWeakdays[2]
        }</div>  <!-- day -->
        <img src="icons/dailyIcons/${
          datacodes[data.daily.weathercode[4]]
        }.png" alt="" class="weather__weak-day-img">  <!-- img -->
        <div class="weather__weak-day-temp text-small">
          Max temp: ${data.daily.temperature_2m_max[4]}°C, min temp: ${
    data.daily.temperature_2m_min[4]
  }${data.daily.temperature_2m_max[4]}°C
        </div>  <!-- temp -->
      </div>
      <div class="weather__weak-day">
        <div class="weather__weak-day-text text-title">${
          readyWeakdays[3]
        }</div>  <!-- day -->
        <img src="icons/dailyIcons/${
          datacodes[data.daily.weathercode[5]]
        }.png" alt="" class="weather__weak-day-img">  <!-- img -->
        <div class="weather__weak-day-temp text-small">
          Max temp: ${data.daily.temperature_2m_max[5]}°C, min temp: ${
    data.daily.temperature_2m_min[5]
  }${data.daily.temperature_2m_max[5]}°C
        </div>  <!-- temp -->
      </div>
      <div class="weather__weak-day">
        <div class="weather__weak-day-text text-title">${
          readyWeakdays[4]
        }</div>  <!-- day -->
        <img src="icons/dailyIcons/${
          datacodes[data.daily.weathercode[6]]
        }.png" alt="" class="weather__weak-day-img">  <!-- img -->
        <div class="weather__weak-day-temp text-small">
          Max temp: ${data.daily.temperature_2m_max[6]}°C, min temp: ${
    data.daily.temperature_2m_min[6]
  }${data.daily.temperature_2m_max[6]}°C
        </div>  <!-- temp -->
      </div>
      <div class="weather__weak-day">
        <div class="weather__weak-day-text text-title">${
          readyWeakdays[5]
        }</div>  <!-- day -->
        <img src="icons/dailyIcons/${
          datacodes[data.daily.weathercode[7]]
        }.png" alt="" class="weather__weak-day-img">  <!-- img -->
        <div class="weather__weak-day-temp text-small">
          Max temp: ${data.daily.temperature_2m_max[7]}°C, min temp: ${
    data.daily.temperature_2m_min[7]
  }${data.daily.temperature_2m_max[7]}°C
        </div>  <!-- temp -->
      </div>
      </div>
    </div>
`;
  weather.insertAdjacentHTML("afterbegin", html);
}

btn.addEventListener("click", getWheater);
