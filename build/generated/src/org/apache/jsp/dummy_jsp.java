package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class dummy_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;

    try {
      response.setContentType("text/html");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n");
      out.write("\n");
      out.write("<html xmlns=\"http://www.w3.org/1999/xhtml\">\n");
      out.write("<head>\n");
      out.write("    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>\n");
      out.write("    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=7,IE=8,IE=9,IE=10\" />\n");
      out.write("    <title>OneMap-OneMap Basic Search</title>\n");
      out.write("\n");
      out.write("    <script src=\"https://code.jquery.com/jquery-1.11.1.min.js\"></script>\n");
      out.write("    <script type='text/JavaScript' src='http://www.onemap.sg/API/JS?accessKEY=xkg8VRu6Ol+gMH+SUamkRIEB7fKzhwMvfMo/2U8UJcFhdvR4yN1GutmUIA3A6r3LDhot215OVVkZvNRzjl28TNUZgYFSswOi'></script>\n");
      out.write("    \n");
      out.write("    <script language=\"javascript\" type=\"text/javascript\" >\n");
      out.write("    \n");
      out.write("    function GetSearchData() {\n");
      out.write("        var basicSearch = new BasicSearch;\n");
      out.write("        var searchText = document.getElementById(\"txtSearchText\").value\n");
      out.write("        basicSearch.searchVal = searchText;\n");
      out.write("        basicSearch.returnGeom = '1';     \n");
      out.write("        basicSearch.GetSearchResults(displayData)\n");
      out.write("    }\n");
      out.write("\n");
      out.write("    function displayData(resultData){debugger;\n");
      out.write("        var results = resultData.results;\n");
      out.write("        if (results=='No results'){\n");
      out.write("            document.getElementById('divResults').innerHTML = \"No result(s) found\";\n");
      out.write("            return false\n");
      out.write("        }\n");
      out.write("        else{\n");
      out.write("            var htmlStr = \"<table>\";\n");
      out.write("            htmlStr = htmlStr + \"<tr><th>Search Value </th></tr>\";\n");
      out.write("            for (var i = 0; i < results.length; i++) {\n");
      out.write("                var row = results[i];\n");
      out.write("                htmlStr = htmlStr + \"<tr>\";\n");
      out.write("                htmlStr = htmlStr + \"<td>\";\n");
      out.write("                htmlStr = htmlStr + \"<a href='JavaScript:ZoomTo(\"+ row.X +\",\"+ row.Y +\")'>\" + row.SEARCHVAL + \"</a>\";\n");
      out.write("                htmlStr = htmlStr + \"</td>\";\n");
      out.write("                htmlStr = htmlStr + \"</tr>\";\n");
      out.write("            }\n");
      out.write("            htmlStr = htmlStr + \"</table>\";\n");
      out.write("            document.getElementById('divResults').innerHTML = htmlStr;\n");
      out.write("        }\n");
      out.write("    }\n");
      out.write("   \n");
      out.write("//add map on body load \n");
      out.write("\n");
      out.write("var OneMap = new GetOneMap('divMain','SM');   \n");
      out.write("function ZoomTo(xVal,yVal){\n");
      out.write("    OneMap.showLocation(xVal,yVal);\n");
      out.write("}\n");
      out.write("\n");
      out.write("</script>\n");
      out.write("</head>\n");
      out.write("<body class=\"tundra\">\n");
      out.write("<table style=\"width: 436px\">\n");
      out.write("    <tr>\n");
      out.write("        <th colspan=\"2\">\n");
      out.write("        Address Search API Usage</th>\n");
      out.write("    </tr>\n");
      out.write("    <tr>\n");
      out.write("        <td> Search Text  :</td>\n");
      out.write("        <td><input type=\"text\" id=\"txtSearchText\" value='City Hall' /></td>\n");
      out.write("    </tr>\n");
      out.write("    <tr>\n");
      out.write("    <td>\n");
      out.write("        <input type=\"button\" onclick=\"GetSearchData();\" value=\"Search\" /></td>\n");
      out.write("    </tr>\n");
      out.write("</table>\n");
      out.write("<table>\n");
      out.write("    <tr>\n");
      out.write("        <td>\n");
      out.write("            <div id=\"divMain\" style='width:500px;height:500px;'></div></td>\n");
      out.write("        <td style=\"vertical-align:top\">\n");
      out.write("            <div id=\"divResults\"></div></td>\n");
      out.write("    </tr>\n");
      out.write("</table>\n");
      out.write("</body>\n");
      out.write("</html>\n");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
