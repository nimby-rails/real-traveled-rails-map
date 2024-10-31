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
  const response = await fetch("http://localhost/public/NRR.kml");
  const kmlData = await response.text();

  alert('test')
  const {folders, geojson} = kmlToGeojson.parse(kmlData);
  // Oh, I get it now.
  // It tries to use the Crypto API built into modern browsers
  //  But the Crypto API is only available on https:// domains. localhost isn't by default :(
  // Checking if it's possible to get the browser to allow crypto API on localhost now. If not, we might have to reconfigure the dev server to serve over https
  // which can be a bit of a pain to get set up properly.

  // Yeah loading the KML file isn't the problem, it's that the Crypto API is only available on https
  // You'd have to deploy every little change on the server to test your code?
  // If you're willing to wait a while for each reload, yes.
  // I can probably get this properly fixed. Just gimme a sec to clone the repo and test on my own machine.
  // Can you get me the repo url? :')
  // Yeah I totally forgot what it's named or where it is lmao
  alert('kml converted to geojson successfully')
  L.geoJSON(geojson).addTo(initialMap);
  alert('geojson added to map')
});
</script>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>

<template>
  <h1>
    Nimby Real Rail Map
  </h1>

  <div id="map"></div>
</template>