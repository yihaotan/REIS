/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import net.qxcg.svy21.*;

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
import java.util.*;

/**
 *
 * @author Zheng Boyang
 */
public class HexagonDAO {

    private ArrayList<Hexagon> hexagonList;
    private final String TABLE = "REALIS_2013";

    // constructor
    /**
     * Create an empty TransactionDAO
     */
    public HexagonDAO() {
        hexagonList = new ArrayList<Hexagon>();
    }

    // retrieve ALL
    /**
     * retrieve ALL transactions
     *
     * @return an ArrayList of Transaction
     */
    public ArrayList<Hexagon> retrieve(String[] facility_list, int[] num_list) {
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        String sql = "";

        try {
            conn = ConnectionManager.getConnection();

            // 3 tables query
            String hawkercentre_table
                    = " hawkercentre_table AS ("
                    + " SELECT grid_centroid.gid as grid_id, "
                    + "       hawkercentre.gid, "
                    + "       ST_Distance(grid_centroid.geom, hawkercentre.geom) as hawkercentre_distance, "
                    + "       ROW_NUMBER() OVER (PARTITION BY grid_centroid.gid "
                    + "                           ORDER BY ST_Distance(grid_centroid.geom, hawkercentre.geom) ASC"
                    + "                         ) AS hawkercentre_row_number"
                    + " FROM grid_centroid, hawkercentre"
                    + " ) ";
            String childcare_table
                    = " childcare_table AS ("
                    + " SELECT grid_centroid.gid as grid_id,  "
                    + "       childcare.gid,  "
                    + "       ST_Distance(grid_centroid.geom, childcare.geom) as childcare_distance, "
                    + "       ROW_NUMBER() OVER (PARTITION BY grid_centroid.gid "
                    + "                           ORDER BY ST_Distance(grid_centroid.geom, childcare.geom) ASC"
                    + "                          )AS childcare_row_number"
                    + " FROM grid_centroid, childcare"
                    + " ) ";
            String chasclinic_table
                    = " chasclinic_table AS ("
                    + " SELECT grid_centroid.gid as grid_id,  "
                    + "       chasclinic.gid,  "
                    + "       ST_Distance(grid_centroid.geom, chasclinic.geom) as chasclinic_distance, "
                    + "       ROW_NUMBER() OVER (PARTITION BY grid_centroid.gid "
                    + "                          ORDER BY ST_Distance(grid_centroid.geom, chasclinic.geom) ASC"
                    + "                         ) AS chasclinic_row_number"
                    + " FROM grid_centroid, chasclinic"
                    + " ) ";

            String base_table = "WITH ";

            String select_list
                    = " SELECT grid_centroid.gid as point, "
                    + "     selected_grid.gid as hexagon, ";

            String from_list
                    = " FROM grid_centroid, "
                    + "     selected_grid, ";

            String where_list
                    = " WHERE selected_grid.gid = grid_centroid.gid ";

            for (int x = 0; x < facility_list.length; x++) {
                String facility_name = facility_list[x];
                if (facility_name.equals("hawkercentre")) {
                    base_table += hawkercentre_table + ",";
                    select_list += "     AVG(hawkercentre_distance) as hawkercentre, ";
                    from_list += "     hawkercentre_table,";
                    where_list += " AND grid_centroid.gid = hawkercentre_table.grid_id"
                            + " AND hawkercentre_row_number <= " + num_list[0];
                }
                if (facility_name.equals("childcare")) {
                    base_table += childcare_table + ",";
                    select_list += "     AVG(childcare_distance) as childcare, ";
                    from_list += "     childcare_table,";
                    where_list += " AND grid_centroid.gid = childcare_table.grid_id "
                            + " AND childcare_row_number <= " + num_list[1];
                }
                if (facility_name.equals("chasclinic")) {
                    base_table += chasclinic_table + ",";
                    select_list += "     AVG(chasclinic_distance) as chasclinic, ";
                    from_list += "     chasclinic_table,";
                    where_list += " AND grid_centroid.gid = chasclinic_table.grid_id "
                            + " AND chasclinic_row_number <= " + num_list[2];
                }
            }

            base_table = base_table.substring(0, base_table.length() - 1);
            from_list = from_list.substring(0, from_list.length() - 1);

            select_list += "     ST_AsGeoJSON(ST_Transform(selected_grid.geom, 4326)) as GeoJSON ";

            String group_by
                    = " GROUP BY point, hexagon "
                    + " ORDER BY point; ";
            String query = select_list + from_list + where_list + group_by;

            // final sql
            sql = base_table + query;

            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();

            while (rs.next()) {
                //Retrieve by column name
                int id = rs.getInt("point");
                String geojson = rs.getString("geojson");

                HashMap hm = new HashMap();

                for (int p = 0; p < facility_list.length; p++) {
                    String facility_name = facility_list[p];
                    if (facility_name.equals("hawkercentre")) {
                        double hawkercentre = rs.getDouble("hawkercentre");
                        hm.put("hawkercentre", hawkercentre);
                    }
                    if (facility_name.equals("childcare")) {
                        double childcare = rs.getDouble("childcare");
                        hm.put("childcare", childcare);
                    }
                    if (facility_name.equals("chasclinic")) {
                        double chasclinic = rs.getDouble("chasclinic");
                        hm.put("chasclinic", chasclinic);
                    }
                }

                Hexagon h = new Hexagon(id, hm, geojson);

                hexagonList.add(h);
            }

        } catch (SQLException e) {
            System.out.print(e.getMessage());
        } finally {
            ConnectionManager.close(conn, ps, rs);
        }
        return hexagonList;
    }

    // return Json of all Transaction
    /**
     * return Json of all Transaction
     *
     * @return Json of all Transaction
     */
    public JsonArray toJSON(ArrayList<Hexagon> result, String[] facility_list) {

        JsonArray resultArray = new JsonArray();

        for (int i = 0; i < result.size(); i++) {

            // add properties
            JsonObject properties = new JsonObject();
            HashMap hm = result.get(i).get_hm();

            double hawkercentre = -1;
            double childcare = -1;
            double chasclinic = -1;

            for (int p = 0; p < facility_list.length; p++) {
                String facility_name = facility_list[p];
                if (facility_name.equals("hawkercentre")) {
                    hawkercentre = (Double) hm.get("hawkercentre");
                }
                if (facility_name.equals("childcare")) {
                    childcare = (Double) hm.get("childcare");
                }
                if (facility_name.equals("chasclinic")) {
                    chasclinic = (Double) hm.get("chasclinic");
                }
            }

            double accessibility_score = calculate_accessbility(hawkercentre, childcare, chasclinic);
            properties.addProperty("grid_id", result.get(i).get_id());
            properties.addProperty("density", accessibility_score);
//            properties.addProperty("hawkercentre", hawkercentre);
//            properties.addProperty("childcare", childcare);
//            properties.addProperty("chasclinic", chasclinic);

            // add coordinates
            String geojson_str = result.get(i).get_geojson();
            Gson gson = new Gson();
            JsonElement je = gson.fromJson(geojson_str, JsonElement.class);
            JsonObject jo = je.getAsJsonObject();

            // add geometry
            JsonObject record = new JsonObject();
            record.addProperty("type", "Feature");
            record.add("properties", properties);
            record.add("geometry", jo);

            // append to resultArray
            resultArray.add(record);

        }

        return resultArray;

    }

    public double calculate_accessbility(double hawkercentre, double childcare, double chasclinic) {

        int hawkercentre_score = -1;
        int childcare_score = -1;
        int chasclinic_score = -1;
        
        int total_score = 0;

        if (hawkercentre != -1) {
            total_score += 5;
            if (hawkercentre > 500) {
                hawkercentre_score = 2;
            } else {
                hawkercentre_score = 5;
            }
        }

        if (childcare != -1) {
            total_score += 5;
            if (childcare > 500) {
                childcare_score = 2;
            } else {
                childcare_score = 5;
            }
        }

        if (chasclinic != -1) {
            total_score += 5;
            if (chasclinic > 500) {
                chasclinic_score = 2;
            } else {
                chasclinic_score = 5;
            }
        }
        
        double result = 0;
        
        if (hawkercentre_score != -1) {
            result += hawkercentre_score;
        }
        if (childcare_score != -1) {
            result += childcare_score;
        }
        if (chasclinic_score != -1) {
            result += chasclinic_score;
        }

        return result / total_score;
    }

}
