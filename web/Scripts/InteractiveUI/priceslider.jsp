<%-- 
    Document   : priceslider
    Created on : Oct 18, 2014, 1:08:59 PM
    Author     : ASUS
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="../Css/iThing.css" type="text/css" />
    </head>
    <body>
        <div id="slider" style="display:inline-block;">
        <img src="../Icons/PriceMarker.png" height="25" width="25"/>
        <span>Price Range (PSF):</span>
        <div id="PriceRange"></div>
        </div>
        <style>
        #PriceRange {
         float:right;width:80%;
        }
          
        #slider {
        width:600px;
        height: 70px;
        position: relative;
        left: 100px;}
        
        </style>  
        
        <script src="../JQUERY/jquery-1.8.3.js"></script>
        <script src="../JQUERY/jquery-ui-1.9.2.custom.js"></script>
        <script src="../UIlibraries/jQEditRangeSlider-min.js"></script>
        
        <script>
        $("#slider").editRangeSlider({bounds:{min: 0, max: 4000}},{defaultValues:{min: 1500, max: 3000}});
        </script>

        
    </body>
</html>
