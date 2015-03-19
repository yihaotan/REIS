function plotTimeBarChart(chartName,dimensionName,groupName,widthSize,heightSize,gapSize,tickNumber,minDate,maxDate,timeFormat){
    chartName.width(widthSize)
             .height(heightSize)
             .dimension(dimensionName)
             .group(groupName)
             .centerBar(true)
             .elasticY(true)
             .gap(gapSize)
             .x(d3.time.scale().domain([minDate, maxDate]))
             .round(d3.time.month.round)
             .xUnits(d3.time.months)
             .xAxis().tickFormat(d3.time.format(timeFormat));   
     
     chartName.yAxis().ticks(tickNumber);
}
function plotStackedTimeBarChart(chartName,rangeChartName,dimensionName,groupName,stackGroupName1,stackGroupName2,stackGroupName3,stackGroupName4,stackGroupName5,widthSize,heightSize,gapSize,tickNumber,minDate,maxDate,timeFormat){
        chartName.width(widthSize)
            .height(heightSize)
            .dimension(dimensionName)
            .centerBar(true)
            .elasticY(true)
            .elasticX(false)
            .gap(gapSize)
            .brushOn(false)
            .group(groupName)
            .stack(stackGroupName1)
            .stack(stackGroupName2)
            .stack(stackGroupName3)
            .stack(stackGroupName4)
            .stack(stackGroupName5)
            .x(d3.time.scale().domain([minDate, maxDate]))
            .rangeChart(rangeChartName)
            .round(d3.time.month.round)
            .xUnits(d3.time.months)
            .xAxis().tickFormat(d3.time.format(timeFormat))
            .ticks(tickNumber);
    
        chartName.yAxis().ticks(tickNumber);
}
function plotPieChart(chartName,dimensionName,groupName,widthSize,heightSize,radiusSize,innerRadiusSize,centrePoint,legendX,chartType){
    var pieChartTip = d3.tip()
                        .attr('class', 'd3-tip')
                        .offset([-10, 0])
                        .html(function (d) {
                            return "<span style='color: #f0027f'>" + d.data.key + "</span> : " + (d.value) + " (" + d3.round((d.value / d3.sum(groupName.all(), function (d) {
                                return d.value;
                            })) * 100, 2) + "%)";
                        });       
    chartName.width(widthSize)
            .height(heightSize)
            .radius(radiusSize)
            .innerRadius(innerRadiusSize)
            .dimension(dimensionName)
            .group(groupName)
            .label(function (d) {
                   return d3.round((d.value / d3.sum(groupName.all(), function(d){ return d.value;}))*100,2)+"%";
            })
            .legend(dc.legend().x(legendX).y(10).itemHeight(13).gap(5))
            .cx(centrePoint)
            .renderLabel(true)
            .renderTitle(false)
            .renderlet(function (chart) {
               
                chart.selectAll(".pie-slice").call(pieChartTip);
                chart.selectAll(".pie-slice").on('mouseover', pieChartTip.show)
                                             .on('mouseleave', pieChartTip.hide);
            });
            if(chartType === 'property'){
                chartName.ordinalColors(['#1f77b4','#ff7f0e','#2ca02c','#d62728','#9467bd','#8c564b'])
                        .colorAccessor(function(d,i){
                            if(d.key === "Apartment"){
                                return 0;
                            }else if(d.key==="Condominium"){
                                return 1;
                            }else if(d.key==="Detached House"){
                                return 2;
                            }else if(d.key==="Executive Condominium"){
                                return 3;
                            }else if(d.key==="Semi-Detached House"){
                                return 4;
                            }else{
                                return 5;
                            }
                        });
            }else if(chartType === 'sales'){
                chartName.ordinalColors(['#2ca02c','#d62728','#1f77b4'])
                        .colorAccessor(function(d,i){
                            if(d.key === "New Sale"){
                                return 0;
                            }else if(d.key==="Resale"){
                                return 1;
                            }else{
                                return 2;
                            }
                        });
                       
            }else if(chartType === 'tenure'){
                 chartName.ordinalColors(['#fc9272','#ef3b2c','#cb181d','#67000d'])
                .colorAccessor(function (d, i) {
                    if (d.key === "99 Yrs") {
                        return 0;
                    } else if (d.key === "999 Yrs") {
                        return 1;
                    }else if (d.key === "9999 Yrs") {
                        return 2;
                    } else {
                        return 3;
                    }
                });
            }else{
                 chartName.ordinalColors(['#1f77b4','#ff7f0e','#2ca02c','#d62728','#9467bd'])
                    .colorAccessor(function (d, i) {
                    if (d.key === "North East Region") {
                           return 0;
                       } else if (d.key === "West Region") {
                           return 1;
                       } else if (d.key === "Central Region") {
                           return 2;
                       } else if (d.key === "North Region") {
                           return 3;
                       } else {
                           return 4;
                       }
                    });
            }
}
function plotRowChart(chartName,dimensionName,groupName,widthSize,heightSize,gapSize,tickNumber,legendX,chartType){
        chartName.width(widthSize)
               .height(heightSize)
                .dimension(dimensionName)
                .group(groupName)
                .gap(gapSize)
                .ordering(function(d){return -d.value;})
                .elasticX(true)
                .legend(dc.legend().x(legendX).y(10).itemHeight(13).gap(5))
                .renderTitle(false)
                .renderLabel(true)
                .xAxis().ticks(tickNumber).tickFormat(d3.format("s"));
        
        if (chartType === 'property') {
            chartName.renderlet(function (chart) {
                chart.selectAll("g.row rect").attr("fill", function (d) {
                    if (d.key === "Apartment") {
                        return '#1f77b4';
                    } else if (d.key === "Condominium") {
                        return '#ff7f0e';
                    } else if (d.key === "Detached House") {
                        return '#2ca02c';
                    } else if (d.key === "Executive Condominium") {
                        return '#d62728';
                    } else if (d.key === "Semi-Detached House") {
                        return '#9467bd';
                    } else {
                        return '#8c564b';
                    }
                });
            });
        }else if (chartType === 'sales') {
          chartName.renderlet(function (chart) {
            chart.selectAll("g.row rect").attr("fill", function (d) {
                if (d.key === "New Sale") {
                    return '#2ca02c';
                } else if (d.key === "Resale") {
                    return '#d62728';
                } else {
                    return '#1f77b4';
                }
            });
        });
        }else if(chartType === 'tenure') {
            chartName.renderlet(function (chart) {
                chart.selectAll("g.row rect").attr("fill", function (d) {
                    if (d.key === "99 Yrs") {
                        return '#fc9272';
                    } else if (d.key === "999 Yrs") {
                        return '#ef3b2c';
                    } else if (d.key === "9999 Yrs") {
                        return '#cb181d';
                    } else {
                        return '#99000d';
                    }
                });
            });
        }else{
            chartName.renderlet(function (chart) {
                chart.selectAll("g.row rect").attr("fill", function (d) {
                    if (d.key === "North East Region") {
                        return '#1f77b4';
                    } else if (d.key === "West Region") {
                        return '#ff7f0e';
                    } else if (d.key === "Central Region") {
                        return '#2ca02c';
                    } else if (d.key === "North Region") {
                        return '#d62728';
                    } else {
                        return '#9467bd';
                    }
                });
            });
        }
        //tooltip
        var rowChartTip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function (d) {
                    return "<span style='color: #f0027f'>" + d.key + "</span> : " + (d.value) + " (" + d3.round((d.value / d3.sum(groupName.all(), function (d) {
                        return d.value;
                    })) * 100, 2) + "%)";
                });
        chartName.renderlet(function(chart){
             
            chart.selectAll("g.row").call(rowChartTip);
            chart.selectAll("g.row").on("mouseover", rowChartTip.show)
                    .on("mouseleave", rowChartTip.hide);
        });
        
};
function plotBoxPlotChart(chartName,widthSize,heightSize,marginsTop,marginsRight,marginsBottom,marginsLeft,yAxisLabelName,dimensionName,groupName){
        chartName.width(widthSize)
                  .height(heightSize)
                  .margins({top: marginsTop, right: marginsRight, bottom: marginsBottom, left: marginsLeft})
                  .yAxisLabel(yAxisLabelName)
                  .dimension(dimensionName)
                   .group(groupName)
                   .elasticY(true);
}
function plotLineChart(compositeChartName,dimensionName,groupName,legendName,dataPointRadius,colorName,type,dateFormat){
        var compose1 =dc.lineChart(compositeChartName)
            .interpolate('linear')
            .dimension(dimensionName)
            .group(groupName,legendName)
            .renderDataPoints({radius:dataPointRadius})
            .colors(colorName)
            .valueAccessor(function(d){
                if(type === 'min'){
                    return d.value.min;
                }else if(type === 'median'){
                    return d.value.median;
                }else{
                    return d.value.max;
                }
            })
            .title(function (d) { 
                if(type === 'min'){
                    return dateFormat(d.key) +": $"+(d.value.min); 
                }else if(type === 'median'){
                    return dateFormat(d.key) +": $"+(d.value.median); 
                }else{
                    return dateFormat(d.key) +": $"+(d.value.max); 
                } 
            });
            return compose1;
}
function plotCompositeChart(compositeChartName,dimensionName,widthSize,heightSize,marginsTop,marginsRight,marginsBottom,marginsLeft,yAxisLabelName,minDate,maxDate,rangeChartName,compose1,compose2,compose3,timeFormat,tickNumber){
        compositeChartName
            .width(widthSize)
            .height(heightSize)
            .dimension(dimensionName)
            .margins({top: marginsTop, right: marginsRight, bottom: marginsBottom, left: marginsLeft})
            .yAxisLabel(yAxisLabelName)
            .x(d3.time.scale().domain([minDate,maxDate]))
            .elasticY(true)
            .round(d3.time.month.round)
            .xUnits(d3.time.months)
            .brushOn(false)
            .legend(dc.legend().x(140).y(140).itemWidth(100).legendWidth(600).horizontal(true))
            .rangeChart(rangeChartName)
            .shareTitle(false)
            .compose([compose1,compose2,compose3])
            .xAxis().tickFormat(d3.time.format(timeFormat))
            .ticks(tickNumber);
            
         compositeChartName.yAxis().ticks(tickNumber);
}
function plotHistogramChart(histogramName,widthSize,heightSize,dimensionName,groupName,marginsTop,marginsRight,marginsBottom,marginsLeft,minRange,maxRange,clipPaddingSize,xUnitsSize,tickNumber,xAxisLabelName){
         histogramName.width(widthSize)
            .height(heightSize)
            .dimension(dimensionName)
            .group(groupName)
            .margins({top: marginsTop, right: marginsRight, bottom: marginsBottom, left: marginsLeft})
            .x(d3.scale.linear().domain([minRange,maxRange]).range([0,10]))
            .xAxisLabel(xAxisLabelName)
            .colors("green")
            .round(Math.ceil)
            .centerBar(true)
            .clipPadding(clipPaddingSize)
            .xUnits(function(){return xUnitsSize;})
            .elasticY(true)
            .xAxis()
            .ticks(tickNumber);
        
        histogramName.yAxis().ticks(tickNumber);
}
//To be done
function plotScatterPlotChart(){
    
}
