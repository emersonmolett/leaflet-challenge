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

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
});

// add light-v10 to tilelayers 
lightmap.addTo(myMap);

// json call for all earthquakes in the last seven days
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// making function to define marker size based on earthquake magnitude 
function markerSize(magnitude) {
    return magnitude * 30000;
}

// making function for coloring based on number, generate marker color based on size of earthquake
var markerColor = function (value) {
    if (value < 0) {
        return "#c7e76d"
    } else if (value < 20) {
        return "#b3cf62"
    } else if (value < 60) {
        return "#9fb857"
    } else if (value < 120) {
        return "#8ba14c"
    } else if (value < 180) {
        return "#778a41"
    } else {
        return "#637336"
    }
}

// populate markers on map
d3.json(url).then(function(data) {
    // go through locations & create city/state marks
    for (var i = 0; i < data.features.lenght; i++) {

        var lat = data.features[i].geometry.coordinates[1];
        var lon = data.features[i].geometry.coordinates[0];
        var latlon = [lat,lon];
        var mag = data.features[i].properties.mag;
        var depth = data.features[i].geometry.coordinates[2];
        var place = data.features[i].properties.place;
        // console.log(eaquakeData[i].geometry.coordinates);
        // console.log(lat,lon);
        // console.log(place);

        // marker radius 
        L.circle(latlon, {
            stroke: "black", 
            fillOpacity: 0.7, 
            color: "#cacbcb", 
            fillColor: markerColor(depth), 
            fillOpacity: .5,
            weight: 2,

            //marker size to reflect size
            radius: mag *25000
        }).bindPopup("<h3>Location:${place}</h3><p>Magnitude: ${mag}</p>")
        .addTo(myMap);
    }
})