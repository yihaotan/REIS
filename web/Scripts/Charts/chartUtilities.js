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
var colors = {}; 
colors["Apartment"]='#1f77b4';
colors["Condominium"]='#ff7f0e';
colors["Detached House"]='#2ca02c';
colors["Executive Condominium"]='#d62728';
colors['Semi-Detached House']='#9467bd';
colors['Terrace House']="#8c564b";
colors['99 Yrs']='#fc9272';
colors['999 Yrs']='#ef3b2c';
colors['9999 Yrs']='#cb181d';
colors['Freehold']='#67000d';
colors['New Sale']='#2ca02c';
colors['Resale']='#d62728';
colors['Sub Sale']='#1f77b4';
colors["North East Region"]='#1f77b4';
colors["West Region"]='#ff7f0e';
colors["Central Region"]='#2ca02c';
colors["North Region"]='#d62728';
colors["East Region"]='#9467bd';

function getColors(k) {
    return colors[k];
}
