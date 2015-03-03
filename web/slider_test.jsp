<%-- 
    Document   : slider_test
    Created on : Mar 3, 2015, 6:17:50 PM
    Author     : Zheng Boyang
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        
        <link rel="stylesheet" href="slider/css/boostrap-slider.css" type="text/css">
        
        <link rel="stylesheet/less" type="text/css" href="slider/less/boostrap-slider.less" />
        <link rel="stylesheet/less" type="text/css" href="slider/less/rules.less" />
        <link rel="stylesheet/less" type="text/css" href="slider/less/variables.less" />
        <script src="slider/boostrap-slider.js"></script> 
        
    </head>
    <body>
        <h1>Hello World!</h1>
        
        Filter by price interval: 
        <b>€ 10</b> 
        <input id="ex2" type="text" class="span2" 
               value="" data-slider-min="10" data-slider-max="1000" 
               data-slider-step="5" 
               data-slider-value="[250,450]"/> 
        <b>€ 1000</b>
        
        <script>
            var slider = new Slider('#ex2', {});
        </script>
        
    </body>
</html>
