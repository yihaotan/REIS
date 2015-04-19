/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonElement;
import java.sql.Connection;
import java.util.ArrayList;
import connection.ConnectionManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

/**
 *
 * @author Zheng Boyang
 */
public class ProjectDAO {

    private ArrayList<Project> projectList;
    private final String TABLE = "REALIS_2013";
    
    // constructor
    /**
     * Create an empty ProjectDAO
     */
    public ProjectDAO() {
        projectList = new ArrayList<Project>();
    }

    // retrieve ALL
    /**
     * retrieve ALL transactions
     *
     * @return an ArrayList of Transaction
     */
    public ArrayList<Project> retrieve(int number_of_projects, String lat, String lon) {
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        String sql = "";

        try {
            conn = ConnectionManager.getConnection();
            
            // HERE
            
            sql += "SELECT DISTINCT(project_name) AS project, "
                    + " property_type, "
                    + " type_of_sale, "
                    + " tenure, "
                    + " SUM(no_of_unit) AS total_units, "
                    + " AVG(distance) AS distance, "
                    + " MEDIAN(unit_price) AS median_price_psf, "
                    + " MAX(ST_AsGeoJson(ST_Transform(geom, 4326))) AS geojson "
                    + " FROM  "
                    + " ( "
                    + " SELECT point.project_na AS project_name, "
                    + " point.no_of_unit AS no_of_unit, "
                    + " point.property_t AS property_type, "
                    + " point.type_of_sa AS type_of_sale, "
                    + " point.tenure AS tenure, "
                    + " point.unit_pri_1 AS unit_price, "
                    + " ST_Distance(point.geom, ST_Transform(ST_GeomFromText('POINT( " + lon + " " + lat + " )', 4326), 3414)) AS distance,  "
                    + " point.geom AS geom "
                    + " FROM realis_2013 as point "
                    + " ORDER BY distance ASC "
                    + " ) as result "
                    + " WHERE type_of_sale = 'New Sale' "
                    + " GROUP BY project, property_type, type_of_sale, tenure "
                    + " ORDER BY distance ASC "
                    + " LIMIT " + number_of_projects + " ; ";  
            
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            
            while (rs.next()) {
                
                //Retrieve by column name
                String project_name = rs.getString("project");
                String property_type = rs.getString("property_type");
                String type_of_sale = rs.getString("type_of_sale");
                String tenure = rs.getString("tenure");
                
                int total_units = rs.getInt("total_units");
                double distance = rs.getDouble("distance");
                double median_price_psf = rs.getDouble("median_price_psf");
                String geojson = rs.getString("geojson");

                Project p = new Project(project_name, property_type, type_of_sale, tenure, 
                                        total_units, distance, median_price_psf, geojson);

                projectList.add(p);
            }

        } catch (SQLException e) {
            System.out.print(e.getMessage());
        } finally {
            ConnectionManager.close(conn, ps, rs);
        }
        
        System.out.println("projectList now has " + projectList.size() + " records");
        
        return projectList;
    }

    // return Json of all Transaction
    /**
     * return Json of all Transaction
     *
     * @return Json of all Transaction
     */
    public JsonArray toJSON(ArrayList<Project> result, int number_of_projects) {

        JsonArray resultArray = new JsonArray();
        
        for (int i = 0; i < number_of_projects; i++) {

            // new record
            JsonObject record = new JsonObject();
            record.addProperty("project_name", result.get(i).get_project_name());
            record.addProperty("property_type", result.get(i).get_property_type());
            record.addProperty("type_of_sale", result.get(i).get_type_of_sale());
            record.addProperty("tenure", result.get(i).get_tenure());
            record.addProperty("total_units", result.get(i).get_total_units());
            record.addProperty("distance", result.get(i).get_distance());
            record.addProperty("median_price_psf", result.get(i).get_median_price_psf());
            
            // add coordinates
            String geojson_str = result.get(i).get_geojson();
            Gson gson = new Gson();
            JsonElement je = gson.fromJson(geojson_str, JsonElement.class);
            JsonObject jo = je.getAsJsonObject();
            
            
            
            record.add("geojson", jo);

            // append to resultArray
            resultArray.add(record);

        }
        
        return resultArray;

    }
    
    
    
    

}
