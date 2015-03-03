function generateAll(geoJsonData){
    generateCharts(geoJsonData);
    generateMap();
    //generateInteractivity();
    dc.renderAll();
}