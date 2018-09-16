var url = "http://127.0.0.1:5000/data";
var maindata = d3.json(url, function (json) {
  //code here
  console.log(json)
});

// var myMap = L.map("map", {
// });

// var geojsonLayer = new L.GeoJSON.AJAX("vectormap.geojson");       
// geojsonLayer.addTo(myMap);

// var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/fvu958/cjm5efyz2bx9p2sqrgwuntpif.html?fresh=true&title=true&access_token=pk.eyJ1IjoiZnZ1OTU4IiwiYSI6ImNqbTVlNno5NjB0ZDAza3FwY3JraWh3cHIifQ.bsDZaPiQTbIoSrSgEwWiyQ#1.2/45.407741/14.518245/0", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     id: "mapbox.light",
//     accessToken: "pk.eyJ1IjoiZnZ1OTU4IiwiYSI6ImNqbTVldHhwajBlZXgzcXJ0bno3bDloaXkifQ.aMSQpbW9A8g7YU9n2If_bg"
// });

// // var countries = L.layerGroup()

// var baseMaps = {
//     "Light Map": lightmap
// };