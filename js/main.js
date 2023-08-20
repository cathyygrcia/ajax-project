const $images = document.querySelector('.images');
const $search = document.querySelector('.search');
const $genreButton = document.querySelector('.genre');
const $artistButton = document.querySelector('.artist');

function formatDate(inputDate) {
  const parts = inputDate.split('-');
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  return `${month}/${day}/${year}`;
}

function showSearchBar() {
  $search.classList.remove('hidden');
}

function getImage(DMA) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=${DMA}&apikey=aeMvG0zyzdpO1jAkGyCZeGxxQK4vIfpe`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $search.classList.add('hidden');
    const response = xhr.response._embedded.events;
    for (let i = 0; i < response.length; i++) {
      const $imgWrapper = document.createElement('div');
      const $img = document.createElement('img');

      const $artistName = document.createElement('p');
      $artistName.textContent = response[i].name;

      const $venue = document.createElement('p');
      $venue.textContent = response[i]._embedded.venues[0].name;

      const $date = document.createElement('p');
      const formattedDate = formatDate(response[i].dates.start.localDate);
      $date.textContent = `${formattedDate}`;

      for (let j = 0; j < response[i].images.length; j++) {
        const currentImage = response[i].images[j];
        if (currentImage.ratio === '4_3') {
          $img.src = currentImage.url;
        }
      }

      $imgWrapper.appendChild($img);
      $imgWrapper.appendChild($artistName);
      $imgWrapper.appendChild($venue);
      $imgWrapper.appendChild($date);
      $imgWrapper.classList.add('column-third');
      $images.appendChild($imgWrapper);

    }
  });
  xhr.send();
}

$genreButton.addEventListener('click', function (event) {
  showSearchBar();
  $artistButton.classList.remove('green');
  $genreButton.classList.add('green');
  $search.addEventListener('keydown', function (event) {

    if (event.key === 'Enter') {
      const xhr = new XMLHttpRequest();
      const searchValue = event.target.value;
      xhr.open('GET', `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${searchValue}&size=30&apikey=aeMvG0zyzdpO1jAkGyCZeGxxQK4vIfpe`);
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        const response = xhr.response._embedded.events;
        $images.innerHTML = '';

        for (let i = 0; i < response.length; i++) {
          const $imgWrapper = document.createElement('div');
          const $img = document.createElement('img');

          const $artistName = document.createElement('p');
          $artistName.textContent = response[i].name;

          const $venue = document.createElement('p');
          $venue.textContent = response[i]._embedded.venues[0].name;

          const $date = document.createElement('p');
          const formattedDate = formatDate(response[i].dates.start.localDate);
          $date.textContent = `${formattedDate}`; // Include 'Date: ' prefix

          for (let j = 0; j < response[i].images.length; j++) {
            const currentImage = response[i].images[j];
            if (currentImage.ratio === '4_3') {
              $img.src = currentImage.url;
            }
          }

          $imgWrapper.appendChild($img);
          $imgWrapper.appendChild($artistName);
          $imgWrapper.appendChild($venue);
          $imgWrapper.appendChild($date);
          $imgWrapper.classList.add('column-third');
          $images.appendChild($imgWrapper);

        }

      });
      xhr.send();
    }
  });
});

$artistButton.addEventListener('click', function (event) {
  showSearchBar();
  $genreButton.classList.remove('green');
  $artistButton.classList.add('green');
  $search.addEventListener('keydown', function (event) {

    if (event.key === 'Enter') {
      const xhr = new XMLHttpRequest();
      const searchValue = event.target.value;
      xhr.open('GET', `https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=${searchValue}&apikey=aeMvG0zyzdpO1jAkGyCZeGxxQK4vIfpe`);
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        const response = xhr.response._embedded.attractions;
        $images.innerHTML = '';

        for (let i = 0; i < response.length; i++) {
          const $imgWrapper = document.createElement('div');
          const $img = document.createElement('img');

          const $artistName = document.createElement('p');
          $artistName.textContent = response[i].name;

          for (let j = 0; j < response[i].images.length; j++) {
            const currentImage = response[i].images[j];
            if (currentImage.ratio === '4_3') {
              $img.src = currentImage.url;
            }
          }

          $imgWrapper.appendChild($img);
          $imgWrapper.appendChild($artistName);
          $imgWrapper.classList.add('column-third');
          $images.appendChild($imgWrapper);

        }

      });
      xhr.send();
    }
  });
});

const dmaArray = [
  '324',
  '222',
  '228',
  '300',
  '264',
  '345',
  '354',
  '368',
  '372',
  '378',
  '380',
  '381',
  '382',
  '383',
  '385'

];

const randomIndex = Math.floor(Math.random() * dmaArray.length);
const randomDMA = dmaArray[randomIndex];
getImage(randomDMA);
