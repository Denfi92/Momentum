/* Время и календарь */
const time = document.querySelector('.time');
const date = document.querySelector('.date');
let isEn = true;
const dateLocal = new Date();
const currentTime = dateLocal.toLocaleTimeString();
const options = {weekday: "long", month: 'long', day: 'numeric', timeZone: 'UTC'};
let currentDate = dateLocal.toLocaleString('en-US', options);
let hours = dateLocal.getHours();
date.textContent = currentDate;
const greetingTranslation = {
  ru: ['Доброе утро', 'Добрый день', 'Добрый вечер', 'Доброй ночи'],
  en: ['Good morning', 'Good afternoon', 'Good evening', 'Good night']
};
let greeting = greetingTranslation.en;
let greetText = '';
const greet = document.querySelector('.greeting');


function showTime() {
  const dateLocal = new Date();
  const currentTime = dateLocal.toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  getTimeOut();
  setTimeout(showTime, 1000);
}
showTime();

function showDate() {
  if (!isEn) {
    const dateLocal = new Date();
    currentDate = dateLocal.toLocaleDateString('ru-Ru', options);
    date.textContent = currentDate;
  } else {
    const dateLocal = new Date();
    currentDate = dateLocal.toLocaleDateString('en-US', options);
    date.textContent = currentDate;
  }
}

/* Приветствие */


function getTimeOfDay() {
  if (hours >= 6 && hours < 12) hours = 'morning';
  if (hours >= 12 && hours < 18) hours = 'afternoon';
  if (hours >= 18 && hours < 23) hours = 'evening';
  if (hours >= 23 || hours < 6 ) hours = 'night';
}
getTimeOfDay();





function langChange() {
  if (!isEn) {
    greeting = greetingTranslation.ru;
  } else {
    greeting = greetingTranslation.en
  }
}
langChange();


function getTimeOut() {
  let date1 = new Date();
  let hours = date1.getHours();
  langChange();
  if (hours >= 6 && hours < 12) greetText = greeting[0];
  if (hours >= 12 && hours < 18) greetText = greeting[1];
  if (hours >= 18 && hours < 23) greetText = greeting[2];
  if (hours >= 23 || hours < 6 ) greetText = greeting[3];
  greet.textContent = greetText;
}
getTimeOut();

function setLocalStorage() {
  let name = document.querySelector('.name');
  let weather = document.querySelector('.city');
  localStorage.setItem('city', weather.value);
  localStorage.setItem('name', name.value);
  localStorage.setItem('isEn', JSON.stringify(isEn));
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  let name = document.querySelector('.name');
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
  let weatherCity = document.querySelector('.city');
  if (localStorage.getItem('city')) {
    weatherCity.value = localStorage.getItem('city');
  }
  if (localStorage.getItem('isEn', isEn)) {
    isEn = JSON.parse(localStorage.getItem('isEn'));
  }
  if (localStorage.getItem('time') == 'close') {
    time.classList.toggle('close');
  }
  if (localStorage.getItem('date') == 'close') {
    date.classList.toggle('close');
  }
  if (localStorage.getItem('greetingContainer') == 'close') {
    greetingContainer.classList.toggle('close');
  }
  if (localStorage.getItem('weather') == 'close') {
    weather.classList.toggle('close');
  }
  if (localStorage.getItem('player') == 'close') {
    player.classList.toggle('close');
  }
  if (localStorage.getItem('quotes') == 'close') {
    quotes.classList.toggle('close');
  }
  if (localStorage.getItem('changeQuotes') == 'close') {
    changeQuotes.classList.toggle('close');
  }
  if (localStorage.getItem('playListHide') == 'close') {
    playList1.classList.toggle('close');
  }
}
window.addEventListener('load', getLocalStorage);
window.addEventListener('load', getWeather);
window.addEventListener('load', getQuotes)

/* Бекграунд */

const body = document.querySelector('body');

let backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/";

let randomNum;
function getRandomNum(min, max) {
  min = 1;
  max = 20;
  randomNum = (Math.floor(Math.random() * (max - min + 1)) + min);
  if (randomNum < 10) {
    return randomNum = '0' + randomNum;
  }
  return +randomNum;
}
getRandomNum();
  
function setBg() {
  getRandomNum();
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/` + hours + '/' + randomNum + ".jpg";
  img.onload = () => {
    body.style.backgroundImage = backgroundImage + hours + '/' + randomNum + '.jpg';
  }
}
setBg();

/*async function getLinkToImage() {
  const url = 'https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=XPQtj2aBLikvIPjYKdTFlNzMRXBPVBnWQTScYcXfvgY';
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image();
  img.src = `https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=XPQtj2aBLikvIPjYKdTFlNzMRXBPVBnWQTScYcXfvgY`;
  img.onload = () => {
    body.style.backgroundImage = `${data.urls.regular}`;
  }
  backgroundImage = "url('https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=XPQtj2aBLikvIPjYKdTFlNzMRXBPVBnWQTScYcXfvgY')";
  body.style.backgroundImage = `${data.urls.regular}`;
  console.log(body.style.backgroundImage)
  console.log(data.urls.regular)
}
getLinkToImage();*/

/* Слайдер */

document.querySelector('.slide-next').addEventListener('click', getSlideNext) 
document.querySelector('.slide-prev').addEventListener('click', getSlidePrev)

function getSlideNext() {
  randomNum++;
  if(randomNum < 10 ) {
    randomNum = '0' + randomNum;
  }randomNum;
  if(randomNum == 21) {
    randomNum = "0" + 1;
  }
  body.style.backgroundImage = backgroundImage + hours + '/' + randomNum + '.jpg';
}


function getSlidePrev() {
 randomNum--;
 if(randomNum < 10 ) {
  randomNum = '0' + randomNum;
}randomNum;
if(randomNum == '00') {
  randomNum = 20;
}
 body.style.backgroundImage = backgroundImage + hours + '/' + randomNum + '.jpg';
}

/* Погода */

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const inputCity = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');

async function getWeather() {
  weatherError.textContent = '';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&lang=en&appid=b0cc2e3673bbe7bd786a938de77d3727&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if(isEn) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&lang=en&appid=b0cc2e3673bbe7bd786a938de77d3727&units=metric`;
   const res = await fetch(url);
    const data = await res.json();
    if (data.cod >= 400 && data.cod < 600) {
    return weatherIcon.className = '',
    temperature.textContent = ``,
    weatherDescription.textContent = '',
    wind.textContent = '',
    humidity.textContent = '',
    weatherError.textContent = 'Error! Invalid name city';
   }
   return weatherIcon.className = 'weather-icon owf',
   weatherIcon.classList.add(`owf-${data.weather[0].id}`),
   temperature.textContent = `${data.main.temp.toFixed(0)}°C`,
   weatherDescription.textContent = data.weather[0].description,
   wind.textContent = 'Wind speed: ' + data.wind.speed.toFixed(0) + ' m/s',
   humidity.textContent = 'Humidity: ' + data.main.humidity + ' %',
   weatherError.textContent = '';
  } else {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&lang=ru&appid=b0cc2e3673bbe7bd786a938de77d3727&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod >= 400 && data.cod < 600) {
      return weatherIcon.className = '',
      temperature.textContent = ``,
      weatherDescription.textContent = '',
      wind.textContent = '',
      humidity.textContent = '',
      weatherError.textContent = 'Ошибка! Неправильный город';
     }
     return weatherIcon.className = 'weather-icon owf',
     weatherIcon.classList.add(`owf-${data.weather[0].id}`),
     temperature.textContent = `${data.main.temp.toFixed(0)}°C`,
     weatherDescription.textContent = data.weather[0].description,
     wind.textContent = 'Скорость ветра: ' + data.wind.speed.toFixed(0) + ' м/с',
     humidity.textContent = 'Влажность: ' + data.main.humidity + ' %',
     weatherError.textContent = '';
  }
}
getWeather();

inputCity.addEventListener('change', () => getWeather(inputCity.value));

/* Цитаты */

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const change = document.querySelector('.change-quote');
let quoteNum = 0;
change.addEventListener('click', changeQuote)

function getRandomQuote(min, max) {
  min = 0;
  max = 9;
  quoteNum = (Math.floor(Math.random() * (max - min + 1)) + min);
}

function changeQuote() {
  quoteNum++;
  if (quoteNum === 10) {
    quoteNum = 0;
  }
  Quotesnext();

  async function Quotesnext() {
    if (isEn) {
    const quotes = 'js/data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    quote.textContent = data[quoteNum].quote;
    author.textContent = data[quoteNum].author;
    } else {
    const quotes = 'js/dataru.json';
    const res = await fetch(quotes);
    const data = await res.json();
    quote.textContent = data[quoteNum].quote;
    author.textContent = data[quoteNum].author;
    }
  }
}

async function getQuotes() {
  if (isEn) {
  getRandomQuote(); 
  const quotes = 'js/data.json';
  const res = await fetch(quotes);
  const data = await res.json();
  quote.textContent = data[quoteNum].quote;
  author.textContent = data[quoteNum].author;
  } else {
    getRandomQuote(); 
  const quotes = 'js/dataru.json';
  const res = await fetch(quotes);
  const data = await res.json();
  quote.textContent = data[quoteNum].quote;
  author.textContent = data[quoteNum].author;
  }
}
getQuotes();

/* Аудиоплеер */
import playList from './playList.js';

const playBtn = document.querySelector('.play');

const prevBtn = document.querySelector('.play-prev');
const nextBtn = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');


playBtn.addEventListener('click', playAudio);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);

for (let i = 0; i < playList.length; i++) {
  const li = document.createElement('li');
  const but = document.createElement('button');
  li.classList.add('play-item');
  but.classList.add('play', 'playbtn', 'player-icon');
  li.textContent = playList[i].title;
  playListContainer.append(li);
  li.append(but);
}


const playItem = document.querySelectorAll('.play-item');

const audio = new Audio();
let isPlay = false;
let playNum = 0;

function playAudio() {
  audio.src = playList[playNum].src;
  if (!isPlay) {
    audio.play();
    isPlay = true;
    playBtn.classList.toggle('pause');
    playItem[playNum].classList.add('item-active');
    let song = document.querySelector('.song-name')
    song.textContent = `${playList[playNum].title}`;
    setInterval(updateProgressValue, 500);
  } else {
  audio.pause()
  isPlay = false;
  playBtn.classList.toggle('pause');
  playItem[playNum].classList.remove('item-active');
  }
}
audio.addEventListener('ended', function(){
  playNext();
});

const playBtn2 = document.querySelectorAll('.playbtn');
for (let i  = 0; i < playBtn2.length; i++) {
  playBtn2[i].addEventListener('click', playAudio);
}

function stopAudio() {
  if (isPlay) {
    audio.pause();
    isPlay = false;
  }
}
const progressBar = document.querySelector('#progress-bar');
progressBar.addEventListener('click', changeProgressBar);

function updateProgressValue() {
  progressBar.max = audio.duration;
  progressBar.value = audio.currentTime;
  document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(audio.currentTime)));
  if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
      document.querySelector('.durationTime').innerHTML = "0:00";
  } else {
      document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(audio.duration)));
  }
};


function changeProgressBar() {
  audio.currentTime = progressBar.value;
};


function formatTime(seconds) {
  let min = Math.floor((seconds / 60));
  let sec = Math.floor(seconds - (min * 60));
  if (sec < 10){ 
      sec  = `0${sec}`;
  };
  return `${min}:${sec}`;
};


/*звук*/

const volumeBar = document.getElementById('progress-volume');
volumeBar.addEventListener('click', changeVolumeBar)
const volumeBtn = document.querySelector('.volume-btn');

function changeVolumeBar() {
  if (audio.muted) {
    audio.muted = false;
  }
  audio.volume = volumeBar.value;

};

function volumeUp() {
  if (volumeBar.value < 1) {
		volumeBar.value = parseFloat(volumeBar.value) + 0.1;
	} else {
		return;
	}
	changeVolumeBar();
}

function volumeDown() {
	if (volumeBar.value > 0) {
		volumeBar.value = parseFloat(volumeBar.value) - 0.1;
	} else {
		return;
	}
	changeVolumeBar();
}

function offVolume() {
	audio.muted = !audio.muted;
	if (audio.muted) {
		volumeBtn.setAttribute('data-volume', volumeBtn.value);
		volumeBtn.value = 0;
    volumeBar.value = 0;
	} else {
		volumeBtn.value = volumeBtn.dataset.volume;
    volumeBar.value = volumeBtn.value;
	}
}
volumeBtn.addEventListener('click', offVolume);

function changeVolumeBtn() {
	if (audio.muted || audio.volume === 0) {
		volumeBtn.src = 'assets/svg/volume-muted.svg';
	} else {
		volumeBtn.src = 'assets/svg/volume.svg';
	}
  console.log(volumeBar.value)
}
audio.addEventListener('volumechange', changeVolumeBtn);






function playNext() {
  playItem[playNum].classList.remove('item-active');
  playNum++;
  if (playNum == 4) {
    playNum = 0;
  }
  audio.currentTime = 0;
  playBtn.classList.toggle('pause');
  stopAudio();
  playAudio();
}

function playPrev() {
  playItem[playNum].classList.remove('item-active');
  playNum--;
  if (playNum < 0) {
    playNum = 3;
  }
  audio.currentTime = 0;
  playBtn.classList.toggle('pause');
  stopAudio();
  playAudio();
}

/* Настройки */
const setup = document.querySelector('.cogwheel').addEventListener('click', showOptions);
const links = document.querySelector('.links').addEventListener('click', showLinks);
const newLink = document.querySelector('.new-link').addEventListener('click', addLink);
const popup = document.querySelector('.options');
const link = document.querySelector('.link');
const linksList = document.querySelector('.links-list');
const greetingContainer = document.querySelector('.greeting-container');
const changeQuotes = document.querySelector('.change-quote');
const quotes = document.querySelector('.quotes');
const weather = document.querySelector('.weather');
const player = document.querySelector('.player');
const playList1 = document.querySelector('.play-list')
const ru = document.querySelector('.ru').addEventListener('click', ruLang);
const en = document.querySelector('.en').addEventListener('click', enLang);
const timeHide = document.querySelector('.time-hide').addEventListener('click', tHide);
const dateHide = document.querySelector('.date-hide').addEventListener('click', dHide);
const greetHide = document.querySelector('.greet-hide').addEventListener('click', gHide);
const quoteHide = document.querySelector('.quote-hide').addEventListener('click', qHide);
const weatherHide = document.querySelector('.weather-hide').addEventListener('click', wHide);
const audioHide = document.querySelector('.audio-hide').addEventListener('click', aHide);
const playlistHide = document.querySelector('.playlist-hide').addEventListener('click', plHide);

function tHide() {
  time.classList.toggle('close');
  if (localStorage.getItem('time') == 'close') {
    localStorage.removeItem('time', 'close');
  } else {
    localStorage.setItem('time', 'close');
  }
}
function dHide() {
  date.classList.toggle('close');
  if (localStorage.getItem('date') == 'close') {
    localStorage.removeItem('date', 'close');
  } else {
    localStorage.setItem('date', 'close');
  }
}
function gHide() {
  greetingContainer.classList.toggle('close');
  if (localStorage.getItem('greetingContainer') == 'close') {
    localStorage.removeItem('greetingContainer', 'close');
  } else {
    localStorage.setItem('greetingContainer', 'close');
  }
}
function qHide() {
  changeQuotes.classList.toggle('close');
  quotes.classList.toggle('close');
  if (localStorage.getItem('changeQuotes') == 'close') {
    localStorage.removeItem('changeQuotes', 'close');
  } else {
    localStorage.setItem('changeQuotes', 'close');
  }
  if (localStorage.getItem('quotes') == 'close') {
    localStorage.removeItem('quotes', 'close');
  } else {
    localStorage.setItem('quotes', 'close');
  }
}
function wHide() {
  weather.classList.toggle('close');
  if (localStorage.getItem('weather') == 'close') {
    localStorage.removeItem('weather', 'close');
  } else {
    localStorage.setItem('weather', 'close');
  }
}
function aHide() {
  player.classList.toggle('close');
  if (localStorage.getItem('player') == 'close') {
    localStorage.removeItem('player', 'close');
  } else {
    localStorage.setItem('player', 'close');
  }
}
function plHide() {
  playList1.classList.toggle('close');
  if (localStorage.getItem('playList1') == 'close') {
    localStorage.removeItem('playList1', 'close');
  } else {
    localStorage.setItem('playList1', 'close');
  }
}

function ruLang() {
  isEn = false;
  showDate();
  showTime();
  getTimeOut();
  getTimeOfDay();
  langChange();
  getWeather();
  showTime();
  getQuotes();
}

function enLang() {
  isEn = true;
  showDate()
  showTime()
  getTimeOut();
  getTimeOfDay();
  langChange();
  getWeather();
  showTime();
  getQuotes();
}


function showOptions() {
  popup.classList.toggle('open');
}
function showLinks() {
  link.classList.toggle('open');
}
const inputLink = document.querySelector('.input-link')
inputLink.addEventListener('change', addLink1)
function addLink() {
  inputLink.classList.toggle('open');
}

function addLink1() {
    const li = document.createElement('li');
    const a = document.createElement('a');
    li.classList.add('links-list-item');
    a.textContent = inputLink.value;
    a.textContent.split('https://');
    a.href = inputLink.value;
    linksList.append(li);
    li.append(a);
}