// Create a leaflet map object using "L.map()"
var myMap = L.map("map", {
    center: [37.50, -110.71],
    zoom: 4
    // layers: [lightmap, streetMap]
});


var baseMaps = {
    "Light Map": lightmap
};

// add tile layer
var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
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
        return '#c7e76d'
    } else if (value < 20) {
        return '#9fb857'
    } else if (value < 60) {
        return '#778a41'
    } else if (value < 120) {
        return '#4f5c2b'
    } else if (value < 180) {
        return '#272e15'
    } else {
        return '#000000'
    }
}

// populate markers on map
d3.json(url).then(function (data) {
    // go through locations & create city/state marks
    for (var i = 0; i < data.features.length; i++) {
        console.log(data.features.length);
        // Declare variables
        var lat = data.features[i].geometry.coordinates[1];
        var lon = data.features[i].geometry.coordinates[0];
        var latlon = [lat, lon];
        var mag = data.features[i].properties.mag;
        var depth = data.features[i].geometry.coordinates[2];
        var place = data.features[i].properties.place;
        // console.log(earthquakeData[i].geometry.coordinates)
        // console.log(lat,lon)
        // console.log(place)

        // marker radius
        L.circle(latlon, {
            stroke: "black",
            fillOpacity: 0.9,
            color: '#FDFEFE',
            fillColor: markerColor(depth),
            fillOpacity: .8,
            weight: 2,
            //marker size to reflect size// set marker size to reflect the magnitude
            radius: mag * 25000
        }).bindPopup(`<h3>Location:${place}</h3><p>Magnitude: ${mag}</p>`)
            .addTo(myMap);


    }
})

// create legend
var legend = L.control({
    position: "bottomright"
});

legend.onAdd = function () {
    var div = L.DomUtil.create("div", "legend");
    var limits = [
        '<0',
        '0 - 19',
        '20 - 59',
        '60 - 119',
        '120 - 179',
        '>180'
    ];
    var colors = [
        "#c7e76d",
        "#9fb857",
        "#778a41",
        "#4f5c2b",
        "#272e15",
        "#000000"

    ];

    // heading for legend
    var legendInfo = "<h3>Earthquake Depth</h3>"

    div.innerHTML = legendInfo;

    for (var i = 0; i < limits.length; i++) {
        div.innerHTML +=
            '<i style="background:' + (colors[i]) + '"></i> ' +
            limits[i] + '<br>';
    }

    return div;
};

legend.addTo(myMap)
