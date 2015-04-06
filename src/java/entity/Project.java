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
public class Project {

    final private String project_name;
    final private String property_type;
    final private String type_of_sale; 
    final private String tenure; 
    
    final private int total_units; 
    final private double distance; 
    
    final private double median_price_psf; 
    
    final private String geojson;

    
    
    // constructor
    public Project(String project_name, String property_type, String type_of_sale, String tenure, 
                    int total_units, double distance, double median_price_psf, String geojson
                      ) {
        this.project_name = project_name;
        this.property_type = property_type;
        this.type_of_sale = type_of_sale;
        this.tenure = tenure;
        this.total_units = total_units;
        this.distance = distance;
        this.median_price_psf = median_price_psf;
        this.geojson = geojson;
        
    }
    
    // getter
    public String get_project_name() {
        return project_name;
    }
    public String get_property_type() {
        return property_type;
    }
    public String get_type_of_sale() {
        return type_of_sale;
    }
    public String get_tenure() {
        return tenure;
    }
    public int get_total_units() {
        return total_units;
    }
    public double get_distance() {
        return distance;
    }
    public double get_median_price_psf() {
        return median_price_psf;
    }
    public String get_geojson() {
        return geojson;
    }
    
}
