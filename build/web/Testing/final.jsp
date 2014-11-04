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
        <link rel="stylesheet" href="Css/LeafletStyleSheet.css" type="text/css" /> <%-- Layergroups UI for filtering--%> 
        <link rel="stylesheet" href="Css/leaflet-panel-layers.css" type="text/css" /> <%-- Layergroups UI for filtering--%> 
        <link rel="stylesheet" href="Css/leaflet.css" type="text/css" /> <%-- General Leaflet UI--%>
        <link rel="stylesheet" href="Css/L.Control.Opencagesearch.css" /><%-- Search function--%>
        
        
        <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script> <%-- Leaflet Library--%>
        
        <script src="http://maps.google.com/maps/api/js?v=3&sensor=false"></script><%-- Googlemaps--%>
        <script src="Maps/leaflet.js"></script><%-- Leaflet map--%>
        <script src="Maps/leaflet-src.js"></script><%-- Leaflet map--%>
        <script src="Maps/Googlemap.js"></script><%-- Googlemaps--%>
        <script src="Maps/bing.js"></script> <%-- Bing maps--%>
        
        <script src="UIlibraries/L.Control.Sidebar.js"></script> <%-- Sidebar function--%>
        <script src="UIlibraries/leaflet-panel-layers.js"></script> <%-- Layer groups for filtering--%>
        <script src="UIlibraries/PruneCluster.js"></script> <%-- Clustering of markers--%>
        <script src="UIlibraries/L.Control.Opencagesearch.js"></script> <%-- Search function --%>


        <style>
            #map { 
                height: 500px; 
                width: 900px;
            }
        </style>

    </head>

    <body>
        <jsp:include page="Interactive UI/dateSlider.jsp" /> <br/> <%-- Date slider--%>
        <jsp:include page="Interactive UI/priceslider.jsp" /> <%-- Price slider--%>
        <jsp:include page="Interactive UI/sidebar.jsp" /> <%-- Sidebar--%>
        
        <div id="map"></div>

        
        <script>
        
        var map = L.map('map').setView([1.3667, 103.8], 11);//create map
        
        //create options for opencagemaps:Max 1500 hits per day
        var options = {
            key: 'b7212e1e14c705bf72473f2cfeaf85c1',//API Key gotten by signing up with open cage
            limit: 10
        };
        
        //Add opencage control to the map
        var control = L.Control.openCageSearch(options).addTo(map);
        
        //Create map layer using openstreet
        var mainlayer=L.tileLayer('http://{s}.tiles.mapbox.com/v3/realis.jo4acied/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18
        }).addTo(map); 
        
        //Create map layer using googlemap terrain
        var gterrain = new L.Google('TERRAIN');
        
        //Create map layer using googlemap satellite
        var gsatellite = new L.Google('SATELLITE');
        
        //Create map layer using googlemap road map
        var groadmap = new L.Google('ROADMAP');
        
        //Create map layer using Bing
        //var bing = new L.BingLayer("Anqm0F_JjIZvT0P3abS6KONpaBaKuTnITRrnYuiJCE0WOhH6ZbE4DzeT6brvKVR5");
            
        //add sidebar to the map
        var sidebar = L.control.sidebar('sidebar', {
             position: 'left'
            }); 
       
       //adds the control to map
       map.addControl(sidebar);
       
        //mainlayer.setOpacity(0.6);
        
       var layer=L.geoJson(geojsonFeature, {
        
                onEachFeature: onEachFeature
        
                }).addTo(map); 
    
       
    // A function to put popups in each data point added by the layer
    function onEachFeature(feature, layer) {
        if (feature.properties && feature.properties.popupContent) {
            layer.bindPopup(feature.properties.popupContent);
            
        }

    }
      
      //hardcoded data
        var geojsonFeature = [
        {
            "type": "Feature",
            "properties": {
                "project_name": "VILLA AZURA",
                "property_type": "Executive Condominium",
                "sale_type": "Resale",
                "unit_price": 1200,
                "popupContent": "First Transaction"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [1.3667, 103.8]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "project_name": "THE SKYWOODS",
                "property_type": "Terrace House",
                "sale_type": "New Sale",
                "unit_price": 1400,
                "popupContent": "Second Transaction"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [1.2826, 103.8584]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "project_name": "VILLA AZURA",
                "property_type": "Condominium",
                "sale_type": "Subsale",
                "unit_price": 2009,
                "popupContent": "First Transaction"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [1.38946,103.83041]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "project_name": "VILLA AZURA",
                "property_type": "Condominium",
                "sale_type": "Subsale",
                "unit_price": 2009,
                "popupContent": "First Transaction"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [1.38946,103.83041]
            }
        }

    ];

    //set the images for the icon in the respective filters
    var execcondoIcon=L.icon({iconUrl: 'Icons/Execcondo.png',iconSize:[20, 20]});
    var condoIcon=L.icon({iconUrl: 'Icons/Condominium.png',iconSize:[15, 15]});
    var detachedIcon=L.icon({iconUrl: 'Icons/Detached House.png',iconSize:[20, 20]});
    var apartmentIcon=L.icon({iconUrl: 'Icons/Apartment.png',iconSize:[20, 20]});
    var semidIcon=L.icon({iconUrl: 'Icons/Semid.jpg',iconSize:[20, 20]}); 
    var terraceIcon=L.icon({iconUrl: 'Icons/Terrace.png',iconSize:[20, 20]});
    var priceIcon=L.icon({iconUrl: 'Icons/PriceMarker.png',iconSize:[40, 30],iconAnchor: [18, 31]});
    
    //Creating layers of filters to put markers on.These layers have the ability to cluster
    var allCluster = new PruneClusterForLeaflet();
    
    //These layers are for sale types
    var resaleCluster = new PruneClusterForLeaflet();
    var subsaleCluster = new PruneClusterForLeaflet();
    var newsaleCluster = new PruneClusterForLeaflet();
    
    //These layers are for property types
    var execcondoCluster = new PruneClusterForLeaflet();
    var condoCluster = new PruneClusterForLeaflet(); 
    var apartmentCluster = new PruneClusterForLeaflet();
    var terraceCluster = new PruneClusterForLeaflet();
    var semidCluster = new PruneClusterForLeaflet();
    var detachedCluster = new PruneClusterForLeaflet();
    
    //These layers are for the sliders
    var priceCluster= new PruneClusterForLeaflet();
    var dateCluster= new PruneClusterForLeaflet();
    
   
        // A big loop to put the respective features into layers for the filtering of markers.
      for(var i=0;i<geojsonFeature.length;i++){
                
        var geojson=geojsonFeature[i];  
        
        var allclustmarker=new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(),geojson.geometry.coordinates[1].toString());
        allclustmarker.data.popup=("Name: "+geojson.properties.project_name+ "<br> Location: "+geojson.properties.property_type+"<br> Price:"+geojson.properties.sale_type);
        allCluster.RegisterMarker(allclustmarker);
        //map.addLayer(allCluster);
        
        if(geojson.properties.sale_type=="Resale"){
            var resaleclustmarker=new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(),geojson.geometry.coordinates[1].toString());
            resaleclustmarker.data.popup=("Name: "+geojson.properties.project_name+ "<br> Location: "+geojson.properties.property_type+"<br> Price:"+geojson.properties.sale_type);
            resaleCluster.RegisterMarker(resaleclustmarker);
            
        }
        
        if(geojson.properties.sale_type=="Subsale"){
            var subsaleclustmarker=new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(),geojson.geometry.coordinates[1].toString());
            subsaleclustmarker.data.popup=("Name: "+geojson.properties.project_name+ "<br> Location: "+geojson.properties.property_type+"<br> Price:"+geojson.properties.sale_type);
            subsaleCluster.RegisterMarker(subsaleclustmarker);
        }
        
        if(geojson.properties.sale_type=="New Sale"){
            var newsaleclustmarker=new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(),geojson.geometry.coordinates[1].toString());
            newsaleclustmarker.data.popup=("Name: "+geojson.properties.project_name+ "<br> Location: "+geojson.properties.property_type+"<br> Price:"+geojson.properties.sale_type);
            newsaleCluster.RegisterMarker(newsaleclustmarker); 
        }
        
        if(geojson.properties.property_type=="Executive Condominium"){
            var execcondoclustmarker=new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(),geojson.geometry.coordinates[1].toString());
            execcondoclustmarker.data.icon=execcondoIcon;
            execcondoclustmarker.data.popup=("Name: "+geojson.properties.project_name+ "<br> Location: "+geojson.properties.property_type+"<br> Price:"+geojson.properties.sale_type);
            execcondoCluster.RegisterMarker(execcondoclustmarker);
            
            
        }
        
        if(geojson.properties.property_type=="Condominium"){
            var condoclustmarker=new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(),geojson.geometry.coordinates[1].toString());
            condoclustmarker.data.icon=condoIcon;
            condoclustmarker.data.popup=("Name: "+geojson.properties.project_name+ "<br> Location: "+geojson.properties.property_type+"<br> Price:"+geojson.properties.sale_type);
            condoCluster.RegisterMarker(condoclustmarker);
        }
        
        if(geojson.properties.property_type=="Apartment"){
            var apartmentclustmarker=new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(),geojson.geometry.coordinates[1].toString());
            apartmentclustmarker.data.icon=apartmentIcon;
            apartmentclustmarker.data.popup=("Name: "+geojson.properties.project_name+ "<br> Location: "+geojson.properties.property_type+"<br> Price:"+geojson.properties.sale_type);
            apartmentCluster.RegisterMarker(apartmentclustmarker);
        }
        
        if(geojson.properties.property_type=="Terrace House"){
            var terraceclustmarker=new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(),geojson.geometry.coordinates[1].toString());
            terraceclustmarker.data.icon=terraceIcon;
            terraceclustmarker.data.popup=("Name: "+geojson.properties.project_name+ "<br> Location: "+geojson.properties.property_type+"<br> Price:"+geojson.properties.sale_type);
            terraceCluster.RegisterMarker(terraceclustmarker);
        }    
        
        if(geojson.properties.property_type=="Semi-Detached House"){
            var semidclustmarker=new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(),geojson.geometry.coordinates[1].toString());
            semidclustmarker.data.icon=semidIcon;
            semidclustmarker.data.popup=("Name: "+geojson.properties.project_name+ "<br> Location: "+geojson.properties.property_type+"<br> Price:"+geojson.properties.sale_type);
            semidCluster.RegisterMarker(semidclustmarker);
        }   
        
        if(geojson.properties.property_type=="Detached House"){
            var detachedclustmarker=new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(),geojson.geometry.coordinates[1].toString());
            detachedclustmarker.data.icon=detachedIcon;
            detachedclustmarker.data.popup=("Name: "+geojson.properties.project_name+ "<br> Location: "+geojson.properties.property_type+"<br> Price:"+geojson.properties.sale_type);
            detachedCluster.RegisterMarker(detachedclustmarker);
        }    
      }
      
      
      var baselayers = [
        {
            name:"<font color='black'>Base Layers",
            sep:true
        },  
        {
            name:"<font color='black'>Open Street Map",
            layer: mainlayer
        },
       //{
        //    name:"<font color='black'>Google Terrain",
        //    layer: gterrain
        //},
        {
            name:"<font color='black'>Google Road Map",
            layer: groadmap
        },
        {
            name:"<font color='black'>Google Satellite",
            layer: gsatellite
        }
      ];
      
      
      //Creates an overlay with an interface for checkboxes
      var overlayall = [
        {
            name:"<font color='black'>Sale Type",
            sep:true
        },
        {
            name:"<font color='blue'>Resales",
            layer: resaleCluster
        },

        {
            name:"<font color='red'>Sub Sales",
            layer: subsaleCluster
        },

        {
            name:"New Sales",
            layer: newsaleCluster
        },
        {
            name:"<font color='black'>Property Type",
            sep:true
        },
        {
            name:"<img src='Icons/Execcondo.png' height=20> Executive Condominium",
            layer: execcondoCluster
        },

        {
            name:"<img src='Icons/Condominium.png' height=20> Condominium",
            layer: condoCluster
        },
        {
            name:"<img src='Icons/Apartment.png' height=20> Apartment",
            layer: apartmentCluster
        },
        {
            name:"<img src='Icons/Terrace.png' height=20> Terrace House",
            layer: terraceCluster
        },
        {
            name:"<img src='Icons/Semid.jpg' height=20> Semi-Detached House",
            layer: semidCluster
        },
        {
            name:"<img src='Icons/Detached House.png' height=20> Detached House",
            layer: detachedCluster
        },
        {
            name:"<font color='black'>Show All",
            sep:true
        },
        {
            name:"<img src='Icons/defaultmarker.png' height=20> All",
            layer: allCluster
        }];

        //Assigning control to overlays, create checkboxes and added to map   
        map.addControl( new L.Control.PanelLayers(baselayers, overlayall, {collapsed: false}) );
        
        
        var prices=L.layerGroup([]);
        //Price slider logic
        $("#slider").on("valuesChanged", function(e, data){
            map.removeLayer(prices);
            prices=L.layerGroup([]);
            for(var i=0;i<geojsonFeature.length;i++){
             var geojsonprice=geojsonFeature[i];
               if(Number(geojsonprice.properties.unit_price)>=data.values.min && Number(geojsonprice.properties.unit_price)<=data.values.max){
                    var price=L.marker(geojsonprice.geometry.coordinates,{icon:priceIcon});
                    prices.addLayer(price);
                }    
            }
            prices.addTo(map);
      });
      
      var dates=L.layerGroup([]);
      //Date slider logic
      $("#dateslider").on("valuesChanged", function(e, data){
            map.removeLayer(dates);
            dates=L.layerGroup([]);
            for(var i=0;i<geojsonFeature.length;i++){
             var geojsondate=geojsonFeature[i];
               if(Number(geojsondate.properties.date)>=Number(data.values.min) && Number(geojsondate.properties.date)<=Number(data.values.max)){
                    var date=L.marker(geojsondate.geometry.coordinates);
                    dates.addLayer(date);
                }    
            }
            dates.addTo(map);
      });
        
        </script>
        
    </body>
</html>






