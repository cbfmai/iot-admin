<template>
  <div class="map_wrapper">
    <div id="map-container" class="map"></div>
    <div class="promptBox">
    </div>
  </div>
</template>

<script>
  import XBaseMap from '../assets/xmap/xBaseMap'
  import XBaseLayer from '../assets/xmap/layer/baseLayer'
  import 'openlayers/css/ol.css'

  export default {
    mounted() {
      let map = new XBaseMap({
        target: 'map-container',
        center: [112.57, 26.91],
        code: 'EPSG:4326',
        zoom: 13
      });
      let dataLayer = new XBaseLayer({
        baseMap: map,
      });
      dataLayer.showData({
        type: 'base',
        data: [{
          id: 1,
          longitude: 112.599,
          latitude: 26.91,
          name: '车位检测器1'
        }, {
          id: 2,
          longitude: 112.543,
          latitude: 26.938,
          name: '烟杆1'
        }, {
          id: 3,
          longitude: 112.558,
          latitude: 26.904,
          name: '井盖1'
        }, {
          id: 4,
          longitude: 112.568,
          latitude: 26.886,
          name: '路灯控制器1'
        }],
        styleFunc: function (itemData, zoom, resolution, point) {
          return {
            styleType: 'Icon',
            src: '../static/images/map/mnholeCover.png'
          }
        }
      })
    }
  }
</script>

<style>
  .map_wrapper {
    width: 100%;
    height: 100%;
  }

  #map-container {
    width: 100%;
    height: 100%;
  }

  .ol-mouse-position {
    top: inherit;
    bottom: 17px;
  }
</style>
