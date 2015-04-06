/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import entity.TransactionDAO;
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
public class DBServlet extends HttpServlet {

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
            
            // Retrieve parameters first
            String planning_area = request.getParameter("planning_area");
            //int start_price = Integer.parseInt(request.getParameter("start_price"));
            //int end_price = Integer.parseInt(request.getParameter("end_price"));
            //int start_size = Integer.parseInt(request.getParameter("start_size"));
            //int end_size = Integer.parseInt(request.getParameter("end_size"));
            
            // Access DAO to retrieve data
            TransactionDAO tdao = new TransactionDAO();
            
            ArrayList<Transaction> result = new ArrayList<Transaction>();
            
            if (planning_area.equals("All")) {
                result = tdao.retrieveAll();
            } else {
                result = tdao.retrieveByCriteria(
                    planning_area);
            }
             
            // Convert to JSON
            JsonArray transactionList = tdao.toJSON(result);
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String json = gson.toJson(transactionList);
            
            // Send json (string) back to homepage
            request.setAttribute("result", json);
            request.setAttribute("planning_area", planning_area);
            //request.setAttribute("start_price", start_price);
            //request.setAttribute("end_price", end_price);
            //request.setAttribute("start_size", start_size);
            //request.setAttribute("end_size", end_size);
                    
            
            RequestDispatcher rd = request.getRequestDispatcher("index.jsp");
            rd.forward(request, response);
            
        } catch (Exception e) {
            
            // Send error (if any) back to homepage
            String error = "Error!";
            request.setAttribute("error", error);
            RequestDispatcher rd = request.getRequestDispatcher("index.jsp");
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
