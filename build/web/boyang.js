var key = "AIzaSyBQCcs1eEWSk-Cn1Je2sj1sbIzNdToKdic";

// Uploading a csv file is the first step
function init_dropzone() {

    // "myAwesomeDropzone" is the camelized version of the HTML element's ID
    Dropzone.options.myAwesomeDropzone = {
        // The name that will be used to transfer the file
        paramName: "file",
        // Change method from post to put
        method: "put",
        // File size in MB
        maxFilesize: 10,
        // Accepted file extension - only csv
        acceptedFiles: ".csv",
        accept: function(file, done) {
            done();
        },
        init: function() {
            // Upon loading success, do some operations on file
            this.on("success", function(file, server_response) {
                // Create a new FileReader object
                var reader = new FileReader();
                // Read the file as Text String (not raw binary string)
                reader.readAsText(file);
                // Upon loading data successfully, convert it to JSON object
                reader.onload = function() {
                    alert("The reading operation is successfully completed.");
                    var geoJSON = csvJSON(reader.result);
                    init_mapbox(geoJSON);
                };
            });

        }
    };
}

// With data, initialise map
function init_mapbox(geoJSON) {

    // Create a GeoJSON feature and add it to the map
    var geojsonFeature = geoJSON;

    // Initialise map and set the view to the centre of Singapore
    var map = L.map('map').setView([1.3667, 103.8], 11);

    // Use my own map service from MapBox, with MapID
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/realis.jo4acied/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(map);

    // Set popup for each feature
    function onEachFeature(feature, layer) {
        // does this feature have a property named popupContent?
        if (feature.properties && feature.properties.popupContent) {
            layer.bindPopup(feature.properties.popupContent);
        }
    }

    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ff7800",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    L.geoJson(geojsonFeature, {
        pointToLayer: function(feature) {
            return L.circleMarker(feature.geometry.coordinates);
        },
        style: function(feature) {
            switch (feature.properties.sale_type) {
                case 'New Sale':
                    return {color: "#ff0000"};
                case 'Resale':
                    return {color: "#0000ff"};
            }
        },
        onEachFeature: onEachFeature,
        filter: function(feature) {
            return true;
        }
    }).addTo(map);
}

// This method converts a csv (as Text String) into a well-formed JSON object
function csvJSON(csv) {

    var lines = csv.split("\n");
    var result = [];

    // var headers = lines[0].split(",");
    // The headers are modified to conform to naming convention for JSON
    var headers = ["PROJECT_NAME", "ADDRESS", "NO_OF_UNITS", "AREA_SQM",
        "TYPE_OF_AREA", "TRANSACTED_PRICE", "UNIT_PRICE_PSM",
        "UNIT_PRICE_PSF", "CONTRACT_DATE", "PROPERTY_TYPE", "TENURE",
        "COMPLETION_DATE", "TYPE_OF_SALE", "PURCHASE_ADDRESS_INDICATOR",
        "POSTAL_DISTRICT", "POSTAL_SECTOR", "POSTAL_CODE", "PLANNING_REGION", "PLANNING_AREA"];

    for (var i = 1; i < lines.length; i++) {

        var properties = {};
        var currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
            properties[headers[j]] = currentline[j];
        }

        var record = {
            "type": "Feature",
            "properties": properties,
            "geometry": {
                "type": "Point",
                "coordinates": [0, 0]
            }
        };

        var postal_code = properties.POSTAL_CODE;
        var search_query = "singapore " + postal_code;

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({'address': search_query}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var location = results[0].geometry.location;
                alert(JSON.stringify(location));
                this.coordinates = [location.lat, location.lon];
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });


            result.push(record);
            alert(JSON.stringify(record));


    }

    //alert(JSON.stringify(result));
    return result; //JavaScript object
    // return JSON.stringify(result); //JSON

}

function set_coordinates(postal_code, callback, callbackObj) {
    var basicSearch = new BasicSearch;
    basicSearch.searchVal = postal_code;
    basicSearch.returnGeom = '1';

    basicSearch.GetSearchResults(function(resultData) {
        var results = resultData.results;
        var row = results[0];
        var cv = new SVY21();
        var resultLatLon = cv.computeLatLon(row.X, row.Y);
        var lat = resultLatLon.lat;
        var lon = resultLatLon.lon;
        alert("Postal Code: " + postal_code + ", \nLat: " + resultLatLon.lat + ", \nLon: " + resultLatLon.lon); // must be lat and lon
        callback.apply(callbackObj, [100, 100]);
    });
}