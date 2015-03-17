
var geocoder=new google.maps.Geocoder();


function generateAccessibilty(data){

var cv = new SVY21();

data.forEach(function (d) {
        
        
       
    });


var test={
    "type": "Feature",
    "properties": {
        "density": 13
    },
    "geometry":{
        "type":"Polygon",
        "coordinates":[
        [
        
        [103.68794925421703, 1.3382176179439507],
        [103.6884679825861, 1.339122006170787],
        [103.68950554589199, 1.3391220676536735],
        [103.69002438006846, 1.338217740826652],
        [103.68950565124784, 1.3373133528828187],
        [103.68846808870195, 1.3373132914830042]
        ]
        ]
    }
}
addLegend();
L.geoJson(test, {style: style}).addTo(map);



}

function getColor(d) {
    
    return d > 12 ? "#810f7c":
           d > 9  ? "#8856a7":
           d > 6  ? "#8c96c6" :
           d > 3? "#b3cde3" :
                   "#edf8fb" ;

}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 0.1,
        opacity: 1,
        fillOpacity: 0.7
    };
}
function addLegend(){
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0,3, 6, 9, 12],
            labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
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
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function googlegeocode(postalcode){
    var coordinates;
    geocoder.geocode({address:postalcode},function(results,status){
        coords_obj=results[0].geometry.location;
        coordinates=[coords_obj.lat,coords_obj.lng];
        
    })
    return coordinates;
}