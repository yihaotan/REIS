// Uploading a csv file is the first step
function init_dropzone() {

    var inputElement = document.getElementById("input");
    inputElement.addEventListener("change", handleFiles, false);
    function handleFiles() {
        var fileList = this.files; /* now you can work with the file list */
        var first_file = fileList[0];
        // Create a new FileReader object
        var reader = new FileReader();
        // Read the file as Text String (not raw binary string)
        reader.readAsText(first_file);
        // Upon loading data successfully, convert it to JSON object
        reader.onload = function() {
            alert("The reading operation is successfully completed.");
            var geoJSON = csvJSON(reader.result);
            alert(JSON.stringify(geoJSON));
            init_function(geoJSON);
        };
    }

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
        "POSTAL_DISTRICT", "POSTAL_SECTOR", "POSTAL_CODE", "PLANNING_REGION", "PLANNING_AREA",
        "X", "Y"];

    for (var i = 1; i < lines.length; i++) {

        var properties = {};

        var currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
            properties[headers[j]] = currentline[j];
        }

        var x_str = properties["X"];
        var y_str = properties["Y"];
        var x = parseFloat(x_str.replace("/r", ""));
        var y = parseFloat(y_str.replace("/r", ""));

        //alert(x + "," + y);

        // here use library to convert SVY21 to WGS84 --> Lat/Lon
        var cv = new SVY21();
        var resultLatLon = cv.computeLatLon(y, x);
        var lat = resultLatLon.lat;
        var lon = resultLatLon.lon;

        var record = {
            "type": "Feature",
            "properties": properties,
            "popupContent": "hello",
            "geometry": {
                "type": "Point",
                "coordinates": [lat, lon]
            }
        };

//        var search_query = "singapore " + postal_code;
//
//        var geocoder = new google.maps.Geocoder();
//
//        geocoder.geocode({'address': search_query}, function(results, status) {
//            if (status === google.maps.GeocoderStatus.OK) {
//                var location = results[0].geometry.location;
//                console.log(postal_code + "," + location.lat + "," + location.lon);
//            } else {
//                alert('Geocode was not successful for the following reason: ' + status);
//            }
//        });

        //GetSearchData();

        result.push(record);
        //alert(JSON.stringify(record));

    }


    alert(JSON.stringify(result));
    return result; //JavaScript object
    // return JSON.stringify(result); //JSON

}

function GetSearchData() {
    var basicSearch = new BasicSearch;
    basicSearch.searchVal = properties.POSTAL_CODE;
    alert(properties.POSTAL_CODE);
    basicSearch.returnGeom = '1';
    basicSearch.GetSearchResults(displayData);
}

function displayData(resultData) {
    debugger;

    var existing = document.getElementById('divResults').innerHTML;

    var results = resultData.results;
    if (results == 'No results') {
        document.getElementById('divResults').innerHTML = existing + "</br>" + "No result(s) found";
        return false;
    }
    else {

        var row = results[0];

        var new_record = row.X + "," + row.Y;

        document.getElementById('divResults').innerHTML = existing + "</br>" + new_record;
    }
}
