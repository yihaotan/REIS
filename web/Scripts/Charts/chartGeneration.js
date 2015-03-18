
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
function plotPieChart(chartName,dimensionName,groupName,widthSize,heightSize,radiusSize,innerRadiusSize,centrePoint,legendX){
    chartName.width(widthSize)
            .height(heightSize)
            .radius(radiusSize)
            .innerRadius(innerRadiusSize)
            .dimension(dimensionName)
            .group(groupName)
            .title(function (d) {
                return d.key + ": " + d.value;
            })
            .legend(dc.legend().x(legendX).y(10).itemHeight(13).gap(5))
            .cx(centrePoint)
            .colors(d3.scale.category10())
            .filterPrinter(function (filters)
            {
              var len = filters.length;
              if (len == 1){
                  return filters[0];
              }else if(len>1){
                  var str = "";
                  for (var i =0 ; i<len;i++){
                      str = str + filters[i]+" ";
                  }
                  return str;
              }
            })
            .renderLabel(false)
            .renderTitle(false)
            .renderlet(function (chart) {
                chart.selectAll(".pie-slice").call(pieChartTip);
                chart.selectAll(".pie-slice").on('mouseover', pieChartTip.show)
                        .on('mouseout', pieChartTip.hide);
            });
}
function plotRowChart(chartName,dimensionName,groupName,widthSize,heightSize,gapSize,tickNumber){
        chartName.width(widthSize)
               .height(heightSize)
               .ordering(function(d){
                    return -d.value;
                })
                .dimension(dimensionName)
                .group(groupName)
                .colors(d3.scale.category10())
                .gap(gapSize)
                .elasticX(true)
                .title(function (d) {return d.value; })
                .renderTitle(false)
                .renderLabel(true)
                .xAxis().ticks(tickNumber).tickFormat(d3.format("s"));
         
        chartName.renderlet(function(chart){
                chart.selectAll("g.row").call(rowChartTip);
                chart.selectAll("g.row").on("mouseover", rowChartTip.show)
                                        .on("mouseout", rowChartTip.hide);
        });
}
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
