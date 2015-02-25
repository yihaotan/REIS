<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <title>TEAM REALIS</title>

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

        <script src="UIlibraries/jQEditRangeSlider-min.js"></script>

        <style type="text/css"></style>
        <style>
            .header {
                padding-top: 0px;
                padding-bottom: 0px;
                height: 55px;
            }

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



            
            #map { 
                position: relative;
                height: 420px;
                width: 1012px;
                float: left;
                z-index: 0;
            }  
            #dc-propertyVolume-chart{
                float: right;
                position: relative;
                top: 0px;
                right: 15px;
            }
            #dc-propertySaleVolume-chart{
                float: right;
                position: relative;
                top: 0px;
                right: 15px;
            }
            #dc-propertyTenureVolume-chart{
                float: right;
                position: relative;
                top: 0px;
                right: 15px;
            }
            #count-table {
                float: right;
                position: relative;
                top: 0px;
                right: 15px;
            }
            
            #dc-dateVolume-chart{
                float: left;
                position: relative;
                top: 0px;
                left: 15px;
            }
            #dc-control-chart{
                float: left;
                position: relative;
                top: 0px;
                left: 15px;
            }
            #dc-histogram{
                float: left;
                position: relative;
                top: 0px;
                left: 15px;
            }
            
            
            
            
            
            

            #dc-psfBoxPlot-chart{
                float: left;
                position:absolute;
                top:110px;
                left: 236px;
            }
            





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

        <%@ page import="java.util.*" %>
        <%@ page import="entity.*" %>
        <%@ page import="com.google.gson.*" %>

        <script>

            $(document).ready(function () {
                $('#right-menu').sidr({
                    name: 'sidr-right',
                    side: 'right',
                    source: 'external.html',
                    displace: false,
                    onOpen: function () {
                        document.getElementById('map').style.width = 900 + 'px';
                        document.getElementById('map').style.cssFloat = "left";
                    },
                    onClose: function () {
                        document.getElementById('map').style.width = 1012 + 'px';
                        map.setView([1.3667, 103.8], 11);
                    }
                });
            });
            var opened = false;
            $(document).ready(function () {
                $('#left-menu').sidr({
                    name: 'sidr-left',
                    side: 'left',
                    source: 'graphsforpolygon.html',
                    displace: false,
                    onOpen: function () {
                        opened = true;
                        document.getElementById('map').style.width = 900 + 'px';
                        document.getElementById('map').style.cssFloat = "right";
                    },
                    onClose: function () {
                        opened = false;
                        document.getElementById('map').style.width = 1012 + 'px';
                        map.setView([1.3667, 103.8], 11);
                    }

                });
            });
        </script>

        <script>
            $(function () {
//                $("#dc-propertyRegionVolume-chart").hide();
                $("#dc-psfBoxPlot-chart").hide();
            });
        </script>

        <!-- =================== BODY START =================== -->

        <div class="container-fluid">

            <!--  Header Section-->
            <div class="row header">
                <div class="col-md-12" style="height: 55px">
                    <!-- navigation bar -->
                    <div class="row navigation-bar">
                        <nav class="navbar navbar-default navbar-fixed-top" role="navigation" style="background: black;">
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
            <div class="row upper-content">

                <!-- LEFT: charts -->
                <div class="col-md-3 col-sm-6" style="background:">

                    <!-- DATA COUNT -->
                    <div class="row">
                        <div class="dc-data-count" id='count-table' >
                            <span>
                                <span class="filter-count"></span>
                                selected out of 
                                <span class="total-count"></span>
                                records | 
                                <a href="javascript:dc.filterAll(); dc.renderAll();">Reset All</a>
                            </span>
                        </div>
                    </div>
                    <!-- Property Volume Chart -->
                    <div class="row">
                        <div class='span4' id='dc-propertyVolume-chart'>
                            <h6>Property Volume
                                <button type="button" class="btn btn-primary btn-xs" id="bar1" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-signal" aria-hidden="true"></span>
                                </button>
                                <button type="button" class="btn btn-danger btn-xs" id="pie1" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-adjust" aria-hidden="true"></span>
                                </button>
                                <span>
                                    <a class="reset"
                                       href="javascript:propertyVolumeRowChart.filterAll();dc.redrawAll();"
                                       style="display: none;">
                                        reset
                                    </a>
                                </span>
                            </h6>
                        </div>
                    </div>
                    <!-- Sale Volume Chart -->
                    <div class="row">
                        <div class='span4' id='dc-propertySaleVolume-chart'>
                            <h6>Sale Volume
                                <button type="button" class="btn btn-primary btn-xs" id="bar2" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-signal" aria-hidden="true"></span>
                                </button>
                                <button type="button" class="btn btn-danger btn-xs" id="pie2" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-adjust" aria-hidden="true"></span>
                                </button>
                                <span>
                                    <a class="reset"
                                       href="javascript:propertySaleVolumePieChart.filterAll();dc.redrawAll();"
                                       style="display: none;">
                                        reset
                                    </a>
                                </span>
                            </h6>
                        </div>
                    </div>
                    <!-- Tenure Volume Chart -->
                    


                </div>

                <!-- RIGHT: map & date -->
                <div class="col-md-9 col-sm-12">

                    <div class="row">
                        <div id="map"></div>
                    </div>

                </div>

            </div>

            <div class="row lower-content">
                <!-- LEFT: time series -->
                <div class="col-md-5 col-sm-6" style="background: blue;">
                    <div class="row">
                        <div class='span12' id='dc-dateVolume-chart'>
                            <h6>
                                <font color="white">Transaction Volume vs Date</font>
                                <span>
                                    <a class="reset"
                                       href="javascript:dateVolumeBarChart.filterAll();dc.redrawAll();"
                                       style="display: none;">
                                        reset
                                    </a>
                                </span>
                            </h6>
                        </div>
                    </div>
                </div>

                <!-- MIDDLE: price line -->
                <div class="col-md-4 col-sm-6" style="background: yellow;">
                    <div class="row">
                        <div class='span6' id='dc-control-chart'>
                            <h6> Line Chart</h6>
                        </div>
                    </div>
                </div>
                
                <!-- RIGHT: histogram -->
                <div class="col-md-3 col-sm-6" style="background: pink;">
                    <div class="row">
                        <div class='span6' id='dc-histogram'>
                        <h6>Histogram</h6>
                    </div>
                    </div>
                </div>

            </div>


            
            <script>
                init_function();
            </script>

            <div class='container' style='font: 12px sans-serif;'  >

                <div class ="row" id='placeholder'></div>
                <div class='row'>
                    <div class='span12' id='dc-psfBoxPlot-chart'>

                        <select class="selectpicker" data-style="btn-inverse" data-width="150px">
                            <option>Psf</option>
                            <option>Psm</option>
                            <option>Price</option>
                        </select>

                        <h4>
                            BoxPlot
                            <span>
                                <a class="reset"
                                   href="javascript:boxPlotChart.filterAll();dc.redrawAll();"
                                   style="display: none;">
                                    reset
                                </a>
                            </span>
                        </h4>
                    </div>
                </div>
                <div class='row'>
                    


                </div>
                <div class='row'>



                </div>

                <div class='row'>


                </div>

            </div>    

        </div>

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

            // Get the planning area name in string
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
