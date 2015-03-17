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
    public ArrayList<Hexagon> retrieve() {
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

            // Formulate the query string
            String select_list
                    = " SELECT grid_centroid.gid as point, "
                    + "     selected_grid.gid as hexagon, "
                    + "     AVG(hawkercentre_distance) as hawkercentre, "
                    + "     AVG(childcare_distance) as childcare, "
                    + "     AVG(chasclinic_distance) as chasclinic, "
                    + "     ST_AsGeoJSON(selected_grid.geom) as GeoJSON ";
            String from_list
                    = " FROM grid_centroid, "
                    + "     selected_grid, "
                    + "     hawkercentre_table, "
                    + "     childcare_table, "
                    + "     chasclinic_table ";
            String where_list
                    = " WHERE hawkercentre_row_number <= 3 "
                    + " AND childcare_row_number <= 3"
                    + " AND chasclinic_row_number <= 3"
                    + " AND selected_grid.gid = grid_centroid.gid"
                    + " AND grid_centroid.gid = hawkercentre_table.grid_id"
                    + " AND hawkercentre_table.grid_id = childcare_table.grid_id"
                    + " AND hawkercentre_table.grid_id = chasclinic_table.grid_id";
            String group_by
                    = " GROUP BY point, hexagon"
                    + " ORDER BY point;";
            String query = select_list + from_list + where_list + group_by;

            // final sql
            sql = "WITH "
                    + hawkercentre_table + ","
                    + childcare_table + ","
                    + chasclinic_table + " "
                    + query;

            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();

            while (rs.next()) {
                //Retrieve by column name
                int id = rs.getInt("point");
                String geojson = rs.getString("geojson");
                double hawkercentre = rs.getDouble("hawkercentre");
                double childcare = rs.getDouble("childcare");
                double chasclinic = rs.getDouble("chasclinic");

                HashMap hm = new HashMap();
                hm.put("hawkercentre", hawkercentre);
                hm.put("childcare", childcare);
                hm.put("chasclinic", chasclinic);

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
    public JsonArray toJSON(ArrayList<Hexagon> result) {

        JsonArray resultArray = new JsonArray();

        for (int i = 0; i < result.size(); i++) {

            // add properties
            JsonObject properties = new JsonObject();
            HashMap hm = result.get(i).get_hm();
            double hawkercentre = (Double) hm.get("hawkercentre");
            double childcare = (Double) hm.get("childcare");
            double chasclinic = (Double) hm.get("chasclinic");
            int accessibility_score = calculate_accessbility(hawkercentre, childcare, chasclinic);
            properties.addProperty("density", accessibility_score);
            properties.addProperty("hawkercentre", hawkercentre);
            properties.addProperty("childcare", childcare);
            properties.addProperty("chasclinic", chasclinic);

            // add coordinates
            String geojson_str = result.get(i).get_geojson();
            Gson gson = new Gson();
            JsonElement je = gson.fromJson(geojson_str, JsonElement.class);
            JsonObject jo = je.getAsJsonObject();

            if (i == 0) {
                JsonArray ja = (JsonArray) jo.get("coordinates");
                JsonArray first_instance = (JsonArray) ja.get(0);
                JsonArray first_polygon = (JsonArray) first_instance.get(0);
                JsonArray vertex_one = (JsonArray) first_polygon.get(0);
                
                double northing = vertex_one.get(0).getAsDouble();
                double easting = vertex_one.get(1).getAsDouble();

                SVY21Coordinate svy21_result = new SVY21Coordinate(northing, easting);
                LatLonCoordinate latlon_result = svy21_result.asLatLon();
                double lat = latlon_result.getLatitude();
                double lon = latlon_result.getLongitude();
                System.out.println("Lon is " + lon + " and Lat is " + lat);
            }

            // add geometry
//            JsonObject geometry = new JsonObject();
//            geometry.addProperty("type", "Polygon");
//            geometry.add("coordinates", jo.coordinates);
            // add everything into one record
            JsonObject record = new JsonObject();

            record.addProperty("type", "Feature");
            record.add("properties", properties);
            record.add("geometry", jo);

            // append to resultArray
            resultArray.add(record);

        }

        return resultArray;

    }

    public int calculate_accessbility(double hawkercentre, double childcare, double chasclinic) {

        int hawkercentre_score;
        int childcare_score;
        int chasclinic_score;

        if (hawkercentre > 300) {
            hawkercentre_score = 0;
        } else {
            hawkercentre_score = 5;
        }

        if (childcare > 300) {
            childcare_score = 0;
        } else {
            childcare_score = 5;
        }

        if (chasclinic > 300) {
            chasclinic_score = 0;
        } else {
            chasclinic_score = 5;
        }

        int result = hawkercentre_score + childcare_score + chasclinic_score;

        return result;
    }
}
