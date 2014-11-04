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
        <link rel="stylesheet" href="LeafletStyleSheet.css" type="text/css" />
        <link rel="stylesheet" href="leaflet-panel-layers.css" type="text/css" />
        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
        <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
        <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
        <script src="leaflet-panel-layers.js"></script>
        <script src="Gruntfile.js"></script>
        <script src="PruneCluster.js"></script>

        <style>
            #map { 
                height: 500px; 
                width: 900px;
            }
        </style>

    </head>

    <body>
        <jsp:include page="dateSlider.jsp" /> <br/>
        <jsp:include page="priceslider.jsp" /> 
        <jsp:include page="sidebar.jsp" /> 
        
     <div id="map"></div>
      
        <script>
        
        var map = L.map('map').setView([1.3667, 103.8], 11);//create map
        
        var mainlayer=L.tileLayer('http://{s}.tiles.mapbox.com/v3/realis.jo4acied/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18
        }).addTo(map); //create visualisation layer
        
        //add sidebar to the map
        var sidebar = L.control.sidebar('sidebar', {
             position: 'left'
            });

       //adds the control to map
       map.addControl(sidebar);
       
        //mainlayer.setOpacity(0.6);
      //prune cluster is layer used to store the markers and cluster them on the map
      var pruneCluster = new PruneClusterForLeaflet();
      
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
    
    var layer=L.geoJson(geojsonFeature, {
        
        onEachFeature: onEachFeature
        
    }).addTo(map);  
       
    // A function to put popups in each data point added by the layer
    function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
        if (feature.properties && feature.properties.popupContent) {
            layer.bindPopup(feature.properties.popupContent);
            
        }

    }

    
      //Creates an empty layer group
      var newsales=L.layerGroup([]); 
      
      //Iterate through the geojson features and those who matched the new sales criteria 
      //will be assigned a marker. It will then be added to the layer group
      for(var i=0;i<geojsonFeature.length;i++){
          var geojsonsale=geojsonFeature[i];
           if(geojsonsale.properties.sale_type=="New Sale"){
                var sale=L.circleMarker(geojsonsale.geometry.coordinates,{color: 'black',
    fillColor: '#0C090A',fillOpacity: 0.5});
                newsales.addLayer(sale);
            }    
        }
           
        
      //Creates an empty layer group  
      var resales=L.layerGroup([]); 
      
      //Iterate through the geojson features and those who matched the new sales criteria 
      //will be assigned a marker. It will then be added to the layer group
      for(var i=0;i<geojsonFeature.length;i++){
          var geojsonresale=geojsonFeature[i];
           if(geojsonresale.properties.sale_type=="Resale"){
                var resale=L.circleMarker(geojsonresale.geometry.coordinates,{color: 'blue',
    fillColor: '#0000FF',fillOpacity: 0.1}).on('click',function(){sidebar.setContent(geojsonresale.properties.property_type).show()});
                resale.bindPopup("Name: "+geojsonresale.properties.project_name+ "<br> Location: "+geojsonresale.properties.property_type+"<br> Price:"+geojsonresale.properties.sale_type)
                resale.on('mouseover',function(){resale.openPopup()})
                resales.addLayer(resale);
            }    
        }
        
      //Creates an empty layer group  
      var subsales=L.layerGroup([]); 
      
      //Iterate through the geojson features and those who matched the new sales criteria 
      //will be assigned a marker. It will then be added to the layer group
      for(var i=0;i<geojsonFeature.length;i++){
          var geojsonsubsale=geojsonFeature[i];
           if(geojsonsubsale.properties.sale_type=="Subsale"){
                var subsale=L.circleMarker(geojsonsubsale.geometry.coordinates,{color: 'red',
    fillColor: '#f03',fillOpacity: 0.1});
                subsales.addLayer(subsale);
            }    
        }
        //creates an overlay for both resales and new sales
        
        
        var overlaysaletype = {
            "<font color='blue'>Resales": resales,
            "New Sales": newsales,
            "<font color='red'>Sub Sales":subsales
            };
            
        //Assigning control to overlays, create checkboxes and added to map   
        //L.control.layers(null,overlaysaletype,{collapsed:false}).addTo(map);
        
      var execcondoIcon=L.icon({iconUrl: 'Icons/Execcondo.png',iconSize:[20, 20]});  
      var execcondos=L.layerGroup([]); 
      
      //Iterate through the geojson features and those who matched the new sales criteria 
      //will be assigned a marker. It will then be added to the layer group
      for(var i=0;i<geojsonFeature.length;i++){
          var geojsonexeccondo=geojsonFeature[i];
           if(geojsonexeccondo.properties.property_type=="Executive Condominium"){
                var execcondo=L.marker(geojsonexeccondo.geometry.coordinates,{icon:execcondoIcon});
                execcondos.addLayer(execcondo);
            }    
        }
      var condoIcon=L.icon({iconUrl: 'Icons/Condominium.png',iconSize:[15, 15]});  
      //Creates an empty layer group   
      var condos=L.layerGroup([]); 
      
      //Iterate through the geojson features and those who matched the new sales criteria 
      //will be assigned a marker. It will then be added to the layer group
      for(var i=0;i<geojsonFeature.length;i++){
          var geojsoncondo=geojsonFeature[i];
           if(geojsoncondo.properties.property_type=="Condominium"){
                var condo=L.marker(geojsoncondo.geometry.coordinates,{icon:condoIcon});
                condos.addLayer(condo);
            }    
        }
      
      var apartmentIcon=L.icon({iconUrl: 'Icons/Apartment.png',iconSize:[20, 20]});
      //Creates an empty layer group  
      var apartments=L.layerGroup([]); 
      
      //Iterate through the geojson features and those who matched the new sales criteria 
      //will be assigned a marker. It will then be added to the layer group
      for(var i=0;i<geojsonFeature.length;i++){
          var geojsonapartment=geojsonFeature[i];
           if(geojsonapartment.properties.property_type=="Apartment"){
                var apartment=L.marker(geojsonapartment.geometry.coordinates,{icon: apartmentIcon});
                apartments.addLayer(apartment);
            }    
        }
      var terraceIcon=L.icon({iconUrl: 'Icons/Terrace.png',iconSize:[20, 20]}); 
      //Creates an empty layer group 
      var terraces=L.layerGroup([]); 
      
      //Iterate through the geojson features and those who matched the new sales criteria 
      //will be assigned a marker. It will then be added to the layer group
      for(var i=0;i<geojsonFeature.length;i++){
          var geojsonterrace=geojsonFeature[i];
           if(geojsonterrace.properties.property_type=="Terrace House"){
                var terrace=L.marker(geojsonterrace.geometry.coordinates,{icon:terraceIcon});
                terraces.addLayer(terrace);
            }    
        }
      var semidIcon=L.icon({iconUrl: 'Icons/Semid.jpg',iconSize:[20, 20]});  
         //Creates an empty layer group 
      var semids=L.layerGroup([]); 
      
      //Iterate through the geojson features and those who matched the new sales criteria 
      //will be assigned a marker. It will then be added to the layer group
      for(var i=0;i<geojsonFeature.length;i++){
          var geojsonsemid=geojsonFeature[i];
           if(geojsonsemid.properties.property_type=="Semi-Detached House"){
                var semid=L.marker(geojsonsemid.geometry.coordinates,{icon: semidIcon});
                semids.addLayer(semid);
            }    
        }
      var detachedIcon=L.icon({iconUrl: 'Icons/Detached House.png',iconSize:[20, 20]});
      //Creates an empty layer group 
      var detacheds=L.layerGroup([]); 
      
      //Iterate through the geojson features and those who matched the new sales criteria 
      //will be assigned a marker. It will then be added to the layer group
      for(var i=0;i<geojsonFeature.length;i++){
          var geojsondetached=geojsonFeature[i];
           if(geojsondetached.properties.property_type=="Detached House"){
                var detached=L.marker(geojsondetached.geometry.coordinates,{icon: detachedIcon});
                detacheds.addLayer(detached);
            }    
        }
        //creates an overlay for both resales and new sales
        var overlaypropertytype = {
            "<img src='Icons/Execcondo.png' height=24> Executive Condominium": execcondos,
            "<img src='Icons/Condominium.png' height=24> Condominium": condos,
            "<img src='Icons/Apartment.png' height=24> Apartment": apartments,
            "<img src='Icons/Terrace.png' height=24> Terrace House": terraces,
            "<img src='Icons/Semid.jpg' height=24> Semi-Detached House": semids,
            "<img src='Icons/Detached House.png' height=24> Detached House":detacheds
            };
            
        //Assigning control to overlays, create checkboxes and added to map   
        //L.control.layers(null,overlaypropertytype,{collapsed:false}).addTo(map);
        
      var alls=L.layerGroup([]);

     
      
      //Iterate through the geojson features and those who matched the new sales criteria 
      //will be assigned a marker. It will then be added to the layer group
      for(var i=0;i<geojsonFeature.length;i++){
        var geojsonall=geojsonFeature[i];   
        var all=L.marker(geojsonall.geometry.coordinates);
        var clustmarker=new PruneCluster.Marker(geojsonall.geometry.coordinates[0].toString(),geojsonall.geometry.coordinates[0].toString());
        pruneCluster.RegisterMarker(clustmarker);
        alls.addLayer(all);
                
        }
        

        //creates an overlay for both resales and new sales
        var overlayall = [
        {
            name:"<font color='black'>Sale Type",
            sep:true
        },
        {
            name:"<font color='blue'>Resales",
            layer: resales
        },

        {
            name:"<font color='red'>Sub Sales",
            layer: subsales
        },

        {
            name:"New Sales",
            layer: newsales
        },
        {
            name:"<font color='black'>Property Type",
            sep:true
        },
        {
            name:"<img src='Icons/Execcondo.png' height=20> Executive Condominium",
            layer: execcondos
        },

        {
            name:"<img src='Icons/Condominium.png' height=20> Condominium",
            layer: condos
        },
        {
            name:"<img src='Icons/Apartment.png' height=20> Apartment",
            layer: apartments
        },
        {
            name:"<img src='Icons/Terrace.png' height=20> Terrace House",
            layer: terraces
        },
        {
            name:"<img src='Icons/Semid.jpg' height=20> Semi-Detached House",
            layer: semids
        },
        {
            name:"<img src='Icons/Detached House.png' height=20> Detached House",
            layer: detacheds
        },
        {
            name:"<font color='black'>Show All",
            sep:true
        },
        {
            name:"<img src='Icons/defaultmarker.png' height=20> All",
            layer: alls
        },
        {
            name:"<font color='black'>Cluster for easy viewing",
            sep:true
        },
        {
            name:"Cluster",
            layer: pruneCluster
        }];
            
            //var overlayall = {
       // "<img src='Icons/defaultmarker.png' height=24>All": alls
         //   };
            
        //Assigning control to overlays, create checkboxes and added to map   
        map.addControl( new L.Control.PanelLayers(null, overlayall, {collapsed: false}) );
        //old way: L.control.layers(null,overlayall,{collapsed: false}).addTo(map);
       
       var priceIcon=L.icon({iconUrl: 'Icons/PriceMarker.png',iconSize:[40, 30],iconAnchor: [18, 31]});

        var prices=L.layerGroup([]);
        
       // document.write(data.values.min);
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
      $("#dateslider").on("valuesChanged", function(e, data){
            map.removeLayer(dates);
            dates=L.layerGroup([]);
            for(var i=0;i<geojsonFeature.length;i++){
             var geojsonprice=geojsonFeature[i];
               if(Number(geojsonprice.properties.date)>=Number(data.values.min) && Number(geojsonprice.properties.date)<=Number(data.values.max)){
                    var price=L.marker(geojsonprice.geometry.coordinates,{icon:priceIcon});
                    dates.addLayer(date);
                }    
            }
            dates.addTo(map);
      });
        var highlight = {
            'color': '#333333',
            'weight': 2,
            'opacity': 1
        };
        
           // map.subsales.setStyle(highlight);
        
        </script>
        
    </body>
</html>





