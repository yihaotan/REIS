var perc_80;
var perc_60;
var perc_40;
var perc_20;

function generateAccessibilty(data, total_80, total_60, total_40, total_20) {
    
    perc_80 = total_80;
    perc_60 = total_60;
    perc_40 = total_40;
    perc_20 = total_20;
    
    addLegend();
    L.geoJson(data, {style: style, 
                    onEachFeature: onEachFeature}
              ).addTo(map);

    googlegeocode(309233);

}
function getColor(d) {

    return d > perc_80 ? "#00FF00" :
            d > perc_60 ? "#CCFF00" :
            d > perc_40 ? "#FFFF00" :
            d > perc_20 ? "#FF9900" :
            "#FF0000";

}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 0.1,
        opacity: 1,
        fillOpacity: 0.7
    };
}
function addLegend() {
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
                grades = [0, Math.round(perc_20 * 100) / 100, 
            Math.round(perc_40 * 100) / 100, 
            Math.round(perc_60 * 100) / 100, 
            Math.round(perc_80 * 100) / 100],
                //grades = scale,
                labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                    '<i style="background:' + getColor(grades[i] + 0.2) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(map);
}

// If wanna add feature to each layer can do it here 
// L.geoJson(test, {style: style,onEachFeature: onEachFeature}).addTo(map);
function onEachFeature(feature, layer) {
    layer.on({
//        mouseover: highlightFeature,
//        mouseout: resetHighlight,
        click: onFeatureClick
    });
}

function onFeatureClick() {
    alert("adsfsdafds");
}

function googlegeocode(postalcode) {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': "Singapore" + " " + postalcode}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var lat = results[0].geometry.location.lat();
            var lng = results[0].geometry.location.lng();
            var latlng = [lat, lng];

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });

}
