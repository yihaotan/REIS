var filtereddata;
function generateMapAndCharts(geoJsonData){
    dateVolumeBarChart = dc.barChart("#dc-dateVolume-chart");
    boxPlotChart = dc.boxPlot("#dc-psfBoxPlot-chart");
    compositeControlChart = dc.compositeChart("#dc-control-chart"); //change html
    histogram = dc.barChart("#dc-histogram");
    var cv = new SVY21();
    //Charts
    geoJsonData.forEach(function (d) {
        d.projectName = d.properties.PROJECT_NAME;
        d.address = d.properties.ADDRESS;
        d.areasqm = d.properties.AREA_SQM;
        d.price = d.properties.TRANSACTED_PRICE;
        d.psm = +d.properties.UNIT_PRICE_PSM;
        d.psf = +d.properties.UNIT_PRICE_PSF;
        d.date = parseDate(d.properties.CONTRACT_DATE);
        d.propertyType = d.properties.PROPERTY_TYPE;
        d.tenure = d.properties.TENURE;
        d.sale = d.properties.TYPE_OF_SALE;
        d.postalDistrict = +d.properties.POSTAL_DISTRICT;
        d.postalSector = +d.properties.POSTAL_SECTOR;
        d.postalCode = +d.properties.POSTAL_CODE;
        d.planningRegion = d.properties.PLANNING_REGION;
        d.planningArea = d.properties.PLANNING_AREA;
        var resultLatLon = cv.computeLatLon(d.geometry.coordinates[1].lon, d.geometry.coordinates[0].lat);
        d.lat = resultLatLon.lat;
        d.lon = resultLatLon.lon;
    });
    var facts = crossfilter(geoJsonData);
    var all = facts.groupAll();
    var propertyVolumeDimension = facts.dimension(function (d) {
        return d.propertyType;
    });
    var propertyVolumeGroup = propertyVolumeDimension.group().reduceCount(function (d) {
        return d.propertyType;
    });
    var propertyDimension = facts.dimension(function (d) {
        return d.propertyType;
    });
    //globalDimension = propertyDimension;
    var boxPlotPsfGroup = propertyDimension.group().reduce(
            function (p, v) {
                p.push(v.psf);
                return p;
            },
            function (p, v) {
                p.splice(p.indexOf(v.psf), 1);
                return p;
            },
            function () {
                return [];
            }
    );
    var boxPlotPsmGroup = propertyDimension.group().reduce(
            function (p, v) {
                p.push(v.psm);
                return p;
            },
            function (p, v) {
                p.splice(p.indexOf(v.psf), 1);
                return p;
            },
            function () {
                return [];
            }
    );
    var boxPlotPriceGroup = propertyDimension.group().reduce(
            function (p, v) {
                p.push(v.price);
                return p;
            },
            function (p, v) {
                p.splice(p.indexOf(v.price), 1);
                return p;
            },
            function () {
                return [];
            }
    );
    var tenureDimension = facts.dimension(function (d) {
        var tenure = d.tenure;
        if (tenure === 'Freehold') {
            return 'Freehold';
        } else if (tenure.substring(0, 3) === '999') {
            return '999 Yrs';
        } else {
            return '99 Yrs';
        }
    });
    var tenureGroup = tenureDimension.group().reduceCount();
    var salesDimension = facts.dimension(function (d) {
        return d.sale;
    });
    var salesGroup = salesDimension.group().reduceCount();
    var regionDimension = facts.dimension(function (d) {
        return d.planningRegion;
    });
    var regionGroup = regionDimension.group().reduceCount();
    var dateDimension = facts.dimension(function (d) {
        return d3.time.month(d.date);
    });
    var dateGroup = dateDimension.group().reduceCount();
    var datePsfGroup = dateDimension.group();
    var datePsfReducer = reductio();
    datePsfReducer.min(function (d) { return d.psf;}).max(true).median(true)(datePsfGroup);
    var datePsmGroup = dateDimension.group();
    var datePsmReducer = reductio();
    datePsmReducer.min(function (d) {return d.psm;}).max(true).median(true)(datePsmGroup);
    var datePriceGroup = dateDimension.group();
    var datePriceReducer = reductio();
    datePriceReducer.min(function (d) { return d.price;}).max(true).median(true)(datePriceGroup);
    var psfDimension = facts.dimension(function (d) {
        return d.psf;
    });
    var psfGroup = psfDimension.group(function (d) {
        return Math.ceil(d / 100) * 100;
    });
    var priceDimension = facts.dimension(function (d) {
        return d.price;
    });
    var priceGroup = priceDimension.group(function (d) {
        return Math.ceil(d / 1000) * 1000;
    });
    var psmDimension = facts.dimension(function (d) {
        return d.psm;
    });
    var psmGroup = psmDimension.group(function (d) {
        return Math.ceil(d / 1000) * 1000;
    });
    function plotTimeChart(){
        plotTimeBarChart(dateVolumeBarChart,dateDimension,dateGroup,550,122,5,5,getMinDate(geoJsonData),getMaxDate(geoJsonData),"%b %y");
        filterMap(dateVolumeBarChart,propertyDimension);
    }
    function plotPropertyVolumePie() {
       if (typeof propertyVolumeRowChart !== 'undefined'){
            var f1 = getFilters(propertyVolumeRowChart);
            propertyVolumePieChart = dc.pieChart("#dc-propertyVolume-chart");
            plotPieChart(propertyVolumePieChart,propertyVolumeDimension,propertyVolumeGroup,300,160,80,20);
            applyFilter(propertyVolumePieChart, f1);
            filterMap(propertyVolumePieChart,propertyDimension);
        }else{
            propertyVolumePieChart = dc.pieChart("#dc-propertyVolume-chart");
            plotPieChart(propertyVolumePieChart,propertyVolumeDimension,propertyVolumeGroup,300,160,80,20);
            filterMap(propertyVolumePieChart,propertyDimension);
        }   
    }
    function plotPropertyVolumeRow() {
        if (typeof propertyVolumePieChart !== 'undefined') {
            var f2 = getFilters(propertyVolumePieChart);
            propertyVolumeRowChart = dc.rowChart("#dc-propertyVolume-chart");
            plotRowChart(propertyVolumeRowChart,propertyVolumeDimension,propertyVolumeGroup,300,160,3,5);
            applyFilter(propertyVolumeRowChart, f2);
            filterMap(propertyVolumeRowChart,propertyDimension);
        } else {
            propertyVolumeRowChart = dc.rowChart("#dc-propertyVolume-chart");
            plotRowChart(propertyVolumeRowChart,propertyVolumeDimension,propertyVolumeGroup,300,160,3,5);
            filterMap(propertyVolumeRowChart,propertyDimension);
        }
    }
    function plotSaleVolumePie() {
      if (typeof propertySaleVolumeRowChart !== 'undefined' ){
            var f1 = getFilters(propertySaleVolumeRowChart);
            propertySaleVolumePieChart = dc.pieChart("#dc-propertySaleVolume-chart");
            plotPieChart(propertySaleVolumePieChart,salesDimension,salesGroup,300,160,80,20);
            applyFilter(propertySaleVolumePieChart, f1);
            filterMap(propertySaleVolumePieChart,propertyDimension);
        }else{
            propertySaleVolumePieChart = dc.pieChart("#dc-propertySaleVolume-chart");
            plotPieChart(propertySaleVolumePieChart,salesDimension,salesGroup,300,160,80,20);
            filterMap(propertySaleVolumePieChart,propertyDimension);
        }
    }
    function plotSaleVolumeRow() {
        if (typeof propertySaleVolumePieChart !== 'undefined') {
            var f2 = getFilters(propertySaleVolumePieChart);
            propertySaleVolumeRowChart = dc.rowChart("#dc-propertySaleVolume-chart");
            plotRowChart(propertySaleVolumeRowChart,salesDimension,salesGroup,300,160,3,5);
            applyFilter(propertySaleVolumeRowChart, f2);
            filterMap(propertySaleVolumeRowChart,propertyDimension);
        } else {
            propertySaleVolumeRowChart = dc.rowChart("#dc-propertySaleVolume-chart");
            plotRowChart(propertySaleVolumeRowChart,salesDimension,salesGroup,300,160,3,5);
            filterMap(propertySaleVolumeRowChart,propertyDimension);
        }
    }
    function plotTenureVolumePie() {
        if (typeof propertyTenureVolumeRowChart !== 'undefined'){
            var f1 = getFilters(propertyTenureVolumeRowChart);
            propertyTenureVolumePieChart = dc.pieChart("#dc-propertyTenureVolume-chart");
            plotPieChart(propertyTenureVolumePieChart,tenureDimension,tenureGroup,300,160,80,20);
            applyFilter(propertyTenureVolumePieChart, f1);
            filterMap(propertyTenureVolumePieChart,propertyDimension);
        }else{
            propertyTenureVolumePieChart = dc.pieChart("#dc-propertyTenureVolume-chart");
            plotPieChart(propertyTenureVolumePieChart,tenureDimension,tenureGroup,300,160,80,20);
            filterMap(propertyTenureVolumePieChart,propertyDimension);
        }
    }
    function plotTenureVolumeRow() {
        if (typeof propertyTenureVolumePieChart !== 'undefined') {
            var f2 = getFilters(propertyTenureVolumePieChart);
            propertyTenureVolumeRowChart = dc.rowChart("#dc-propertyTenureVolume-chart");
            plotRowChart(propertyTenureVolumeRowChart,tenureDimension,tenureGroup,300,160,3,5);
            applyFilter(propertyTenureVolumeRowChart, f2);
            filterMap(propertyTenureVolumeRowChart,propertyDimension);
        } else {
            propertyTenureVolumeRowChart = dc.rowChart("#dc-propertyTenureVolume-chart");
            plotRowChart(propertyTenureVolumeRowChart,tenureDimension,tenureGroup,300,160,3,5);
            filterMap(propertyTenureVolumeRowChart,propertyDimension);
        }
    }
    function plotPsfBoxPlot(){
         plotBoxPlotChart(boxPlotChart,780,220,10,0,20,75,"Psf $",propertyDimension,boxPlotPsfGroup);
    }
    function plotPsmBoxPlot(){
         plotBoxPlotChart(boxPlotChart,780,220,10,0,20,75,"Psf $",propertyDimension,boxPlotPsmGroup);
    }
    function plotPriceBoxPlot(){
        plotBoxPlotChart(boxPlotChart,780,220,10,0,20,75,"Psf $",propertyDimension,boxPlotPriceGroup);
    }
    function plotPsfHistogram(){
        plotHistogramChart(histogram,300,122,psfDimension,psfGroup,0,0,40,40,getMinPsf(geoJsonData),getMaxPsf(geoJsonData),10,50,5,"Psf $");
        filterMap(histogram,propertyDimension);
    }
    function plotPsmHistogram(){
        plotHistogramChart(histogram,320,160,psmDimension,psmGroup,0,0,40,40,getMinPsm(geoJsonData),getMaxPsm(geoJsonData),10,50,5,"Psm $");
        filterMap(histogram,propertyDimension);
    }
    function plotPriceHistogram(){
        plotHistogramChart(histogram,300,80,priceDimension,priceGroup,0,0,40,40,getMinPrice(geoJsonData),getMaxPrice(geoJsonData),10,1000,5,"Price $");
        filterMap(histogram,propertyDimension);
    }
    function plotPsfLineChart(){
        compose1 = plotLineChart(compositeControlChart,dateDimension,datePsfGroup,"Min Psf",5,"green","min",dateFormat);
        compose2 = plotLineChart(compositeControlChart,dateDimension,datePsfGroup,"Median Psf",5,"blue","median",dateFormat);
        compose3 = plotLineChart(compositeControlChart,dateDimension,datePsfGroup,"Max Psf",5,"red","max",dateFormat);
        plotCompositeChart(compositeControlChart,dateDimension,400,122,10,0,40,60,"Psf $",getMinDate(geoJsonData),getMaxDate(geoJsonData),dateVolumeBarChart,compose1,compose2,compose3,"%b %y",5);
        filterMap(compositeControlChart,propertyDimension);
    }; // got bug for rangeChart
    function plotPsmLineChart(){
        compose1 = plotLineChart(compositeControlChart,dateDimension,datePsmGroup,"Min Psm",5,"green","min",dateFormat);
        compose2 = plotLineChart(compositeControlChart,dateDimension,datePs,Group,"Median Psm",5,"blue","median",dateFormat);
        compose3 = plotLineChart(compositeControlChart,dateDimension,datePsmGroup,"Max Psm",5,"red","max",dateFormat);
        plotCompositeChart(compositeControlChart,dateDimension,400,122,10,0,40,60,"Psm $",getMinDate(geoJsonData),getMaxDate(geoJsonData),dateVolumeBarChart,compose1,compose2,compose3,"%b %y",5);
        filterMap(compositeControlChart,propertyDimension);
    }
    function plotPriceLineChart(){
        compose1 = plotLineChart(compositeControlChart,dateDimension,datePriceGroup,"Min Psf",5,"green","min",dateFormat);
        compose2 = plotLineChart(compositeControlChart,dateDimension,datePriceGroup,"Median Psf",5,"blue","median",dateFormat);
        compose3 = plotLineChart(compositeControlChart,dateDimension,datePriceGroup,"Max Psf",5,"red","max",dateFormat);
        plotCompositeChart(compositeControlChart,dateDimension,400,122,10,0,40,60,"Psf $",getMinDate(geoJsonData),getMaxDate(geoJsonData),dateVolumeBarChart,compose1,compose2,compose3,"%b %y",5);
        filterMap(compositeControlChart,propertyDimension);
    }
    dc.dataCount(".dc-data-count")
            .dimension(facts)
            .group(all);
    
    plotTimeChart();
    plotPsfHistogram();
    plotPropertyVolumeRow();
    plotSaleVolumeRow();
    plotTenureVolumeRow();
    plotPsfBoxPlot();
    plotPsfLineChart();
    plotMapLayers(propertyDimension);
    
    $(document).ready(function () {
        $("#dc-psfBoxPlot-chart").on('change', function () {
            var text = $('#dc-psfBoxPlot-chart .selectpicker option:selected').text();
            if (text === "Psf") {
                plotPsfHistogram();
                plotPsfBoxPlot();
                plotPsfLineChart();
            } else if (text === "Price") {
                plotPriceHistogram();
                plotPriceBoxPlot();
                plotPriceLineChart();
            }
            else {
                plotPsmHistogram();
                plotPsmBoxPlot();
                plotPsmLineChart();
            }
            dc.renderAll();
        });
        console.log("Are you here?");
        $("#bar1").prop("disabled", true);
        $("#bar2").prop("disabled", true);
        $("#bar3").prop("disabled", true);
        $("#bar1").on("click", function () {
            $(this).prop('disabled', true);
            $("#pie1").prop('disabled', false);
            plotPropertyVolumeRow();
            dc.renderAll();
        });
        $("#pie1").on("click", function () {
            $(this).prop('disabled', true);
            $("#bar1").prop('disabled', false);
            plotPropertyVolumePie();
            dc.renderAll();
        });
        $("#bar2").on("click", function () {
            $(this).prop('disabled', true);
            $("#pie2").prop('disabled', false);
            plotSaleVolumeRow();
            dc.renderAll();
        });
        $("#pie2").on("click", function () {
            $(this).prop('disabled', true);
            $("#bar2").prop('disabled', false);
            plotSaleVolumePie();
            dc.renderAll();
        });
        $("#bar3").on("click", function () {
            $(this).prop('disabled', true);
            $("#pie3").prop('disabled', false);
            plotTenureVolumeRow();
            dc.renderAll();
        });
        $("#pie3").on("click", function () {
            $(this).prop('disabled', true);
            $("#bar3").prop('disabled', false);
            plotTenureVolumePie();
            dc.renderAll();
        });
        
    });  
    
}


