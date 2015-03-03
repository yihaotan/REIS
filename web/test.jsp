<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP TEST</title>

        <script src="Upload/dropzone.js"></script>
        <script src="Upload/svy21.js"></script>
        <link rel="stylesheet" type="text/css" href="Css/flat-ui.min.css">
        <link rel="stylesheet" href="Css/iThing.css" type="text/css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
        <link href='Css/dc.css' rel='stylesheet' type='text/css'>
        <link href='Css/bootstrap-select.css' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="Css/LeafletStyleSheet.css" type="text/css"  />
        <link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
        <link rel="stylesheet" href="Css/L.Control.Opencagesearch.css" />
        <link rel="stylesheet" href="Css/button1.css" />
        <link rel="stylesheet" type="text/css" href="Css/jquery.slidepanel.css">
        <link rel="stylesheet" href="Css/jquery.sidr.light.css">

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>

        <script src="http://d3js.org/d3.v3.min.js" type="text/javascript"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/crossfilter/1.3.11/crossfilter.js"></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.js' type='text/javascript'></script>

        <script src="//code.jquery.com/jquery-1.10.2.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
        <script src="//code.jquery.com/ui/1.11.2/jquery-ui.js"></script>

        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
        <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>

        <script src="http://maps.google.com/maps/api/js?v=3&sensor=false"></script>  
        <script src="Maps/leaflet.js"></script>
        <script src="Maps/leaflet-src.js"></script>
        <script src="Maps/Googlemap.js"></script>
        <script src="Maps/map.js"></script>

        <script src='CriteriaProcessing/CriteriaProcessing.js' type='text/javascript'></script>

        <script src="Upload/svy21.js"></script>
        <script src="UIlibraries/bootstrap-select.js"></script> 
        <script src="UIlibraries/PruneCluster.js"></script>
        <script src="UIlibraries/heatmap.js"></script> 
        <script src="UIlibraries/leaflet-heatmap.js"></script>
        <script src='UIlibraries/dc.js' type='text/javascript'></script>  
        <script src="UIlibraries/L.Control.Opencagesearch.js"></script>
        <script src="GraphGeneration/2013.json"></script>

        <script type="text/javascript" src="UIlibraries/jquery.slidepanel.js"></script>
        <script src="UIlibraries/jquery.sidr.min.js"></script>

        <script src="UIlibraries/modernizr.js"></script> 
        <script src="UIlibraries/reductio.js"></script> 
        <script src="UIlibraries/crossfilter.js"></script> 
        <script src="InteractiveUI/generatemapmarkersinbounds.js"></script> 

        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true"></script>
        <script src="Mergesort/Mergesort.js"></script>
        <script src="Maps/pointinpolygon.js"></script>

        <!--for drawing-->
        <script src="src/Leaflet.draw.js"></script>
        <link rel="stylesheet" href="dist/leaflet.draw.css" />

        <script src="src/Toolbar.js"></script>
        <script src="src/Tooltip.js"></script>

        <script src="src/ext/GeometryUtil.js"></script>
        <script src="src/ext/LatLngUtil.js"></script>
        <script src="src/ext/LineUtil.Intersect.js"></script>
        <script src="src/ext/Polygon.Intersect.js"></script>
        <script src="src/ext/Polyline.Intersect.js"></script>

        <script src="src/draw/DrawToolbar.js"></script>
        <script src="src/draw/handler/Draw.Feature.js"></script>
        <script src="src/draw/handler/Draw.SimpleShape.js"></script>
        <script src="src/draw/handler/Draw.Polyline.js"></script>
        <script src="src/draw/handler/Draw.Circle.js"></script>
        <script src="src/draw/handler/Draw.Marker.js"></script>
        <script src="src/draw/handler/Draw.Polygon.js"></script>
        <script src="src/draw/handler/Draw.Rectangle.js"></script>

        <script src="src/edit/EditToolbar.js"></script>
        <script src="src/edit/handler/EditToolbar.Edit.js"></script>
        <script src="src/edit/handler/EditToolbar.Delete.js"></script>

        <script src="src/Control.Draw.js"></script>

        <script src="src/edit/handler/Edit.Poly.js"></script>
        <script src="src/edit/handler/Edit.SimpleShape.js"></script>
        <script src="src/edit/handler/Edit.Circle.js"></script>
        <script src="src/edit/handler/Edit.Rectangle.js"></script>
        <script src="src/edit/handler/Edit.Marker.js"></script>
        <script src="GraphGeneration/functionA.js"></script>

        <script src="../UIlibraries/jQEditRangeSlider-min.js"></script>

        <style type="text/css"></style>


        <style>
            .header {
                padding-top: 20px;
                padding-bottom: 0px;
            }

            .footer {
                border-top: 1px solid #444;
                padding-top: 20px;
                margin-top: 20px;
                color: #999
            }

/*            .p {
                text-align: center;
                padding-top: 120px;
            }

            .p a {
                text-decoration: underline;
                color: blue;
            }*/

            // FROM INDEX
            .leaflet-control-layers-toggle {
                background-image: url(Icons/LayerMap.jpg)!important;
                width: 95px;
                height: 95px;
                position:absolute;
                top:-10px;
                right:-10px;
            }
            .leaflet-control-layers-expanded {
                padding: 15px 15px 30px 15px;
                color: #333;
                background: #fff;
            }
            .leaflet-container {
                font: 16px/1.5 "Helvetica Neue", Arial, Helvetica, sans-serif;
            }
            .bs-example{
                margin: 20px;
            }
            #map { 
                position: fixed;
                float: left;
                z-index: 0;
            }    
            h4 span {
                font-size: 14px;
                font-weight: normal;
            }
            h2 {
                float: right;
            }
            h2 span {
                font-size: 14px;
                font-weight: normal;
            }
            #dc-propertyVolume-chart{
                float: left;
                position: relative;
                top: 15px;
                left: 15px;
            }
            #dc-propertySaleVolume-chart{
                float: left;
                position: fixed;
                top: 230px;
                left: 15px;
            }
            #dc-propertyTenureVolume-chart{
                float: left;
                position: absolute;
                top: 230px;
                left: 15px;
            }
            
            
            
            
            #dc-dateVolume-chart{
                float:left;
                position:fixed;
                top: 440px;
                left: 15px;
            }
            #dc-control-chart{
                float:left;
                position:fixed;
                top:440px;
                right: 9px;
            }

            #dc-psfBoxPlot-chart{
                float:left;
                position:absolute;
                top:110px;
                left: 236px;
            }
            #dc-histogram{
                float:left;
                position:absolute;
                top:230px;
                right: 80px;
            }
/*            #table{
                float:left;
                position:absolute;
                top:700px;
                left:80px;
            }*/
            #dc-table-graph{
                float:left;
                position:absolute;
                top:800px; 
                left:20px;
            }
            .button1{
                float:right;
                position:fixed;
                top:50px;
            }
        </style>

    </head>
    <body>

        <!-- JS for polygon-drawing and table-coming -->
        <script type="text/javascript">
            $(document).ready(function () {
                $('#right-menu').sidr({
                    name: 'sidr-right',
                    side: 'right',
                    source: 'external.html',
                    onOpen: function () {
                        document.getElementById('map').style.width = 600 + 'px';
                    },
                    onClose: function () {
                        document.getElementById('map').style.width = 1100 + 'px';
                        map.setView([1.3667, 103.8], 11);
                    }
                });
            });
            var opened = false;
            $(document).ready(function () {
                $('#left-menu').sidr({
                    name: 'sidr-left',
                    side: 'left',
                    speed: 550,
                    source: 'graphsforpolygon.html',
                    onOpen: function () {
                        opened = true;
                        document.getElementById('map').style.width = 800 + 'px';
                        document.getElementById('map').style.cssFloat = "left";
                    },
                    onClose: function () {
                        opened = false;
                        document.getElementById('map').style.width = 1100 + 'px';
                        document.getElementById('map').style.cssFloat = "right";
                        map.setView([1.3667, 103.8], 11);
                    }
                });
            });
        </script>

        <!-- JS for disabling some charts from showing -->
        <script type="text/javascript">
            $(function () {
//                $("#dc-propertyRegionVolume-chart").hide();
//                $("#dc-psfBoxPlot-chart").hide();
//                $("#dc-histogram").hide();
            });
        </script>

        <!-- =================== BODY START =================== -->
        <div class="container-fluid">

            <!--  Header Section-->
            <div class="row header">
                <div class="col-xs-12 text-center">
                    <!-- navigation bar -->
                    <div class="row navigation-bar">
                        <nav class="navbar navbar-default" role="navigation" style="background: black;">
                            <div class="container-fluid">
                                <div class="navbar-header">
                                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#demo-navbar-collapse">
                                        <span class="sr-only">Toggle navigation</span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                    </button>
                                    <a class="navbar-brand" style="color:white" href="#">R</a>
                                </div>
                                <div class="collapse navbar-collapse" id="demo-navbar-collapse">
                                    <ul class="nav navbar-nav">
                                        <!--
                                        <li class="active"><a href="#">Home</a></li>
                                        <li><a href="#">About</a></li>
                                        <li><a href="#">Contact</a></li>
                                        -->
                                    </ul>
                                    <form class="navbar-form navbar-left pull-right" action="DBServlet">     
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="planning_area" placeholder="Planning Area">
                                            <input type="text" class="form-control" name="start_price" placeholder="Start Price">
                                            <input type="text" class="form-control" name="end_price" placeholder="End Price">
                                            <input type="text" class="form-control" name="start_size" placeholder="Start Size">
                                            <input type="text" class="form-control" name="end_size" placeholder="End Size">
                                            <button type="submit" class="btn btn-primary">Submit</button>
                                            <button type="button" id="right-menu" class="btn btn-danger" aria-label="Left Align">
                                                <span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

            <!--  Content Area-->
            <div class="row content">

                <!-- LEFT: charts -->
                <div class="col-md-3 col-sm-6">

                    <!-- DATA COUNT -->
                    <div class="row">
                        <div class="dc-data-count" id='table' >
                            <h2>
                                <span>
                                    <span class="filter-count"></span>
                                    selected out of 
                                    <span class="total-count"></span>
                                    records | 
                                    <a href="javascript:dc.filterAll(); dc.renderAll();">Reset All</a>
                                </span>
                            </h2>
                        </div>
                    </div>
                    <!-- Property Volume Chart -->
                    <div class="row">
                        <div class='span4' id='dc-propertyVolume-chart'>
                            <h4>Property Volume
                                <button type="button" class="btn btn-primary btn-mini" id="bar1" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-signal" aria-hidden="true"></span>
                                </button>
                                <button type="button" class="btn btn-danger btn-mini" id="pie1" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-adjust" aria-hidden="true"></span>
                                </button>
                                <span>
                                    <a class="reset"
                                       href="javascript:propertyVolumeRowChart.filterAll();dc.redrawAll();"
                                       style="display: none;">
                                        reset
                                    </a>
                                </span>
                            </h4>
                        </div>
                    </div>
                    <!-- Sale Volume Chart -->
                    <div class="row">
                        <div class='span4' id='dc-propertySaleVolume-chart'>
                            <h4>Sale Volume
                                <button type="button" class="btn btn-primary btn-mini" id="bar2" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-signal" aria-hidden="true"></span>
                                </button>
                                <button type="button" class="btn btn-danger btn-mini" id="pie2" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-adjust" aria-hidden="true"></span>
                                </button>
                                <span>
                                    <a class="reset"
                                       href="javascript:propertySaleVolumePieChart.filterAll();dc.redrawAll();"
                                       style="display: none;">
                                        reset
                                    </a>
                                </span>
                            </h4>
                        </div>
                    </div>
                    <!-- Tenure Volume Chart -->
                    <div class="row">
                        <div class='span4' id='dc-propertyTenureVolume-chart'>
                            <h4> Tenure Volume
                                <button type="button" class="btn btn-primary btn-mini" id="bar3" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-signal" aria-hidden="true"></span>
                                </button>
                                <button type="button" class="btn btn-danger btn-mini" id="pie3" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-adjust" aria-hidden="true"></span>
                                </button>
                                <span>
                                    <a class="reset"
                                       href="javascript:propertyTenureVolumePieChart.filterAll();dc.redrawAll();"
                                       style="display: none;">
                                        reset
                                    </a>
                                </span>
                            </h4>
                        </div> 
                    </div>

                </div>

                <!-- RIGHT: map & date -->
                <div class="col-md-9 col-sm-12" style="background: red;">

                    <!-- map -->
                    <div class="row">
                        <script src="map.js"></script> 
                        <div id="map" style="width: 70%; height: 50%;"></div>
                    </div>

                    <!-- date -->
                    <div class="row">
                        <div class='span9' id='dc-dateVolume-chart'>
                            <h4>
                                Transaction Volume vs Date
                                <span>
                                    <a class="reset"
                                       href="javascript:dateVolumeBarChart.filterAll();dc.redrawAll();"
                                       style="display: none;">
                                        reset
                                    </a>
                                </span>
                            </h4>
                        </div>
                    </div>


                </div>
            </div>

            <!--  Footer Area-->
            <div class="row footer">
                <div class="col-xs-12 text-center">
                    
                </div>
            </div>

        </div>

        <script type="text/javascript">
            init_function();
        </script>

        <!-- map view -> table -->
        <script>
            map.on('zoomend',
                    function () {
                        var mapboundarray = [];
                        mapboundarray.push(map.getBounds().getSouthWest());
                        mapboundarray.push(map.getBounds().getNorthWest());
                        mapboundarray.push(map.getBounds().getNorthEast());
                        mapboundarray.push(map.getBounds().getSouthEast());
                        $(".table > tbody").html("");
                        var datatable = getmapmarkers(mapboundarray, filtereddata);
                        for (i = 0; i < datatable.length; i++) {
                            var projectName = datatable[i].properties.PROJECT_NAME;
                            var propertyType = datatable[i].properties.PROPERTY_TYPE;
                            var tenure = datatable[i].properties.TENURE;
                            var price = datatable[i].properties.TRANSACTED_PRICE;
                            var planningArea = datatable[i].properties.PLANNING_AREA;
                            var postalDistrict = datatable[i].properties.POSTAL_DISTRICT;
                            $('.table').append('<tbody><tr><td>' + projectName +
                                    '</td><td>' + propertyType +
                                    '</td><td>' + tenure +
                                    '</td><td>' + price +
                                    '</td><td>' + planningArea +
                                    '</td><td>' + postalDistrict +
                                    '</td></tr></tbody>'
                                    );
                        }
                    });
            map.on('dragend',
                    function () {
                        var mapboundarray = [];
                        mapboundarray.push(map.getBounds().getSouthWest());
                        mapboundarray.push(map.getBounds().getNorthWest());
                        mapboundarray.push(map.getBounds().getNorthEast());
                        mapboundarray.push(map.getBounds().getSouthEast());
                        var datatable = getmapmarkers(mapboundarray, filtereddata);
                        $(".table > tbody").html("");
                        for (i = 0; i < datatable.length; i++) {
                            var projectName = datatable[i].properties.PROJECT_NAME;
                            var propertyType = datatable[i].properties.PROPERTY_TYPE;
                            var tenure = datatable[i].properties.TENURE;
                            var price = datatable[i].properties.TRANSACTED_PRICE;
                            var planningArea = datatable[i].properties.PLANNING_AREA;
                            var postalDistrict = datatable[i].properties.POSTAL_DISTRICT;
                            $('.table').append('<tbody><tr><td>' + projectName +
                                    '</td><td>' + propertyType +
                                    '</td><td>' + tenure +
                                    '</td><td>' + price +
                                    '</td><td>' + planningArea +
                                    '</td><td>' + postalDistrict +
                                    '</td></tr></tbody>'
                                    );
                        }
                    });
        </script>


        <%
            // Database connection
            String result = String.valueOf(request.getAttribute("result"));

            if (!result.equals("null")) {
        %>
        <script type="text/javascript">
            var data = <%=result%>;
            charting(data);
        </script>
        <%
            }
        %>


    </body>
</html>
