/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var markers = new L.LayerGroup();
var heatmap = new L.LayerGroup();
function charting(geoJsonData){
//Charts

dateVolumeBarChart = dc.barChart("#dc-dateVolume-chart");
propertyVolumeRowChart = dc.rowChart("#dc-propertyVolume-chart");
propertyTenureVolumePieChart = dc.pieChart("#dc-propertyTenureVolume-chart");
propertyRegionVolumePieChart = dc.pieChart("#dc-propertyRegionVolume-chart");
averagePsfLineChart = dc.lineChart("#dc-averagePsf-chart");
averagePsfBoxPlotChart = dc.boxPlot("#dc-averagePsfBoxPlot-chart");

//Get the min and max date 
function getMinDate(data){
    var minDate = d3.min(data,function(d){
        return d.date;
    });
    return minDate;
}
function getMaxDate(data){
    
    var maxDate = d3.max(data,function(d){
        return d.date;
    });
    maxDate.setDate(maxDate.getDate() + 1);
    return maxDate;
}
//Parse the date
function parseDate(dateStr){
    
    var format = d3.time.format("%d-%b-%y");
    return format.parse(dateStr);    
}
//Read the data 
//d3.json(geoJsonData,function(data){
    var data=geoJsonData;    
    data.forEach(function (d) {
        d.projectName = d.properties.PROJECT_NAME;
        d.address = d.properties.ADDRESS;
        d.price = d.properties.TRANSACTED_PRICE;
        d.psm = +d.properties.UNIT_PRICE_PSM;
        d.psf = +d.properties.UNIT_PRICE_PSF;
        d.date = parseDate(d.properties.CONTRACT_DATE);
        d.propertyType = d.properties.PROPERTY_TYPE;
        d.tenure = d.properties.TENURE;
        d.sale = d.properties.TYPE_OF_SALE;
        d.postalDistrict = +d.properties.POSTAL_DISTRICT;
        d.postalSector = +d.properties.POSTAL_SECTOR;
        d.postalCode = +d.properties.POSTAL_CODE;
        d.planningRegion = d.properties.PLANNING_REGION;
        d.planningArea = d.properties.PLANNING_AREA;
        d.lat=d.geometry.coordinates[0].toString();
        d.lon=d.geometry.coordinates[1].toString();
        
    });
    //var geodata = geoJsonData.slice();
    //Insert the data into the crossfilter        
    var facts = crossfilter(data);
    var all = facts.groupAll();
    var dateDimension = facts.dimension(function(d){
        return d3.time.day(d.date);
    });
    var dateGroup = dateDimension.group().reduce(
            function(p,v){
                p.count++;
                p.sum += v.psf;
                p.avg = p.sum / p.count;
                return p;
            },
            function(p,v){
                p.count--;
                p.sum -= v.psf;
                p.avg = p.sum / p.count;
                return p;
            },
            function(){
                return{
                    count:0,
                    sum:0,
                    avg:0
                };
            }
    );
    var propertyDimension = facts.dimension(function(d){
        
        return d.propertyType;
    });
    
    var boxPlotPropertyGroup = propertyDimension.group().reduce(
            function(p,v){
                p.push(v.psf);
                return p;
            },
            function(p,v){
                p.splice(p.indexOf(v.psf),1);
                return p;
            },
            function(){
                 return [];
            }    
    );
        
    var propertyVolumeDimension = facts.dimension(function(d){
       return d.propertyType; 
    });
    var propertyVolumeGroup = propertyVolumeDimension.group().reduceCount(function(d){
       return d.propertyType; 
    });
    var tenureDimension = facts.dimension(function(d){
        return d.sale;
    });
    var tenureGroup = tenureDimension.group().reduceCount(function(d){
        return d.sale;
    });
    var seriesDimension = facts.dimension(function(d){
        return [d.propertyType , d3.time.day(d.date)];
    });
    var seriesDimensionGroup = seriesDimension.group().reduce(
            function(p,v){
                p.count++;
                p.sum += v.psf;
                p.avg = p.sum / p.count;
                return p;
            },
            function(p,v){
                p.count--;
                p.sum -= v.psf;
                p.avg = p.sum / p.count;
                return p;
            },
            function(){
                return{
                    count:0,
                    sum:0,
                    avg:0
                };
            }   
    );
    var areaDimension = facts.dimension(function(d){
        return d.planningArea;
    });
    var areaGroup = areaDimension.group().reduce(
            function(p,v){
                p.count++;
                p.sum += v.psf;
                p.avg = p.sum / p.count;
                return p;
            },
            function(p,v){
                p.count--;
                p.sum -= v.psf;
                p.avg = p.sum / p.count;
                return p;
            },
            function(){
                return{
                    count:0,
                    sum:0,
                    avg:0
                };
            }   
    );
    var regionDimension = facts.dimension(function(d){
        return d.planningRegion;
    });
    var regionGroup = regionDimension.group().reduceCount(function(d){
        return d.planningRegion;
    });
    //Intialise the charts
    dateVolumeBarChart.width(750)
            .height(130)
            .dimension(dateDimension)
            .group(dateGroup)
            .valueAccessor(function (p){
                return p.value.count;
            })
            .elasticY(true)
            .transitionDuration(10)
            .centerBar(true)
            .gap(1)
            .round(d3.time.day.round)
            .xUnits(d3.time.days)
            .x(d3.time.scale().domain([getMinDate(data), getMaxDate(data)]))
            .xAxis().tickFormat(d3.time.format("%b %d"));
    
    dateVolumeBarChart.on('filtered',function(){
       var properties=propertyDimension.top(Infinity);
       markers.clearLayers();
       heatmap.clearLayers();
       criteriastolayers(properties);
   });

    //dateVolumeBarChart.yAxis().ticks(0);
    propertyVolumeRowChart.width(300)
                .height(180)
                //.margins({top: 20, left: 10, right: 10, bottom: 20})
                .transitionDuration(10)
                 .ordering(function(p){
                    return -p.value;
                })
                .dimension(propertyVolumeDimension)
                .group(propertyVolumeGroup)
                .colors(d3.scale.category10())
                .renderLabel(true)
                .gap(3)
                .title(function (p) { return p.value; })
                .xAxis().ticks(5).tickFormat(d3.format("s"));
                
    propertyVolumeRowChart.on('filtered',function(){
       var properties=propertyDimension.top(Infinity);
       markers.clearLayers();
       heatmap.clearLayers();
       criteriastolayers(properties);
   });
                
    propertyTenureVolumePieChart.width(300)
                    .height(200)    
                    .transitionDuration(10)
                    .radius(100)
                    .innerRadius(30)
                    .dimension(tenureDimension)
                    .title(function (d) { return d.key +" "+d.value; })
                    .group(tenureGroup)
                    .colors(d3.scale.category10())
                    .renderLabel(true);
    
    
    propertyTenureVolumePieChart.on('filtered',function(){
       var properties=propertyDimension.top(Infinity);
       //alert(properties[0].lat);
       markers.clearLayers();
       heatmap.clearLayers();
       criteriastolayers(properties);
   });
   
    propertyRegionVolumePieChart.width(300)
                    .height(300)    
                    .transitionDuration(10)
                    .radius(100)
                    .innerRadius(30)
                    .dimension(regionDimension)
                    .title(function (d) { return d.key +" "+d.value; })
                    .group(regionGroup)
                    .colors(["#9467bd", "#2ca02c", "#ff7f0e","#1f77b4","#d62728"])
                    .colorDomain([0,5])
                    .colorAccessor(function(d,i){
                        if(d.key === "North East Region"){
                           return 0;
                        }else if (d.key === "East Region"){
                            return 1;
                        }else if(d.key === "West Region"){
                            return 2;
                        }else if(d.key === "Central Region"){
                            return 3;
                        }else if(d.key === "North Region"){
                            return 4;
                        }
                    })
                    .renderLabel(true)
                    .title(function (d) { return d.key +" "+d.value; });
   
   // var str="";
    //for(var i=0;i<properties.length;i++){
     //   str+= properties[i].propertyType.toString();

    // }
    propertyRegionVolumePieChart.on('filtered',function(){
       var properties=propertyDimension.top(Infinity);
       markers.clearLayers();
       heatmap.clearLayers();
       criteriastolayers(properties);
   }); 
   
   
    averagePsfLineChart.width(600)
            .height(110)
            .margins({top: 10, right: 10, bottom: 20, left: 70})
            .dimension(dateDimension)
            .group(dateGroup)   
            .brushOn(false)         
            .elasticY(true)
            .valueAccessor(function (p){
                    return p.value.avg;
            })
            .transitionDuration(10)
            .x(d3.time.scale().domain([getMinDate(data), getMaxDate(data)]))
            .rangeChart(dateVolumeBarChart)
            .renderHorizontalGridLines(true)
            .xAxis().tickFormat(d3.time.format("%b %d"));
            
    averagePsfLineChart.on('filtered',function(){
       var properties=propertyDimension.top(Infinity);
       markers.clearLayers();
       heatmap.clearLayers();
       criteriastolayers(properties);
   });
           
    averagePsfBoxPlotChart
           .width(800)
           .height(480)
           .margins({top: 10, right: 10, bottom: 20, left: 40})
         
           .dimension(propertyDimension)
           .group(boxPlotPropertyGroup)
           
           //.elasticY(true);
           
    averagePsfBoxPlotChart.on('filtered',function(){
       var properties=propertyDimension.top(Infinity);
       markers.clearLayers();
       heatmap.clearLayers();
       criteriastolayers(properties);
   });
    //Create map layer using googlemap terrain
    var gterrain = new L.Google('TERRAIN');

    //Create map layer using googlemap satellite
    var gsatellite = new L.Google('SATELLITE');

    //Create map layer using googlemap road map
    var groadmap = new L.Google('ROADMAP');
    
    var properties=propertyDimension.top(Infinity);
    criteriastolayers(properties);
    
    var overlayMaps = {
    "Show Markers": markers,
    "Show Heatmap":heatmap
    };
    var basemaps= {
    "OpenStreet map": mainLayer,
    "Google Roadmap":groadmap,
    "Google Satellite":gsatellite
    };
    map.addLayer(markers);
    L.control.layers(basemaps, overlayMaps).addTo(map);
    
    dc.renderAll();

        
    
//});
}
