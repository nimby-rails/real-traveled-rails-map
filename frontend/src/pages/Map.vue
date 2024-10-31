<script setup lang="ts">
import {onMounted} from 'vue';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';

let initialMap: L.Map;

onMounted(async () => {
  initialMap = L.map('map').setView([48.0, 23.0], 6);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(initialMap);
  const response = await fetch("http://localhost/api/data/global");
  const geojson = await response.json();
  L.geoJSON(geojson).addTo(initialMap);
});
</script>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>

<template>
  <div id="map"></div>
</template>
