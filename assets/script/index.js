
'use strict';






const overlay = document.querySelector('.overlay');
const loading = document.querySelector('.loading');

// Set the Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibmF0aGFuc2h1YWkiLCJhIjoiY2xnMTVqYnZwMWxoODNyb2FlN2IwMndrNiJ9.KbHK-oCLYDVl1ga01Vau_A';

const map = new mapboxgl.Map({
  container: 'map', // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: [0, 0], // starting position [lng, lat]
  pitch: 40,
  zoom: 16 // starting zoom
  });


let vh = window.innerHeight *0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  vh = window.innerHeight *0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

map.dragPan.disable();
map.keyboard.disable();
map.scrollZoom.disable();
map.doubleClickZoom.disable();
map.touchZoomRotate.disable();

const marker = new mapboxgl.Marker({
  color:'#3898ff'
});

function getLocation(position) {
  const { longitude, latitude } = position.coords;

  if(longitude && latitude) {
    map.setCenter([longitude, latitude]);
    marker.setLngLat([longitude, latitude]).addTo(map);
    setTimeout(() => { overlay.style.display = 'none'}, 500);
  }
}

function errorHandler(event) {
  loading.style.animationPlayState = 'paused';
  console.log(event.message);
}

const options = {
  enableHighAccuracy: true,
  maximumAge: 0
};

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(getLocation, errorHandler, options);
} else {
  console.log('Geolocation is not supported by this browser')
}