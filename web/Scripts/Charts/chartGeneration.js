function plotTimeBarChart(chartName,dimensionName,groupName,widthSize,heightSize,gapSize,tickNumber,minDate,maxDate,timeFormat,yAxisLabelName,top,right,bottom,left){
    chartName.width(widthSize)
             .margins({top: top, right: right, bottom: bottom, left: left}) 
             .height(heightSize)
             .dimension(dimensionName)
             .group(groupName)
             .centerBar(true)
             .elasticY(true)
             .gap(gapSize)
             .yAxisLabel(yAxisLabelName)
             .x(d3.time.scale().domain([minDate, maxDate]))
             .round(d3.time.month.round)
             .xUnits(d3.time.months)
             .xAxis().tickFormat(d3.time.format(timeFormat));   
     
     chartName.yAxis().ticks(tickNumber);
}
function plotStackedTimeBarChart(chartName,dimensionName,groupName,stackGroupName1,stackGroupName2,stackGroupName3,stackGroupName4,stackGroupName5,widthSize,heightSize,gapSize,minDate,maxDate,timeFormat,top,right,bottom,left,yAxisLabelName,tickNumber){
        chartName.width(widthSize)
             .margins({top: top, right: right, bottom: bottom, left: left})
            .height(heightSize)
            .dimension(dimensionName)
            .centerBar(true)
            .elasticY(true)
            .gap(gapSize)
            .centerBar(true)
            .yAxisLabel(yAxisLabelName)
            .group(groupName,"Apartment")
            .stack(stackGroupName1,"Condominium")
            .stack(stackGroupName2,"Detached")
            .stack(stackGroupName3,"E.Condominium")
            .stack(stackGroupName4,"Semi-Detached")
            .stack(stackGroupName5,"Terrace")
            .legend(dc.legend().x(0).y(110).itemWidth(100).legendWidth(700).horizontal(true))
            .renderlet(function (chart) {
                chart.selectAll("g.rect.stack").attr("fill", function (d) {
                    return getColors(d.key);
                });
            })
            .x(d3.time.scale().domain([minDate, maxDate]))
            .round(d3.time.month.round)
            .xUnits(d3.time.months)
            .xAxis().tickFormat(d3.time.format(timeFormat))
         
     chartName.yAxis().ticks(tickNumber);
      
}
function plotPieChart(chartName,dimensionName,groupName,widthSize,heightSize,radiusSize,innerRadiusSize,centrePoint,legendX,chartType){
    var pieChartTip = d3.tip()
                        .attr('class', 'd3-tip')
                        .offset([-10, 0])
                        .html(function (d) {
                            return "<span style='color: #c6dbef'>" + d.data.key + "</span> : " + (d.value) + " (" + d3.round((d.value / d3.sum(groupName.all(), function (d) {
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
            .renderlet(function(chart){
                chart.selectAll(".pie-slice").call(pieChartTip);
                chart.selectAll(".pie-slice").on('mouseover', pieChartTip.show)
                                             .on('mouseleave', pieChartTip.hide);
            })
            .getColor = function(d, i){
                return getColors(d.key);   
            };
}
function plotRowChart(chartName,dimensionName,groupName,widthSize,heightSize,gapSize,tickNumber,legendX,chartType,top,right,bottom,left){
         var rowChartTip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function (d) {
                    return "<span style='color: #c6dbef'>" + d.key + "</span> : " + (d.value) + " (" + d3.round((d.value / d3.sum(groupName.all(), function (d) {
                        return d.value;
                    })) * 100, 2) + "%)";
                });
    
        chartName.width(widthSize)
                .margins({top: top, right: right, bottom: bottom, left: left})
                .height(heightSize)
                .dimension(dimensionName)
                .group(groupName)
                .gap(gapSize)
                .ordering(function(d){return -d.value;})
                .elasticX(true)
                //.colors(d3.scale.category10())
                //.fixedBarHeight(20)
                .labelOffsetX(-5)
                .label(function(d){
                    if(chartType === 'region' ||(d.key).lastIndexOf("House")!==-1){
                        return (d.key).substring(0,(d.key).lastIndexOf(" "));
                    }
                    if(d.key === 'Executive Condominium'){
                        return 'E.Condominium';
                    }
                    return d.key;
                })
                .renderTitle(false)
                .renderLabel(true)
                .renderlet(function(chart){
                    chart.selectAll("g.row rect").attr("fill", function (d) {
                        return getColors(d.key);
                    });
                     chart.selectAll("g.row").call(rowChartTip);
                        chart.selectAll("g.row").on("mouseover", rowChartTip.show)
                                .on("mouseleave", rowChartTip.hide);
                    })
                .xAxis().ticks(tickNumber).tickFormat(d3.format("s"));
            
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
        
         var rowChartTip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function (d) {
                    return "<span style='color: #c6dbef'>" + d.key + "</span> : " + (d.value) + " (" + d3.round((d.value / d3.sum(groupName.all(), function (d) {
                        return d.value;
                    })) * 100, 2) + "%)";
                });
    
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
            .yAxisPadding(500)
            .round(d3.time.month.round)
            .xUnits(d3.time.months)
            .brushOn(false)
            .legend(dc.legend().x(100).y(110).itemWidth(95).legendWidth(600).horizontal(true))
            .rangeChart(rangeChartName)
            .shareTitle(false)
            .compose([compose1,compose2,compose3])
            .xAxis().tickFormat(d3.time.format(timeFormat))
            .ticks(tickNumber);
            
         compositeChartName.yAxis().ticks(tickNumber);
}
function plotHistogramChart(histogramName,widthSize,heightSize,dimensionName,groupName,marginsTop,marginsRight,marginsBottom,marginsLeft,minRange,maxRange,clipPaddingSize,xUnitsSize,tickNumber,xAxisLabelName,yAxisLabelName){
         histogramName.width(widthSize)
            .height(heightSize)
            .dimension(dimensionName)
            .group(groupName)
            .margins({top: marginsTop, right: marginsRight, bottom: marginsBottom, left: marginsLeft})
            .x(d3.scale.linear().domain([minRange, maxRange]))
            .xAxisLabel(xAxisLabelName)
            .colors(['rgb(247,252,253)','rgb(229,245,249)','rgb(204,236,230)','rgb(153,216,201)','rgb(102,194,164)','rgb(65,174,118)','rgb(35,139,69)','rgb(0,109,44)','rgb(0,68,27)'])
            .colorDomain([-500, 500])
            .colorAccessor(function(d){
                return d.value;
            })
           .yAxisLabel(yAxisLabelName)
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

