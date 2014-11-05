
function init_function(geojsonFeature) {
    
    var map = L.map('map').setView([1.3667, 103.8], 11);//create map
    //create options for opencagemaps:Max 1500 hits per day
    var options = {
        key: 'b7212e1e14c705bf72473f2cfeaf85c1', //API Key gotten by signing up with open cage
        limit: 10
    };

    //Add opencage control to the map
    var control = L.Control.openCageSearch(options).addTo(map);

    //Create map layer using openstreet
    var mainlayer = L.tileLayer('http://{s}.tiles.mapbox.com/v3/realis.jo4acied/{z}/{x}/{y}.png', {
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


    //mainlayer.setOpacity(0.6);

    var layer = L.geoJson(geojsonFeature, {
        onEachFeature: onEachFeature

    }).addTo(map);


    // A function to put popups in each data point added by the layer
    function onEachFeature(feature, layer) {
        if (feature.popupContent) {
            layer.bindPopup(feature.popupContent);

        }
    }




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

    var priceIcon = L.icon({iconUrl: 'Icons/PriceMarker.png', iconSize: [40, 40]});


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
    var priceCluster = new PruneClusterForLeaflet();
    var dateCluster = new PruneClusterForLeaflet();


    // A big loop to put the respective features into layers for the filtering of markers.
    for (var i = 0; i < geojsonFeature.length; i++) {

        var geojson = geojsonFeature[i];

        var allclustmarker = new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(), geojson.geometry.coordinates[1].toString());
        allclustmarker.data.popup = ("Name: " + geojson.properties.PROJECT_NAME + "<br> Location: " + geojson.properties.PROPERTY_TYPE + "<br> Price:" + geojson.properties.TYPE_OF_SALE);
        allCluster.RegisterMarker(allclustmarker);
        //map.addLayer(allCluster);


        if (geojson.properties.PROPERTY_TYPE == "Executive Condominium" && geojson.properties.TYPE_OF_SALE == "New Sale") {
            var execcondoclustmarker = new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(), geojson.geometry.coordinates[1].toString());
            execcondoclustmarker.data.icon = newsaleexeccondoIcon;
            execcondoclustmarker.data.popup = ("Name: " + geojson.properties.PROJECT_NAME + "<br> Location: " + geojson.properties.PROPERTY_TYPE + "<br> Price:" + geojson.properties.TYPE_OF_SALE);
            execcondoCluster.RegisterMarker(execcondoclustmarker);
            newsaleCluster.RegisterMarker(execcondoclustmarker);


        }
        if (geojson.properties.PROPERTY_TYPE == "Executive Condominium" && geojson.properties.TYPE_OF_SALE == "Sub Sale") {
            var execcondoclustmarker = new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(), geojson.geometry.coordinates[1].toString());
            execcondoclustmarker.data.icon = subsaleexeccondoIcon;
            execcondoclustmarker.data.popup = ("Name: " + geojson.properties.PROJECT_NAME + "<br> Location: " + geojson.properties.PROPERTY_TYPE + "<br> Price:" + geojson.properties.TYPE_OF_SALE);
            execcondoCluster.RegisterMarker(execcondoclustmarker);
            subsaleCluster.RegisterMarker(execcondoclustmarker);


        }
        if (geojson.properties.PROPERTY_TYPE == "Executive Condominium" && geojson.properties.TYPE_OF_SALE == "Resale") {
            var execcondoclustmarker = new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(), geojson.geometry.coordinates[1].toString());
            execcondoclustmarker.data.icon = resaleexeccondoIcon;
            execcondoclustmarker.data.popup = ("Name: " + geojson.properties.PROJECT_NAME + "<br> Location: " + geojson.properties.PROPERTY_TYPE + "<br> Price:" + geojson.properties.TYPE_OF_SALE);
            execcondoCluster.RegisterMarker(execcondoclustmarker);
            resaleCluster.RegisterMarker(execcondoclustmarker);


        }

        if (geojson.properties.PROPERTY_TYPE == "Condominium" && geojson.properties.TYPE_OF_SALE == "New Sale") {
            var condoclustmarker = new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(), geojson.geometry.coordinates[1].toString());
            condoclustmarker.data.icon = newsalecondoIcon;
            condoclustmarker.data.popup = ("Name: " + geojson.properties.PROJECT_NAME + "<br> Location: " + geojson.properties.PROPERTY_TYPE + "<br> Price:" + geojson.properties.TYPE_OF_SALE);
            condoCluster.RegisterMarker(condoclustmarker);
            newsaleCluster.RegisterMarker(condoclustmarker);
        }
        if (geojson.properties.PROPERTY_TYPE == "Condominium" && geojson.properties.TYPE_OF_SALE == "Sub Sale") {
            var condoclustmarker = new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(), geojson.geometry.coordinates[1].toString());
            condoclustmarker.data.icon = subsalecondoIcon;
            condoclustmarker.data.popup = ("Name: " + geojson.properties.PROJECT_NAME + "<br> Location: " + geojson.properties.PROPERTY_TYPE + "<br> Price:" + geojson.properties.TYPE_OF_SALE);
            condoCluster.RegisterMarker(condoclustmarker);
            subsaleCluster.RegisterMarker(condoclustmarker);
        }
        if (geojson.properties.PROPERTY_TYPE == "Condominium" && geojson.properties.TYPE_OF_SALE == "Resale") {
            var condoclustmarker = new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(), geojson.geometry.coordinates[1].toString());
            condoclustmarker.data.icon = resalecondoIcon;
            condoclustmarker.data.popup = ("Name: " + geojson.properties.PROJECT_NAME + "<br> Location: " + geojson.properties.PROPERTY_TYPE + "<br> Price:" + geojson.properties.TYPE_OF_SALE);
            condoCluster.RegisterMarker(condoclustmarker);
            resaleCluster.RegisterMarker(condoclustmarker);
        }

        if (geojson.properties.PROPERTY_TYPE == "Apartment" && geojson.properties.TYPE_OF_SALE == "New Sale") {
            var apartmentclustmarker = new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(), geojson.geometry.coordinates[1].toString());
            apartmentclustmarker.data.icon = newsaleapartmentIcon;
            apartmentclustmarker.data.popup = ("Name: " + geojson.properties.PROJECT_NAME + "<br> Location: " + geojson.properties.PROPERTY_TYPE + "<br> Price:" + geojson.properties.TYPE_OF_SALE);
            apartmentCluster.RegisterMarker(apartmentclustmarker);
            newsaleCluster.RegisterMarker(apartmentclustmarker);
        }
        if (geojson.properties.PROPERTY_TYPE == "Apartment" && geojson.properties.TYPE_OF_SALE == "Sub Sale") {
            var apartmentclustmarker = new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(), geojson.geometry.coordinates[1].toString());
            apartmentclustmarker.data.icon = subsaleapartmentIcon;
            apartmentclustmarker.data.popup = ("Name: " + geojson.properties.PROJECT_NAME + "<br> Location: " + geojson.properties.PROPERTY_TYPE + "<br> Price:" + geojson.properties.TYPE_OF_SALE);
            apartmentCluster.RegisterMarker(apartmentclustmarker);
            subsaleCluster.RegisterMarker(apartmentclustmarker);
        }
        if (geojson.properties.PROPERTY_TYPE == "Apartment" && geojson.properties.TYPE_OF_SALE == "Resale") {
            var apartmentclustmarker = new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(), geojson.geometry.coordinates[1].toString());
            apartmentclustmarker.data.icon = resaleapartmentIcon;
            apartmentclustmarker.data.popup = ("Name: " + geojson.properties.PROJECT_NAME + "<br> Location: " + geojson.properties.PROPERTY_TYPE + "<br> Price:" + geojson.properties.TYPE_OF_SALE);
            apartmentCluster.RegisterMarker(apartmentclustmarker);
            resaleCluster.RegisterMarker(apartmentclustmarker);
        }

        if (geojson.properties.PROPERTY_TYPE == "Terrace House" && geojson.properties.TYPE_OF_SALE == "New Sale") {
            var terraceclustmarker = new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(), geojson.geometry.coordinates[1].toString());
            terraceclustmarker.data.icon = newsaleterraceIcon;
            terraceclustmarker.data.popup = ("Name: " + geojson.properties.PROJECT_NAME + "<br> Location: " + geojson.properties.PROPERTY_TYPE + "<br> Price:" + geojson.properties.TYPE_OF_SALE);
            terraceCluster.RegisterMarker(terraceclustmarker);
            newsaleCluster.RegisterMarker(terraceclustmarker);
        }
        if (geojson.properties.PROPERTY_TYPE == "Terrace House" && geojson.properties.TYPE_OF_SALE == "Sub Sale") {
            var terraceclustmarker = new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(), geojson.geometry.coordinates[1].toString());
            terraceclustmarker.data.icon = subsaleterraceIcon;
            terraceclustmarker.data.popup = ("Name: " + geojson.properties.PROJECT_NAME + "<br> Location: " + geojson.properties.PROPERTY_TYPE + "<br> Price:" + geojson.properties.TYPE_OF_SALE);
            terraceCluster.RegisterMarker(terraceclustmarker);
            subsaleCluster.RegisterMarker(terraceclustmarker);
        }
        if (geojson.properties.PROPERTY_TYPE == "Terrace House" && geojson.properties.TYPE_OF_SALE == "Resale") {
            var terraceclustmarker = new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(), geojson.geometry.coordinates[1].toString());
            terraceclustmarker.data.icon = resaleterraceIcon;
            terraceclustmarker.data.popup = ("Name: " + geojson.properties.PROJECT_NAME + "<br> Location: " + geojson.properties.PROPERTY_TYPE + "<br> Price:" + geojson.properties.TYPE_OF_SALE);
            terraceCluster.RegisterMarker(terraceclustmarker);
            resaleCluster.RegisterMarker(terraceclustmarker);
        }

        if (geojson.properties.PROPERTY_TYPE == "Semi-Detached House" && geojson.properties.TYPE_OF_SALE == "New Sale") {
            var semidclustmarker = new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(), geojson.geometry.coordinates[1].toString());
            semidclustmarker.data.icon = newsalesemidIcon;
            semidclustmarker.data.popup = ("Name: " + geojson.properties.PROJECT_NAME + "<br> Location: " + geojson.properties.PROPERTY_TYPE + "<br> Price:" + geojson.properties.TYPE_OF_SALE);
            semidCluster.RegisterMarker(semidclustmarker);
            newsaleCluster.RegisterMarker(semidclustmarker);
        }
        if (geojson.properties.PROPERTY_TYPE == "Semi-Detached House" && geojson.properties.TYPE_OF_SALE == "Sub Sale") {
            var semidclustmarker = new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(), geojson.geometry.coordinates[1].toString());
            semidclustmarker.data.icon = subsalesemidIcon;
            semidclustmarker.data.popup = ("Name: " + geojson.properties.PROJECT_NAME + "<br> Location: " + geojson.properties.PROPERTY_TYPE + "<br> Price:" + geojson.properties.TYPE_OF_SALE);
            semidCluster.RegisterMarker(semidclustmarker);
            subsaleCluster.RegisterMarker(semidclustmarker);
        }
        if (geojson.properties.PROPERTY_TYPE == "Semi-Detached House" && geojson.properties.TYPE_OF_SALE == "Resale") {
            var semidclustmarker = new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(), geojson.geometry.coordinates[1].toString());
            semidclustmarker.data.icon = resalesemidIcon;
            semidclustmarker.data.popup = ("Name: " + geojson.properties.PROJECT_NAME + "<br> Location: " + geojson.properties.PROPERTY_TYPE + "<br> Price:" + geojson.properties.TYPE_OF_SALE);
            semidCluster.RegisterMarker(semidclustmarker);
            resaleCluster.RegisterMarker(semidclustmarker);
        }
        if (geojson.properties.PROPERTY_TYPE == "Detached House" && geojson.properties.TYPE_OF_SALE == "New Sale") {
            var detachedclustmarker = new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(), geojson.geometry.coordinates[1].toString());
            detachedclustmarker.data.icon = newsaledetachedIcon;
            detachedclustmarker.data.popup = ("Name: " + geojson.properties.PROJECT_NAME + "<br> Location: " + geojson.properties.PROPERTY_TYPE + "<br> Price:" + geojson.properties.TYPE_OF_SALE);
            detachedCluster.RegisterMarker(detachedclustmarker);
            newsaleCluster.RegisterMarker(detachedclustmarker);
        }
        if (geojson.properties.PROPERTY_TYPE == "Detached House" && geojson.properties.TYPE_OF_SALE == "Sub Sale") {
            var detachedclustmarker = new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(), geojson.geometry.coordinates[1].toString());
            detachedclustmarker.data.icon = subsaledetachedIcon;
            detachedclustmarker.data.popup = ("Name: " + geojson.properties.PROJECT_NAME + "<br> Location: " + geojson.properties.PROPERTY_TYPE + "<br> Price:" + geojson.properties.TYPE_OF_SALE);
            detachedCluster.RegisterMarker(detachedclustmarker);
            subsaleCluster.RegisterMarker(detachedclustmarker);

        }
        if (geojson.properties.PROPERTY_TYPE == "Detached House" && geojson.properties.TYPE_OF_SALE == "Resale") {
            var detachedclustmarker = new PruneCluster.Marker(geojson.geometry.coordinates[0].toString(), geojson.geometry.coordinates[1].toString());
            detachedclustmarker.data.icon = resaledetachedIcon;
            detachedclustmarker.data.popup = ("Name: " + geojson.properties.PROJECT_NAME + "<br> Location: " + geojson.properties.PROPERTY_TYPE + "<br> Price:" + geojson.properties.TYPE_OF_SALE);
            detachedCluster.RegisterMarker(detachedclustmarker);
            resaleCluster.RegisterMarker(detachedclustmarker);
        }
    }


    var baselayers = [
        {
            name: "<font color='black'>Base Layers",
            sep: true
        },
        {
            name: "<font color='black'>Open Street Map",
            layer: mainlayer
        },
        //{
        //    name:"<font color='black'>Google Terrain",
        //    layer: gterrain
        //},
        {
            name: "<font color='black'>Google Road Map",
            layer: groadmap
        },
        {
            name: "<font color='black'>Google Satellite",
            layer: gsatellite
        }
    ];


    //Creates an overlay with an interface for checkboxes
    var overlayall = [
        {
            name: "<font color='black'>Sale Type",
            sep: true
        },
        {
            name: "<font color='red'>Resales",
            layer: resaleCluster
        },
        {
            name: "<font color='blue'>Sub Sales",
            layer: subsaleCluster
        },
        {
            name: "<font color='green'>New Sales",
            layer: newsaleCluster
        },
        {
            name: "<font color='black'>Property Type",
            sep: true
        },
        {
            name: "<img src='Icons/execcondo1.png' width=20 height=20> Executive Condominium",
            layer: execcondoCluster
        },
        {
            name: "<img src='Icons/condo1.png' width=20 height=20> Condominium",
            layer: condoCluster
        },
        {
            name: "<img src='Icons/apartment1.png' width=20 height=20> Apartment",
            layer: apartmentCluster
        },
        {
            name: "<img src='Icons/terrace1.png' width=20 height=20> Terrace House",
            layer: terraceCluster
        },
        {
            name: "<img src='Icons/semid1.png' width=20 height=20> Semi-Detached House",
            layer: semidCluster
        },
        {
            name: "<img src='Icons/detached1.png' width=20 height=20> Detached House",
            layer: detachedCluster
        },
        {
            name: "<font color='black'>Show All",
            sep: true
        },
        {
            name: "<img src='Icons/defaultmarker.png' width=13 height=13> All",
            layer: allCluster
        }];

    //Assigning control to overlays, create checkboxes and added to map   
    map.addControl(new L.Control.PanelLayers(baselayers, overlayall, {collapsed: false}));
    
    var prices = L.layerGroup([]);
        
        //Price slider logic
        $("#slider").on("valuesChanged", function(e, data) {
            map.removeLayer(prices);
            prices = L.layerGroup([]);
            for (var i = 0; i < geojsonFeature.length; i++) {
                var geojsonprice = geojsonFeature[i];
                if (Number(geojsonprice.properties.UNIT_PRICE_PSF) >= data.values.min && Number(geojsonprice.properties.UNIT_PRICE_PSF) <= data.values.max) {
                    var price = L.marker(geojsonprice.geometry.coordinates, {icon: priceIcon});
                    prices.addLayer(price);
                }
            }
            prices.addTo(map);
        });
        
}