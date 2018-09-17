var myMap = L.map("map", {
  center: [37.7, -122.4],
  zoom: 10
});

var url = "http://127.0.0.1:5000/data";
var maindata = d3.json(url, function (json) {
  //code here
  console.log(json)
});

// var geojsonLayer = new L.GeoJSON.AJAX("vectormap.geojson");       
// geojsonLayer.addTo(myMap);

const API_KEY = "pk.eyJ1IjoiZnZ1OTU4IiwiYSI6ImNqbTVldHhwajBlZXgzcXJ0bno3bDloaXkifQ.aMSQpbW9A8g7YU9n2If_bg"

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// // var countries = L.layerGroup()

// var baseMaps = {
//     "Light Map": lightmap
// };