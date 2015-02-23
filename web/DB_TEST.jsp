<%-- 
    Document   : index
    Created on : Feb 22, 2015, 4:06:49 PM
    Author     : Zheng Boyang
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>

        <%@ page import="entity.*" %>
        <%@ page import="java.util.*" %>
        <%@ page import="com.google.gson.*" %>

        <h1>Hello World!</h1>

        <form action="DBServlet">
            <input type="text" name="planning_area"/><br>
            <input type="submit" value="submit">            
        </form>

        <%
            
            String result = String.valueOf(request.getAttribute("result"));

        %>

        <script language="javascript">
            var js = '<%=result%>';
            alert(js);
        </script> 

    </body>
</html>
