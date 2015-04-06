
function filterMap(chartName,dimensionName){
    chartName.on('filtered',function(){
        var properties = dimensionName.top(Infinity);
        markers.clearLayers();
        heatmapVolume.clearLayers();
        heatmapPrice.clearLayers();
        criteriastolayers(properties);
    });

}

function plotMapLayers(dimensionName){
    //Create map layer using googlemap terrain
    var gterrain = new L.Google('TERRAIN');
    //Create map layer using googlemap satellite
    var gsatellite = new L.Google('SATELLITE');
    //Create map layer using googlemap road map
    var groadmap = new L.Google('ROADMAP');
    var properties = dimensionName.top(Infinity);
    //var filtereddata = properties;
    
    criteriastolayers(properties);
    var overlayMaps = {
        "Show Markers": markers,
        "Show Volume Heatmap ": heatmapVolume,
        "Show Price Heatmap ": heatmapPrice
    };
    var basemaps = {
        "OpenStreet map": mainLayer,
        "Google Roadmap": groadmap,
        "Google Satellite": gsatellite
    };
    //Adding controls to the polygon
    var drawnItems = L.featureGroup().addTo(map);
    map.addControl(new L.Control.Draw({
        edit: {
            featureGroup: drawnItems
        }
    }));
    
    //Adding listener to polygon layer
    map.on('draw:created', function (event) {
        var layer = event.layer;
        layer.on('click', function () {
            
            if(event.layerType=='circle'){
                
                var circlecenter= layer.getLatLng();
                var circleradius=layer.getRadius();
                var pointswithincircle=getpointswithincircle(properties,circlecenter,circleradius);
               
            }

            else{
                var options = {
                    "backdrop" :true,
                    "show":true
                }
                var pointswithinpolygon=getpointswithinpolygon(properties,layer.getLatLngs());
                $('#polygoncharts').modal(options);
            }
        });
        drawnItems.addLayer(layer);
        
    });

    L.control.layers(basemaps, overlayMaps).addTo(map);
};

