/*global mapboxgl*/
mapboxgl.accessToken =
      'pk.eyJ1IjoiYm5qbW5zYmwiLCJhIjoiY2luc3Qxajk4MDBsY3Zza2x1MWg1b2xzeCJ9.BK1MmHruCVZvMFnL_uTC1w';

var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/light-v9', // stylesheet location
  center: [13.404954, 52.520008], // starting position [lng, lat]
  zoom: 12, // starting zoom
  minZoom: 9,
  maxZoom: 18,
  pitch: 45, //angle from plane view
  trackResize: true,
});

map.on('load', function() {
  var url = '/data/result.geojson';

  map.addLayer({
    id: 'datapoints',
    source: {
      type: 'geojson',
      data: url
    },
    type: 'circle',
    paint: {
      'circle-color': '#253276'

    },
    'circle-radius': {
      property: 'size',
      'base': 1.7,
      stops: [[8, 1], [11, 6], [16, 40]]
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


map.on('mouseenter', 'datapoints', function () {
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

  var popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML('<h3>' + feature.properties['Einrichtung Name'] + '</h3><p>Plätze: ' + feature.properties['Einrichtung Platzzahl'] + '</p>')
    .addTo(map);
});

