/*global mapboxgl*/
mapboxgl.accessToken =
      'pk.eyJ1IjoiYm5qbW5zYmwiLCJhIjoiY2luc3Qxajk4MDBsY3Zza2x1MWg1b2xzeCJ9.BK1MmHruCVZvMFnL_uTC1w';

var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/light-v9', // stylesheet location
  center: [13.404954, 52.520008], // starting position [lng, lat]
  zoom: 12, // starting zoom
  minZoom: 8,
  maxZoom: 18,
  pitch: 45, //angle from plane view
  trackResize: true,
});

// +++  add geolocate control +++
const geoLocate = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true,
  },
  trackUserLocation: true,
  showUserLocation: true,
});
map.addControl(geoLocate);

//+++ adds navigation control to zoom in and out
map.addControl(new mapboxgl.NavigationControl());

// +++ add scale to the bottom left +++
var scale = new mapboxgl.ScaleControl({
  maxWidth: 200,
  unit: 'metric',
});
map.addControl(scale);

map.on('load', function() {
  var data = '/data/result.geojson';
  map.addLayer({
    id: 'datapoints',
    source: {
      type: 'geojson',
      data: data
    },
    type: 'circle',

    paint: {
      'circle-color': '#253276'
    },
    'circle-radius': {
      base: 4,
      // make circles larger as the user zooms from z12 to z22
      stops: [[12, 2], [22, 180]]
    },
    'circle-color': {
      property: 'color',
      type: 'categorical',
      stops: [
        ['normal', 'transparent'],
        ['focussed', '#E60433'],
        ['inactive', 'transparent']]
    }
  });
});


map.on('mouseenter', 'datapoints', function (e) {
  map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'datapoints', function () {
  map.getCanvas().style.cursor = '';
});

map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['datapoints'] // replace this with the name of the layer
  });

  if (!features.length) {
    return;
  }

  var feature = features[0];

  new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML('<h3>' +
    feature.properties['Einrichtung Name'] +
    '</h3><p>' +
    feature.properties['Einrichtung Strasse'] +
    '<br>' +
    feature.properties['Einrichtung PLZ'] + ' Berlin'+
    '</p><h4>Plätze gesamt: ' +
    feature.properties['Einrichtung Platzzahl'] +
    '</h4>'
    )
    .addTo(map);

    // define coords of mouse
    let coordsObj = e.lngLat;
    let coords = Object.keys(coordsObj).map(function(key) {
      return coordsObj[key];
    });

    map.flyTo({
      center: coords,
      zoom: 12,
      speed: 0.5, // make the flying slow
    });

});

