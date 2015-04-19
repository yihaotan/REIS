<%@page import="java.util.ArrayList"%>
<!doctype html>
<html class="no-js">
    <head>
        <meta charset="UTF-8">
        <title>New REALIS</title>

        <!--IE Compatibility modes-->
        <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge"> -->

        <!--Mobile first-->
        <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->



        <link rel="stylesheet" href="Css/Leaflet.awesome-markers.css">

        <!--        <link rel="stylesheet" href="Css/flat-ui.min.css" type="text/css">-->
        <link rel="stylesheet" href="Css/iThing.css" type="text/css">
        <!--        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" type="text/css">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css" type="text/css">-->
        <link rel='stylesheet' href='Css/dc.css' type='text/css'>
        <link rel='stylesheet' href='Css/bootstrap-select.css' type='text/css'>
        <link rel="stylesheet" href="Css/LeafletStyleSheet.css" type="text/css">
        <!--        <link rel="stylesheet" href="Css/jquery-ui.css" type="text/css">-->
        <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/1.5.2/css/ionicons.min.css">
        <link rel="stylesheet" href="Css/L.Control.Opencagesearch.css" type="text/css">
        <link rel="stylesheet" href="Css/button1.css" type="text/css">
        <link rel="stylesheet" href="Css/jquery.slidepanel.css" type="text/css">
        <link rel="stylesheet" href="Css/jquery.sidr.light.css" type="text/css">
        <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.css"  type="text/css">
        <link rel="stylesheet" href="Css/leaflet.draw.css" type="text/css">
        <link rel="stylesheet" href="Css/jquery.dynatable.css" type="text/css">





        <!--Unknown-->
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true"></script>
        <script src="http://maps.google.com/maps/api/js?v=3&sensor=false"></script>  

        <!--Unknown-->
        <script src="http://d3js.org/d3.v3.min.js" type="text/javascript"></script>
        <script src="Libraries/crossfilter.js" type='text/javascript'></script>
        <!--        <script src='Libraries/jquery.js' type='text/javascript'></script>
                <script src="Libraries/bootstrap.min.js" type='text/javascript' ></script>-->
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

        <!-- Generate Hexagon for accessibility-->
        <script src="GenerateAccessibility.js"></script>
        <!--for drawing-->
        <script src="Libraries/Leaflet.draw1.js"></script>
        <script src="Libraries/Toolbar.js"></script>
        <script src="Libraries/Tooltip.js"></script>
        <script src="Libraries/ext/GeometryUtil.js"></script>
        <script src="Libraries/ext/LatLngUtil.js"></script>
        <script src="Libraries/ext/LineUtil.Intersect.js"></script>
        <script src="Libraries/ext/Polygon.Intersect.js"></script>
        <script src="Libraries/ext/Polyline.Intersect.js"></script>
        <script src="Libraries/draw/DrawToolbar1.js"></script>
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
        <script src="Scripts/Upload/svy21.js"></script>
        <script src="Scripts/Maps/mapGeneration.js"></script>
        <script src='Scripts/Maps/mapCriteriaProcessing.js' type='text/javascript'></script>
        <script src="Scripts/Maps/mapPolygon.js"></script>
        <script src="Scripts/InteractiveUI/generatemapmarkersinbounds.js"></script> 


        <script src="Scripts/Tables/tableGeneration.js"></script>




        <script src="Scripts/Maps/mapUtilities.js"></script>
        <script src="Scripts/Run/main.js"></script> 
        <script src="Scripts/Run/run.js"></script>
        <!--Custom function-->

        <!-- Bootstrap -->
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/css/bootstrap.min.css">

        <!-- Font Awesome -->
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.min.css">

        <!-- Metis core stylesheet -->
        <link rel="stylesheet" href="assets/css/main.min.css">

        <!-- metisMenu stylesheet -->
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/metisMenu/1.1.3/metisMenu.min.css">
        <link rel="stylesheet" href="//cdn.datatables.net/plug-ins/3cfcc339e89/integration/bootstrap/3/dataTables.bootstrap.css">


        <link rel="stylesheet" href="assets/css/style-switcher.css">
        <link rel="stylesheet/less" type="text/css" href="assets/less/theme.less">
        <script src="//cdnjs.cloudflare.com/ajax/libs/less.js/2.2.0/less.min.js"></script>

        <!--Modernizr-->
        <script src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>

        <script src="Libraries/Leaflet.awesome-markers.js"></script>


        <style>
            .tooltip-inner {
                max-width: 500px !important;
            }
            #map { 
                position: relative;
                height: 420px;
                max-width: 100%;
                z-index: 0;
            } 
            .legend {
                line-height: 18px;
                color: #555;
            }
            .legend i {
                width: 18px;
                height: 18px;
                float: left;
                margin-right: 8px;
                opacity: 0.7;
            }

        </style>





    </head>

    <body class="  ">


        <div class="bg-dark dk" id="wrap">

            <div id="top">

                <!-- .navbar -->
                <nav class="navbar navbar-inverse navbar-static-top">

                    <div class="container-fluid">

                        <!-- Brand and toggle get grouped for better mobile display -->
                        <header class="navbar-header">
                            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                                <span class="sr-only">Toggle navigation</span> 
                                <span class="icon-bar"></span> 
                                <span class="icon-bar"></span> 
                                <span class="icon-bar"></span> 
                            </button>
                            <a href="index.html" class="navbar-brand" style="margin-right: 10px;">
                                <img src="assets/img/realis.png" alt="">     
                            </a> 
                        </header>

                        <!--All the buttons-->
                        <div class="topnav">

                            <div class="btn-group">
                                <a data-placement="bottom" data-original-title="Fullscreen" data-toggle="tooltip" class="btn btn-default btn-sm" id="toggleFullScreen">
                                    <i class="glyphicon glyphicon-fullscreen"></i>
                                </a> 
                            </div>

                            <!-- Deleted One Button Group Here -->



                        </div>

                        <div class="collapse navbar-collapse navbar-ex1-collapse">

                            <!-- .nav -->
                            <ul class="nav navbar-nav">

                                <li >
                                    <a href="index.jsp">Data Visualisation</a> 
                                </li>

                                <!-- placeholder for accessibility module, if possible -->
                                <li> 
                                    <a href="Accessibility.jsp">Accessibility</a>  
                                </li>

                                <li class="active"> 
                                    <a href="#">Project Comparison</a>  
                                </li>
                            </ul><!-- /.nav -->
                        </div>
                    </div><!-- /.container-fluid -->
                </nav><!-- /.navbar -->

                <!-- Second Row Control for Search/Retrieval -->
                <header class="head">

                    <!--Not really a search bar-->


                    <div class="main-bar">





                    </div><!-- /.main-bar -->

                </header><!-- /.head -->

            </div><!-- /#top -->




            <!-- The Real Stuff Here -->
            <div id="content">
                <div class="outer">
                    <div class="inner bg-light lter">
                        <div class="row">
                            <div class="col-lg-4 ">

                                <div class="box">
                                    <!-- Header -->
                                    <header>
                                        <div class="icons">
                                            <i class="glyphicon glyphicon-tasks"></i>
                                        </div>
                                        <h5>Analyze a new project</h5>
                                        <div class="toolbar">
                                            <div class="btn-group">
                                                <a href="#inputsAnalysis" data-toggle="collapse" class="btn btn-sm btn-default minimize-box">
                                                    <i class="fa fa-minus"></i>
                                                </a> 
                                                <a class="btn btn-danger btn-sm close-box">
                                                    <i class="fa fa-times"></i>
                                                </a> 
                                            </div>
                                        </div>
                                    </header>
                                    
                                    <%
                                        String error = String.valueOf(request.getAttribute("error"));
                                        
                                        if (!error.equals("null")) {
                                            
                                        
                                    %>
                                    
                                    <div class="alert alert-danger" role="alert" style="margin: 10px;">
                                        <%=error%>
                                    </div>


                                    <%
                                    
                                    }
                                        String[] coor = {};
                                        String number_of_projects = String.valueOf(request.getAttribute("return_num"));

                                        int num = 0;

                                        if (!number_of_projects.equals("null")) {
                                            num = Integer.parseInt(number_of_projects);
                                        }

                                        String latlng_placeholder = "";

                                        String latlng = String.valueOf(request.getAttribute("latlng"));
                                        if (!latlng.equals("null")) {
                                            latlng_placeholder = latlng;
                                            coor = latlng.split(",");

                                        }

                                    %>
                                    <!-- For Table -->
                                    <form id="inputsAnalysis" class="body collapse in" action="PCServlet">
                                        <div class="input-group">
                                            <div class="input-group-btn">
                                                <button type="button" id="selectway" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Select Method <span class="caret"></span></button>
                                                <ul class="dropdown-menu" role="menu">
                                                    <li><a href="#" name="postal">Postal Code</a></li>
                                                    <li><a href="#" name="marker">Map Marker</a></li>

                                                </ul>
                                            </div><!-- /btn-group -->
                                            <input type="text" id="latlng" name="latlng" class="form-control" aria-label="..." readonly value='<%=latlng_placeholder%>'>
                                        </div><!-- /input-group -->


                                        <div id="NumofProjects" class="body collapse in">
                                            <div class="input-group">
                                                <label>Number of projects to compare with</label>
                                                <input type="text" class="form-control" name="number_of_projects" 
                                                       placeholder="e.g 3" size="2" data-toggle="tooltip" data-placement="bottom" 
                                                       title="We will find the nearby projects for you"
                                                       value='<%=num%>'
                                                       >
                                            </div>   
                                        </div>


                                        <button type="submit" class="btn btn-primary">Submit</button>

                                    </form>

                                </div><!-- box -->
                            </div><!-- col -->
                            <!-- Lower Pane for Map -->
                            <div class="col-lg-8 ">
                                <div class="box">
                                    <!-- Header -->
                                    <header>
                                        <div class="icons">
                                            <i class="fa fa-globe"></i>
                                        </div>
                                        <h5>Geospatial View</h5>
                                        <div class="toolbar">
                                            <div class="btn-group">
                                                <div id="clearmap" class="btn btn-info btn-sm" style="background:#ff3333">
                                                    Clear Map Markers
                                                </div> 
                                                <div id="resetmap" class="btn btn-info btn-sm">
                                                    Reset Map
                                                </div> 
                                                <a href="#mapView" data-toggle="collapse" class="btn btn-sm btn-default minimize-box">
                                                    <i class="fa fa-minus"></i>
                                                </a> 

                                            </div>
                                        </div>
                                    </header>
                                    <!-- Content -->
                                    <div id="mapView" class="body collapse in">
                                        <div id="map"></div>
                                    </div>


                                </div><!--box-->

                            </div><!-- /col -->
                        </div> <!-- row -->


                        <div class='row'>
                            <div class="col-lg-12 ">
                                <div class="box">
                                    <!-- Header -->
                                    <header>
                                        <div class="icons">
                                            <i class="fa fa-globe"></i>
                                        </div>
                                        <h5>Table</h5>
                                        <div class="toolbar">
                                            <div class="btn-group">
                                                <a href="#AnalysisTable" data-toggle="collapse" class="btn btn-sm btn-default minimize-box">
                                                    <i class="fa fa-minus"></i>
                                                </a> 

                                            </div>
                                        </div>
                                    </header>
                                    <!-- Content -->
                                    <div id="AnalysisTable" class="body collapse in">
                                        <table id="magic-table" class="table table-bordered table-condensed table-hover table-striped">
                                            <thead>
                                                <tr>
                                                    <th data-dynatable-column="project_name" data-dynatable-sorts>Project Name</th>
                                                    <th data-dynatable-column="property_type" data-dynatable-sorts>Property Type</th>
                                                    <th data-dynatable-column="type_of_sale" data-dynatable-sorts>Type of Sale</th>
                                                    <th data-dynatable-column="tenure" data-dynatable-sorts>Tenure</th>
                                                    <th data-dynatable-column="total_units" data-dynatable-sorts>Total Units</th>
                                                    <th data-dynatable-column="distance" data-dynatable-sorts>Distance</th>
                                                    <th data-dynatable-column="median_price_psf" data-dynatable-sorts>Median Price</th>
                                                </tr>
                                            </thead>      

                                            <tbody>


                                            </tbody>


                                        </table>
                                    </div>
                                </div><!-- box -->
                            </div>
                        </div>

                    </div><!-- /.inner -->
                </div><!-- /.outer -->
            </div><!-- /#content -->






            <footer class="Footer bg-dark dker">
                <p>2015 &copy; Real Estate Information System</p>
            </footer><!-- /#footer -->

            <!-- #helpModal -->
            <div id="helpModal" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title">Modal title</h4>
                        </div>
                        <div class="modal-body">
                            <p>
                                This is it!
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal --><!-- /#helpModal -->

            <div id="right" class="bg-light lter">
                <div class="alert alert-danger">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <strong>Warning!</strong>  Best check yo self, you're not looking too good.
                </div>

                <!-- .well well-small -->
                <div class="well well-small dark">
                    <ul class="list-unstyled">
                        <li>Visitor <span class="inlinesparkline pull-right">1,4,4,7,5,9,10</span> 
                        </li>
                        <li>Online Visitor <span class="dynamicsparkline pull-right">Loading..</span> 
                        </li>
                        <li>Popularity <span class="dynamicbar pull-right">Loading..</span> 
                        </li>
                        <li>New Users <span class="inlinebar pull-right">1,3,4,5,3,5</span> 
                        </li>
                    </ul>
                </div><!-- /.well well-small -->

                <!-- .well well-small -->
                <div class="well well-small dark">
                    <button class="btn btn-block">Default</button>
                    <button class="btn btn-primary btn-block">Primary</button>
                    <button class="btn btn-info btn-block">Info</button>
                    <button class="btn btn-success btn-block">Success</button>
                    <button class="btn btn-danger btn-block">Danger</button>
                    <button class="btn btn-warning btn-block">Warning</button>
                    <button class="btn btn-inverse btn-block">Inverse</button>
                    <button class="btn btn-metis-1 btn-block">btn-metis-1</button>
                    <button class="btn btn-metis-2 btn-block">btn-metis-2</button>
                    <button class="btn btn-metis-3 btn-block">btn-metis-3</button>
                    <button class="btn btn-metis-4 btn-block">btn-metis-4</button>
                    <button class="btn btn-metis-5 btn-block">btn-metis-5</button>
                    <button class="btn btn-metis-6 btn-block">btn-metis-6</button>
                </div><!-- /.well well-small -->

                <!-- .well well-small -->
                <div class="well well-small dark">
                    <span>Default</span> <span class="pull-right"><small>20%</small> </span> 
                    <div class="progress xs">
                        <div class="progress-bar progress-bar-info" style="width: 20%"></div>
                    </div>
                    <span>Success</span> <span class="pull-right"><small>40%</small> </span> 
                    <div class="progress xs">
                        <div class="progress-bar progress-bar-success" style="width: 40%"></div>
                    </div>
                    <span>warning</span> <span class="pull-right"><small>60%</small> </span> 
                    <div class="progress xs">
                        <div class="progress-bar progress-bar-warning" style="width: 60%"></div>
                    </div>
                    <span>Danger</span> <span class="pull-right"><small>80%</small> </span> 
                    <div class="progress xs">
                        <div class="progress-bar progress-bar-danger" style="width: 80%"></div>
                    </div>
                </div>
            </div><!-- /#right -->

        </div>

        <!--jQuery -->
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="Libraries/jquery.dynatable.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/datatables/1.10.4/js/jquery.dataTables.min.js"></script>
        <script src="//cdn.datatables.net/plug-ins/3cfcc339e89/integration/bootstrap/3/dataTables.bootstrap.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.18.4/js/jquery.tablesorter.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"></script>

        <!--Bootstrap -->
        <script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/js/bootstrap.min.js"></script>

        <!-- MetisMenu -->
        <script src="//cdnjs.cloudflare.com/ajax/libs/metisMenu/1.1.3/metisMenu.min.js"></script>

        <!-- Screenfull -->
        <script src="//cdnjs.cloudflare.com/ajax/libs/screenfull.js/2.0.0/screenfull.min.js"></script>

        <!-- Metis core scripts -->
        <script src="assets/js/core.min.js"></script>

        <!-- Metis demo scripts -->
        <script src="assets/js/app.js"></script>
        <script type="text/javascript" language="javascript" src="//cdn.datatables.net/1.10.5/js/jquery.dataTables.min.js"></script>
        <script type="text/javascript" language="javascript" src="//cdn.datatables.net/plug-ins/f2c75b7247b/integration/bootstrap/3/dataTables.bootstrap.js"></script>



        <!--LINK MODULE-->
        <script src="Libraries/hexbin.js"></script>

        <script src="Libraries/d3-leaflet.js"></script>


        <script>
            var markerslayer;
            $('#resetmap').on('click', function () {
                map.setView([1.3667, 103.8], 11)
            });

            var value;
            init_function();
        </script>
        <%if (coor.length > 0) {%>                        
        <script>
            var lat =<%=coor[0]%>;
            var lng =<%=coor[1]%>;
            var redMarker = L.AwesomeMarkers.icon({
                icon: 'home',
                markerColor: 'red'
            });

            markerslayer = L.marker([lat, lng], {icon: redMarker}).addTo(map);


        </script>
        <%}%>
        <script>
            var drawnItems = L.featureGroup().addTo(map);
            map.addControl(new L.Control.Draw({
                edit: {
                    featureGroup: drawnItems
                }
            }));
            map.on('draw:created', function (event) {
                var layer = event.layer;
                if (event.layerType == 'marker') {
                    var marker = layer.getLatLng();
                    document.getElementById("latlng").value = marker.lat + "," + marker.lng;
                }
                layer.on('click', function () {
                    if (event.layerType == 'circle') {
                        var circlecenter = layer.getLatLng();
                        var circleradius = layer.getRadius();
                        var pointswithincircle = getpointswithincircle(filtereddata, circlecenter, circleradius);
                    }

                    else if (event.layerType == 'polygon') {
                        var options = {
                            "backdrop": true,
                            "show": true
                        }
                        var pointswithinpolygon = getpointswithinpolygon(filtereddata, layer.getLatLngs());
                        $('#polygoncharts').modal(options);
                    }
                });
                drawnItems.addLayer(layer);

            });
            $('#clearmap').on('click', function () {
                map.remove();
                init_function();
                var drawnItems = L.featureGroup().addTo(map);
            map.addControl(new L.Control.Draw({
                edit: {
                    featureGroup: drawnItems
                }
            }));
            map.on('draw:created', function (event) {
                var layer = event.layer;
                if (event.layerType == 'marker') {
                    var marker = layer.getLatLng();
                    document.getElementById("latlng").value = marker.lat + "," + marker.lng;
                }
                layer.on('click', function () {
                    if (event.layerType == 'circle') {
                        var circlecenter = layer.getLatLng();
                        var circleradius = layer.getRadius();
                        var pointswithincircle = getpointswithincircle(filtereddata, circlecenter, circleradius);
                    }

                    else if (event.layerType == 'polygon') {
                        var options = {
                            "backdrop": true,
                            "show": true
                        }
                        var pointswithinpolygon = getpointswithinpolygon(filtereddata, layer.getLatLngs());
                        $('#polygoncharts').modal(options);
                    }
                });
                drawnItems.addLayer(layer);

            });
            });
            $(function () {

                $(".dropdown-menu li a").click(function () {
                    if ($(this).text() == "Postal Code") {

                    }
                    $("#selectway").text($(this).text()).append('<span class="caret"></span>');
                    $("#btn").val($(this).text());

                });

            });
        </script>


        <%
            String result = String.valueOf(request.getAttribute("project_comparison_result"));

            if (!result.equals("null")) {
        %>
        <script type="text/javascript">

            var data = <%=result%>;

            var list = [];


            //Charts
            data.forEach(function (d) {
                var pointmarker = [];
                pointmarker.push(d.project_name);
                pointmarker.push(d.geojson.coordinates);
                list.push(pointmarker);
            });


            for (var i = 0; i < list.length; i++) {
                var point = list[i];

                var projectname = point[0];

                var lat = point[1][1];

                var lng = point[1][0];

                var blueMarker = L.AwesomeMarkers.icon({
                    icon: 'home',
                    markerColor: 'blue'
                });

                L.marker([lat, lng], {icon: blueMarker}).addTo(map).bindPopup(projectname);

            }



            if ($('#magic-table').length) {
                //alert("magic");
            }
            $('#magic-table').dynatable({
                dataset: {
                    records: data
                }
            });
            //alert(data[0].project_name);
            //alert(data.length);

        </script>
        <%
            }
        %>








    </body>
</html>
