/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

/**
 *
 * @author Zheng Boyang
 */

import java.util.HashMap;

public class Hexagon {
    
    final private int id;
    final private HashMap hm;
    final private String geojson;
    
    public Hexagon (int id, HashMap hm, String geojson) {
        this.id = id;
        this.hm = hm;
        this.geojson = geojson;
    }
    
    // getter
    public int get_id() {
        return id;
    }
    public HashMap get_hm() {
        return hm;
    }
    public String get_geojson() {
        return geojson;
    }
    
    // setter
    public void set_hm(String name, double value) {
        hm.put(name, value);
    }
    
}
