<!doctype html>
<html class="no-js">
    <head>
        <meta charset="UTF-8">
        <title>New REALIS</title>

        <!--IE Compatibility modes-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <!--Mobile first-->
        <meta name="viewport" content="width=device-width, initial-scale=1">





        <!--        <link rel="stylesheet" href="Css/flat-ui.min.css" type="text/css">-->
        <link rel="stylesheet" href="Css/iThing.css" type="text/css">
        <!--        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" type="text/css">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css" type="text/css">-->
        <link rel='stylesheet' href='Css/dc.css' type='text/css'>
        <link rel='stylesheet' href='Css/bootstrap-select.css' type='text/css'>
        <link rel="stylesheet" href="Css/LeafletStyleSheet.css" type="text/css">
        <!--        <link rel="stylesheet" href="Css/jquery-ui.css" type="text/css">-->
        <link rel="stylesheet" href="Css/L.Control.Opencagesearch.css" type="text/css">
        <link rel="stylesheet" href="Css/button1.css" type="text/css">
        <link rel="stylesheet" href="Css/jquery.slidepanel.css" type="text/css">
        <link rel="stylesheet" href="Css/jquery.sidr.light.css" type="text/css">
        <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.css"  type="text/css">
        <link rel="stylesheet" href="Css/leaflet.draw.css" type="text/css">
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


        <script src="Libraries/d3-starplot.js" type='text/javascript'></script>

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







            #target {
                margin: 40px 0;
            }
            .wrapper {
                position: relative;
                display: inline-block;
            }
            .chart {
                margin-bottom: 40px;
            }
            .star-title {
                font-size: 14px;
            }
            .star-label {
                font-size: 11px;
                pointer-events: none;
            }
            .star-origin {
                fill: #333;
            }
            .star-axis {
                stroke: #ccc;
                stroke-width: 2px;
                stroke-dasharray: 4 5;
            }
            .star-path {
                stroke: #444;
                stroke-width: 2px;
                fill: #709CB1;
                fill-opacity: 0.6;
            }
            .star-interaction {
                opacity: 0;
            }

            .interaction {
                pointer-events: none;
            }
            .interaction.label {
                position: absolute;
                font-size: 11px;
                stroke:#000000;
                //text-shadow: 0 1px 0 #FFF, 0 -1px 0 #FFF, 1px 0 #FFF, -1px 0 #FFF;
            }
            .interaction.circle {
                fill: #444;
                fill-opacity: 0.6;
                stroke: #444;
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
                                <li class="active"> 
                                    <a href="#">Accessibility</a>  
                                </li>

                                <li> 
                                    <a href="ProjectComparison.jsp">Project Comparison</a>  
                                </li>

                            </ul><!-- /.nav -->
                        </div>
                    </div><!-- /.container-fluid -->
                </nav><!-- /.navbar -->

                <!-- Second Row Control for Search/Retrieval -->
                <header class="head">

                    <!--Left part: Not really a search bar-->
<!--                    <div class="search-bar">
                        <h3 style="float: right;">
                            <i class="fa fa-filter"></i> &nbsp;Filtering By
                        </h3>
                    </div> /.search-bar -->

                    <div class="main-bar">

                        <!--The Legendary Data Retrieval Bar-->
                        <%
                            //String planning_area = String.valueOf(request.getAttribute("planning_area"));
                            //String start_price = String.valueOf(request.getAttribute("start_price"));
                            //String end_price = String.valueOf(request.getAttribute("end_price"));
                            //String start_size = String.valueOf(request.getAttribute("start_size"));
                            //String end_size = String.valueOf(request.getAttribute("end_size"));

                            //if (planning_area.equals("null")) {
                            //planning_area = "";
                            //start_price = "";
                            //end_price = "";
                            //start_size = "";
                            //end_size = "";
                            //}

                        %>


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
                                            <i class="glyphicon glyphicon-check"></i>
                                        </div>
                                        <h5>Input Fields</h5>
                                        <div class="toolbar">
                                            <div class="btn-group">
                                                <a href="#inputs" data-toggle="collapse" class="btn btn-sm btn-default minimize-box">
                                                    <i class="fa fa-minus"></i>
                                                </a> 
                                                <a class="btn btn-danger btn-sm close-box">
                                                    <i class="fa fa-times"></i>
                                                </a> 
                                            </div>
                                        </div>
                                    </header>

                                    <div id='home'>
                                        <div id='target'></div>
                                    </div>
                                    
                                    <%
                                        String error = String.valueOf(request.getAttribute("error"));
                                        
                                        if (!error.equals("null")) {
                                            
                                        
                                    %>
                                    
                                    <div class="alert alert-danger" role="alert" style="margin: 10px;">
                                        <%=error%>
                                    </div>


                                    <%
                                    
                                    }


                                                                           // CHECK OR NOT
                                        String hawkercentre_check_num = String.valueOf(request.getAttribute("hawkercentre_check"));
                                        String childcare_check_num = String.valueOf(request.getAttribute("childcare_check"));
                                        String chasclinic_check_num = String.valueOf(request.getAttribute("chasclinic_check"));
                                        String mrtstation_check_num = String.valueOf(request.getAttribute("mrtstation_check"));
                                        String primaryschool_check_num = String.valueOf(request.getAttribute("primaryschool_check"));
                                        String shoppingcentre_check_num = String.valueOf(request.getAttribute("shoppingcentre_check"));
                                        
                                        String hawkercentre_check = "";
                                        String childcare_check = "";
                                        String chasclinic_check = "";
                                        String mrtstation_check = "";
                                        String primaryschool_check = "";
                                        String shoppingcentre_check = "";

                                        if (hawkercentre_check_num.equals("1")) {
                                            hawkercentre_check = "checked";
                                        }
                                        if (childcare_check_num.equals("1")) {
                                            childcare_check = "checked";
                                        }
                                        if (chasclinic_check_num.equals("1")) {
                                            chasclinic_check = "checked";
                                        }
                                        if (mrtstation_check_num.equals("1")) {
                                            mrtstation_check = "checked";
                                        }
                                        if (primaryschool_check_num.equals("1")) {
                                            primaryschool_check = "checked";
                                        }
                                        if (shoppingcentre_check_num.equals("1")) {
                                            shoppingcentre_check = "checked";
                                        }

                                        // HOW IMPORTANT
                                        String hawkercentre_weight = String.valueOf(request.getAttribute("hawkercentre_weight"));
                                        String childcare_weight = String.valueOf(request.getAttribute("childcare_weight"));
                                        String chasclinic_weight = String.valueOf(request.getAttribute("chasclinic_weight"));
                                        String mrtstation_weight = String.valueOf(request.getAttribute("mrtstation_weight"));
                                        String primaryschool_weight = String.valueOf(request.getAttribute("primaryschool_weight"));
                                        String shoppingcentre_weight = String.valueOf(request.getAttribute("shoppingcentre_weight"));
                                        
                                        
                                        String hawkercentre_1 = "";
                                        String hawkercentre_2 = "";
                                        String hawkercentre_3 = "";
                                        String hawkercentre_4 = "";

                                        String childcare_1 = "";
                                        String childcare_2 = "";
                                        String childcare_3 = "";
                                        String childcare_4 = "";

                                        String chasclinic_1 = "";
                                        String chasclinic_2 = "";
                                        String chasclinic_3 = "";
                                        String chasclinic_4 = "";
                                        
                                        String mrtstation_1 = "";
                                        String mrtstation_2 = "";
                                        String mrtstation_3 = "";
                                        String mrtstation_4 = "";
                                        
                                        String primaryschool_1 = "";
                                        String primaryschool_2 = "";
                                        String primaryschool_3 = "";
                                        String primaryschool_4 = "";
                                        
                                        String shoppingcentre_1 = "";
                                        String shoppingcentre_2 = "";
                                        String shoppingcentre_3 = "";
                                        String shoppingcentre_4 = "";

                                        if (hawkercentre_weight.equals("1")) {
                                            hawkercentre_1 = "selected";
                                        } else if (hawkercentre_weight.equals("2")) {
                                            hawkercentre_2 = "selected";
                                        } else if (hawkercentre_weight.equals("3")) {
                                            hawkercentre_3 = "selected";
                                        } else if (hawkercentre_weight.equals("4")) {
                                            hawkercentre_4 = "selected";
                                        }

                                        if (childcare_weight.equals("1")) {
                                            childcare_1 = "selected";
                                        } else if (childcare_weight.equals("2")) {
                                            childcare_2 = "selected";
                                        } else if (childcare_weight.equals("3")) {
                                            childcare_3 = "selected";
                                        } else if (childcare_weight.equals("4")) {
                                            childcare_4 = "selected";
                                        }

                                        if (chasclinic_weight.equals("1")) {
                                            chasclinic_1 = "selected";
                                        } else if (chasclinic_weight.equals("2")) {
                                            chasclinic_2 = "selected";
                                        } else if (chasclinic_weight.equals("3")) {
                                            chasclinic_3 = "selected";
                                        } else if (chasclinic_weight.equals("4")) {
                                            chasclinic_4 = "selected";
                                        }
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        if (mrtstation_weight.equals("1")) {
                                            mrtstation_1 = "selected";
                                        } else if (mrtstation_weight.equals("2")) {
                                            mrtstation_2 = "selected";
                                        } else if (mrtstation_weight.equals("3")) {
                                            mrtstation_3 = "selected";
                                        } else if (mrtstation_weight.equals("4")) {
                                            mrtstation_4 = "selected";
                                        }
                                        
                                        if (primaryschool_weight.equals("1")) {
                                            primaryschool_1 = "selected";
                                        } else if (primaryschool_weight.equals("2")) {
                                            primaryschool_2 = "selected";
                                        } else if (primaryschool_weight.equals("3")) {
                                            primaryschool_3 = "selected";
                                        } else if (primaryschool_weight.equals("4")) {
                                            primaryschool_4 = "selected";
                                        }
                                        
                                        if (shoppingcentre_weight.equals("1")) {
                                            shoppingcentre_1 = "selected";
                                        } else if (shoppingcentre_weight.equals("2")) {
                                            shoppingcentre_2 = "selected";
                                        } else if (shoppingcentre_weight.equals("3")) {
                                            shoppingcentre_3 = "selected";
                                        } else if (shoppingcentre_weight.equals("4")) {
                                            shoppingcentre_4 = "selected";
                                        }
                                        


                                    %>
                                    <!-- Accessibility -->
                                    <form id="inputs" class="body collapse in" action="ACServlet">
                                        <table class="table table-condensed responsive-table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Facility</th>
                                                    <th>Weight</th>
                                                </tr>
                                            </thead>
                                            <tbody>



                                                <tr>
                                                    <td><input type="checkbox" name="facility" value="hawkercentre" <%=hawkercentre_check%>></td>
                                                    <td>Hawker Centres</td>
                                                    <td>
                                                        <div class="input-group input-group-sm">
                                                            <select class="form-control" name="hawkercentre_select">
                                                                <option value="1" <%=hawkercentre_1%>>Trivial - 1</option>
                                                                <option value="2" <%=hawkercentre_2%>>Average - 2</option>
                                                                <option value="3" <%=hawkercentre_3%>>Important - 3</option>
                                                                <option value="4" <%=hawkercentre_4%>>Extreme - 4</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox"  name="facility" value="childcare" <%=childcare_check%>></td>
                                                    <td>Child Care</td>
                                                    <td>
                                                        <div class="input-group input-group-sm">
                                                            <select class="form-control" name="childcare_select">
                                                                <option value="1" <%=childcare_1%>>Trivial - 1</option>
                                                                <option value="2" <%=childcare_2%>>Average - 2</option>
                                                                <option value="3" <%=childcare_3%>>Important - 3</option>
                                                                <option value="4" <%=childcare_4%>>Extreme - 4</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" name="facility"  value="chasclinic" <%=chasclinic_check%>></td>
                                                    <td>CHAS Clinics</td>
                                                    <td>
                                                        <div class="input-group input-group-sm">
                                                            <select class="form-control" name="chasclinic_select">
                                                                <option value="1" <%=chasclinic_1%>>Trivial - 1</option>
                                                                <option value="2" <%=chasclinic_2%>>Average - 2</option>
                                                                <option value="3" <%=chasclinic_3%>>Important - 3</option>
                                                                <option value="4" <%=chasclinic_4%>>Extreme - 4</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                                
                                                
                                                <!-- New Facilities -->
                                                <tr>
                                                    <td><input type="checkbox" name="facility"  value="mrtstation" <%=mrtstation_check%>></td>
                                                    <td>MRT Stations</td>
                                                    <td>
                                                        <div class="input-group input-group-sm">
                                                            <select class="form-control" name="mrtstation_select">
                                                                <option value="1" <%=mrtstation_1%>>Trivial - 1</option>
                                                                <option value="2" <%=mrtstation_2%>>Average - 2</option>
                                                                <option value="3" <%=mrtstation_3%>>Important - 3</option>
                                                                <option value="4" <%=mrtstation_4%>>Extreme - 4</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                                
                                                <tr>
                                                    <td><input type="checkbox" name="facility"  value="primaryschool" <%=primaryschool_check%>></td>
                                                    <td>Primary Schools</td>
                                                    <td>
                                                        <div class="input-group input-group-sm">
                                                            <select class="form-control" name="primaryschool_select">
                                                                <option value="1" <%=primaryschool_1%>>Trivial - 1</option>
                                                                <option value="2" <%=primaryschool_2%>>Average - 2</option>
                                                                <option value="3" <%=primaryschool_3%>>Important - 3</option>
                                                                <option value="4" <%=primaryschool_4%>>Extreme - 4</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                                
                                                <tr>
                                                    <td><input type="checkbox" name="facility"  value="shoppingcentre" <%=shoppingcentre_check%>></td>
                                                    <td>Shopping Centres</td>
                                                    <td>
                                                        <div class="input-group input-group-sm">
                                                            <select class="form-control" name="shoppingcentre_select">
                                                                <option value="1" <%=shoppingcentre_1%>>Trivial - 1</option>
                                                                <option value="2" <%=shoppingcentre_2%>>Average - 2</option>
                                                                <option value="3" <%=shoppingcentre_3%>>Important - 3</option>
                                                                <option value="4" <%=shoppingcentre_4%>>Extreme - 4</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>


                                            </tbody>
                                        </table>


                                        <div id="submit_button" class="body collapse in">
                                            <div id="submit">
                                                <button type="submit" class="btn btn-primary">Submit</button>
                                            </div>
                                        </div>
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
                                                <a href="#mapView" data-toggle="collapse" class="btn btn-sm btn-default minimize-box">
                                                    <i class="fa fa-minus"></i>
                                                </a> 
                                                <a class="btn btn-danger btn-sm close-box">
                                                    <i class="fa fa-times"></i>
                                                </a> 
                                            </div>
                                        </div>
                                    </header>
                                    <!-- Content -->
                                    <div id="mapView" class="body collapse in">
                                        <div id="map"></div>
                                    </div>
                                </div>
                            </div><!-- /map -->
                        </div> <!-- row -->

                    </div><!-- /.inner -->
                </div><!-- /.outer -->


            </div><!-- /#content -->





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
        </div><!-- /#wrap -->
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

        <!--jQuery -->
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
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
            init_function();


        </script>
        <%            String result = String.valueOf(request.getAttribute("accessibility_result"));
            String total_80 = String.valueOf(request.getAttribute("total_80"));
            String total_60 = String.valueOf(request.getAttribute("total_60"));
            String total_40 = String.valueOf(request.getAttribute("total_40"));
            String total_20 = String.valueOf(request.getAttribute("total_20"));

            if (!result.equals("null")) {
                //int num_facility = Integer.parseInt(String.valueOf(request.getAttribute("num_facility")));
        %>
        <script type="text/javascript">
            var data = <%=result%>;
            var total_80 = <%=total_80%>;
            var total_60 = <%=total_60%>;
            var total_40 = <%=total_40%>;
            var total_20 = <%=total_20%>;

            generateAccessibilty(data, total_80, total_60, total_40, total_20);

        </script>
        <%
            }
        %>




    </body>
</html>