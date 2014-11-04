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
                    //init_mapbox(geoJSON);
                };
            });

        }
    };
}

// This method converts a csv (as Text String) into a well-formed JSON object
function csvJSON(csv) {

    var lines = csv.split("\n");
    var result = [];

    // var headers = lines[0].split(",");
    // The headers are modified to conform to naming convention for JSON
    var headers = ["REC_NO", "PROJECT_NAME", "ADDRESS", "NO_OF_UNITS", "AREA_SQM",
        "TYPE_OF_AREA", "TRANSACTED_PRICE", "UNIT_PRICE_PSM",
        "UNIT_PRICE_PSF", "CONTRACT_DATE", "PROPERTY_TYPE", "TENURE",
        "COMPLETION_DATE", "TYPE_OF_SALE", "PURCHASE_ADDRESS_INDICATOR",
        "POSTAL_DISTRICT", "POSTAL_SECTOR", "POSTAL_CODE", "PLANNING_REGION", "PLANNING_AREA", 
        "X", "Y"];

    for (var i = 1; i < lines.length; i++) {

        var properties = {};
        
        var currentline = lines[i].split(",");
        for (var j = 0; j < headers.length - 2; j++) {
            properties[headers[j]] = currentline[j];
        }
        
        var x = parseFloat(currentline[headers.length - 2]);
        var y = parseFloat(currentline[headers.length - 1].replace("/r", ""));
        
        // here use library to convert SVY21 to WGS84 --> Lat/Lon
        var cv = new SVY21();
        var resultLatLon = cv.computeLatLon(x, y);
        var lat = resultLatLon.lat;
        var lon = resultLatLon.lon;

        var record = {
            "type": "Feature",
            "properties": properties,
            "geometry": {
                "type": "Point",
                "coordinates": [lat, lon]
            }
        };

//        var postal_code = properties.POSTAL_CODE;
//        var search_query = "singapore " + postal_code;
//
//        var geocoder = new google.maps.Geocoder();
//
//        geocoder.geocode({'address': search_query}, function(results, status) {
//            if (status === google.maps.GeocoderStatus.OK) {
//                var location = results[0].geometry.location;
//                alert(JSON.stringify(location));
//                this.coordinates = [location.lat, location.lon];
//            } else {
//                alert('Geocode was not successful for the following reason: ' + status);
//            }
//        });


            result.push(record);
            alert(JSON.stringify(record));

    }
    
    
    
    //alert(JSON.stringify(result));
    return result; //JavaScript object
    // return JSON.stringify(result); //JSON

}