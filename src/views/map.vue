<template>
  <div id="map-container" class="map"></div>

</template>

<script>
  import ol from 'ol';
  import 'ol/ol.css';
  import Map from 'ol/map';
  import View from 'ol/view';
  import TileLayer from 'ol/layer/tile';
  import OSM from 'ol/source/osm';

  export default {
    mounted() {
      new Map({
        target: 'map-container',
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: [0, 0],
          zoom: 2
        })
      });
    }

  }
</script>
