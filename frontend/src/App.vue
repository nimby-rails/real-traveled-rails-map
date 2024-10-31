<script setup lang="ts">
import {onMounted} from 'vue';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';
import {KmlToGeojson} from 'kml-to-geojson';

let initialMap: L.Map;

onMounted(() => {
  initialMap = L.map('map').setView([48.0, 23.0], 6);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(initialMap);
  const kmlToGeojson = new KmlToGeojson();
  fetch("http://localhost/public/NRR.kml")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        //L.geoJSON(data).addTo(initialMap);
        //console.log(data);
        const {folders, geojson} = kmlToGeojson.parse(data);
        console.log(geojson);
        L.geoJSON(geojson).addTo(initialMap);
      });
});
</script>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>

<template>
  <h1>
    Nimby Real Rail Map
  </h1>

  <div id="map"></div>
</template>