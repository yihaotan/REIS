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
import com.google.gson.JsonElement;
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
    public ArrayList<Transaction> retrieveByCriteria(
            String planning_area
    ) {
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        String sql = "";

        try {
            conn = ConnectionManager.getConnection();
            sql = "SELECT * FROM " + TABLE + " WHERE " + 
                    "(PLANNING_A = '"+planning_area+"');";
                    //+ "(TRANSACTED BETWEEN "+" AND "+") AND "
                    //+ "(AREA_SQM BETWEEN "+" AND "+")"
                    //+";";
            
            if (planning_area.equals("ccr")) {
                sql += "";
            } else if (planning_area.equals("rcr")) {
                sql += "";
            } else if (planning_area.equals("ocr")) {
                sql += "";
            }
            
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
    public JsonArray toJSON(ArrayList<Transaction> result) {

        JsonArray resultArray = new JsonArray();
        
        for (int i = 0; i < result.size(); i++) {
            
            // add properties
            JsonObject properties = new JsonObject();
            properties.addProperty("REC_NO", result.get(i).get_rec_no());
            properties.addProperty("PROJECT_NAME", result.get(i).get_project_name());
            properties.addProperty("ADDRESS", result.get(i).get_address());
            properties.addProperty("NO_OF_UNITS", result.get(i).get_no_of_units());
            properties.addProperty("AREA_SQM", result.get(i).get_area_sqm());
            properties.addProperty("TYPE_OF_AREA", result.get(i).get_type_of_area());
            properties.addProperty("TRANSACTED_PRICE", result.get(i).get_transacted_price());
            properties.addProperty("UNIT_PRICE_PSM", result.get(i).get_unit_price_psm());
            properties.addProperty("UNIT_PRICE_PSF", result.get(i).get_unit_price_psf());
            properties.addProperty("CONTRACT_DATE", result.get(i).get_contract_date());
            properties.addProperty("PROPERTY_TYPE", result.get(i).get_property_type());
            properties.addProperty("TENURE", result.get(i).get_tenure());
            properties.addProperty("COMPLETION_DATE", result.get(i).get_completion_date());
            properties.addProperty("TYPE_OF_SALE", result.get(i).get_type_of_sale());
            properties.addProperty("PURCHASER_ADDRESS_INDICATOR", result.get(i).get_purchaser_address_indicator());
            properties.addProperty("POSTAL_DISTRICT", result.get(i).get_postal_district());
            properties.addProperty("POSTAL_SECTOR", result.get(i).get_postal_sector());
            properties.addProperty("POSTAL_CODE", result.get(i).get_postal_code());
            properties.addProperty("PLANNING_REGION", result.get(i).get_planning_region());
            properties.addProperty("PLANNING_AREA", result.get(i).get_planning_area());
            properties.addProperty("X", result.get(i).get_x());
            properties.addProperty("Y", result.get(i).get_y());
            
            // add coordinates
            JsonArray coordinates = new JsonArray();
            JsonObject lat = new JsonObject();
            JsonObject lon = new JsonObject();
            lat.addProperty("lat", result.get(i).get_x());
            lon.addProperty("lon", result.get(i).get_y());
            coordinates.add(lat);
            coordinates.add(lon);
            
            // add geometry
            JsonObject geometry = new JsonObject();
            geometry.addProperty("type", "Point");
            geometry.add("coordinates", coordinates);
            
            // add everything into one record
            JsonObject record = new JsonObject();
            record.addProperty("type", "Feature");
            record.addProperty("popupContent", "Hello!");
            record.add("properties", properties);
            record.add("geometry", geometry);
            
            // append to resultArray
            resultArray.add(record);
        }
        
        return resultArray;
        
    }
    
    // placeholder for more methods
    
    
    
    
    
    
    
    
}
