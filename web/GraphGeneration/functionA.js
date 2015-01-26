
var markers = new L.LayerGroup();
var heatmapVolume = new L.LayerGroup();
var heatmapPrice = new L.LayerGroup();

function charting(geoJsonData){

//Charts

dateVolumeBarChart = dc.barChart("#dc-dateVolume-chart");
boxPlotChart = dc.boxPlot("#dc-psfBoxPlot-chart");
lineChart = dc.lineChart("#dc-line-chart");
histogram = dc.barChart("#dc-histogram");
dataTable = dc.dataTable("#dc-table-graph");
//propertySeriesChart = dc.seriesChart("#dc-series-chart");
//compositeChart = dc.compositeChart("#dc-composite-chart");
//Get the min date
function getMinDate(data){
    var minDate = d3.min(data,function(d){
        return d.date;
    });
    return minDate;
}
//Get the max date
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
    //Insert the data into the crossfilter        
    var facts = crossfilter(data);
    var all = facts.groupAll();
    // helper method for dateDimension crossfilter
    var reduceAdd = function(p, v) {
        ++p.count;
        p.sum += v.psf;
        p.avg = p.sum / p.count;
        return p;
    };
    var reduceRemove = function(p, v) {
        --p.count;
        p.sum -= v.psf;
        p.avg = p.sum / p.count;
         return p;
    };
    var  reduceInitial = function() {
        return {count: 0, sum: 0, avg:0};
    };
    //propertyVolumeDimension and propertyVolumeGroup for the propertyType row chart and pie chart
    var propertyVolumeDimension = facts.dimension(function(d){
        return d.propertyType;
    });
    var propertyVolumeGroup = propertyVolumeDimension.group().reduceCount(function (d){
        return d.propertyType;
    });
    // boxplot dimension and boxplot group for psf
    var propertyDimension = facts.dimension(function(d){
        return d.propertyType;
    });
    var boxPlotPsfGroup = propertyDimension.group().reduce(
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
    //boxplot dimension and boxplot group for psm
    var boxPlotPsmGroup = propertyDimension.group().reduce(
            function(p,v){
                p.push(v.psm);
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
    //boxplot dimension and boxplot group for price
    var boxPlotPriceGroup = propertyDimension.group().reduce(
            function(p,v){
                p.push(v.price);
                return p;
            },
            function(p,v){
                p.splice(p.indexOf(v.price),1);
                return p;
            },
            function(){
                 return [];
            }    
    );
    //dimension and group for sale volume
    var tenureDimension = facts.dimension(function(d){
        return d.sale;
    });
    var tenureGroup = tenureDimension.group().reduceCount();
    //dimension and group for average psf of the different property types (not used)
    var seriesDimension = facts.dimension(function(d){
        return [d.propertyType , d3.time.day(d.date)];
    });
    var seriesDimensonGroup = seriesDimension.group().reduce(reduceAdd,reduceRemove,reduceInitial);
    //dimension and group for region volume pie and row chart
    var regionDimension = facts.dimension(function(d){
        return d.planningRegion;
    });
    var regionGroup = regionDimension.group().reduceCount();
    //dimension for date
    var dateDimension = facts.dimension(function(d){
        return d3.time.day(d.date);
    });
    //group for date psf
    var datePsfGroup = dateDimension.group();
    //external crossfilter library to help the reducing avg,sum and count for psf
    var datePsfReducer = reductio();
    datePsfReducer.count(true).sum(function(d){return d.psf;}).avg(true)(datePsfGroup);
    //external crossfilter library to help the reducing avg,sum and count for psm
    var datePsmGroup = dateDimension.group();
    var datePsmReducer = reductio();
    datePsmReducer.count(true).sum(function(d){return d.psm;}).avg(true)(datePsmGroup);
     //external crossfilter library to help the reducing avg,sum and count for price
    var datePriceGroup = dateDimension.group();
    var datePriceReducer = reductio();
    datePriceReducer.count(true).sum(function(d){return d.price;}).avg(true)(datePriceGroup);
    //dimension and group for psf
    var psfDimension = facts.dimension(function(d){
        return d.psf;
    });
    // find the max and min psf
    var psfRange = d3.extent(data,function(d){return d.psf;});
    var psfGroup = psfDimension.group(function(d){return Math.ceil(d / 100) * 100;});
    //dimension and group for price
    var priceDimension = facts.dimension(function(d){
        return d.price;
    });
    var priceGroup = priceDimension.group(function(d){return Math.ceil(d/1000) * 1000;});
    //find the max and min price
    var priceRange = d3.extent(data,function(d){return d.price;});
    //dimension and group for psm
    var psmDimension = facts.dimension(function(d){
        return d.psm;
    });
    var psmGroup = psmDimension.group(function(d){return Math.ceil(d/1000) * 1000;});
    //find the max and min for psm
    var psmRange = d3.extent(data,function(d){return d.psm;});
    
    //Intialise the charts
    // Transacted Volume vs Date (For Date Slider)
    dateVolumeBarChart.width(920)
            .height(100)
            .dimension(dateDimension)
            .group(datePsfGroup)
            .valueAccessor(function (p){
                return p.value.count;
            })
            .elasticY(true)
            .transitionDuration(10)
            .centerBar(true)
            .elasticY(true)
            .gap(1)
            //.colors("#2ca02c")
            .x(d3.time.scale().domain([getMinDate(data),getMaxDate(data)]))
            .round(d3.time.day.round)
            .xUnits(d3.time.days)
            .clipPadding(10)
            .xAxis().tickFormat(d3.time.format("%b %d"));
    

    //remove the y axis ticks
    dateVolumeBarChart.yAxis().ticks(0);   
   
     
    // plot the propertyVolume Pie Chart
    function plotPropertyVolumePie(){
        propertyVolumeRowChart = dc.rowChart("#dc-propertyVolume1-chart");
        propertyVolumePieChart = dc.pieChart("#dc-propertyVolume-chart");
        propertyVolumePieChart.width(300)
                .height(200)    
                .transitionDuration(10)
                .radius(80)
                .innerRadius(20)
                .dimension(propertyVolumeDimension)
                .title(function (d) { return d.key +" "+d.value; })
                .group(propertyVolumeGroup)
                .colors(d3.scale.category10())
                .renderLabel(true); 
        propertyVolumeRowChart.width(300)
                .height(200)
                .transitionDuration(10)
                .ordering(function(p){
                    return -p.value;
                })
                .dimension(propertyVolumeDimension)
                .group(propertyVolumeGroup)
                .colors(d3.scale.category10())
                .renderLabel(true)
                .gap(3)
                .elasticX(true)
                .title(function (p) { return p.value; })
                .xAxis().ticks(5).tickFormat(d3.format("s"));
                
       
                
    }
    
    // plot the propertyVolume Row Chart
    function plotPropertyVolumeRow(){
            propertyVolumeRowChart = dc.rowChart("#dc-propertyVolume-chart");
            propertyVolumePieChart = dc.pieChart("#dc-propertyVolume1-chart");
            propertyVolumeRowChart.width(270)
                .height(150)
                .transitionDuration(10)
                .ordering(function(p){
                    return -p.value;
                })
                .dimension(propertyVolumeDimension)
                .group(propertyVolumeGroup)
                .colors(d3.scale.category10())
                .renderLabel(true)
                .elasticX(true)
                .gap(3)
                .title(function (p) { return p.value; })
                .xAxis().ticks(5).tickFormat(d3.format("s"));
            propertyVolumePieChart.width(300)
                .height(200)    
                .transitionDuration(10)
                .radius(80)
                .innerRadius(20)
                .dimension(propertyVolumeDimension)
                .title(function (d) { return d.key +" "+d.value; })
                .group(propertyVolumeGroup)
                .colors(d3.scale.category10())
                .renderLabel(true); 
    }
    
    // Plot Sale Volume Pie Chart
    function plotSaleVolumePie(){
        propertyTenureVolumePieChart = dc.pieChart("#dc-propertyTenureVolume-chart");
        propertyTenureVolumeRowChart =dc.rowChart("#dc-propertyTenureVolume1-chart");
        propertyTenureVolumePieChart.width(300)
                    .height(180)    
                    .transitionDuration(10)
                    .radius(80)
                    .innerRadius(20)
                    .dimension(tenureDimension)
                    .title(function (d) { return d.key +" "+d.value; })
                    .group(tenureGroup)
                    .colors(d3.scale.category10())
                    .renderLabel(true);
            propertyTenureVolumeRowChart.width(300)
                .height(200)
                .transitionDuration(10)
                .ordering(function(p){
                    return -p.value;
                })
                .dimension(tenureDimension)
                .group(tenureGroup)
                .colors(d3.scale.category10())
                .renderLabel(true)
                .elasticX(true)
                .gap(3)
                .title(function (p) { return p.value; })
                .xAxis().ticks(5).tickFormat(d3.format("s"));
    }
    
    //Plot Sale Volume Row Chart
    function plotSaleVolumeRow(){
        propertyTenureVolumePieChart = dc.pieChart("#dc-propertyTenureVolume1-chart");
        propertyTenureVolumeRowChart =dc.rowChart("#dc-propertyTenureVolume-chart");
        propertyTenureVolumeRowChart.width(270)
                .height(150)
                .transitionDuration(10)
                .ordering(function(p){
                    return -p.value;
                })
                .dimension(tenureDimension)
                .group(tenureGroup)
                .colors(d3.scale.category10())
                .renderLabel(true)
                .elasticX(true)
                .gap(3)
                .title(function (p) { return p.value; })
                .xAxis().ticks(5).tickFormat(d3.format("s"));
        propertyTenureVolumePieChart.width(300)
                    .height(200)    
                    .transitionDuration(10)
                    .radius(80)
                    .innerRadius(20)
                    .dimension(tenureDimension)
                    .title(function (d) { return d.key +" "+d.value; })
                    .group(tenureGroup)
                    .colors(d3.scale.category10())
                    .renderLabel(true);
    }
    
    //Plot Region Volume Pie Chart
    function plotRegionVolumePie(){
        propertyRegionVolumePieChart = dc.pieChart("#dc-propertyRegionVolume-chart");
        propertyRegionVolumeRowChart = dc.rowChart("#dc-propertyRegionVolume1-chart");
        propertyRegionVolumePieChart.width(300)
                .height(200)    
                .transitionDuration(10)
                .radius(80)
                .innerRadius(20)
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
                .title(function (d) { return d.key +" "+d.value; })
         propertyRegionVolumeRowChart.width(300)
                .height(200)
                .transitionDuration(10)
                .ordering(function(p){
                    return -p.value;
                })
                .dimension(regionDimension)
                .group(regionGroup)
                .colors(d3.scale.category10())
                .renderLabel(true)
                .elasticX(true)
                .gap(3)
                .title(function (p) { return p.value; })
                .xAxis().ticks(5).tickFormat(d3.format("s"));
    }
    
    //Plot Region Volume Row Chart
    function plotRegionVolumeRow(){
        propertyRegionVolumePieChart = dc.pieChart("#dc-propertyRegionVolume1-chart");
        propertyRegionVolumeRowChart = dc.rowChart("#dc-propertyRegionVolume-chart");  
        propertyRegionVolumeRowChart.width(300)
                .height(140)
                .transitionDuration(10)
                .ordering(function(p){
                    return -p.value;
                })
                .dimension(regionDimension)
                .group(regionGroup)
                .colors(d3.scale.category10())
                .renderLabel(true)
                .elasticX(true)
                .gap(3)
                .title(function (p) { return p.value; })
                .xAxis().ticks(5).tickFormat(d3.format("s"));
        propertyRegionVolumePieChart.width(300)
                .height(200)    
                .transitionDuration(10)
                .radius(80)
                .innerRadius(20)
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
                .title(function (d) { return d.key +" "+d.value; })
    }
    
    //Psf boxplot
    function plotPsfBoxPlot(){
        boxPlotChart
           .width(780)//920
           .height(270)
           .margins({top: 10, right: 0, bottom: 20, left: 75})
           .yAxisLabel("Psf $")
           .dimension(propertyDimension)
           .group(boxPlotPsfGroup)
           .elasticY(true);
           //.elasticX(true);
    }
    
    //Psm boxplot
    function plotPsmBoxPlot(){
        boxPlotChart
           .width(920)
           .height(300)
           .margins({top: 10, right: 0, bottom: 20, left: 75})
           .yAxisLabel("Psm $")
           .dimension(propertyDimension)
           .group(boxPlotPsmGroup)
           .elasticY(true);
           //.elasticX(true);
    }
    
    //Price boxplot
    function plotPriceBoxPlot(){
        boxPlotChart
           .width(920)
           .height(300)
           .margins({top: 10, right: 0, bottom: 20, left: 75})
           .yAxisLabel("Price $")
           .dimension(propertyDimension)
           .group(boxPlotPriceGroup)
           //.elasticX(true)
           .elasticY(true);
    }
    
    //Psf histogram
    function plotPsfHistogram(){
        histogram.width(400)
            .height(200)
            .dimension(psfDimension)
            .group(psfGroup)
            .x(d3.scale.linear().domain([psfRange[0],psfRange[1]+200]).range([0,10]))
            //.xAxisLabel("Psf $") Cannot change dynamically
            .round(Math.ceil)
            .centerBar(true)
            .clipPadding(10)
            .xUnits(function(){return 31;})
            .elasticY(true)
            //.brushOn(false)
            .xAxis();
    }
    
    //Price Histogram
    function plotPriceHistogram(){
        histogram.width(450)
            .height(330)
            .dimension(priceDimension)
            .group(priceGroup)
            .x(d3.scale.linear().domain([priceRange[0],priceRange[1]+200]).range([0,10]))
            //.xAxisLabel("Price $")
            .round(Math.ceil)
            .centerBar(true)
            .clipPadding(10)
            .xUnits(function(){return 1000;})
            .elasticY(true)
            //.brushOn(false)
            .xAxis();
    }
    
    //Psm Histogram
    function plotPsmHistogram(){
        histogram.width(450)
            .height(200)//330
            .dimension(psmDimension)
            .group(psmGroup)
            .x(d3.scale.linear().domain([psmRange[0],psmRange[1]+500]).range([0,10]))
            //.xAxisLabel("Psm $")
            .round(Math.ceil)
            .centerBar(true)
            .clipPadding(10)
            .xUnits(function(){return 33;})
            .elasticY(true)
            //.brushOn(false)
            .xAxis();
    }
    
    //Psf Line Chart
    function plotPsfLineChart(){
        lineChart
            .width(430)
            .height(130)//320
            .margins({top: 10, right: 0, bottom: 20, left: 60})
            .yAxisLabel("Psf $")
            .x(d3.time.scale().domain([getMinDate(data),getMaxDate(data)]))
            .round(d3.time.day.round)
            .xUnits(d3.time.days)
            .elasticY(true)
            .dimension(dateDimension)
            .group(datePsfGroup)
            .valueAccessor(function(d){
                return d.value.avg;
            })
            .brushOn(false)
           .rangeChart(dateVolumeBarChart)
           .xAxis().tickFormat(d3.time.format("%b %d"))
           .ticks(5);
    }
    
    //Psm Line Chart
    function plotPsmLineChart(){
         lineChart
            .width(450)
            .height(320)
            .margins({top: 10, right: 0, bottom: 20, left: 60})
            .yAxisLabel("Psm $")
            .x(d3.time.scale().domain([getMinDate(data),getMaxDate(data)]))
            .round(d3.time.day.round)
            .xUnits(d3.time.days)
            .elasticY(true)
            .dimension(dateDimension)
            .group(datePsmGroup)
            .valueAccessor(function(d){
                return d.value.avg;
            })
           .brushOn(false)
           .rangeChart(dateVolumeBarChart)
           .xAxis().tickFormat(d3.time.format("%b %d"))
           .ticks(5);
    }
    
    //Price Line Chart
    function plotPriceLineChart(){
         lineChart
            .width(450)
            .height(320)
            .margins({top: 10, right: 0, bottom: 20, left: 60})
            .yAxisLabel("Price $")
            .x(d3.time.scale().domain([getMinDate(data),getMaxDate(data)]))
            .round(d3.time.day.round)
            .xUnits(d3.time.days)
            .elasticY(true)
            .dimension(dateDimension)
            .group(datePriceGroup)
            .valueAccessor(function(d){
                return d.value.avg;
            })
           .brushOn(false)
           .rangeChart(dateVolumeBarChart)
           .xAxis().tickFormat(d3.time.format("%b %d"))
           .ticks(5);
        
    }
   
    //For the interactivity
    $(document).ready(function() {
            $("#dc-psfBoxPlot-chart").on('change', function(){
                var text = $('#dc-psfBoxPlot-chart .selectpicker option:selected').text(); 
                if (text === "Psf"){
                   plotPsfHistogram();
                   plotPsfBoxPlot();
                   plotPsfLineChart();
                }else if(text === "Price"){
                   plotPriceHistogram();
                   plotPriceBoxPlot();
                   plotPriceLineChart();
                }
                else{
                    plotPsmHistogram();
                    plotPsmBoxPlot();
                    plotPsmLineChart();
                }
                dc.renderAll();
            });
           $("#bar1").prop("disabled",true);
           $("#bar2").prop("disabled",true);
           $("#bar3").prop("disabled",true);
           $("#bar1").on("click",function(){ 
               $(this).prop('disabled', true);
               $("#pie1").prop('disabled',false);
               plotPropertyVolumeRow();
               propertyVolumeRowChart.on('filtered',function(){
                    var properties=propertyDimension.top(Infinity);
                    markers.clearLayers();
                    heatmapVolume.clearLayers();
                    heatmapPrice.clearLayers();
                    criteriastolayers(properties);
                });
               dc.renderAll();
           });
           $("#pie1").on("click",function(){
               $(this).prop('disabled', true);
               $("#bar1").prop('disabled',false);
               plotPropertyVolumePie();
               propertyVolumePieChart.on('filtered',function(){
                    var properties=propertyDimension.top(Infinity);
                    markers.clearLayers();
                    heatmapVolume.clearLayers();
                    heatmapPrice.clearLayers();
                    criteriastolayers(properties);
                });
               dc.renderAll();
           });
           $("#bar2").on("click",function(){
               $(this).prop('disabled', true);
               $("#pie2").prop('disabled',false);
               plotSaleVolumeRow();
               propertyTenureVolumeRowChart.on('filtered',function(){
                    var properties=propertyDimension.top(Infinity);
                    markers.clearLayers();
                    heatmapVolume.clearLayers();
                    heatmapPrice.clearLayers();
                    criteriastolayers(properties);
                });
                dc.renderAll();
           });
           $("#pie2").on("click",function(){
               $(this).prop('disabled', true);
               $("#bar2").prop('disabled',false);
               plotSaleVolumePie();
               propertyTenureVolumePieChart.on('filtered',function(){
                    var properties=propertyDimension.top(Infinity);
                    markers.clearLayers();
                    heatmapVolume.clearLayers();
                    heatmapPrice.clearLayers();
                    criteriastolayers(properties);
                });
               dc.renderAll();
           });
           $("#bar3").on("click",function(){
              $(this).prop('disabled', true);
              $("#pie3").prop('disabled',false);
               plotRegionVolumeRow();
               propertyRegionVolumeRowChart.on('filtered',function(){
                    var properties=propertyDimension.top(Infinity);
                    markers.clearLayers();
                    heatmapVolume.clearLayers();
                    heatmapPrice.clearLayers();
                    criteriastolayers(properties);
                });
              dc.renderAll();
           });
           $("#pie3").on("click",function(){
               $(this).prop('disabled', true);
              $("#bar3").prop('disabled',false);
               plotRegionVolumePie();
               propertyRegionVolumePieChart.on('filtered',function(){
                    var properties=propertyDimension.top(Infinity);
                    markers.clearLayers();
                    heatmapVolume.clearLayers();
                    heatmapPrice.clearLayers();
                    criteriastolayers(properties);
                });
              dc.renderAll();
           });
    });
    
    //Tabular Module sort by price desc
    dataTable
       .width(920)
       .height(500)
       .dimension(dateDimension)
       .group(function(d) {
        return "";
    })
        .size(20)
        .columns([
    function(d) {
        return   d.projectName;
    },
    function(d) {
       return  d.propertyType;
    },
    function(d) {
        return d.address;
    },
    function(d) {
        return "$"+d.price;
    },
    function(d) {
       return d.planningArea;
    },
    function(d) {
       return d.postalDistrict;
    },
    function(d) {
       return d.postalSector;
    }
    ])
    .sortBy(function(d) {
       return d.price;
    })
    .order(d3.descending);
    
    
    
    //Count the number of records 
    dc.dataCount(".dc-data-count")
    .dimension(facts)
    .group(all);
    //Plot the graphs
    plotPsfHistogram();
    plotPropertyVolumeRow();
    plotSaleVolumeRow();
    plotRegionVolumeRow();  
    plotPsfBoxPlot();
    plotPsfLineChart();
    
    propertyTenureVolumePieChart.on('filtered',function(){
        var properties=propertyDimension.top(Infinity);
        markers.clearLayers();
        heatmapVolume.clearLayers();
        heatmapPrice.clearLayers();
        criteriastolayers(properties);
    });
    propertyTenureVolumeRowChart.on('filtered',function(){
        var properties=propertyDimension.top(Infinity);
        markers.clearLayers();
        heatmapVolume.clearLayers();
        heatmapPrice.clearLayers();
        criteriastolayers(properties);
    });
    
    propertyRegionVolumePieChart.on('filtered',function(){
        var properties=propertyDimension.top(Infinity);
        markers.clearLayers();
        heatmapVolume.clearLayers();
        heatmapPrice.clearLayers();
        criteriastolayers(properties);
    });
    
    propertyRegionVolumeRowChart.on('filtered',function(){
        var properties=propertyDimension.top(Infinity);
        markers.clearLayers();
        heatmapVolume.clearLayers();
        heatmapPrice.clearLayers();
        criteriastolayers(properties);
    });
    
    dateVolumeBarChart.on('filtered',function(){
        var properties=propertyDimension.top(Infinity);
        markers.clearLayers();
        heatmapVolume.clearLayers();
        heatmapPrice.clearLayers();
        criteriastolayers(properties);
    });
   
    propertyVolumeRowChart.on('filtered',function(){
        var properties=propertyDimension.top(Infinity);
        markers.clearLayers();
        heatmapVolume.clearLayers();
        heatmapPrice.clearLayers();
        criteriastolayers(properties);
    });
    propertyVolumePieChart.on('filtered',function(){
        var properties=propertyDimension.top(Infinity);
        markers.clearLayers();
        heatmapVolume.clearLayers();
        heatmapPrice.clearLayers();
        criteriastolayers(properties);
    });
       
    boxPlotChart.on('filtered',function(){
        var properties=propertyDimension.top(Infinity);
        markers.clearLayers();
        heatmapVolume.clearLayers();
        heatmapPrice.clearLayers();
        criteriastolayers(properties);
    });
     histogram.on('filtered',function(){
        var properties=propertyDimension.top(Infinity);
        markers.clearLayers();
        heatmapVolume.clearLayers();
        heatmapPrice.clearLayers();
        criteriastolayers(properties);
    });
     lineChart.on('filtered',function(){
        var properties=propertyDimension.top(Infinity);
        markers.clearLayers();
        heatmapVolume.clearLayers();
        heatmapPrice.clearLayers();
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
    "Show Volume Heatmap ":heatmapVolume,
    "Show Price Heatmap ":heatmapPrice
    };
    var basemaps= {
    "OpenStreet map": mainLayer,
    "Google Roadmap":groadmap,
    "Google Satellite":gsatellite
    };
    map.addLayer(markers);
    L.control.layers(basemaps, overlayMaps).addTo(map);
    //Run 
    dc.renderAll();

}
