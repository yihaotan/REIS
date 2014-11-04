<%-- 
    Document   : dateSlider
    Created on : Oct 21, 2014, 4:09:42 PM
    Author     : ASUS
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="./Css/iThing.css" type="text/css" />
    </head>
    <body>
        <div id="dateslider" style="display:inline-block;">
        
        <span>Transaction Period:</span>
        <div id="transactionperiod"></div>
        </div>
        <style>
        #transactionperiod {
         float:right;width:80%;
        }
          
        #dateslider {
        width:600px;
        height: 60px;
        position: relative;
        left: 100px;}
        
        </style>  
        
        <script src="./JQUERY/jquery-1.8.3.js"></script>
        <script src="./JQUERY/jquery-ui-1.9.2.custom.js"></script>
        <script src="./UI libraries/jQDateRangeSlider-min.js"></script>
        
        <script>
      
        $("#dateslider").dateRangeSlider({bounds:{min:new Date(2010, 0, 1),max:new Date(2014,11,31)}});
        
     // $("#dateslider").on("valuesChanged", function(e, data){
       // if(data.values.max>0){
          //  alert(data.values.max.getFullYear());
            
       //}});  
        </script>
    </body>
</html>
