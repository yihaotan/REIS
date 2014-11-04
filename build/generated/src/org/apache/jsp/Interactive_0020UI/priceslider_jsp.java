package org.apache.jsp.Interactive_0020UI;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class priceslider_jsp extends org.apache.jasper.runtime.HttpJspBase
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
      response.setContentType("text/html;charset=UTF-8");
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
      out.write("<!DOCTYPE html>\n");
      out.write("<html>\n");
      out.write("    <head>\n");
      out.write("        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n");
      out.write("        <link rel=\"stylesheet\" href=\"../Css/iThing.css\" type=\"text/css\" />\n");
      out.write("    </head>\n");
      out.write("    <body>\n");
      out.write("        <div id=\"slider\" style=\"display:inline-block;\">\n");
      out.write("        <img src=\"../Icons/PriceMarker.png\" height=\"25\" width=\"25\"/>\n");
      out.write("        <span>Price Range (PSF):</span>\n");
      out.write("        <div id=\"PriceRange\"></div>\n");
      out.write("        </div>\n");
      out.write("        <style>\n");
      out.write("        #PriceRange {\n");
      out.write("         float:right;width:80%;\n");
      out.write("        }\n");
      out.write("          \n");
      out.write("        #slider {\n");
      out.write("        width:600px;\n");
      out.write("        height: 70px;\n");
      out.write("        position: relative;\n");
      out.write("        left: 100px;}\n");
      out.write("        \n");
      out.write("        </style>  \n");
      out.write("        \n");
      out.write("        <script src=\"../JQUERY/jquery-1.8.3.js\"></script>\n");
      out.write("        <script src=\"../JQUERY/jquery-ui-1.9.2.custom.js\"></script>\n");
      out.write("        <script src=\"../UIlibraries/jQEditRangeSlider-min.js\"></script>\n");
      out.write("        \n");
      out.write("        <script>\n");
      out.write("        $(\"#slider\").editRangeSlider({bounds:{min: 0, max: 4000}},{defaultValues:{min: 1500, max: 3000}});\n");
      out.write("        </script>\n");
      out.write("\n");
      out.write("        \n");
      out.write("    </body>\n");
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
