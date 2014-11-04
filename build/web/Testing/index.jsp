<%-- 
    Document   : index
    Created on : Oct 12, 2014, 2:02:11 PM
    Author     : ASUS
--%>
 
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
     <head>

        <title>Leaflet Test</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
        <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
        <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>

        <style>
            #map { 
                height: 500px; 
                width: 900px;
            }
        </style>

    </head>

    <body>
        <jsp:include page="FilterCriteria.html" /> 
        
     <div id="map"></div>
      
        <script>
        var map = L.map('map').setView([1.3667, 103.8], 11);//create map
        
        L.tileLayer('http://{s}.tiles.mapbox.com/v3/realis.jo4acied/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18
        }).addTo(map); //create visualisation layer
        
        var marker = L.marker([1.3667, 103.8]).addTo(map); //create marker
        marker.bindPopup("<b>Hello world!</b><br>I am a popup.");
        marker.on('mouseover', function(e){marker.openPopup();});
        ;
        
        var location1 = {
           "type": "Feature",
           "properties": {
               "name": "location1",
               "location": "east",
               "price": "2300000"
           },
           "geometry": {
               "type": "Point",
               "coordinates": [103.84286,1.37419]//the usual return format of the coordinates is usually lat lon, but for geojson, is lon lat.
           }
       };
        var location2 = {
            "type": "Feature",
            "properties": {
                "name": "location2",
                "location": "east",
                "price": "5300000"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [103.83041,1.38946]//the usual return format of the coordinates is usually lat lon, but for geojson, is lon lat.
            }
        };
        var location3 = {
            "type": "Feature",
            "properties": {
                "name": "location3",
                "location": "east",
                "price": "2900000"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [103.8438,1.38586]//the usual return format of the coordinates is usually lat lon, but for geojson, is lon lat.
            }
        };
        var location4 = {
            "type": "Feature",
            "properties": {
                "name": "location4",
                "location": "east",
                "price": "3400000"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [103.85239,1.36595]//the usual return format of the coordinates is usually lat lon, but for geojson, is lon lat.
            }
        };
        var location5 = {
            "type": "Feature",
            "properties": {
                "name": "location5",
                "location": "east",
                "price": "6700000"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [ 103.85771,1.37608]//the usual return format of the coordinates is usually lat lon, but for geojson, is lon lat.
            }
        };
        var location6 = {
            "type": "Feature",
            "properties": {
                "name": "location6",
                "location": "east",
                "price": "3500000"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [103.85033,1.38208]//the usual return format of the coordinates is usually lat lon, but for geojson, is lon lat.
            }
        };
        var location7 = {
            "type": "Feature",
            "properties": {
                "name": "location7",
                "location": "west",
                "price": "7300000"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [103.75617,1.36226]//the usual return format of the coordinates is usually lat lon, but for geojson, is lon lat.
            }
        };
        var location8 = {
            "type": "Feature",
            "properties": {
                "name": "location8",
                "location": "west",
                "price": "1000000"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [103.75231,1.35171]//the usual return format of the coordinates is usually lat lon, but for geojson, is lon lat.
            }
        };
        var location9 = {
            "type": "Feature",
            "properties": {
                "name": "location9",
                "location": "west",
                "price": "4400000"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [103.74759,1.37496]//the usual return format of the coordinates is usually lat lon, but for geojson, is lon lat.
            }
        };
        var location10 = {
            "type": "Feature",
            "properties": {
                "name": "location10",
                "location": "west",
                "price": "9900000"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [103.756,1.37479]//the usual return format of the coordinates is usually lat lon, but for geojson, is lon lat.
            }
        };
        var location11 = {
            "type": "Feature",
            "properties": {
                "name": "location11",
                "location": "west",
                "price": "5700000"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [103.75394,1.36681]//the usual return format of the coordinates is usually lat lon, but for geojson, is lon lat.
            }
        };
        var location12 = {
            "type": "Feature",
            "properties": {
                "name": "location12",
                "location": "west",
                "price": "6600000"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [1.36123,103.74767]//the usual return format of the coordinates is usually lat lon, but for geojson, is lon lat.
            }
        };
        
        
        
        
        //adding data to an array
        var geojsonarray=new Array;
        geojsonarray.push(location1);
        geojsonarray.push(location2);
        geojsonarray.push(location3);
        geojsonarray.push(location4);
        geojsonarray.push(location5);
        geojsonarray.push(location6);
        geojsonarray.push(location7);
        geojsonarray.push(location8);
        geojsonarray.push(location9);
        geojsonarray.push(location10);
        geojsonarray.push(location11);
        geojsonarray.push(location12);
        
        
      
        
        var highlightStyle = {
            color: '#000000', 
            weight: 3,
            opacity: 0.6,
            fillOpacity: 0.65,
            fillColor: '#000000'
        };//(http://palewi.re/posts/2012/03/26/leaflet-recipe-hover-events-features-and-polygons/)
        
        // A function to put popups in each data point added by the layer
        function onEachFeature(feature, layer) {
           layer.bindPopup("Name: "+feature.properties.name+ "<br> Location: "+feature.properties.location+"<br> Price:"+feature.properties.price)
           layer.on('mouseover',function(){ layer.openPopup();
                                            layer.setStyle(highlightStyle)});
        }
        var layer1=L.geoJson(location12, {
        pointToLayer: function(feature) {
            return L.circleMarker(feature.geometry.coordinates);
        },
        
        onEachFeature: onEachFeature
        
    }).addTo(map);  
    //layer1.setFilter(function(){return false;});
   // map.layer1.setFilter(function(f) {
     //       return f.properties['name'] === "location11";
       // });      
          
          
          var eastLayer;
          var westLayer;
          
        //Add data to json array according to checkbox criteria
          function returnJsonArray(location){
              var locationarray=[]
              for(var i=0;i<geojsonarray.length;i++){
                  if(geojsonarray[i].properties.location==location){
                      locationarray.push(geojsonarray[i]);                
                  }
                  
              }
             return  locationarray;
          }

          //Get the result from the check box and display on the map by adding the data points to the east layer
          function showeast(){
              var checkbox = document.getElementById('east');
              if (checkbox.checked) {
                 var eastarray=returnJsonArray("east");
                 eastLayer = L.geoJson(null, { onEachFeature:onEachFeature}).addTo(map);
                 for(var i=0;i<eastarray.length;i++){
                     eastLayer.addData(eastarray[i]);
                     //.bindPopup("Name: "+eastarray[i].properties.name+"<br> Location: "+eastarray[i].properties.location)
                 }
              }
              else{
                map.removeLayer(eastLayer);   
                  
              }
                 
          }
          
          //Get the result from the check box and display on the map by adding the data points to the west layer          
          function showwest(){
              var checkbox = document.getElementById('west');
              if (checkbox.checked==true) {
                 var westarray=returnJsonArray("west");
                 westLayer = L.geoJson(null, { onEachFeature:onEachFeature}).addTo(map);
                 for(var i=0;i<westarray.length;i++){
                     westLayer.addData(westarray[i]);
                 }
              }
              else{
                map.removeLayer(westLayer);   
                  
              }
                 
          }
          
          function displayprice(lowestprice,highestprice){
              var lowprice=document.getElementById(lowestPrice);
              var highprice=document.getElementById(highestPrice);
              var withinrange=[];
              for(var i=0;i<geojsonarray.length;i++){
                  var jsonObject=geojsonarray[i];
                  var price=jsonObject.properties.price;
                  if(price>=lowprice.value && price<=highprice.value){
                      withinrange.push(jsonObject);
                      
                  }
                  
              }
              return withinrange;
              
          }
          
        //This method is activated when user clicks on the map
        function onMapClick(e) {
            marker =L.marker().setLatLng(e.latlng ).addTo(map);
            marker.bindPopup("I am a popup"+" "+count++ +" "+e.latlng);
            
        }
        map.on('click', onMapClick);
        
        </script>
        
    </body>
</html>
