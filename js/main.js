const $images = document.querySelector('.images');

function getImage(DMA) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=${DMA}&apikey=aeMvG0zyzdpO1jAkGyCZeGxxQK4vIfpe`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const response = xhr.response._embedded.events;
    for (let i = 0; i < response.length; i++) {
      const $imgWrapper = document.createElement('div');
      const $img = document.createElement('img');
      for (let j = 0; j < response[i].images.length; j++) {
        const currentImage = response[i].images[j];
        if (currentImage.ratio === '4_3') {
          $img.src = currentImage.url;
        }
      }

      $imgWrapper.appendChild($img);
      $images.appendChild($imgWrapper);
    }
  });
  xhr.send();
}

const dmaArray = [
  '324',
  '319',
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

// console.log('randomDMA', randomDMA);

getImage(randomDMA);
