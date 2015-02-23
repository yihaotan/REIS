/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//Charts
dateVolumeBarChart = dc.barChart("#dc-dateVolume-chart");
boxPlotChart = dc.boxPlot("#dc-psfBoxPlot-chart");
compositeControlChart  = dc.compositeChart("#dc-control-chart"); 
histogram = dc.barChart("#dc-histogram");
dataTable = dc.dataTable("#dc-table-graph");
//Date format
var dateFormat = d3.time.format('%b %y');

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
//Get min and max price might not be useful
function getMaxPrice(data){
    var maxPrice = d3.max(data,function(d){
            return d.price;
    });
    return maxPrice;
};
function getMinPrice(data){
    var minPrice = d3.min(data,function(d){
            return d.price;
    });
    return minPrice;
}
//Parse the date
function parseDate(dateStr){
    var format = d3.time.format("%d/%m/%Y");
    return format.parse(dateStr);    
}
//Check for integer
function isInt(n){
    return n % 1 === 0;
}
function getMinMaxValue(dimension,group){
    var dateArray = dimension.top(Infinity);
    var dateRange = d3.extent(dateArray,function(d){return d.date;});
    var maxDate = dateRange[1];
    var minDate = dateRange[0];
    var inputArray = group.top(Infinity);
    var outputArrayValues = [];
    for (i=0;i<inputArray.length;i++){
        if(inputArray[i].key >= minDate && inputArray[i].key <= maxDate){
            outputArrayValues.push(inputArray[i].value.median);
        }
    }
    crossfilter.quicksort(outputArrayValues,0,outputArrayValues.length);
    var results = [];
    results.push(outputArrayValues[0]);
    results.push(outputArrayValues[outputArrayValues.length-1]);
    return results;
}
// Generate Percentile Value for 10 percentile and 90 percentile
function getPercentileValue(percentileFloat, dimension, group ){
    console.log("First Line");
    var dateArray = dimension.top(Infinity);
    var dateRange = d3.extent(dateArray,function(d){return d.date;});
    var maxDate = dateRange[1];
    var minDate = dateRange[0];
    var inputArray = group.top(Infinity);
    var outputArrayValues = [];
    console.log("Just outside Loop");
    for (i=0;i<inputArray.length;i++){
        if(inputArray[i].key >= minDate && inputArray[i].key <= maxDate){
            outputArrayValues.push(inputArray[i].value.median);
        }
        console.log("In loop");
    }
    console.log("Out of the loop");
    crossfilter.quicksort(outputArrayValues,0,outputArrayValues.length);
    var percentileIndex = 0;
    var isInteger = isInt(percentileFloat * outputArrayValues.length);
    var percentileValue = 0;
    if (isInteger){
        percentileIndex = (percentileFloat * outputArrayValues.length) - 1;
        percentileValue = (outputArrayValues[percentileIndex] + outputArrayValues[percentileIndex + 1])/2;
    }else{
        percentileIndex = Math.ceil(percentileFloat * outputArrayValues.length) - 1;
        //if (percentileIndex < 0){
            //percentileIndex = 0;
        //}
        percentileValue = outputArrayValues[percentileIndex];       
    }
    console.log("End of method");
    return percentileValue;
}
function getFilters(chart){
      return chart.filters();
}
function applyFilter(chart,filterA){
       for (var i = 0; i<filterA.length;i++){
            chart.filter(filterA[i]);
        }
} 
//New data 
d3.json("2013.json",function(data){
    data.forEach(function (d) {
        d.projectName = d.Project_Name;
        d.address = d.Address;
        d.price = +d.Transacted_Price;
        d.psm = +d.Unit_Price_Psm;
        d.psf = +d.Unit_Price_Psf;
        d.area = +d.Area;
        d.date = parseDate(d.Contract_Date);
        d.propertyType = d.Property_Type;
        d.tenure = d.Tenure;
        d.sale = d.Type_Of_Sale;
        d.postalDistrict = +d.Postal_District;
        d.postalSector = +d.Postal_Sector;
        d.postalCode = +d.Postal_Code;
        d.planningRegion = d.Planning_Region;
        d.planningArea = d.Planning_Area;
        //d.X = +d.X;
        //d.Y = +d.Y;
    });
    //Insert the data into the crossfilter        
    var facts = crossfilter(data);
    var all = facts.groupAll();
    // helper method for dateDimension crossfilter
   /* var reduceAdd = function(p, v) {
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
    var reduceInitial = function() {
        return {count: 0, sum: 0, avg:0};
    };*/
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
    // dimesion and group for tenure volume
    var tenureDimension = facts.dimension(function(d){
        var tenure = d.tenure;
        if (tenure === 'Freehold'){
            return 'Freehold';
        }else if (tenure.substring(0,3) === '999'){
            return '999 Yrs';
        }else{
            return '99 Yrs';
        }
    });
    var tenureGroup = tenureDimension.group().reduceCount();
    //dimension and group for sale volume
    var salesDimension = facts.dimension(function(d){
      return d.sale;
    });
    var salesGroup = salesDimension.group().reduceCount();
    //dimension and group for average psf of the different property types (not used)
    /*var seriesDimension = facts.dimension(function(d){
        return [d.propertyType , d3.time.day(d.date)];
    });*/
   /* var seriesDimensonGroup = seriesDimension.group().reduce(reduceAdd,reduceRemove,reduceInitial);
    //dimension and group for region volume pie and row chart*/
    var regionDimension = facts.dimension(function(d){
        return d.planningRegion;
    });
    var regionGroup = regionDimension.group().reduceCount();
    //dimension for date
    var dateDimension = facts.dimension(function(d){
        return d3.time.month(d.date);
    });
    var dateGroup = dateDimension.group().reduceCount();
    //date median psf
    var datePsfGroup = dateDimension.group();
    var datePsfReducer = reductio();
    datePsfReducer.min(function(d){return d.psf;}).max(true).median(true)(datePsfGroup);
    //date median psm
    var datePsmGroup = dateDimension.group();
    var datePsmReducer = reductio();
    datePsmReducer.min(function(d){return d.psm;}).max(true).median(true)(datePsmGroup);
    //date median price
    var datePriceGroup = dateDimension.group();
    var datePriceReducer = reductio();
    datePriceReducer.min(function(d){return d.price;}).max(true).median(true)(datePriceGroup);
    //dimension and group for psf
    var psfDimension = facts.dimension(function(d){
        return d.psf;
    });
    var psfRange = d3.extent(data,function(d){return d.psf;});
    console.log("max psf:"+psfRange[1]);
    var psfGroup = psfDimension.group(function(d){return Math.ceil(d / 100) * 100;});
    //dimension and group for price
    var priceDimension = facts.dimension(function(d){
        return d.price;
    });
    var priceGroup = priceDimension.group(function(d){return Math.ceil(d/1000) * 1000;});
    var priceRange = d3.extent(data,function(d){return d.price;});
    //dimension and group for psm
    var psmDimension = facts.dimension(function(d){
        return d.psm;
    });
    var psmGroup = psmDimension.group(function(d){return Math.ceil(d/1000) * 1000;});
    var psmRange = d3.extent(data,function(d){return d.psm;});
    //dummyGroup
    var dummyGroupFor10Percentile = dateDimension.group().reduceSum(function(d){
        return d.psf;
    });
    var dummyGroupFor90Percentile = dateDimension.group().reduceSum(function(d){
        return d.psf;
    }); 
    var minDate = getMinDate(data);
    var maxDate = getMaxDate(data);
    //customised tooltips
   var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function (d) { return "<span style='color: #f0027f'>" +  d.key + "</span> : "  + (d.value); });
    var pieTip = d3.tip()
                 .attr('class', 'd3-tip')
                 .offset([-10, 0])
                 .html(function (d) { return "<span style='color: #f0027f'>" +  d.data.key + "</span> : "  + (d.value); });
   
    //Intialise the charts
    //Transacted Volume vs Date (For Date Slider)          
    dateVolumeBarChart.width(920)
            .height(100)
            .dimension(dateDimension)
            .group(dateGroup)
            .elasticY(true)
            .transitionDuration(0)
            .centerBar(true)
            .elasticY(true)
            .gap(1)
            .x(d3.time.scale().domain([minDate,maxDate]))
            .round(d3.time.month.round)
            .xUnits(d3.time.months)
            .clipPadding(10)
            .xAxis().tickFormat(d3.time.format("%b %y"));   
    //remove the y axis ticks
    dateVolumeBarChart.yAxis().ticks(0);   
    // propertyVolumePie properties 
    function propertyVolumePie(){
        propertyVolumePieChart.width(300)
            .height(200)    
            .transitionDuration(0)
            .radius(80)
            .innerRadius(20)
            .dimension(propertyVolumeDimension)
            .title(function (d) { return d.key +": "+d.value; })
            .group(propertyVolumeGroup)
            .colors(["#1f77b4","#ff7f0e","#2ca02c"," #d62728","#9467bd","#8c564b"])
            .colorDomain([0,6])
            .colorAccessor(function(d,i){
            if(d.key === "Apartment"){
                        return 0;
            }else if (d.key === "Condominium"){
                        return 1;
                    }else if(d.key === "Detached House"){
                        return 2;
                    }else if(d.key === "Executive Condominium"){
                        return 3;
                    }else if(d.key === "Semi-Detached House"){
                        return 4;
                     }else if(d.key === "Terrace House"){
                         return 5;
                     }
            })
            //.renderlet(function(chart){
                //chart.selectAll("svg").selectAll(".pie-slice").call(pieTip)
                     //.on("mouseover",pieTip.show)
                     //.on("mouseleave",pieTip.hide);
            //})
         .renderLabel(true)
         .renderTitle(true);
    }           
    //propertyVolumeRow properties
    function propertyVolumeRow(){
        propertyVolumeRowChart.width(300)
                .height(200)
                .transitionDuration(0)
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
                .renderTitle(true)
                .renderlet(function(chart){
                        chart.selectAll("g.row rect").attr("fill", function(d){
                        if(d.key === "Apartment"){
                            return "#1f77b4";
                        }else if(d.key === "Condominium"){
                            return "#ff7f0e";
                        }else if(d.key === "Detached House"){
                            return "#2ca02c";
                        }else if(d.key === "Executive Condominium"){
                            return "#d62728";
                        }else if(d.key === "Semi-Detached House"){
                            return "#9467bd";
                        }else{
                            return "#8c564b";
                        }
                   });
                   //chart.selectAll("svg").selectAll("g.row").call(tip)
                        //.on("mouseover",tip.show)
                        //.on("mouseleave",tip.hide);
                })
                .xAxis().ticks(5).tickFormat(d3.format("s"));
        
                
    }
  
    // plot the propertyVolume Pie Chart
    function plotPropertyVolumePie(){
        var f1 = getFilters(propertyVolumeRowChart);
        propertyVolumePieChart = dc.pieChart("#dc-propertyVolume-chart");
        propertyVolumePie();
        applyFilter(propertyVolumePieChart,f1);
    }
    // plot the propertyVolume Row Chart
    function plotPropertyVolumeRow(){ 
            if (typeof propertyVolumePieChart !== 'undefined') {
                var f2 = getFilters(propertyVolumePieChart);
                 propertyVolumeRowChart = dc.rowChart("#dc-propertyVolume-chart");
                 propertyVolumeRow();
                 applyFilter(propertyVolumeRowChart,f2);
            }else{
                 propertyVolumeRowChart = dc.rowChart("#dc-propertyVolume-chart");
                 propertyVolumeRow();
            }
    }
    // saleVolumePie properties
     function saleVolumePie(){
         propertySaleVolumePieChart.width(300)
                .height(200)    
                .transitionDuration(0)
                .radius(80)
                .innerRadius(20)
                .dimension(salesDimension)
                .title(function (d) { return d.key +": "+d.value; })
                .group(salesGroup)
                //.colors(d3.scale.category10())
                .colors(['#2ca02c','#d62728','#1f77b4'])
                .colorDomain([0,3])
                .colorAccessor(function(d,i){
                if(d.key === "New Sale"){
                       return 0;
                    }else if (d.key === "Resale"){
                        return 1;
                    }else{
                        return 2;
                    }
                })
                .renderLabel(true);
     }
     //saleVolumeRow properties 
     function saleVolumeRow(){
          propertySaleVolumeRowChart.width(300)
                .height(200)
                .transitionDuration(0)
                .ordering(function(p){
                    return -p.value;
                })
                .dimension(salesDimension)
                .group(salesGroup)
                .colors(d3.scale.category10())
                .renderLabel(true)
                .elasticX(true)
                .gap(3)
                .title(function (p) { return p.value; })
                .renderTitle(true)
                .renderlet(function(chart){
                    chart.selectAll("g.row rect").attr("fill", function(d){
                        if(d.key === "New Sale"){
                            return '#2ca02c';
                        }else if(d.key === 'Resale'){
                            return '#d62728';
                        }else{
                            return '#1f77b4';
                        }
                    });
                    //chart.selectAll("g.row").call(tip)
                        //.on("mouseover",tip.show)
                        //.on("mouseleave",tip.hide);
                })
                .xAxis().ticks(5).tickFormat(d3.format("s"));
     }
     //Plot Sale Volume Pie Chart
     function plotSaleVolumePie(){
        var f1 = getFilters(propertySaleVolumeRowChart);
        propertySaleVolumePieChart = dc.pieChart("#dc-propertySaleVolume-chart");
        saleVolumePie();
        applyFilter(propertySaleVolumePieChart,f1);
    }
    //Plot Sale Volume Row Chart
    function plotSaleVolumeRow(){
        if (typeof  propertySaleVolumePieChart !== 'undefined') {
            var f2 = getFilters(propertySaleVolumePieChart);
            propertySaleVolumeRowChart = dc.rowChart("#dc-propertySaleVolume-chart");
            saleVolumeRow();
            applyFilter(propertySaleVolumeRowChart,f2);
        }else{
            propertySaleVolumeRowChart = dc.rowChart("#dc-propertySaleVolume-chart");
            saleVolumeRow();
        }
    }
    //tenure volume pie properties
    function tenureVolumePie(){
         propertyTenureVolumePieChart.width(300)
                .height(200)    
                .transitionDuration(0)
                .radius(80)
                .innerRadius(20)
                .dimension(tenureDimension)
                .title(function (d) { return d.key +": "+d.value;})
                .group(tenureGroup)
                .colors(['#2ca02c','#d62728','#1f77b4'])
                .colorDomain([0,3])
                .colorAccessor(function(d,i){
                if(d.key === "Freehold"){
                       return 0;
                    }else if (d.key === "99 Yrs"){
                        return 1;
                    }else{
                        return 2;
                    }
                })
                .renderLabel(true);
                //.renderlet(function(chart){
                     //chart.selectAll(".pie-slice").call(tip)
                            //.on("mouseover",tip.show).on("mouseleave",tip.hide).on("click",alert("Test"));
                //})
            
    }
    //tenure volume row properties
    function tenureVolumeRow(){
         propertyTenureVolumeRowChart.width(300)
                .height(200)
                .transitionDuration(0)
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
                .renderTitle(true)
                .renderlet(function(chart){
                     chart.selectAll("g.row rect").attr("fill", function(d){
                        if(d.key === "Freehold"){
                            return '#2ca02c';
                        }else if(d.key === '99 Yrs'){
                            return '#d62728';
                        }else{
                            return '#1f77b4';
                        }
                        
                    });
                    //chart.selectAll("g.row").call(tip)
                            //.on("mouseover",tip.show).on("mouseleave",tip.hide).on("click",alert("In Bar Chart"));
                })
                .xAxis().ticks(5).tickFormat(d3.format("s"));
    }
    function plotTenureVolumePie(){
        var f1 = getFilters(propertyTenureVolumeRowChart);
        propertyTenureVolumePieChart = dc.pieChart("#dc-propertyTenureVolume-chart");
        tenureVolumePie();
        applyFilter(propertyTenureVolumePieChart,f1);
    }
    //Plot Tenure Volume Row Chart
    function plotTenureVolumeRow(){
        if (typeof  propertyTenureVolumePieChart !== 'undefined') {
            var f2 = getFilters(propertyTenureVolumePieChart);
            propertyTenureVolumeRowChart = dc.rowChart("#dc-propertyTenureVolume-chart");
            tenureVolumeRow();
            applyFilter(propertyTenureVolumeRowChart,f2);
        }else{
             propertyTenureVolumeRowChart = dc.rowChart("#dc-propertyTenureVolume-chart");
             tenureVolumeRow();
        }
    }
    //Psf boxplot
    function plotPsfBoxPlot(){
        boxPlotChart
           .width(920)
           .height(300)
           .margins({top: 10, right: 0, bottom: 20, left: 75})
           .yAxisLabel("Psf $")
           .dimension(propertyDimension)
           .group(boxPlotPsfGroup)
           .elasticY(true);
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
        histogram.width(450)
            .height(330)
            .dimension(psfDimension)
            .margins({top: 0, right: 0, bottom: 40, left: 40})
            .transitionDuration(0)
            .group(psfGroup)
            .x(d3.scale.linear().domain([psfRange[0],psfRange[1]]).range([0,10]))
            .xAxisLabel("Psf $") 
            .round(Math.ceil)
            .centerBar(true)
            .clipPadding(10)
            .xUnits(function(){return 50;})
            .elasticY(true)
            .xAxis();
    }
    //Price Histogram
    function plotPriceHistogram(){
        histogram.width(450)
            .height(330)
            .dimension(priceDimension)
             .margins({top: 0, right: 0, bottom: 40, left: 40})
            .transitionDuration(0)
            .group(priceGroup)
            .x(d3.scale.linear().domain([priceRange[0],priceRange[1]]).range(0,10))
            .xAxisLabel("Price $")
            .round(Math.ceil)
            .centerBar(true)
            .clipPadding(10)
            .elasticY(true)
            .xAxis()
            .ticks(10);
    }
    //Psm Histogram
    function plotPsmHistogram(){
        histogram.width(450)
            .height(330)
            .dimension(psmDimension)
            .margins({top: 0, right: 0, bottom: 40, left: 40})
            .transitionDuration(0)
            .group(psmGroup)
            .x(d3.scale.linear().domain([psmRange[0],psmRange[1]]).range([0,10]))
            .xAxisLabel("Psm $")
            .round(Math.ceil)
            .centerBar(true)
            .clipPadding(10)
            .xUnits(function(){return 50;})
            .elasticY(true)
            .xAxis();
    }
    // composite chart
    function plotPsfLineChart(){
        compositeControlChart
            .width(450)
            .height(320)
            .transitionDuration(0)
            .margins({top: 10, right: 0, bottom: 20, left: 60})
            .yAxisLabel("Psf $")
            .x(d3.time.scale().domain([minDate,maxDate]))
            .elasticY(true)
            .round(d3.time.month.round)
            .xUnits(d3.time.months)
            .dimension(dateDimension)
            .brushOn(false)
            .legend(dc.legend().x(80).y(280).itemWidth(100).legendWidth(600).horizontal(true))
            .rangeChart(dateVolumeBarChart)
            .shareTitle(false)
            .compose([
                dc.lineChart(compositeControlChart)
                .interpolate('linear')
                .group(datePsfGroup,"Median Psf")
                .renderDataPoints({radius:5})
                .title(function (d) { return dateFormat(d.key) +": $"+(d.value.median); })
                .renderTitle(true)
                .valueAccessor(function(d){
                    return d.value.median;
                } 
                     

            ),
            dc.lineChart(compositeControlChart)
                //.interpolate('linear')
                //.group(dummyGroupFor10Percentile,"10 Percentile")
                //.colors('#2ca02c')
                //.dashStyle([5,5])
                // not working
                //.renderTitle(false)
                //.valueAccessor(function(){
                   //  return getPercentileValue(0.1, dateDimension, datePsfGroup);  
                //}
                .interpolate('linear')
                .group(datePsfGroup,"Min Psf")
                .renderDataPoints({radius:5})
                .colors("#2ca02c")
                .title(function (d) { return dateFormat(d.key) +": $"+(d.value.min); })
                .renderTitle(true)
                .valueAccessor(function(d){
                    return d.value.min;
                }
            ),
            dc.lineChart(compositeControlChart)
                //.interpolate('linear')
                //.group(dummyGroupFor90Percentile,"90 Percentile")
                //.colors('red')
                //.dashStyle([5,5])
                // not working
                //.renderTitle(false)
                //.valueAccessor(function(){
                   // return getPercentileValue(0.9, dateDimension, datePsfGroup);
                //})
                .interpolate('linear')
                .group(datePsfGroup,"Max Psf")
                .colors("#d62728")
                .renderDataPoints({radius:5})
                .title(function (d) { return dateFormat(d.key) +": $"+(d.value.max); })
                .renderTitle(true)
                .valueAccessor(function(d){
                    return d.value.max;
                })
            ])     
            .xAxis().tickFormat(d3.time.format("%b %y"))
            .ticks(5);
    }
    //Psm Line Chart
    function plotPsmLineChart(){
        //Logic
         compositeControlChart
            .width(450)
            .height(320)
            .transitionDuration(0)
            .margins({top: 10, right: 0, bottom: 20, left: 60})
            .yAxisLabel("Psm $")
            .x(d3.time.scale().domain([minDate,maxDate]))
            .elasticY(true)
            .round(d3.time.month.round)
            .xUnits(d3.time.months)
            .dimension(dateDimension)
            .brushOn(false)
            //.legend(dc.legend().x(80).y(280).itemWidth(100).legendWidth(600).horizontal(true))
            .rangeChart(dateVolumeBarChart)
            .shareTitle(false)
            .compose([
                dc.lineChart(compositeControlChart)
                .interpolate('linear')
                .group(datePsmGroup,"Median Psm")
                .renderDataPoints({radius:5})
                .title(function (d) { return dateFormat(d.key) +": $"+(d.value.median); })
                .renderTitle(true)
                .valueAccessor(function(d){
                    return d.value.median;
                }
            ),
            dc.lineChart(compositeControlChart)
                .interpolate('linear')
                .group(datePsmGroup,"Min Psm")
                .renderDataPoints({radius:5})
                .colors("#2ca02c")
                .title(function (d) { return dateFormat(d.key) +": $"+(d.value.min); })
                .renderTitle(true)
                .valueAccessor(function(d){
                    return d.value.min;
                }
            ),
            dc.lineChart(compositeControlChart)
              .interpolate('linear')
                .group(datePsmGroup,"Max Psm")
                .colors("#d62728")
                .renderDataPoints({radius:5})
                .title(function (d) { return dateFormat(d.key) +": $"+(d.value.max); })
                .renderTitle(true)
                .valueAccessor(function(d){
                    return d.value.max;
                })
               
            ])        
            .xAxis().tickFormat(d3.time.format("%b %y"))
            .ticks(5);
    }
    //Price Line Chart
    function plotPriceLineChart(){
          compositeControlChart
            .width(450)
            .height(320)
            .transitionDuration(0)
            .margins({top: 10, right: 0, bottom: 20, left: 60})
            .yAxisLabel("Price $")
            .x(d3.time.scale().domain([minDate,maxDate]))
            .elasticY(true)
            .round(d3.time.month.round)
            .xUnits(d3.time.months)
            .dimension(dateDimension)
            .brushOn(false)
            //.legend(dc.legend().x(80).y(280).itemWidth(100).legendWidth(600).horizontal(true))
            .rangeChart(dateVolumeBarChart)
            .shareTitle(false)
            .compose([
                dc.lineChart(compositeControlChart)
                .interpolate('linear')
                .group(datePriceGroup,"Median Price")
                .renderDataPoints({radius:5})
                .title(function (d) { return dateFormat(d.key) +": $"+(d.value.median); })
                .renderTitle(true)
                .valueAccessor(function(d){
                    return d.value.median;
                }
            ),
            dc.lineChart(compositeControlChart)
                .interpolate('linear')
                .group(datePriceGroup,"Min Price")
                .renderDataPoints({radius:5})
                .colors("#2ca02c")
                .title(function (d) { return dateFormat(d.key) +": $"+(d.value.min); })
                .renderTitle(true)
                .valueAccessor(function(d){
                    return d.value.min;
                }
            ),
            dc.lineChart(compositeControlChart)
                .interpolate('linear')
                .group(datePriceGroup,"Max Price")
                .colors("#d62728")
                .renderDataPoints({radius:5})
                .title(function (d) { return dateFormat(d.key) +": $"+(d.value.max); })
                .renderTitle(true)
                .valueAccessor(function(d){
                    return d.value.max;
                })
            ])        
            .xAxis().tickFormat(d3.time.format("%b %y"))
            .ticks(5);
    }
    //For the interactivity
    $(document).ready(function() {
            $("#dc-psfBoxPlot-chart").on('change', function(){
                var text = $('#dc-psfBoxPlot-chart .selectpicker option:selected').text(); 
                if (text === "Psf"){
                   dc.filterAll();
                   plotPsfHistogram();
                   plotPsfBoxPlot();
                   plotPsfLineChart();
                }else if(text === "Price"){
                   dc.filterAll();
                   plotPriceHistogram();
                   plotPriceBoxPlot();
                   plotPriceLineChart();
                }
                else{
                    dc.filterAll();
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
               dc.renderAll();
           });
           $("#pie1").on("click",function(){
               $(this).prop('disabled', true);
               $("#bar1").prop('disabled',false);
               plotPropertyVolumePie();
               dc.renderAll();
           });
           $("#bar2").on("click",function(){
               $(this).prop('disabled', true);
               $("#pie2").prop('disabled',false);
               plotTenureVolumeRow();
                dc.renderAll();
           });
           $("#pie2").on("click",function(){
               $(this).prop('disabled', true);
               $("#bar2").prop('disabled',false);
               plotTenureVolumePie();
               dc.renderAll();
           });
           $("#bar3").on("click",function(){
              $(this).prop('disabled', true);
              $("#pie3").prop('disabled',false);
               plotSaleVolumeRow();
              dc.renderAll();
           });
           $("#pie3").on("click",function(){
               $(this).prop('disabled', true);
              $("#bar3").prop('disabled',false);
               plotSaleVolumePie();
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
        function(d){
            return dateFormat(d.date);
        },
        function(d){
            return d.area;
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
	.order(d3.ascending);
   
    //Unused Graphs
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
    
     //var helperDimension = facts.dimension(function(d){
      //return d3.time.day(d.date);
    //});
    //var helperGroup = dateDimension.group();
    //var compositePsmGroup = dateDimension.group();
    //var compositePriceGroup = dateDimension.group();
    //var compositePsfReducer = reductio();
    //reductio().min(function(d) { return d.psf; })
         //.max(true)
         //.median(true)(helperGroup);
    /*reductio().min(function(d) { return +d.psm; })
        .max(true)
        .median(true)(compositePsmGroup);
    reductio().min(function(d) { return +d.price; })
        .max(true)
        .median(true)(compositePriceGroup);*/
    
    /*compositeChart
        .width(450)
        .height(330)
        .margins({top: 10, right: 10, bottom: 30, left: 40})
        .yAxisLabel("Psf $")
        .x(d3.time.scale().domain([getMinDate(data),getMaxDate(data)]))
        .round(d3.time.day.round)
        .xUnits(d3.time.days)
        .elasticY(true)
        .renderHorizontalGridLines(true)
        .dimension(dateDimension)
        .brushOn(false)
        .legend(dc.legend().x(800).y(20).itemHeight(13).gap(5))
        .rangeChart(dateVolumeBarChart)
        .compose([
            dc.lineChart(compositeChart)
                .interpolate('linear')
                .group(helperGroup,"Max Psf")
                .colors('red')
                .renderTitle(true)
                .valueAccessor(function(d){
                    return d.value.max;
                })
                ,
            dc.lineChart(compositeChart)
                .interpolate('linear')
                 .group(helperGroup,"Medain Psf")
                .colors('blue')
                 .renderTitle(true)
                .valueAccessor(function(d){
                    return d.value.median;
                })
                ,
            dc.lineChart(compositeChart,"Min Psf")
                .interpolate('linear')
                .group(helperGroup,"Min Psf")
                .colors('green')
                 .renderTitle(true)
                .valueAccessor(function(d){
                    return d.value.min;
                })
                 ,
            dc.lineChart(compositeChart,"Min Psf")
                .interpolate('linear')
                .group(datePsfGroup,"Min Psf")
                .colors('yellow')
                 .renderTitle(true)
                .valueAccessor(function(d){
                    return d.value.avg;
                })
            ])
            .xAxis().tickFormat(d3.time.format("%b %d"))
            .ticks(5);*/
    
    /*function plotRegionVolumeRow(){
        propertyRegionVolumePieChart = dc.pieChart("#dc-propertyRegionVolume1-chart");
        propertyRegionVolumeRowChart = dc.rowChart("#dc-propertyRegionVolume-chart");  
        propertyRegionVolumeRowChart.width(300)
                .height(200)
                .transitionDuration(0)
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
                .transitionDuration(0)
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
                .title(function (d) { return d.key +" "+d.value; });
    }*/
    /* function plotRegionVolumePie(){
        propertyRegionVolumePieChart = dc.pieChart("#dc-propertyRegionVolume-chart");
        propertyRegionVolumeRowChart = dc.rowChart("#dc-propertyRegionVolume1-chart");
        propertyRegionVolumePieChart.width(300)
                .height(200)    
                .transitionDuration(0)
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
                .title(function (d) { return d.key +" "+d.value; });
         propertyRegionVolumeRowChart.width(300)
                .height(200)
                .transitionDuration(0)
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
    }*/
    //Count the number of records 
    dc.dataCount(".dc-data-count")
    .dimension(facts)
    .group(all);
    //Plot the graphs
    plotPsfHistogram();
    plotPropertyVolumeRow();
    plotTenureVolumeRow();
    plotSaleVolumeRow();
    plotPsfBoxPlot();
    plotPsfLineChart();
 
    //Run 
    dc.renderAll();
  
});

    
    
    
    
    
    
    
    
