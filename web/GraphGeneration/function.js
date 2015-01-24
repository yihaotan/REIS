/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//Charts
dateVolumeBarChart = dc.barChart("#dc-dateVolume-chart");
boxPlotChart = dc.boxPlot("#dc-psfBoxPlot-chart");
//propertySeriesChart = dc.seriesChart("#dc-series-chart");
//compositePsfChart = dc.compositeChart("#dc-composite-chart");
psfLineChart = dc.lineChart("#dc-line-chart");
histogram = dc.barChart("#dc-histogram");
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
d3.json("data.json",function(data){
        
    data.forEach(function (d) {
        d.projectName = d.Project_Name;
        d.address = d.Address;
        d.price = +d.Transacted_Price;
        d.psm = +d.Unit_Price_Psm;
        d.psf = +d.Unit_Price_Psf;
        d.date = parseDate(d.Contract_Date);
        d.propertyType = d.Property_Type;
        d.tenure = d.Tenure;
        d.sale = d.Type_of_Sale;
        d.postalDistrict = +d.Postal_District;
        d.postalSector = +d.Postal_Sector;
        d.postalCode = +d.Postal_Code;
        d.planningRegion = d.Planning_Region;
        d.planningArea = d.Planning_Area;
    });
    //Insert the data into the crossfilter        
    var facts = crossfilter(data);
    var all = facts.groupAll();
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
    var dateDimension = facts.dimension(function(d){
        return d3.time.day(d.date);
    });
    var dateGroup = dateDimension.group().reduce(reduceAdd,reduceRemove,reduceInitial);
    var propertyVolumeDimension = facts.dimension(function(d){
        return d.propertyType;
    });
    var propertyVolumeGroup = propertyVolumeDimension.group().reduceCount(function (d){
        return d.propertyType;
    });
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
    var tenureDimension = facts.dimension(function(d){
        return d.sale;
    });
    var tenureGroup = tenureDimension.group().reduceCount();
    var seriesDimension = facts.dimension(function(d){
        return [d.propertyType , d3.time.day(d.date)];
    });
    var seriesDimensonGroup = seriesDimension.group().reduce(reduceAdd,reduceRemove,reduceInitial);
    var regionDimension = facts.dimension(function(d){
        return d.planningRegion;
    });
    var regionGroup = regionDimension.group().reduceCount();
    var helperDimension = facts.dimension(function(d){
        return d3.time.day(d.date);
    });
    var helperGroup = helperDimension.group();
    var reducer = reductio();
    reducer.min(function(d){return d.psf;}).max(true).median(true)(helperGroup);
    var psfDimension = facts.dimension(function(d){
        return d.psf;
    });
    var psfRange = d3.extent(data,function(d){return d.psf;});
    var psfGroup = psfDimension.group(function(d){return Math.ceil(d / 100) * 100;});
    var priceDimension = facts.dimension(function(d){
        return d.price;
    });
    var priceGroup = priceDimension.group(function(d){return Math.ceil(d/1000) * 1000;});
    var priceRange = d3.extent(data,function(d){return d.price;});
    var psmDimension = facts.dimension(function(d){
        return d.psm;
    });
    var psmGroup = psmDimension.group(function(d){return Math.ceil(d/1000) * 1000;});
    var psmRange = d3.extent(data,function(d){return d.psm;});
    //Intialise the charts
    dateVolumeBarChart.width(920)
            .height(100)
            .dimension(dateDimension)
            .group(dateGroup)
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
    
    dateVolumeBarChart.yAxis().ticks(0);   
    
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
    function plotPropertyVolumeRow(){
            propertyVolumeRowChart = dc.rowChart("#dc-propertyVolume-chart");
            propertyVolumePieChart = dc.pieChart("#dc-propertyVolume1-chart");
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
    function plotSaleVolumePie(){
        propertyTenureVolumePieChart = dc.pieChart("#dc-propertyTenureVolume-chart");
        propertyTenureVolumeRowChart =dc.rowChart("#dc-propertyTenureVolume1-chart");
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
    function plotSaleVolumeRow(){
        propertyTenureVolumePieChart = dc.pieChart("#dc-propertyTenureVolume1-chart");
        propertyTenureVolumeRowChart =dc.rowChart("#dc-propertyTenureVolume-chart");
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
    function plotRegionVolumeRow(){
        propertyRegionVolumePieChart = dc.pieChart("#dc-propertyRegionVolume1-chart");
        propertyRegionVolumeRowChart = dc.rowChart("#dc-propertyRegionVolume-chart");  
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
    function plotPsfBoxPlot(){
        boxPlotChart
           .width(920)
           .height(300)
           .margins({top: 10, right: 40, bottom: 25, left: 50})
           .yAxisLabel("Psf $")
           .dimension(propertyDimension)
           .group(boxPlotPsfGroup)
           .elasticY(true)
           .elasticX(true);
    }
    function plotPsmBoxPlot(){
          boxPlotChart
           .width(920)
           .height(300)
           .margins({top: 10, right: 40, bottom: 25, left: 60})
           .yAxisLabel("Psm $")
           .dimension(propertyDimension)
           .group(boxPlotPsmGroup)
           .elasticY(true)
           .elasticX(true);
    }
    function plotPriceBoxPlot(){
         boxPlotChart
           .width(920)
           .height(300)
           .margins({top: 10, right: 40, bottom: 25, left: 80})
           .yAxisLabel("Price $")
           .dimension(propertyDimension)
           .group(boxPlotPriceGroup)
           .elasticX(true)
           .elasticY(true);
    }
    function plotPsfHistogram(){
        histogram.width(450)
            .height(330)
            .dimension(psfDimension)
            .group(psfGroup)
            .xAxisLabel("Psf $")
            .x(d3.scale.linear().domain([psfRange[0],psfRange[1]+200]).range([0,10]))
            .round(Math.ceil)
            .centerBar(true)
            .clipPadding(10)
            .xUnits(function(){return 31;})
            .elasticY(true)
            .brushOn(false)
            .xAxis();
    }
    function plotPriceHistogram(){
        histogram.width(450)
            .height(330)
            .dimension(priceDimension)
            .group(priceGroup)
            .xAxisLabel("Price $")
            .x(d3.scale.linear().domain([priceRange[0],priceRange[1]+200]).range([0,10]))
            .round(Math.ceil)
            .centerBar(true)
            .clipPadding(10)
            .xUnits(function(){return 1000;})
            .elasticY(true)
            .brushOn(false)
            .xAxis();
    }
    function plotPsmHistogram(){
        histogram.width(450)
            .height(330)
            .dimension(psmDimension)
            .group(psmGroup)
            .xAxisLabel("Psm $")
            .x(d3.scale.linear().domain([psmRange[0],psmRange[1]+500]).range([0,10]))
            .round(Math.ceil)
            .centerBar(true)
            .clipPadding(10)
            .xUnits(function(){return 33;})
            .elasticY(true)
            .brushOn(false)
            .xAxis();
    }
    //For the interactivity
    $(document).ready(function() {
            $("#dc-psfBoxPlot-chart").on('change', function(){
                var text = $('#dc-psfBoxPlot-chart .selectpicker option:selected').text(); 
                if (text === "Psf"){
                   plotPsfHistogram();
                   plotPsfBoxPlot();
                }else if(text === "Price"){
                   plotPriceHistogram();
                   plotPriceBoxPlot();
                }
                else{
                    plotPsmHistogram();
                    plotPsmBoxPlot();
                }
                dc.renderAll();
            });
           $("#bar1").on("click",function(){
               plotPropertyVolumeRow();
               dc.renderAll();
           });
           $("#pie1").on("click",function(){
               plotPropertyVolumePie();
               dc.renderAll();
           });
           $("#bar2").on("click",function(){
                plotSaleVolumeRow();
                dc.renderAll();
           });
           $("#pie2").on("click",function(){
               plotSaleVolumePie();
               dc.renderAll();
           });
           $("#bar3").on("click",function(){
              plotRegionVolumeRow();
              dc.renderAll();
           });
           $("#pie3").on("click",function(){
              plotRegionVolumePie();
              dc.renderAll();
           });
    });
    
    psfLineChart
            .width(450)
            .height(300)
            //.margins({top: 10, right: 10, bottom: 30, left: 40})
            .yAxisLabel("Psf $")
            .x(d3.time.scale().domain([getMinDate(data),getMaxDate(data)]))
            .round(d3.time.day.round)
            .xUnits(d3.time.days)
            .elasticY(true)
            .dimension(dateDimension)
            .group(dateGroup)
            .valueAccessor(function(d){
                return d.value.avg;
            })
           .brushOn(false)
           .rangeChart(dateVolumeBarChart)
           .xAxis().tickFormat(d3.time.format("%b %d"))
           .ticks(5);
       
    /*compositePsfChart
        .width(920)
        .height(300)
        .margins({top: 10, right: 10, bottom: 30, left: 40})
        .yAxisLabel("Psf $")
        .x(d3.time.scale().domain([getMinDate(data),getMaxDate(data)]))
        .round(d3.time.day.round)
        .xUnits(d3.time.days)
        .elasticY(true)
        .renderHorizontalGridLines(true)
        .dimension(helperDimension)
        .brushOn(false)
        .legend(dc.legend().x(800).y(20).itemHeight(13).gap(5))
        .rangeChart(dateVolumeBarChart)
        .compose([
            dc.lineChart(compositePsfChart)
                .interpolate('linear')
                .group(helperGroup,"Max Psf")
                .colors('red')
                .renderTitle(true)
                .valueAccessor(function(d){
                    return d.value.max;
                })
                ,
            dc.lineChart(compositePsfChart)
                .interpolate('linear')
                 .group(helperGroup,"Medain Psf")
                .colors('blue')
                 .renderTitle(true)
                .valueAccessor(function(d){
                    return d.value.median;
                })
                ,
            dc.lineChart(compositePsfChart,"Min Psf")
                .interpolate('linear')
                .group(helperGroup,"Min Psf")
                .colors('green')
                 .renderTitle(true)
                .valueAccessor(function(d){
                    return d.value.min;
                })
            ])
             .xAxis().tickFormat(d3.time.format("%b %d"))*/         
    
    /*propertySeriesChart
        .width(920)
        .height(300)
        .margins({top: 10, right: 10, bottom: 50, left: 40})
        .chart(function(c) { return dc.lineChart(c).interpolate('linear'); })
        .x(d3.time.scale().domain([getMinDate(data),getMaxDate(data)]))
        //.rangeChart(dateVolumeBarChart) 
        .y(d3.scale.linear().domain([0,2100])) //need to fix the domain
        .yAxisLabel("Psf $")
        .clipPadding(10)
        .brushOn(false)
        .dimension(seriesDimension)
        .renderHorizontalGridLines(true)
        .group(seriesDimensonGroup)
        .elasticY(true)
        .transitionDuration(10)
        .seriesAccessor(function(d) {return d.key[0];})
        .keyAccessor(function(d) {return d.key[1];})
        .valueAccessor(function(d) {return d.value.avg;})
        .legend(dc.legend().x(80).y(280).itemWidth(150).legendWidth(800).horizontal(true))
        .xUnits(d3.time.days)
        .round(d3.time.day.round)
        .xAxis().tickFormat(d3.time.format("%b %d"));*/
    
    dc.dataCount(".dc-data-count")
    .dimension(facts)
    .group(all);
    
    plotPsfHistogram();
    plotPropertyVolumePie();
    plotSaleVolumePie();
    plotRegionVolumePie();  
    plotPsfBoxPlot();
    
    dc.renderAll();
});

    
    
    
    
    
    
    
    
