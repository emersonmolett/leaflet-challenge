var myMap = L.map("map", {
    center: [37, -100], 
    zoom: 4
    // [lightmap, streeMap]
});

var baseMaps = {
    "Light Map": lightmap
}; 

// add tile layer
var streeMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 500, 
    maxZoom: 18, 
    zoomOffset: -1, 
    id: "mapbox/streets-v11", 
    accessToken: API_KEY
}).addTo(myMap);