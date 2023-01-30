(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))l(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();const g=document.querySelector(".question"),p=document.querySelector(".weather"),$=document.querySelector(".question__btn"),_=document.querySelector(".error-geo"),f=new Date,a={0:0,1:1,2:2,3:3,45:3,48:3,51:6,53:6,55:6,61:6,63:6,65:6,66:6,67:6,71:7,73:7,75:7,77:7,80:6,81:6,82:6,85:7,86:7,95:9,96:9,99:9},k=["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],s=[],u=f.getDay();console.log(u);console.log(u);for(let e=u+1;e<u+7;e++)s.push(k[e%7]);console.log(s);function m(e){if(e<=30)return"С";if(e<=60)return"СВ";if(e<=120)return"В";if(e<=150)return"ВЮ";if(e<=210)return"Ю";if(e<=240)return"ЮЗ";if(e<=300)return"З";if(e<=330)return"ЗС";if(e<=360)return"С"}function n(e){return e==24?0:e}const b=function(){return new Promise(function(e,r){navigator.geolocation.getCurrentPosition(e,r)})};async function S(){const e=new Date,r=new Date(Date.now()+6048e5),t=r.getFullYear(),l=(r.getMonth()+1).toString().padStart(2,"0"),i=r.getDate().toString().padStart(2,"0"),o=e.getFullYear(),d=(e.getMonth()+1).toString().padStart(2,"0"),w=e.getDate().toString().padStart(2,"0");try{const c=await b();g.classList.add("inactive");const{latitude:y,longitude:v}=c.coords,h=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${Number(y).toFixed(2)}&longitude=${Number(v).toFixed(2)}&hourly=temperature_2m,relativehumidity_2m,precipitation,visibility,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant&current_weather=true&windspeed_unit=ms&timeformat=unixtime&timezone=auto&start_date=${o}-${d}-${w}&end_date=${t}-${l}-${i}`);if(p.classList.add("active"),!h.ok)throw new Error("Ошибка получения погоды!");const x=await h.json();D(x)}catch(c){c.code==1&&(console.log(1),_.style.display="block",setTimeout(function(){_.style.display="none"},3e3))}}console.log(new Date(1674914400*1e3));function D(e){const r=new Date,t=r.getHours();r.getDay();const i=`      
    <div class="weather__main">
      <h1 class="weather__title">Прогноз погоды на <span class="time">${new Intl.DateTimeFormat(navigator.language,{hour12:!1,hour:"2-digit",minute:"numeric",day:"2-digit",month:"long",year:"numeric"}).format(r)}</span></h1>
      <div class="weather__timezone">Временная зона: ${e.timezone}/${e.timezone_abbreviation}, Высота: ${e.elevation}</div>
    </div>
    <div class="weather__current">
    <img src="icons/dailyIcons/${a[e.daily.weathercode[1]]}.png" alt="" class="weather__current-left-img">  <!-- img -->
        <div class="weather__current-left">
          <div class="weather__current-left-temp text">${e.current_weather.temperature}${e.hourly_units.temperature_2m}</div  ><!-- temp -->
          <div class="weather__current-left-wind text">${e.current_weather.windspeed}${e.hourly_units.windspeed_10m}</div  ><!-- wind & direction & speed -->
        </div>
        <div class="weather__current-right">
          <div class="weather__current-right-precipitations text">Осадки: ${e.hourly.relativehumidity_2m[0]}${e.hourly_units.precipitation}</div>  <!-- precipitations -->
          <div class="weather__current-right-visibility text">Видимость: ${e.hourly.visibility[0]}m</div>  <!-- visibility -->
          <div class="weather__current-right-humidity text">Влажность: ${e.hourly.relativehumidity_2m[0]}%</div>  <!-- humidity -->
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
          <div class="weather__next-hour-text text-title">${(t+1>24?n(t+1-24):n(t+1)).toString().padStart(2,"0")}:00</div>  <!-- hour -->
          <div class="weather__next-hour-temp text-2">${e.hourly.temperature_2m[2]}${e.hourly_units.temperature_2m}</div>  <!-- temp  -->
          <div class="weather__next-hour-prec text-2">${e.hourly.precipitation[2]}mm, ${e.hourly.relativehumidity_2m[2]}%</div>  <!-- precipitation & humidity -->
          <div class="weather__next-hour-wind text-2">${e.hourly.windspeed_10m[2]} ${e.hourly_units.windspeed_10m}   |   ${e.hourly.winddirection_10m[2]}${m(e.hourly.winddirection_10m[2])}<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="30px" height="30px" viewBox="0 0 24 24" style="transform: rotate(${e.hourly.winddirection_10m[2]}deg); position: absolute; top: -5px;" id="up-arrow" data-name="Flat Line" class="icon flat-line"><line id="primary" x1="12" y1="21" x2="12" y2="3" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/><polyline id="primary-2" data-name="primary" points="15 6 12 3 9 6" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/></svg></div>  <!-- wind speed & direction -->
        </div>
        <div class="weather__next-hour" data-hour="2">
          <div class="weather__next-hour-text text-title">${(t+2>24?n(t+2-24):n(t+2)).toString().padStart(2,"0")}:00</div>  <!-- hour -->
          <div class="weather__next-hour-temp text-2">${e.hourly.temperature_2m[3]}${e.hourly_units.temperature_2m}</div>  <!-- temp  -->
          <div class="weather__next-hour-prec text-2">${e.hourly.precipitation[3]}mm, ${e.hourly.relativehumidity_2m[3]}%</div>  <!-- precipitation & humidity -->
          <div class="weather__next-hour-wind text-2">${e.hourly.windspeed_10m[3]} ${e.hourly_units.windspeed_10m}   |   ${e.hourly.winddirection_10m[3]}${m(e.hourly.winddirection_10m[3])}<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="30px" height="30px" viewBox="0 0 24 24" style="transform: rotate(${e.hourly.winddirection_10m[3]}deg); position: absolute; top: -5px;" id="up-arrow" data-name="Flat Line" class="icon flat-line"><line id="primary" x1="12" y1="21" x2="12" y2="3" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/><polyline id="primary-2" data-name="primary" points="15 6 12 3 9 6" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/></svg></div>  <!-- wind speed & direction -->
        </div>
        <div class="weather__next-hour" data-hour="3">
          <div class="weather__next-hour-text text-title">${(t+3>24?n(t+3-24):n(t+3)).toString().padStart(2,"0")}:00</div>  <!-- hour -->
          <div class="weather__next-hour-temp text-2">${e.hourly.temperature_2m[4]}${e.hourly_units.temperature_2m}</div>  <!-- temp  -->
          <div class="weather__next-hour-prec text-2">${e.hourly.precipitation[4]}mm, ${e.hourly.relativehumidity_2m[4]}%</div>  <!-- precipitation & humidity -->
          <div class="weather__next-hour-wind text-2">${e.hourly.windspeed_10m[4]} ${e.hourly_units.windspeed_10m}   |   ${e.hourly.winddirection_10m[4]}${m(e.hourly.winddirection_10m[4])}<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="30px" height="30px" viewBox="0 0 24 24" style="transform: rotate(${e.hourly.winddirection_10m[4]}deg); position: absolute; top: -5px;" id="up-arrow" data-name="Flat Line" class="icon flat-line"><line id="primary" x1="12" y1="21" x2="12" y2="3" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/><polyline id="primary-2" data-name="primary" points="15 6 12 3 9 6" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/></svg></div>  <!-- wind speed & direction -->
        </div>
        <div class="weather__next-hour" data-hour="4">
          <div class="weather__next-hour-text text-title">${(t+4>24?n(t+4-24):n(t+4)).toString().padStart(2,"0")}:00</div>  <!-- hour -->
          <div class="weather__next-hour-temp text-2">${e.hourly.temperature_2m[5]}${e.hourly_units.temperature_2m}</div>  <!-- temp  -->
          <div class="weather__next-hour-prec text-2">${e.hourly.precipitation[5]}mm, ${e.hourly.relativehumidity_2m[5]}%</div>  <!-- precipitation & humidity -->
          <div class="weather__next-hour-wind text-2">${e.hourly.windspeed_10m[5]} ${e.hourly_units.windspeed_10m}   |   ${e.hourly.winddirection_10m[5]}${m(e.hourly.winddirection_10m[5])}<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="30px" height="30px" viewBox="0 0 24 24" style="transform: rotate(${e.hourly.winddirection_10m[5]}deg); position: absolute; top: -5px;" id="up-arrow" data-name="Flat Line" class="icon flat-line"><line id="primary" x1="12" y1="21" x2="12" y2="3" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/><polyline id="primary-2" data-name="primary" points="15 6 12 3 9 6" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/></svg></div>  <!-- wind speed & direction -->
        </div>
        <div class="weather__next-hour" data-hour="5">
          <div class="weather__next-hour-text text-title">${(t+5>24?n(t+5-24):n(t+5)).toString().padStart(2,"0")}:00</div>  <!-- hour -->
          <div class="weather__next-hour-temp text-2">${e.hourly.temperature_2m[6]}${e.hourly_units.temperature_2m}</div>  <!-- temp  -->
          <div class="weather__next-hour-prec text-2">${e.hourly.precipitation[6]}mm, ${e.hourly.relativehumidity_2m[6]}%</div>  <!-- precipitation & humidity -->
          <div class="weather__next-hour-wind text-2">${e.hourly.windspeed_10m[6]} ${e.hourly_units.windspeed_10m}   |   ${e.hourly.winddirection_10m[6]}${m(e.hourly.winddirection_10m[6])}<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="30px" height="30px" viewBox="0 0 24 24" style="transform: rotate(${e.hourly.winddirection_10m[6]}deg); position: absolute; top: -5px;" id="up-arrow" data-name="Flat Line" class="icon flat-line"><line id="primary" x1="12" y1="21" x2="12" y2="3" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/><polyline id="primary-2" data-name="primary" points="15 6 12 3 9 6" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/></svg></div>  <!-- wind speed & direction -->
        </div>
      </div>
    </div>
    <div class="weather__week">
      <h3 class="weather__subtitle">На неделю</h3>
      <div class="weather__week-wrapper">
      <div class="weather__weak-day">
        <div class="weather__weak-day-text text-title">${s[0]}</div>  <!-- day -->
        <img src="icons/dailyIcons/${a[e.daily.weathercode[2]]}.png" alt="" class="weather__weak-day-img">  <!-- img -->
        <div class="weather__weak-day-temp text-small">
          Max temp: ${e.daily.temperature_2m_max[2]}°C, min temp: ${e.daily.temperature_2m_min[2]}${e.daily.temperature_2m_max[2]}°C
        </div>  <!-- temp -->
      </div>
      <div class="weather__weak-day">
        <div class="weather__weak-day-text text-title">${s[1]}</div>  <!-- day -->
        <img src="icons/dailyIcons/${a[e.daily.weathercode[3]]}.png" alt="" class="weather__weak-day-img">  <!-- img -->
        <div class="weather__weak-day-temp text-small">
          Max temp: ${e.daily.temperature_2m_max[3]}°C, min temp: ${e.daily.temperature_2m_min[3]}${e.daily.temperature_2m_max[3]}°C
        </div>  <!-- temp -->
      </div>
      <div class="weather__weak-day">
        <div class="weather__weak-day-text text-title">${s[2]}</div>  <!-- day -->
        <img src="icons/dailyIcons/${a[e.daily.weathercode[4]]}.png" alt="" class="weather__weak-day-img">  <!-- img -->
        <div class="weather__weak-day-temp text-small">
          Max temp: ${e.daily.temperature_2m_max[4]}°C, min temp: ${e.daily.temperature_2m_min[4]}${e.daily.temperature_2m_max[4]}°C
        </div>  <!-- temp -->
      </div>
      <div class="weather__weak-day">
        <div class="weather__weak-day-text text-title">${s[3]}</div>  <!-- day -->
        <img src="icons/dailyIcons/${a[e.daily.weathercode[5]]}.png" alt="" class="weather__weak-day-img">  <!-- img -->
        <div class="weather__weak-day-temp text-small">
          Max temp: ${e.daily.temperature_2m_max[5]}°C, min temp: ${e.daily.temperature_2m_min[5]}${e.daily.temperature_2m_max[5]}°C
        </div>  <!-- temp -->
      </div>
      <div class="weather__weak-day">
        <div class="weather__weak-day-text text-title">${s[4]}</div>  <!-- day -->
        <img src="icons/dailyIcons/${a[e.daily.weathercode[6]]}.png" alt="" class="weather__weak-day-img">  <!-- img -->
        <div class="weather__weak-day-temp text-small">
          Max temp: ${e.daily.temperature_2m_max[6]}°C, min temp: ${e.daily.temperature_2m_min[6]}${e.daily.temperature_2m_max[6]}°C
        </div>  <!-- temp -->
      </div>
      <div class="weather__weak-day">
        <div class="weather__weak-day-text text-title">${s[5]}</div>  <!-- day -->
        <img src="icons/dailyIcons/${a[e.daily.weathercode[7]]}.png" alt="" class="weather__weak-day-img">  <!-- img -->
        <div class="weather__weak-day-temp text-small">
          Max temp: ${e.daily.temperature_2m_max[7]}°C, min temp: ${e.daily.temperature_2m_min[7]}${e.daily.temperature_2m_max[7]}°C
        </div>  <!-- temp -->
      </div>
      </div>
    </div>
`;p.insertAdjacentHTML("afterbegin",i)}$.addEventListener("click",S);
