function generateAll(geoJsonData){
    generateMapAndCharts(geoJsonData);
    var c = performance.now();
    dc.renderAll();
    var d = performance.now();
    alert('It took ' + (d - c) + ' ms to render all the graphs');
}