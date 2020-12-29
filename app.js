const url = 'https://restcountries.eu/rest/v2/all';

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let mySlides = [];

    for (i = 0; i < 3; i++) {
      let ran = Math.floor(Math.random() * data.length);

      mySlides.push(
        new Country(data[ran].flag, data[ran].name, data[ran].timezones[0])
      );
    }

    for (c of mySlides) {
      c.showImg();
      c.showName();
      c.showTime();
    }
  });

function Country(_img, _name, _timeZone) {
  this.name = _name;
  this.timeZone = _timeZone;
  this.img = _img;
}

Country.prototype.showName = function () {
  let main = document.querySelector('main');
  let section = document.querySelector('section');

  let contName = document.querySelector('h1');
  contName.innerText = this.name;

  main.appendChild(section);
};

Country.prototype.showImg = function () {
  let contImg = document.querySelector('img');
  contImg.src = this.img;
};

Country.prototype.showTime = function () {
  let countryTime = document.querySelector('h3');
  countryTime.innerText = this.timeZone;

  let timeInString = this.timeZone;

  let subTime = timeInString.substr(4, 2);

  let plusMinusSymbol = timeInString.substr(3, 1);

  let timeToNumber = parseInt(subTime);

  let showTime = new Date();

  if (plusMinusSymbol === '+') {
    countryTime.textContent = `${
      showTime.getUTCHours() + timeToNumber
    } : ${showTime.getUTCMinutes()}`;
  } else if (plusMinusSymbol === '-') {
    countryTime.textContent = `${
      showTime.getUTCHours() - timeToNumber
    } : ${showTime.getUTCMinutes()}`;
  } else {
    countryTime.textContent = `${showTime.getUTCHours()} : ${showTime.getUTCMinutes()}`;
  }
};
