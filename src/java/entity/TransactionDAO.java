/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
import java.io.IOException;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;
import connection.ConnectionManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;

/**
 *
 * @author Zheng Boyang
 */
public class TransactionDAO {

    private ArrayList<Transaction> transactionList;
    private final String TABLE = "REALIS_2013";

    // constructor
    /**
     * Create an empty TransactionDAO
     */
    public TransactionDAO() {
        transactionList = new ArrayList<Transaction>();
    }

    // retrieve ALL
    /**
     * retrieve ALL transactions
     *
     * @return an ArrayList of Transaction
     */
    public ArrayList<Transaction> retrieveAll() {
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        String sql = "";

        try {
            conn = ConnectionManager.getConnection();
            sql = "SELECT * FROM " + TABLE + ";";
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();

            while (rs.next()) {
                //Retrieve by column name
                String rec_no = rs.getString("REC_NO");
                String project_name = rs.getString("PROJECT_NA");
                String address = rs.getString("ADDRESS");
                int no_of_units = rs.getInt("NO_OF_UNIT");
                int area_sqm = rs.getInt("AREA_SQM");
                String type_of_area = rs.getString("TYPE_OF_AR");
                int transacted_price = rs.getInt("TRANSACTED");
                int unit_price_psm = rs.getInt("UNIT_PRICE");
                int unit_price_psf = rs.getInt("UNIT_PRI_1");
                String contract_date = rs.getString("CONTRACT_D");
                String property_type = rs.getString("PROPERTY_T");
                String tenure = rs.getString("TENURE");
                String completion_date = rs.getString("COMPLETION");
                String type_of_sale = rs.getString("TYPE_OF_SA");
                String purchaser_address_indicator = rs.getString("PURCHASER_");
                int postal_district = rs.getInt("POSTAL_DIS");
                int postal_sector = rs.getInt("POSTAL_SEC");
                int postal_code = rs.getInt("POSTAL_COD");
                String planning_region = rs.getString("PLANNING_R");
                String planning_area = rs.getString("PLANNING_A");
                float x = rs.getFloat("X");
                float y = rs.getFloat("Y");

                Transaction newTransaction = new Transaction(rec_no, project_name, address, no_of_units, area_sqm,
                        type_of_area, transacted_price, unit_price_psm, unit_price_psf,
                        contract_date, property_type, tenure, completion_date, type_of_sale,
                        purchaser_address_indicator, postal_district, postal_sector, postal_code,
                        planning_region, planning_area, x, y);

                transactionList.add(newTransaction);
            }

        } catch (SQLException e) {
            System.out.print(e.getMessage());
        } finally {
            ConnectionManager.close(conn, ps, rs);
        }
        return transactionList;
    }
    
    // retrieve records for a particular planning area
    /**
     * retrieve by planning area
     *
     * @return an ArrayList of Transaction
     */
    public ArrayList<Transaction> retrieveByPlanningArea(String planning_area) {
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        String sql = "";

        try {
            conn = ConnectionManager.getConnection();
            sql = "SELECT * FROM " + TABLE + " WHERE PLANNING_A = '" + planning_area +"';";
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();

            while (rs.next()) {
                //Retrieve by column name
                String rec_no = rs.getString("REC_NO");
                String project_name = rs.getString("PROJECT_NA");
                String address = rs.getString("ADDRESS");
                int no_of_units = rs.getInt("NO_OF_UNIT");
                int area_sqm = rs.getInt("AREA_SQM");
                String type_of_area = rs.getString("TYPE_OF_AR");
                int transacted_price = rs.getInt("TRANSACTED");
                int unit_price_psm = rs.getInt("UNIT_PRICE");
                int unit_price_psf = rs.getInt("UNIT_PRI_1");
                String contract_date = rs.getString("CONTRACT_D");
                String property_type = rs.getString("PROPERTY_T");
                String tenure = rs.getString("TENURE");
                String completion_date = rs.getString("COMPLETION");
                String type_of_sale = rs.getString("TYPE_OF_SA");
                String purchaser_address_indicator = rs.getString("PURCHASER_");
                int postal_district = rs.getInt("POSTAL_DIS");
                int postal_sector = rs.getInt("POSTAL_SEC");
                int postal_code = rs.getInt("POSTAL_COD");
                String planning_region = rs.getString("PLANNING_R");
                float x = rs.getFloat("X");
                float y = rs.getFloat("Y");

                Transaction newTransaction = new Transaction(rec_no, project_name, address, no_of_units, area_sqm,
                        type_of_area, transacted_price, unit_price_psm, unit_price_psf,
                        contract_date, property_type, tenure, completion_date, type_of_sale,
                        purchaser_address_indicator, postal_district, postal_sector, postal_code,
                        planning_region, planning_area, x, y);

                transactionList.add(newTransaction);
            }

        } catch (SQLException e) {
            System.out.print(e.getMessage());
        } finally {
            ConnectionManager.close(conn, ps, rs);
        }
        return transactionList;
    }
    
    // return Json of all Transaction
    /**
     * return Json of all Transaction
     *
     * @return Json of all Transaction
     */
    public JsonArray retrieveJSON(String planning_area) {
        
        // decide which planning area to retrieve
        ArrayList<Transaction> result = null;
        if (planning_area.equals("All")) {
            result = retrieveAll();
        } else {
            result = retrieveByPlanningArea(planning_area);
        }

        JsonArray resultArray = new JsonArray();
        
        for (int i = 0; i < result.size(); i++) {
            
            JsonObject obj = new JsonObject();
            
            obj.addProperty("rec_no", result.get(i).get_rec_no());
            obj.addProperty("project_name", result.get(i).get_project_name());
            obj.addProperty("address", result.get(i).get_address());
            obj.addProperty("no_of_units", result.get(i).get_no_of_units());
            obj.addProperty("area_sqm", result.get(i).get_area_sqm());
            obj.addProperty("type_of_area", result.get(i).get_type_of_area());
            obj.addProperty("transacted_price", result.get(i).get_transacted_price());
            obj.addProperty("unit_price_psm", result.get(i).get_unit_price_psm());
            obj.addProperty("unit_price_psf", result.get(i).get_unit_price_psf());
            obj.addProperty("contract_date", result.get(i).get_contract_date());
            obj.addProperty("property_type", result.get(i).get_property_type());
            obj.addProperty("tenure", result.get(i).get_tenure());
            obj.addProperty("completion_date", result.get(i).get_completion_date());
            obj.addProperty("type_of_sale", result.get(i).get_type_of_sale());
            obj.addProperty("purchaser_address_indicator", result.get(i).get_purchaser_address_indicator());
            obj.addProperty("postal_district", result.get(i).get_postal_district());
            obj.addProperty("postal_sector", result.get(i).get_postal_sector());
            obj.addProperty("postal_code", result.get(i).get_postal_code());
            obj.addProperty("planning_region", result.get(i).get_planning_region());
            obj.addProperty("planning_area", result.get(i).get_planning_area());
            obj.addProperty("x", result.get(i).get_x());
            obj.addProperty("y", result.get(i).get_y());
            
            resultArray.add(obj);
        }
        
        return resultArray;
        
    }
    
    // placeholder for more methods
    
    
    
    
    
    
    
    
}
