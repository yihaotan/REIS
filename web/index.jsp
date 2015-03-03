<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <title>TEAM REALIS</title>

        <link rel="stylesheet" href="Css/flat-ui.min.css" type="text/css">
        <link rel="stylesheet" href="Css/iThing.css" type="text/css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" type="text/css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css" type="text/css">
        <link rel='stylesheet' href='Css/dc.css' type='text/css'>
        <link rel='stylesheet' href='Css/bootstrap-select.css' type='text/css'>
        <link rel="stylesheet" href="Css/LeafletStyleSheet.css" type="text/css">
        <link rel="stylesheet" href="Css/jquery-ui.css" type="text/css">
        <link rel="stylesheet" href="Css/L.Control.Opencagesearch.css" type="text/css">
        <link rel="stylesheet" href="Css/button1.css" type="text/css">
        <link rel="stylesheet" href="Css/jquery.slidepanel.css" type="text/css">
        <link rel="stylesheet" href="Css/jquery.sidr.light.css" type="text/css">
        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css"  type="text/css">
        <link rel="stylesheet" href="Css/leaflet.draw.css" type="text/css">
        <!--Unknown-->
        <script src="http://maps.google.com/maps/api/js?v=3&sensor=false"></script>  
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true"></script>
        <!--Unknown-->
        <script src="Libraries/d3.v3.min.js" type="text/javascript"></script>
        <script src="Libraries/crossfilter.js" type='text/javascript'></script>
        <script src='Libraries/jquery.js' type='text/javascript'></script>
        <script src="Libraries/bootstrap.min.js" type='text/javascript' ></script>
        <script src="Libraries/leaflet.js" type='text/javascript'></script>
        <script src="Libraries/leaflet-src.js" type='text/javascript'></script>
        <script src="Libraries/Googlemap.js" type='text/javascript'></script>
        <script src="Libraries/bootstrap-select.js" type='text/javascript'></script> 
        <script src="Libraries/PruneCluster.js" type='text/javascript'></script>
        <script src="Libraries/heatmap.js" type='text/javascript'></script> 
        <script src="Libraries/leaflet-heatmap.js" type='text/javascript'></script>
        <script src='Libraries/dc.js' type='text/javascript'></script>  
        <script src="Libraries/L.Control.Opencagesearch.js" type='text/javascript'></script>
        <script src="Libraries/jquery.slidepanel.js" type="text/javascript"></script>
        <script src="Libraries/jquery.sidr.min.js" type="text/javascript"></script>
        <script src="Libraries/modernizr.js" type="text/javascript"></script> 
        <script src="Libraries/reductio.js" type="text/javascript"></script> 
        <script src="Libraries/Mergesort.js" type="text/javascript"></script>
        <script src="Libraries/jQEditRangeSlider-min.js" type="text/javascript"></script>
        <!--for drawing-->
        <script src="Libraries/Leaflet.draw1.js"></script>
        <script src="Libraries/Toolbar.js"></script>
        <script src="Libraries/Tooltip.js"></script>
        <script src="Libraries/ext/GeometryUtil.js"></script>
        <script src="Libraries/ext/LatLngUtil.js"></script>
        <script src="Libraries/ext/LineUtil.Intersect.js"></script>
        <script src="Libraries/ext/Polygon.Intersect.js"></script>
        <script src="Libraries/ext/Polyline.Intersect.js"></script>
        <script src="Libraries/draw/DrawToolbar.js"></script>
        <script src="Libraries/draw/handler/Draw.Feature.js"></script>
        <script src="Libraries/draw/handler/Draw.SimpleShape.js"></script>
        <script src="Libraries/draw/handler/Draw.Polyline.js"></script>
        <script src="Libraries/draw/handler/Draw.Circle.js"></script>
        <script src="Libraries/draw/handler/Draw.Marker.js"></script>
        <script src="Libraries/draw/handler/Draw.Polygon.js"></script>
        <script src="Libraries/draw/handler/Draw.Rectangle.js"></script>
        <script src="Libraries/edit/EditToolbar.js"></script>
        <script src="Libraries/edit/handler/EditToolbar.Edit.js"></script>
        <script src="Libraries/edit/handler/EditToolbar.Delete.js"></script>
        <script src="Libraries/Control.Draw.js"></script>
        <script src="Libraries/edit/handler/Edit.Poly.js"></script>
        <script src="Libraries/edit/handler/Edit.SimpleShape.js"></script>
        <script src="Libraries/edit/handler/Edit.Circle.js"></script>
        <script src="Libraries/edit/handler/Edit.Rectangle.js"></script>
        <script src="Libraries/edit/handler/Edit.Marker.js"></script>
        <!--for drawing-->

        <!--Custom Function-->
        <script src="Scripts/Upload/dropzone.js"></script>
        <script src="Scripts/Upload/svy21.js"></script>
        <script src="Scripts/Maps/mapGeneration.js"></script>
        <script src='Scripts/Maps/mapCriteriaProcessing.js' type='text/javascript'></script>
        <script src="Scripts/Maps/mapPolygon.js"></script>
        <script src="Scripts/InteractiveUI/generatemapmarkersinbounds.js"></script> 
        <script src="Scripts/Charts/chartUtilities.js"></script>
        <script src="Scripts/Charts/chartGeneration.js"></script>
        <script src="Scripts/Maps/mapUtilities.js"></script>

        <script src="Scripts/Run/test.js"></script>

        <!--Custom Function-->

        <style type="text/css"></style>
        <style>
            .header {
                padding-top: 0px;
                padding-bottom: 0px;
                height: 55px;
            }
            .leaflet-control-layers-toggle {
                width: 100px;
                height: 100px;
                position:absolute;
                top:-40px;
                right:-40px;
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
                                    <a class="navbar-brand" style="color:white" href="#">TEAM REALIS</a>
                                </div>
                                <div class="collapse navbar-collapse" id="demo-navbar-collapse">
                                    <ul class="nav navbar-nav">
                                        <!--
                                        <li class="active"><a href="#">Home</a></li>
                                        <li><a href="#">About</a></li>
                                        <li><a href="#">Contact</a></li>
                                        -->
                                    </ul>

                                    <%
                                        String planning_area = String.valueOf(request.getAttribute("planning_area"));
                                        String start_price = String.valueOf(request.getAttribute("start_price"));
                                        String end_price = String.valueOf(request.getAttribute("end_price"));
                                        String start_size = String.valueOf(request.getAttribute("start_size"));
                                        String end_size = String.valueOf(request.getAttribute("end_size"));

                                        if (planning_area.equals("null")) {
                                            planning_area = "";
                                            start_price = "";
                                            end_price = "";
                                            start_size = "";
                                            end_size = "";
                                        }

                                    %>
                                            
                                            
                                            
                                            
                                            
                                    <form class="navbar-form navbar-left pull-left" action="DBServlet">     
                                        <div class="form-group">

                                            <input type="text" class="form-control" name="planning_area" placeholder="Planning Area" size="8" value='<%=planning_area%>' >

                                            <div class="input-group">
                                                <span class="input-group-addon">$</span>
                                                <input type="text" class="form-control" name="start_price" placeholder="Start Price" size="3" value='<%=start_price%>' >
                                            </div>
                                            <div class="input-group">
                                                <span class="input-group-addon">$</span>
                                                <input type="text" class="form-control" name="end_price" placeholder="End Price" size="3" value='<%=end_price%>' >
                                            </div>
                                            <input type="text" class="form-control" name="start_size" placeholder="Start Size" size="5" value='<%=start_size%>' >
                                            <input type="text" class="form-control" name="end_size" placeholder="End Size" size="5" value='<%=end_size%>' >
                                            <button type="submit" class="btn btn-primary">Submit</button>
                                        </div>
                                    </form>
                                    <div class="navbar-form navbar-left pull-right"> 
                                        <button type="button" id="right-menu" class="btn btn-danger" aria-label="Right Align">
                                            <span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
                                        </button
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>


            <!--  Content Area-->
            <div class="row upper-content">

                <!-- LEFT: charts -->
                <div class="col-md-3 col-sm-6">


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
                <div class="col-md-5 col-sm-6">
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
                <div class="col-md-4 col-sm-6">
                    <div class="row">
                        <div class='span6' id='dc-control-chart'>
                            <h6> Line Chart</h6>
                        </div>
                    </div>
                </div>

                <!-- RIGHT: histogram -->
                <div class="col-md-3 col-sm-6">
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

        <%            String result = String.valueOf(request.getAttribute("result"));

            if (!result.equals("null")) {
        %>
        <script type="text/javascript">
            var globalDimension;
            var data = <%=result%>;
            generateCharts(data);
        </script>
        <%
            }
        %>



    </body>


</html>
