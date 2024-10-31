<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';
import { onMounted, ref } from 'vue';

let initialMap: L.Map;

const loading = ref(true);

onMounted(async () => {
  initialMap = L.map('map').setView([48.0, 23.0], 6);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(initialMap);

  const response = await fetch("http://localhost/api/data/global");
  const geojson = await response.json();
  L.geoJSON(geojson).addTo(initialMap);

  loading.value = false;
});
</script>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>

<template>
  <div id="map"></div>
  <div id="loader" v-if="loading">
    <span>Loading Data...</span>
    <img src="../assets/spinner.svg" alt="spinner"/>
  </div>
</template>

<style lang="scss">
#map {
  height: 100%;
  width: 100%;
}

#loader {
  $height: 10rem;
  $width: 30rem;

  position: absolute;
  height: $height;
  width: $width;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid #272727;
  border-radius: .5rem;
  z-index: 999;
  color: white;
  top: calc(50vh - ($height/2));
  left: calc(50vw - ($width/2));
  font-size: 1.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: .5rem;
}
</style>
