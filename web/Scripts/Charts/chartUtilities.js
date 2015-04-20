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
function getMaxSize(data){
    var maxAreaSqm=d3.max(data,function(d){
        return d.areasqm;
    });
    return maxAreaSqm;
}
function getMinSize(data){
    var minAreaSqm =d3.min(data,function(d){
        return d.areasqm;
    });
    return minAreaSqm;
}
function getMaxSqf(data){
    var maxAreaSqf = d3.max(data,function(d){
        return d.areasqf;
    });
    return maxAreaSqf;
}
function getMinSqf(data){
    var minAreaSqf = d3.min(data,function(d){
        return d.areasqf;
    });
    return minAreaSqf;
}
function getMaxPrice(data){
    var minPrice = d3.min(data,function(d){
        return d.price;
    });
    return minPrice;
}
function getMinPrice(data){
    var maxPrice = d3.max(data,function(d){
        return d.price;
    });
    return maxPrice;
}
function parseDate(dateStr) {
    var format = d3.time.format("%d/%m/%Y");
    return format.parse(dateStr);
}
function dateFormat(dateStr){
    var correctFormat = d3.time.format("%d %b %y");
    return correctFormat(dateStr);
}
function numberFormat(number){
    var commaFormat = d3.format(',');
    return commaFormat(number); 
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
//apartment #1f77b4
//condo #ff7f0e
//detached house #2ca02c
//executive condominium #d62728
//semi detached house #9467bd
// terrace house #8c564b
colors["Apartment"]='#1f77b4'; //orange
colors["Condominium"]='#ff7f0e';
colors["Detached House"]='#2ca02c';
colors["Executive Condominium"]='#d62728';
colors['Semi-Detached House']='#9467bd';
colors['Terrace House']="#8c564b";

//99 yrs '#fc9272'
// 999 yrs '#ef3b2c'
// 999 yrs '#cb181d'
// Freehold '#67000d'

colors['99 Yrs']='#FFA726';
colors['999 Yrs']='#FB8C00';
colors['9999 Yrs']='#F57C00';
colors['Freehold']='#E65100';
colors['New Sale']='#2ca02c';
colors['Resale']='#d62728';
colors['Sub Sale']='#1f77b4';

// north east region #1f77b4
// West Region #ff7f0e
// central region #2ca02
// north region #d62728
// east region #9467bd

colors["North East Region"]='#9467bd';
colors["West Region"]='#1f77b4';
colors["Central Region"]='#ff7f0e';
colors["North Region"]='#d62728'    ;
colors["East Region"]='#2ca02c';

function getColors(k) {
    return colors[k];
}
