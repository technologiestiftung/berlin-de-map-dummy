console.log("Test");

mapboxgl.accessToken =
      'pk.eyJ1IjoiYm5qbW5zYmwiLCJhIjoiY2luc3Qxajk4MDBsY3Zza2x1MWg1b2xzeCJ9.BK1MmHruCVZvMFnL_uTC1w';

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/light-v9', // stylesheet location
    center: [13.404954, 52.520008], // starting position [lng, lat]
    zoom: 12 // starting zoom
});


// document.addEventListener('DOMContentLoaded', function() {
//     const serverUrl = 'https://bnjmn.uber.space';
//     mapboxgl.accessToken =
//       'pk.eyJ1IjoiYm5qbW5zYmwiLCJhIjoiY2luc3Qxajk4MDBsY3Zza2x1MWg1b2xzeCJ9.BK1MmHruCVZvMFnL_uTC1w';
//     //+++ MAP
//     //+++ general setting for map appearance +++
//     const map = new mapboxgl.Map({
//       container: 'map',
//       style: 'mapbox://styles/mapbox/light-v9',
//       center: [13.404954, 52.520008],
//       zoom: 12,
//       minZoom: 6,
//       maxZoom: 18,
//       pitch: 45, //angle from plane view
//       trackResize: true,
//       maxBounds: bounds,
//     });

//   // Set bounds to Berlin
//   var bounds = [
//     [52.470896, 13.290829], // Southwest coordinates
//     [52.550666, 13.487605], // Northeast coordinates
//   ];

//   // initialize the map canvas to interact with later for routing
//   var canvas = map.getCanvasContainer();

//   // initalize a starting point for routing
//   var start = [52.52437, 13.41053];
  