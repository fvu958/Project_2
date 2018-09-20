console.log("Hello");
var myMap = L.map("map", {
  center: [0, -0],
  zoom: 3
});

const API_KEY = "pk.eyJ1IjoiZnZ1OTU4IiwiYSI6ImNqbTVldHhwajBlZXgzcXJ0bno3bDloaXkifQ.aMSQpbW9A8g7YU9n2If_bg"

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var geojsonPath = "static/js/vectormap.json";

d3.json(geojsonPath, function (geojsonData) {
  d3.json("/data", function (countryData) {

    var features = geojsonData.features;

    features.forEach(function (feature) {

      var properties = feature.properties;
      var countryCode = properties.iso_a3;

      countryData.forEach(function (country) {
        if (countryCode === country.Country_Code) {
          properties["Beer_Percent"] = country["Beer_Percent"];
          properties["Wine_Percent"] = country["Wine_Percent"];
          properties["Spirits_Percent"] = country["Spirits_Percent"];
          properties["Other_Percent"] = country["Other_Percent"];
        }
      });
    });

    var wine = L.choropleth(geojsonData, {
      valueProperty: "Wine_Percent",
      scale: ["white","purple"],
      weight: 0.25,
      color: "black",
      opacity: 100,
      fillOpacity: .75,
      steps: 100
    }).addTo(myMap);
  });
});
