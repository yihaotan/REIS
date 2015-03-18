/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import entity.HexagonDAO;
import entity.Hexagon;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import entity.Transaction;
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
public class ACServlet extends HttpServlet {

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
        try {
            /* TODO output your page here. You may use following sample code. */
            
            String[] facility_list = request.getParameterValues("facility");
            
            int hawkercentre_check = 0;
            int childcare_check = 0;
            int chasclinic_check = 0;
            
            for (int p = 0; p < facility_list.length; p++) {
                String facility_name = facility_list[p];
                if (facility_name.equals("hawkercentre")) {
                    hawkercentre_check = 1;
                }
                if (facility_name.equals("childcare")) {
                    childcare_check = 1;
                }
                if (facility_name.equals("chasclinic")) {
                    chasclinic_check = 1;
                }
            }
            
            String num_hawkercentre_str = request.getParameter("num_hawkercentre");
            String num_childcare_str = request.getParameter("num_childcare");
            String num_chasclinic_str = request.getParameter("num_chasclinic");
            
            int num_hawkercentre = 3;
            if (num_hawkercentre_str.equals("null")) {
                num_hawkercentre = Integer.parseInt(num_hawkercentre_str);
            }
            
            int num_childcare = 3;
            if (num_childcare_str.equals("null")) {
                num_childcare = Integer.parseInt(num_childcare_str);
            }
            
            int num_chasclinic = 3;
            if (num_chasclinic_str.equals("null")) {
                num_chasclinic = Integer.parseInt(num_chasclinic_str);
            }
            
            int[] num_list = new int[3];
            num_list[0] = num_hawkercentre;
            num_list[1] = num_childcare;
            num_list[2] = num_chasclinic;
            
            HexagonDAO hdao = new HexagonDAO();
            
            // retrieve all hexagons
            ArrayList<Hexagon> result = new ArrayList<Hexagon>();
            result = hdao.retrieve(facility_list, num_list);
            
            // pretty print and convert to string
            JsonArray hexagonList = hdao.toJSON(result, facility_list);
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String json = gson.toJson(hexagonList);
            
            request.setAttribute("accessibility_result", json);
            request.setAttribute("num_facility", facility_list.length);
            
            
            request.setAttribute("hawkercentre_check", hawkercentre_check);
            request.setAttribute("childcare_check", childcare_check);
            request.setAttribute("chasclinic_check", chasclinic_check);
            
            
            
            
            
            RequestDispatcher rd = request.getRequestDispatcher("Accessibility.jsp");
            rd.forward(request, response);
            
            } catch (Exception e) {
            
            // Send error (if any) back to homepage
            String error = "Error!";
            System.out.println();
//            request.setAttribute("error", error);
//            RequestDispatcher rd = request.getRequestDispatcher("index.jsp");
//            rd.forward(request, response);
            
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
