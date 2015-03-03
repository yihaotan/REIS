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
public class Transaction {

    final private String rec_no; 
    final private String project_name; 
    final private String address;
    final private int no_of_units; 
    final private int area_sqm; 
    final private String type_of_area; 
    final private int transacted_price;
    final private int unit_price_psm; 
    final private int unit_price_psf; 
    final private String contract_date; 
    final private String property_type;
    final private String tenure; 
    final private String completion_date; 
    final private String type_of_sale; 
    final private String purchaser_address_indicator; 
    final private int postal_district; 
    final private int postal_sector; 
    final private int postal_code; 
    final private String planning_region; 
    final private String planning_area; 
    final private float x; 
    final private float y; 
    
    // constructor
    public Transaction(String rec_no, String project_name, String address, int no_of_units,
                        int area_sqm, String type_of_area, int transacted_price, int unit_price_psm,
                        int unit_price_psf, String contract_date, String property_type, String tenure,
                        String completion_date, String type_of_sale, String purchaser_address_indicator,
                        int postal_district, int postal_sector, int postal_code, String planning_region,
                        String planning_area, float x, float y
                      ) {
        this.rec_no = rec_no;
        this.project_name = project_name;
        this.address = address;
        this.no_of_units = no_of_units;
        this.area_sqm = area_sqm;
        this.type_of_area = type_of_area;
        this.transacted_price = transacted_price;
        this.unit_price_psm = unit_price_psm;
        this.unit_price_psf = unit_price_psf;
        this.contract_date = contract_date;
        this.property_type = property_type;
        this.tenure = tenure;
        this.completion_date = completion_date;
        this.type_of_sale = type_of_sale;
        this.purchaser_address_indicator = purchaser_address_indicator;
        this.postal_district = postal_district;
        this.postal_sector = postal_sector;
        this.postal_code = postal_code;
        this.planning_region = planning_region;
        this.planning_area = planning_area;
        this.x = x;
        this.y = y;
        
    }
    
    // getter
    public String get_rec_no() {
        return rec_no;
    }
    public String get_project_name() {
        return project_name;
    }
    public String get_address() {
        return address;
    }
    public int get_no_of_units() {
        return no_of_units;
    }
    public int get_area_sqm() {
        return area_sqm;
    }
    public String get_type_of_area() {
        return type_of_area;
    }
    public int get_transacted_price() {
        return transacted_price;
    }
    public int get_unit_price_psm() {
        return unit_price_psm;
    }
    public int get_unit_price_psf() {
        return unit_price_psf;
    }
    public String get_contract_date() {
        return contract_date;
    }
    public String get_property_type() {
        return property_type;
    }
    public String get_tenure() {
        return tenure;
    }
    public String get_completion_date() {
        return completion_date;
    }
    public String get_type_of_sale() {
        return type_of_sale;
    }
    public String get_purchaser_address_indicator() {
        return purchaser_address_indicator;
    }
    public int get_postal_district() {
        return postal_district;
    }
    public int get_postal_sector() {
        return postal_sector;
    }
    public int get_postal_code() {
        return postal_code;
    }
    public String get_planning_region() {
        return planning_region;
    }
    public String get_planning_area() {
        return planning_area;
    }
    public float get_x() {
        return x;
    }
    public float get_y() {
        return y;
    }
    

}
