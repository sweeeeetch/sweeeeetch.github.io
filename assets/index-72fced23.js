(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();const x=document.querySelector(".question"),_=document.querySelector(".weather"),g=document.querySelector(".question__btn"),h=document.querySelector(".error-geo"),$=new Date,s={0:0,1:1,2:2,3:3,45:3,48:3,51:6,53:6,55:6,61:6,63:6,65:6,66:6,67:6,71:7,73:7,75:7,77:7,80:6,81:6,82:6,85:7,86:7,95:9,96:9,99:9},f=["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],n=[],m=$.getDay();console.log(m);console.log(m);for(let e=m+1;e<m+7;e++)n.push(f[e%7]);console.log(n);function d(e){if(e<=30)return"С";if(e<=60)return"СВ";if(e<=120)return"В";if(e<=150)return"ВЮ";if(e<=210)return"Ю";if(e<=240)return"ЮЗ";if(e<=300)return"З";if(e<=330)return"ЗС";if(e<=360)return"С"}const k=function(){return new Promise(function(e,r){navigator.geolocation.getCurrentPosition(e,r)})};async function b(){const e=new Date,r=new Date(Date.now()+6048e5),t=r.getFullYear(),a=(r.getMonth()+1).toString().padStart(2,"0"),i=r.getDate().toString().padStart(2,"0"),o=e.getFullYear(),l=(e.getMonth()+1).toString().padStart(2,"0"),p=e.getDate().toString().padStart(2,"0");try{const u=await k();x.classList.add("inactive");const{latitude:w,longitude:y}=u.coords,c=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${Number(w).toFixed(2)}&longitude=${Number(y).toFixed(2)}&hourly=temperature_2m,relativehumidity_2m,precipitation,visibility,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant&current_weather=true&windspeed_unit=ms&timeformat=unixtime&timezone=auto&start_date=${o}-${l}-${p}&end_date=${t}-${a}-${i}`);if(_.classList.add("active"),!c.ok)throw new Error("Ошибка получения погоды!");const v=await c.json();S(v)}catch(u){u.code==1&&(console.log(1),h.style.display="block",setTimeout(function(){h.style.display="none"},3e3))}}console.log(new Date(1674914400*1e3));function S(e){const r=new Date,t=r.getHours();r.getDay();const i=`      
    <div class="weather__main">
      <h1 class="weather__title">Прогноз погоды на <span class="time">${new Intl.DateTimeFormat(navigator.language,{hour12:!1,hour:"2-digit",minute:"numeric",day:"2-digit",month:"long",year:"numeric"}).format(r)}</span></h1>
      <div class="weather__timezone">Временная зона: ${e.timezone}/${e.timezone_abbreviation}, Высота: ${e.elevation}</div>
    </div>
    <div class="weather__current">
    <img src="icons/dailyIcons/${s[e.daily.weathercode[1]]}.png" alt="" class="weather__current-left-img">  <!-- img -->
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
          <div class="weather__next-hour-text text-title">${(t+1>24?t+1-24:t+1).toString().padStart(2,"0")}:00</div>  <!-- hour -->
          <div class="weather__next-hour-temp text-2">${e.hourly.temperature_2m[2]}${e.hourly_units.temperature_2m}</div>  <!-- temp  -->
          <div class="weather__next-hour-prec text-2">${e.hourly.precipitation[2]}mm, ${e.hourly.relativehumidity_2m[2]}%</div>  <!-- precipitation & humidity -->
          <div class="weather__next-hour-wind text-2">${e.hourly.windspeed_10m[2]} ${e.hourly_units.windspeed_10m}   |   ${e.hourly.winddirection_10m[2]}${d(e.hourly.winddirection_10m[2])}<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="30px" height="30px" viewBox="0 0 24 24" style="transform: rotate(${e.hourly.winddirection_10m[2]}deg); position: absolute; top: -5px;" id="up-arrow" data-name="Flat Line" class="icon flat-line"><line id="primary" x1="12" y1="21" x2="12" y2="3" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/><polyline id="primary-2" data-name="primary" points="15 6 12 3 9 6" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/></svg></div>  <!-- wind speed & direction -->
        </div>
        <div class="weather__next-hour" data-hour="2">
          <div class="weather__next-hour-text text-title">${(t+2>24?t+2-24:t+2).toString().padStart(2,"0")}:00</div>  <!-- hour -->
          <div class="weather__next-hour-temp text-2">${e.hourly.temperature_2m[3]}${e.hourly_units.temperature_2m}</div>  <!-- temp  -->
          <div class="weather__next-hour-prec text-2">${e.hourly.precipitation[3]}mm, ${e.hourly.relativehumidity_2m[3]}%</div>  <!-- precipitation & humidity -->
          <div class="weather__next-hour-wind text-2">${e.hourly.windspeed_10m[3]} ${e.hourly_units.windspeed_10m}   |   ${e.hourly.winddirection_10m[3]}${d(e.hourly.winddirection_10m[3])}<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="30px" height="30px" viewBox="0 0 24 24" style="transform: rotate(${e.hourly.winddirection_10m[3]}deg); position: absolute; top: -5px;" id="up-arrow" data-name="Flat Line" class="icon flat-line"><line id="primary" x1="12" y1="21" x2="12" y2="3" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/><polyline id="primary-2" data-name="primary" points="15 6 12 3 9 6" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/></svg></div>  <!-- wind speed & direction -->
        </div>
        <div class="weather__next-hour" data-hour="3">
          <div class="weather__next-hour-text text-title">${(t+3>24?t+3-24:t+3).toString().padStart(2,"0")}:00</div>  <!-- hour -->
          <div class="weather__next-hour-temp text-2">${e.hourly.temperature_2m[4]}${e.hourly_units.temperature_2m}</div>  <!-- temp  -->
          <div class="weather__next-hour-prec text-2">${e.hourly.precipitation[4]}mm, ${e.hourly.relativehumidity_2m[4]}%</div>  <!-- precipitation & humidity -->
          <div class="weather__next-hour-wind text-2">${e.hourly.windspeed_10m[4]} ${e.hourly_units.windspeed_10m}   |   ${e.hourly.winddirection_10m[4]}${d(e.hourly.winddirection_10m[4])}<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="30px" height="30px" viewBox="0 0 24 24" style="transform: rotate(${e.hourly.winddirection_10m[4]}deg); position: absolute; top: -5px;" id="up-arrow" data-name="Flat Line" class="icon flat-line"><line id="primary" x1="12" y1="21" x2="12" y2="3" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/><polyline id="primary-2" data-name="primary" points="15 6 12 3 9 6" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/></svg></div>  <!-- wind speed & direction -->
        </div>
        <div class="weather__next-hour" data-hour="4">
          <div class="weather__next-hour-text text-title">${(t+4>24?t+4-24:t+4).toString().padStart(2,"0")}:00</div>  <!-- hour -->
          <div class="weather__next-hour-temp text-2">${e.hourly.temperature_2m[5]}${e.hourly_units.temperature_2m}</div>  <!-- temp  -->
          <div class="weather__next-hour-prec text-2">${e.hourly.precipitation[5]}mm, ${e.hourly.relativehumidity_2m[5]}%</div>  <!-- precipitation & humidity -->
          <div class="weather__next-hour-wind text-2">${e.hourly.windspeed_10m[5]} ${e.hourly_units.windspeed_10m}   |   ${e.hourly.winddirection_10m[5]}${d(e.hourly.winddirection_10m[5])}<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="30px" height="30px" viewBox="0 0 24 24" style="transform: rotate(${e.hourly.winddirection_10m[5]}deg); position: absolute; top: -5px;" id="up-arrow" data-name="Flat Line" class="icon flat-line"><line id="primary" x1="12" y1="21" x2="12" y2="3" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/><polyline id="primary-2" data-name="primary" points="15 6 12 3 9 6" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/></svg></div>  <!-- wind speed & direction -->
        </div>
        <div class="weather__next-hour" data-hour="5">
          <div class="weather__next-hour-text text-title">${(t+5>24?t+5-24:t+5).toString().padStart(2,"0")}:00</div>  <!-- hour -->
          <div class="weather__next-hour-temp text-2">${e.hourly.temperature_2m[6]}${e.hourly_units.temperature_2m}</div>  <!-- temp  -->
          <div class="weather__next-hour-prec text-2">${e.hourly.precipitation[6]}mm, ${e.hourly.relativehumidity_2m[6]}%</div>  <!-- precipitation & humidity -->
          <div class="weather__next-hour-wind text-2">${e.hourly.windspeed_10m[6]} ${e.hourly_units.windspeed_10m}   |   ${e.hourly.winddirection_10m[6]}${d(e.hourly.winddirection_10m[6])}<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="30px" height="30px" viewBox="0 0 24 24" style="transform: rotate(${e.hourly.winddirection_10m[6]}deg); position: absolute; top: -5px;" id="up-arrow" data-name="Flat Line" class="icon flat-line"><line id="primary" x1="12" y1="21" x2="12" y2="3" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/><polyline id="primary-2" data-name="primary" points="15 6 12 3 9 6" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/></svg></div>  <!-- wind speed & direction -->
        </div>
      </div>
    </div>
    <div class="weather__week">
      <h3 class="weather__subtitle">На неделю</h3>
      <div class="weather__week-wrapper">
      <div class="weather__weak-day">
        <div class="weather__weak-day-text text-title">${n[0]}</div>  <!-- day -->
        <img src="icons/dailyIcons/${s[e.daily.weathercode[2]]}.png" alt="" class="weather__weak-day-img">  <!-- img -->
        <div class="weather__weak-day-temp text-small">
          Max temp: ${e.daily.temperature_2m_max[2]}°C, min temp: ${e.daily.temperature_2m_min[2]}${e.daily.temperature_2m_max[2]}°C
        </div>  <!-- temp -->
      </div>
      <div class="weather__weak-day">
        <div class="weather__weak-day-text text-title">${n[1]}</div>  <!-- day -->
        <img src="icons/dailyIcons/${s[e.daily.weathercode[3]]}.png" alt="" class="weather__weak-day-img">  <!-- img -->
        <div class="weather__weak-day-temp text-small">
          Max temp: ${e.daily.temperature_2m_max[3]}°C, min temp: ${e.daily.temperature_2m_min[3]}${e.daily.temperature_2m_max[3]}°C
        </div>  <!-- temp -->
      </div>
      <div class="weather__weak-day">
        <div class="weather__weak-day-text text-title">${n[2]}</div>  <!-- day -->
        <img src="icons/dailyIcons/${s[e.daily.weathercode[4]]}.png" alt="" class="weather__weak-day-img">  <!-- img -->
        <div class="weather__weak-day-temp text-small">
          Max temp: ${e.daily.temperature_2m_max[4]}°C, min temp: ${e.daily.temperature_2m_min[4]}${e.daily.temperature_2m_max[4]}°C
        </div>  <!-- temp -->
      </div>
      <div class="weather__weak-day">
        <div class="weather__weak-day-text text-title">${n[3]}</div>  <!-- day -->
        <img src="icons/dailyIcons/${s[e.daily.weathercode[5]]}.png" alt="" class="weather__weak-day-img">  <!-- img -->
        <div class="weather__weak-day-temp text-small">
          Max temp: ${e.daily.temperature_2m_max[5]}°C, min temp: ${e.daily.temperature_2m_min[5]}${e.daily.temperature_2m_max[5]}°C
        </div>  <!-- temp -->
      </div>
      <div class="weather__weak-day">
        <div class="weather__weak-day-text text-title">${n[4]}</div>  <!-- day -->
        <img src="icons/dailyIcons/${s[e.daily.weathercode[6]]}.png" alt="" class="weather__weak-day-img">  <!-- img -->
        <div class="weather__weak-day-temp text-small">
          Max temp: ${e.daily.temperature_2m_max[6]}°C, min temp: ${e.daily.temperature_2m_min[6]}${e.daily.temperature_2m_max[6]}°C
        </div>  <!-- temp -->
      </div>
      <div class="weather__weak-day">
        <div class="weather__weak-day-text text-title">${n[5]}</div>  <!-- day -->
        <img src="icons/dailyIcons/${s[e.daily.weathercode[7]]}.png" alt="" class="weather__weak-day-img">  <!-- img -->
        <div class="weather__weak-day-temp text-small">
          Max temp: ${e.daily.temperature_2m_max[7]}°C, min temp: ${e.daily.temperature_2m_min[7]}${e.daily.temperature_2m_max[7]}°C
        </div>  <!-- temp -->
      </div>
      </div>
    </div>
`;_.insertAdjacentHTML("afterbegin",i)}g.addEventListener("click",b);
