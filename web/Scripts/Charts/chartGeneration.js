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
function plotPieChart(chartName,dimensionName,groupName,widthSize,heightSize,radiusSize,innerRadiusSize){
    chartName.width(widthSize)
                .height(heightSize)
                .radius(radiusSize)
                .innerRadius(innerRadiusSize)
                .dimension(dimensionName)
                .group(groupName)
                .title(function (d) {
                    return d.key + ": " + d.value;
                })
                .colors(d3.scale.category10())
                .renderLabel(true)
                .renderTitle(true);
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
                .renderTitle(true)
                .renderLabel(true)
                .xAxis().ticks(tickNumber).tickFormat(d3.format("s"));
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
            .legend(dc.legend().x(130).y(300).itemWidth(100).legendWidth(600).horizontal(true))
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