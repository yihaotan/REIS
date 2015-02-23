var map;
var mainLayer;
var searchCtrl;
function init_function() {
        
    map = L.map('map').setView([1.3667,103.8], 11);//create map

    //create options for opencagemaps:Max 1500 hits per day
    var options = {
        key: 'b7212e1e14c705bf72473f2cfeaf85c1', //API Key gotten by signing up with open cage
        limit: 10
    };


    //Create map layer using openstreet
     mainLayer=L.tileLayer('http://{s}.tiles.mapbox.com/v3/realis.jo4acied/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(map);
        var control = L.Control.openCageSearch(options).addTo(map);

            

}
