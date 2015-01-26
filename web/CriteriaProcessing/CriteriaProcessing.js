function criteriastolayers(filteredData){

    //Images for markers
    var newsaleexeccondoIcon = L.icon({iconUrl: 'Icons/greenexeccondo.png', iconSize: [40, 40]});
    var subsaleexeccondoIcon = L.icon({iconUrl: 'Icons/blueexeccondo.png', iconSize: [40, 40]});
    var resaleexeccondoIcon = L.icon({iconUrl: 'Icons/redexeccondo.png', iconSize: [40, 40]});

    var newsalecondoIcon = L.icon({iconUrl: 'Icons/greenCondo.png', iconSize: [40, 40]});
    var subsalecondoIcon = L.icon({iconUrl: 'Icons/blueCondo.png', iconSize: [40, 40]});
    var resalecondoIcon = L.icon({iconUrl: 'Icons/redCondo.png', iconSize: [40, 40]});
    
    var newsaledetachedIcon = L.icon({iconUrl: 'Icons/greenDetached.png', iconSize: [40, 40]});
    var subsaledetachedIcon = L.icon({iconUrl: 'Icons/blueDetached.png', iconSize: [40, 40]});
    var resaledetachedIcon = L.icon({iconUrl: 'Icons/redDetached.png', iconSize: [40, 40]});

    var newsaleapartmentIcon = L.icon({iconUrl: 'Icons/greenApartment.png', iconSize: [40, 40]});
    var subsaleapartmentIcon = L.icon({iconUrl: 'Icons/blueApartment.png', iconSize: [40, 40]});
    var resaleapartmentIcon = L.icon({iconUrl: 'Icons/redApartment.png', iconSize: [40, 40]});

    var newsalesemidIcon = L.icon({iconUrl: 'Icons/greensemid.png', iconSize: [40, 40]});
    var subsalesemidIcon = L.icon({iconUrl: 'Icons/bluesemid.png', iconSize: [40, 40]});
    var resalesemidIcon = L.icon({iconUrl: 'Icons/redsemid.png', iconSize: [40, 40]});

    var newsaleterraceIcon = L.icon({iconUrl: 'Icons/greenTerrace.png', iconSize: [40, 40]});
    var subsaleterraceIcon = L.icon({iconUrl: 'Icons/blueTerrace.png', iconSize: [40, 40]});
    var resaleterraceIcon = L.icon({iconUrl: 'Icons/redTerrace.png', iconSize: [40, 40]});
    
    //initialise cluster for markers
    var criteriaCluster = new PruneClusterForLeaflet();
    
    // Config for Heatmap
    var cfgVolume = {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        // if scaleRadius is false it will be the constant radius used in pixels
        "radius": 0.01,
        "maxOpacity": 0.9, 
        // scales the radius based on map zoom
        "scaleRadius": true, 
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries 
        //   (there will always be a red spot with useLocalExtremas true)
        "useLocalExtrema": true,
        // which field name in your data represents the latitude - default "lat"
        latField: 'lat',
        // which field name in your data represents the longitude - default "lng"
        lngField: 'lng',
        // which field name in your data represents the data value - default "value"
        valueField: 'count'
      };
      var cfgPrice = {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        // if scaleRadius is false it will be the constant radius used in pixels
        "radius": 0.01,
        "maxOpacity": 0.9, 
        // scales the radius based on map zoom
        "scaleRadius": true, 
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries 
        //   (there will always be a red spot with useLocalExtremas true)
        "useLocalExtrema": true,
        // which field name in your data represents the latitude - default "lat"
        latField: 'lat',
        // which field name in your data represents the longitude - default "lng"
        lngField: 'lng',
        // which field name in your data represents the data value - default "value"
        valueField: 'count'
      };
    //creation of new heatmap layer
    var heatmapVolumeLayer = new HeatmapOverlay(cfgVolume);
    var heatmapPriceLayer = new HeatmapOverlay(cfgPrice);
    //Initialise testdata to input data 
    var testDataVolume = {
        max: 1000,
        data: []        
        };
    
    var testDataPrice = {
        max: 1000,
        data: []        
        };
        
    
    map.addLayer(heatmapVolumeLayer);
    map.removeLayer(heatmapVolumeLayer);
    
    map.addLayer(heatmapPriceLayer);
    map.removeLayer(heatmapPriceLayer);
    var pricehash={};
    
    for(var i=0;i<filteredData.length;i++){
            var geojson=filteredData[i];
            var geojsonlat=geojson.lat;
            var geojsonlon=geojson.lon;
            
            var pricekey=geojsonlat.toString()+","+geojsonlon.toString();
            
            if(!pricehash[pricekey]){
                var pricearray=[];
                pricearray.push(geojson.psf);
                pricehash[pricekey]=pricearray;      
            }
            else{
               pricehash[pricekey].push(geojson.psf);
                
            }
            //Enters heatmap data into testdata 
            testDataVolume["data"].push({lat:geojsonlat,
                                    lng:geojsonlon,
                                    count:1});
            
            //Create objects markers
            var criteriamarker = new PruneCluster.Marker(geojson.lat, geojson.lon);
            
            if (geojson.propertyType == "Executive Condominium" && geojson.sale == "New Sale"){
                criteriamarker.data.icon = newsaleexeccondoIcon;
            }
            if (geojson.propertyType == "Executive Condominium" && geojson.sale == "Sub Sale") {
                criteriamarker.data.icon = subsaleexeccondoIcon;
            }
            if (geojson.propertyType == "Executive Condominium" && geojson.sale == "Resale") {
                criteriamarker.data.icon = resaleexeccondoIcon;
            }
            if (geojson.propertyType == "Condominium" && geojson.sale == "New Sale") {
                criteriamarker.data.icon = newsalecondoIcon;
            }
            if (geojson.propertyType == "Condominium" && geojson.sale == "Sub Sale") {
                criteriamarker.data.icon = subsalecondoIcon;
            }
            if (geojson.propertyType == "Condominium" && geojson.sale == "Resale") {
                criteriamarker.data.icon = resalecondoIcon;
            }
            if (geojson.propertyType == "Apartment" && geojson.sale == "New Sale") {
                criteriamarker.data.icon =newsaleapartmentIcon ;
            }
            if (geojson.propertyType == "Apartment" && geojson.sale == "Sub Sale") {
                criteriamarker.data.icon = subsaleapartmentIcon;
            }
            if (geojson.propertyType == "Apartment" && geojson.sale == "Resale") {
                criteriamarker.data.icon = resaleapartmentIcon;
            }
            if (geojson.propertyType == "Terrace House" && geojson.sale == "New Sale") {
                criteriamarker.data.icon = newsaleterraceIcon;
            }
            if (geojson.propertyType == "Terrace House" && geojson.sale == "Sub Sale") {
                criteriamarker.data.icon = subsaleterraceIcon;
            }
            if (geojson.propertyType == "Terrace House" && geojson.sale == "Resale") {
                criteriamarker.data.icon = resaleterraceIcon;
            }
            if (geojson.propertyType == "Semi-Detached House" && geojson.sale == "New Sale") {
                criteriamarker.data.icon = newsaleexeccondoIcon;
            }
            if (geojson.propertyType == "Semi-Detached House" && geojson.sale == "Sub Sale") {
                criteriamarker.data.icon = newsalesemidIcon;
            }
            if (geojson.propertyType == "Semi-Detached House" && geojson.sale == "Resale") {
                criteriamarker.data.icon = subsalesemidIcon;
            }
            if (geojson.propertyType == "Detached House" && geojson.sale == "New Sale") {
                criteriamarker.data.icon = resalesemidIcon;
            }
            if (geojson.propertyType == "Detached House" && geojson.sale == "Sub Sale") {
                criteriamarker.data.icon = subsaledetachedIcon;
            }
            if (geojson.propertyType == "Detached House" && geojson.sale == "Resale") {
                criteriamarker.data.icon = resaledetachedIcon;
            }
           
            criteriamarker.data.popup = ("Project Name: " + geojson.projectName
                                        + "<br> Property Type: " + geojson.propertyType 
                                        + "<br> SaleType:" + geojson.sale
                                        + "<br> Tenure:"+geojson.tenure
                                        + "<br> Transacted Price:"+geojson.price
                                        + "<br> Unit Price PSF:"+geojson.psf
                                        + "<br> Postal Code:"+geojson.postalCode
                                        + "<br> Type Of Area:"+geojson.planningArea
                                        + "<br> Address:"+geojson.address);
            //put these markers on to the layer criteriaCluster
            criteriaCluster.RegisterMarker(criteriamarker);

     }
     
    var pricehashkeys=Object.keys(pricehash);
    for(var i=0;i<pricehashkeys.length;i++){
        var sortedarray=[];
        var medianvalue=0;
        var pricehashkey=pricehashkeys[i]
        
        sortedarray=mergeSort(pricehash[pricehashkey]);//got bug  
        
        if(sortedarray.length%2==0){
           var value1=pricehash[pricehashkey][(sortedarray.length/2)];
           var value2=pricehash[pricehashkey][(sortedarray.length/2-1)];   
           medianvalue=(value1+value2)/2;

        }
        if(sortedarray.length%2!=0){
            var middlevalue=Math.round(sortedarray.length/2);
            medianvalue=pricehash[pricehashkey][middlevalue-1];
            
        }
        var coordinates=pricehashkey.split(",");
        testDataPrice["data"].push({lat:coordinates[0],
                lng:coordinates[1],
                count:medianvalue});
        

    }
    heatmapVolumeLayer.setData(testDataVolume);
    heatmapPriceLayer.setData(testDataPrice);
   
    markers.addLayer(criteriaCluster);
    heatmapVolume.addLayer(heatmapVolumeLayer);
    heatmapPrice.addLayer(heatmapPriceLayer);
    
    
    
    

    
}
