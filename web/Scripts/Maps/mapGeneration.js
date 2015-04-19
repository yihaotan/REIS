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

var geocoder;
var googlemap;
function initializeGoogleMaps() {
    var fenway = new google.maps.LatLng(1.3667,103.8);
    var mapOptions = {
        center: fenway,
        zoom: 11
    };
    googlemap = new google.maps.Map(
        document.getElementById('map-canvas'), mapOptions);
    var panoramaOptions = {
        position: fenway,
        pov: {
            heading: 34,
            pitch: 10
        }
    };
    var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
    googlemap.setStreetView(panorama);
            


}

function codeAddress() {
    geocoder = new google.maps.Geocoder();
    var address = document.getElementById('address').value;
    geocoder.geocode( {
        'address': "Singapore"+ address
        }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            googlemap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: googlemap,
                position: results[0].geometry.location
            });
            googlemap.streetView.setPosition(results[0].geometry.location);
            googlemap.streetView.setVisible(true);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
    
}
