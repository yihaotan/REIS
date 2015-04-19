/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import entity.ProjectDAO;
import entity.Project;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Zheng Boyang
 */
public class PCServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        String latlng = "";
        try {
            /* TODO output your page here. You may use following sample code. */

            boolean error = false;
            
            // Check Lat Lon
            latlng = String.valueOf(request.getParameter("latlng"));
            String lat = "";
            String lon = "";
            if (!latlng.equals("null")) {
                int position = latlng.indexOf(",");
                lat = latlng.substring(0, position);
                lon = latlng.substring(position + 1, latlng.length());
            } else {
                request.setAttribute("error", "Please select a point on map!");
                error = true;
            }

            // Check number of projects
            int number_of_projects = Integer.parseInt(String.valueOf(request.getParameter("number_of_projects")));
            if (number_of_projects == 0) {
                request.setAttribute("error", "Please enter a positive number!");
                error = true;
            }
            
            

            // If no error
            if (!error) {

                // REAL STUFF
                ProjectDAO pdao = new ProjectDAO();
                ArrayList<Project> result = pdao.retrieve(number_of_projects, lat, lon);
                JsonArray projectList = pdao.toJSON(result, number_of_projects);
                Gson gson = new GsonBuilder().setPrettyPrinting().create();
                String json = gson.toJson(projectList);

                // SEND RESULT BACK
                request.setAttribute("project_comparison_result", json);

            }

            request.setAttribute("return_num", number_of_projects);
            request.setAttribute("latlng", latlng);
            RequestDispatcher rd = request.getRequestDispatcher("ProjectComparison.jsp");
            rd.forward(request, response);

        } catch (Exception e) {
            // Send error (if any) back to homepage
            request.setAttribute("error", "Invalid input!");
            RequestDispatcher rd = request.getRequestDispatcher("ProjectComparison.jsp");
            rd.forward(request, response);
        } finally {
            out.close();
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
