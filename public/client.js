'use strict';

const input = document.querySelector('input');
const form = document.querySelector('form');
const title = document.querySelector('#title');
const subtitle = document.querySelector('#subtitle');
const details = document.querySelector('#details');

function search(cityName, cb) {

  fetch(`/search?city=${ input.value }`).then(res => {
    return res.json();
  }).then(json => {
    cb(json);
  });

}

function kelvinToCelsius(temp) {

  return Math.round(temp - 273.15);

}

function parseWeatherConditions(conditionsArray) {

  return conditionsArray.map(condition => condition.main).join(', ');

}

function appendDetailToTable(table, detail) {

  const tr = document.createElement('tr');
  const th = document.createElement('th');
  const td = document.createElement('td');

  th.textContent = detail.label;
  td.textContent = detail.value;

  tr.appendChild(th);
  tr.appendChild(td);

  table.appendChild(tr);

}

function buildDetailsTable(table, city) {

  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  const detailsArray = [
    { label: 'Humidity (%)', value: city.main.humidity },
    { label: 'Wind Speed (metres/sec)', value: city.wind.speed },
    { label: 'Wind Direction (degrees)', value: city.wind.deg },
    { label: 'Cloud Coverage (%)', value: city.clouds.all },
  ];

  detailsArray.forEach(appendDetailToTable.bind(null, table));

}

function onSubmit(e) {

  e.preventDefault();

  search(input.value, json => {
    const city = json.list[0];
    const temp = kelvinToCelsius(city.main.temp);
    const conditions = parseWeatherConditions(city.weather);
    title.textContent = `${ temp }°C, ${ conditions }`;
    subtitle.textContent = `${ city.name }, ${ city.sys.country }`
    buildDetailsTable(details, city);
  });

}

form.addEventListener('submit', onSubmit);
