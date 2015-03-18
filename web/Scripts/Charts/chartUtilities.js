function getMinDate(data) {
   var minDate = d3.min(data, function (d) {
        return d.date;
    });
    return minDate;
}
function getMaxDate(data) {
    var maxDate = d3.max(data, function (d) {
        return d.date;
    });
    maxDate.setDate(maxDate.getDate() + 1);
    return maxDate;
}
function getMaxPrice(data) {
   var maxPrice = d3.max(data, function (d) {
        return d.price;
    });
    return maxPrice;
}
function getMinPrice(data) {
    var minPrice = d3.min(data, function (d) {
        return d.price;
    });
    return minPrice;
}
function getMaxPsf(data){
    var maxPsf=d3.max(data,function(d){
        return d.psf;
    });
    return maxPsf;
}
function getMinPsf(data){
    var minPsf=d3.min(data,function(d){
        return d.psf;
    });
    return minPsf;
}
function getMaxPsm(data){
    var maxPsm = d3.max(data,function(d){
        return d.psm;
    });
    return maxPsm;
}
function getMinPsm(data){
    var minPsm = d3.min(data,function(d){
        return d.psm;
    });
    return minPsm;
}
function parseDate(dateStr) {
    var format = d3.time.format("%d/%m/%Y");
    return format.parse(dateStr);
}
function dateFormat(dateStr){
    var correctFormat = d3.time.format("%b %y");
    return correctFormat(dateStr);
}
function getFilters(chart) {
    return chart.filters();
}
function applyFilter(chart, filterA) {
    for (var i = 0; i < filterA.length; i++) {
        chart.filter(filterA[i]);
    }
}
function rangeChartForTimeSeries(rangeChart,chart1,chart2){
    rangeChart.on("filtered", function (chart) {
            dc.events.trigger(function () {
               chart1.focus(chart.filter());
               chart2.focus(chart.filter());
               dc.redrawAll(chart.chartGroup());
            });
    });
}
var rowChartTip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d) {
            return "<span style='color: #f0027f'>" + d.key + "</span> : " + (d.value);
        });
var pieChartTip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d) {
            return "<span style='color: #f0027f'>" + d.data.key + "</span> : " + (d.value);
        });
