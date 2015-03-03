var filteredData;
function generateCharts(geoJsonData) {
    //Charts
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
        plotTimeBarChart(dateVolumeBarChart,dateDimension,dateGroup,550,122,1,10,getMinDate(geoJsonData),getMaxDate(geoJsonData),"%b %y");
        filterMap(dateVolumeBarChart,propertyDimension);
    }
    function plotPropertyVolumePie() {
        var f1 = getFilters(propertyVolumeRowChart);
        propertyVolumePieChart = dc.pieChart("#dc-propertyVolume-chart");
        plotPieChart(propertyVolumePieChart,propertyVolumeDimension,propertyVolumeGroup,300,160,80,20);
        applyFilter(propertyVolumePieChart, f1);
        filterMap(propertyVolumePieChart,propertyDimension);
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
        var f1 = getFilters(propertySaleVolumeRowChart);
        propertySaleVolumePieChart = dc.pieChart("#dc-propertySaleVolume-chart");
        plotPieChart(propertySaleVolumePieChart,salesDimension,salesGroup,300,160,80,20);
        applyFilter(propertySaleVolumePieChart, f1);
        filterMap(propertySaleVolumePieChart,propertyDimension);
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
        var f1 = getFilters(propertyTenureVolumeRowChart);
        propertyTenureVolumePieChart = dc.pieChart("#dc-propertyTenureVolume-chart");
        plotPieChart(propertyTenureVolumePieChart,tenureDimension,tenureGroup,300,160,80,20);
        applyFilter(propertyTenureVolumePieChart, f1);
        filterMap(propertyTenureVolumePieChart,propertyDimension);
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
        plotHistogramChart(histogram,300,122,psfDimension,psfGroup,0,0,40,40,getMinPsf(geoJsonData),getMaxPsf(geoJsonData),10,50,"Psf $");
        filterMap(histogram,propertyDimension);
    }
    function plotPsmHistogram(){
        plotHistogramChart(histogram,320,160,psmDimension,psmGroup,0,0,40,40,getMinPsm(geoJsonData),getMaxPsm(geoJsonData),10,50,"Psm $");
        filterMap(histogram,propertyDimension);
    }
    function plotPriceHistogram(){
        plotHistogramChart(histogram,300,80,priceDimension,priceGroup,0,0,40,40,getMinPrice(geoJsonData),getMaxPrice(geoJsonData),10,1000,"Price $");
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
    //For the interactivity
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
    dc.renderAll();
}

function chartingforpolygon(filteredData){

    var dateFormat = d3.time.format('%b %y');

    //Get the min date 
    function getMinDate(data) {
        var minDate = d3.min(data, function (d) {
            return d.date;
        });
        return minDate;
    }
    //Get the max date
    function getMaxDate(data) {
        var maxDate = d3.max(data, function (d) {
            return d.date;
        });
        maxDate.setDate(maxDate.getDate() + 1);
        return maxDate;
    }
    //Get min and max price might not be useful
    function getMaxPrice(data) {
        var maxPrice = d3.max(data, function (d) {
            return d.price;
        });
        return maxPrice;
    }
    ;
    function getMinPrice(data) {
        var minPrice = d3.min(data, function (d) {
            return d.price;
        });
        return minPrice;
    }
    //Parse the date
    function parseDate(dateStr) {
        var format = d3.time.format("%d/%m/%Y");
        return format.parse(dateStr);
    }
    //Check for integer
    function isInt(n) {
        return n % 1 === 0;
    }
    function getMinMaxValue(dimension, group) {
        var dateArray = dimension.top(Infinity);
        var dateRange = d3.extent(dateArray, function (d) {
            return d.date;
        });
        var maxDate = dateRange[1];
        var minDate = dateRange[0];
        var inputArray = group.top(Infinity);
        var outputArrayValues = [];
        for (i = 0; i < inputArray.length; i++) {
            if (inputArray[i].key >= minDate && inputArray[i].key <= maxDate) {
                outputArrayValues.push(inputArray[i].value.median);
            }
        }
        crossfilter.quicksort(outputArrayValues, 0, outputArrayValues.length);
        var results = [];
        results.push(outputArrayValues[0]);
        results.push(outputArrayValues[outputArrayValues.length - 1]);
        return results;
    }
    // Generate Percentile Value for 10 percentile and 90 percentile
    function getPercentileValue(percentileFloat, dimension, group) {
        console.log("First Line");
        var dateArray = dimension.top(Infinity);
        var dateRange = d3.extent(dateArray, function (d) {
            return d.date;
        });
        var maxDate = dateRange[1];
        var minDate = dateRange[0];
        var inputArray = group.top(Infinity);
        var outputArrayValues = [];
        console.log("Just outside Loop");
        for (i = 0; i < inputArray.length; i++) {
            if (inputArray[i].key >= minDate && inputArray[i].key <= maxDate) {
                outputArrayValues.push(inputArray[i].value.median);
            }
            console.log("In loop");
        }
        console.log("Out of the loop");
        crossfilter.quicksort(outputArrayValues, 0, outputArrayValues.length);
        var percentileIndex = 0;
        var isInteger = isInt(percentileFloat * outputArrayValues.length);
        var percentileValue = 0;
        if (isInteger) {
            percentileIndex = (percentileFloat * outputArrayValues.length) - 1;
            percentileValue = (outputArrayValues[percentileIndex] + outputArrayValues[percentileIndex + 1]) / 2;
        } else {
            percentileIndex = Math.ceil(percentileFloat * outputArrayValues.length) - 1;
            //if (percentileIndex < 0){
            //percentileIndex = 0;
            //}
            percentileValue = outputArrayValues[percentileIndex];
        }
        console.log("End of method");
        return percentileValue;
    }
    function getFilters(chart) {
        return chart.filters();
    }
    function applyFilter(chart, filterA) {
        for (var i = 0; i < filterA.length; i++) {
            chart.filter(filterA[i]);
        }
    }

   

    var cv = new SVY21();

    filteredData.forEach(function (d) {
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

    //Insert the data into the crossfilter        
    var facts = crossfilter(data);
    var all = facts.groupAll();

    var propertyVolumeDimension = facts.dimension(function (d) {
        return d.propertyType;
    });
    var propertyVolumeGroup = propertyVolumeDimension.group().reduceCount(function (d) {
        return d.propertyType;
    });
    // boxplot dimension and boxplot group for psf
    var propertyDimension = facts.dimension(function (d) {
        return d.propertyType;
    });

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
    //boxplot dimension and boxplot group for psm
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
    //boxplot dimension and boxplot group for price
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
    // dimesion and group for tenure volume
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
    //dimension and group for sale volume
    var salesDimension = facts.dimension(function (d) {
        return d.sale;
    });
    var salesGroup = salesDimension.group().reduceCount();
    //dimension and group for average psf of the different property types (not used)
    /*var seriesDimension = facts.dimension(function(d){
     return [d.propertyType , d3.time.day(d.date)];
     });*/
    /* var seriesDimensonGroup = seriesDimension.group().reduce(reduceAdd,reduceRemove,reduceInitial);
     //dimension and group for region volume pie and row chart*/
    var regionDimension = facts.dimension(function (d) {
        return d.planningRegion;
    });
    var regionGroup = regionDimension.group().reduceCount();
    //dimension for date
    var dateDimension = facts.dimension(function (d) {
        return d3.time.month(d.date);
    });
    var dateGroup = dateDimension.group().reduceCount();
    //date median psf
    var datePsfGroup = dateDimension.group();
    var datePsfReducer = reductio();
    datePsfReducer.min(function (d) {
        return d.psf;
    }).max(true).median(true)(datePsfGroup);
    //date median psm
    var datePsmGroup = dateDimension.group();
    var datePsmReducer = reductio();
    datePsmReducer.min(function (d) {
        return d.psm;
    }).max(true).median(true)(datePsmGroup);
    //date median price
    var datePriceGroup = dateDimension.group();
    var datePriceReducer = reductio();
    datePriceReducer.min(function (d) {
        return d.price;
    }).max(true).median(true)(datePriceGroup);
    //dimension and group for psf
    var psfDimension = facts.dimension(function (d) {
        return d.psf;
    });
    var psfRange = d3.extent(data, function (d) {
        return d.psf;
    });
    console.log("max psf:" + psfRange[1]);
    var psfGroup = psfDimension.group(function (d) {
        return Math.ceil(d / 100) * 100;
    });
    //dimension and group for price
    var priceDimension = facts.dimension(function (d) {
        return d.price;
    });
    var priceGroup = priceDimension.group(function (d) {
        return Math.ceil(d / 1000) * 1000;
    });
    var priceRange = d3.extent(data, function (d) {
        return d.price;
    });
    //dimension and group for psm
    var psmDimension = facts.dimension(function (d) {
        return d.psm;
    });
    var psmGroup = psmDimension.group(function (d) {
        return Math.ceil(d / 1000) * 1000;
    });
    var psmRange = d3.extent(data, function (d) {
        return d.psm;
    });
    //dummyGroup
    var dummyGroupFor10Percentile = dateDimension.group().reduceSum(function (d) {
        return d.psf;
    });
    var dummyGroupFor90Percentile = dateDimension.group().reduceSum(function (d) {
        return d.psf;
    });
    var minDate = getMinDate(data);
    var maxDate = getMaxDate(data);
    //customised tooltips
    //Intialise the charts
    // Transacted Volume vs Date (For Date Slider)
    dateVolumeBarChart.width(550)
            .height(80)
            .dimension(dateDimension)
            .group(dateGroup)
            .elasticY(true)
            .transitionDuration(0)
            .centerBar(true)
            .elasticY(true)
            .gap(1)
            .x(d3.time.scale().domain([minDate, maxDate]))
            .round(d3.time.month.round)
            .xUnits(d3.time.months)
            .clipPadding(10)
            .xAxis().tickFormat(d3.time.format("%b %y"));

    //remove the y axis ticks
    dateVolumeBarChart.yAxis().ticks(0);
    function propertyVolumePie() {
        propertyVolumePieChart.width(300)
                .height(160)
                .transitionDuration(0)
                .radius(80)
                .innerRadius(20)
                .dimension(propertyVolumeDimension)
                .title(function (d) {
                    return d.key + ": " + d.value;
                })
                .group(propertyVolumeGroup)
                .colors(["#1f77b4", "#ff7f0e", "#2ca02c", " #d62728", "#9467bd", "#8c564b"])
                .colorDomain([0, 6])
                .colorAccessor(function (d, i) {
                    if (d.key === "Apartment") {
                        return 0;
                    } else if (d.key === "Condominium") {
                        return 1;
                    } else if (d.key === "Detached House") {
                        return 2;
                    } else if (d.key === "Executive Condominium") {
                        return 3;
                    } else if (d.key === "Semi-Detached House") {
                        return 4;
                    } else if (d.key === "Terrace House") {
                        return 5;
                    }
                })
                //.renderlet(function(chart){
                //chart.selectAll("svg").selectAll(".pie-slice").call(pieTip)
                //.on("mouseover",pieTip.show)
                //.on("mouseleave",pieTip.hide);
                //})
                .renderLabel(true)
                .renderTitle(true);
    }

    //propertyVolumeRow properties
    function propertyVolumeRow() {
        propertyVolumeRowChart.width(300)
                .height(160)
                .transitionDuration(0)
                .ordering(function (p) {
                    return -p.value;
                })
                .dimension(propertyVolumeDimension)
                .group(propertyVolumeGroup)
                .colors(d3.scale.category10())
                .renderLabel(true)
                .gap(3)
                .elasticX(true)
                .title(function (p) {
                    return p.value;
                })
                .renderTitle(true)
                .renderlet(function (chart) {
                    chart.selectAll("g.row rect").attr("fill", function (d) {
                        if (d.key === "Apartment") {
                            return "#1f77b4";
                        } else if (d.key === "Condominium") {
                            return "#ff7f0e";
                        } else if (d.key === "Detached House") {
                            return "#2ca02c";
                        } else if (d.key === "Executive Condominium") {
                            return "#d62728";
                        } else if (d.key === "Semi-Detached House") {
                            return "#9467bd";
                        } else {
                            return "#8c564b";
                        }
                    });
                    //chart.selectAll("svg").selectAll("g.row").call(tip)
                    //.on("mouseover",tip.show)
                    //.on("mouseleave",tip.hide);
                })
                .xAxis().ticks(5).tickFormat(d3.format("s"));


    }

    // plot the propertyVolume Pie Chart
    function plotPropertyVolumePie() {
        var f1 = getFilters(propertyVolumeRowChart);
        propertyVolumePieChart = dc.pieChart("#propertyvolume");
        propertyVolumePie();
        applyFilter(propertyVolumePieChart, f1);
    }
    // plot the propertyVolume Row Chart
    function plotPropertyVolumeRow() {
        if (typeof propertyVolumePieChart !== 'undefined') {
            var f2 = getFilters(propertyVolumePieChart);
            propertyVolumeRowChart = dc.rowChart("#propertyvolume");
            propertyVolumeRow();
            applyFilter(propertyVolumeRowChart, f2);
        } else {
            propertyVolumeRowChart = dc.rowChart("#propertyvolume");
            propertyVolumeRow();
        }
    }

    // saleVolumePie properties
    function saleVolumePie() {
        propertySaleVolumePieChart.width(300)
                .height(160)
                .transitionDuration(0)
                .radius(80)
                .innerRadius(20)
                .dimension(salesDimension)
                .title(function (d) {
                    return d.key + ": " + d.value;
                })
                .group(salesGroup)
                //.colors(d3.scale.category10())
                .colors(['#2ca02c', '#d62728', '#1f77b4'])
                .colorDomain([0, 3])
                .colorAccessor(function (d, i) {
                    if (d.key === "New Sale") {
                        return 0;
                    } else if (d.key === "Resale") {
                        return 1;
                    } else {
                        return 2;
                    }
                })
                .renderLabel(true);
    }
    //saleVolumeRow properties 
    function saleVolumeRow() {
        propertySaleVolumeRowChart.width(300)
                .height(160)
                .transitionDuration(0)
                .ordering(function (p) {
                    return -p.value;
                })
                .dimension(salesDimension)
                .group(salesGroup)
                .colors(d3.scale.category10())
                .renderLabel(true)
                .elasticX(true)
                .gap(3)
                .title(function (p) {
                    return p.value;
                })
                .renderTitle(true)
                .renderlet(function (chart) {
                    chart.selectAll("g.row rect").attr("fill", function (d) {
                        if (d.key === "New Sale") {
                            return '#2ca02c';
                        } else if (d.key === 'Resale') {
                            return '#d62728';
                        } else {
                            return '#1f77b4';
                        }
                    });
                    //chart.selectAll("g.row").call(tip)
                    //.on("mouseover",tip.show)
                    //.on("mouseleave",tip.hide);
                })
                .xAxis().ticks(5).tickFormat(d3.format("s"));
    }

    function plotSaleVolumePie() {
        var f1 = getFilters(propertySaleVolumeRowChart);
        propertySaleVolumePieChart = dc.pieChart("#salevolume");
        saleVolumePie();
        applyFilter(propertySaleVolumePieChart, f1);
    }

    //Plot Sale Volume Row Chart
    function plotSaleVolumeRow() {
        if (typeof propertySaleVolumePieChart !== 'undefined') {
            var f2 = getFilters(propertySaleVolumePieChart);
            propertySaleVolumeRowChart = dc.rowChart("#salevolume");
            saleVolumeRow();
            applyFilter(propertySaleVolumeRowChart, f2);
        } else {
            propertySaleVolumeRowChart = dc.rowChart("#salevolume");
            saleVolumeRow();
        }
    }

    //tenure volume pie properties
    function tenureVolumePie() {
        propertyTenureVolumePieChart.width(300)
                .height(160)
                .transitionDuration(0)
                .radius(80)
                .innerRadius(20)
                .dimension(tenureDimension)
                .title(function (d) {
                    return d.key + ": " + d.value;
                })
                .group(tenureGroup)
                .colors(['#2ca02c', '#d62728', '#1f77b4'])
                .colorDomain([0, 3])
                .colorAccessor(function (d, i) {
                    if (d.key === "Freehold") {
                        return 0;
                    } else if (d.key === "99 Yrs") {
                        return 1;
                    } else {
                        return 2;
                    }
                })
                .renderLabel(true);
        //.renderlet(function(chart){
        //chart.selectAll(".pie-slice").call(pieTip)
        //.on("mouseover",tip.show).on("mouseleave",pieTip.hide);
        //})

    }
    //tenure volume row properties
    function tenureVolumeRow() {
        propertyTenureVolumeRowChart.width(300)
                .height(160)
                .transitionDuration(0)
                .ordering(function (p) {
                    return -p.value;
                })
                .dimension(tenureDimension)
                .group(tenureGroup)
                .colors(d3.scale.category10())
                .renderLabel(true)
                .elasticX(true)
                .gap(3)
                .title(function (p) {
                    return p.value;
                })
                .renderTitle(true)
                .renderlet(function (chart) {
                    chart.selectAll("g.row rect").attr("fill", function (d) {
                        if (d.key === "Freehold") {
                            return '#2ca02c';
                        } else if (d.key === '99 Yrs') {
                            return '#d62728';
                        } else {
                            return '#1f77b4';
                        }

                    });
                    //chart.selectAll("g.row").call(tip)
                    //.on("mouseover",tip.show).on("mouseleave",tip.hide);
                })
                .xAxis().ticks(5).tickFormat(d3.format("s"));
    }

    function plotTenureVolumePie() {
        var f1 = getFilters(propertyTenureVolumeRowChart);
        propertyTenureVolumePieChart = dc.pieChart("#tenurevolume");
        tenureVolumePie();
        applyFilter(propertyTenureVolumePieChart, f1);
    }

    //Plot Tenure Volume Row Chart
    function plotTenureVolumeRow() {
        if (typeof propertyTenureVolumePieChart !== 'undefined') {
            var f2 = getFilters(propertyTenureVolumePieChart);
            propertyTenureVolumeRowChart = dc.rowChart("#tenurevolume");
            tenureVolumeRow();
            applyFilter(propertyTenureVolumeRowChart, f2);
        } else {
            propertyTenureVolumeRowChart = dc.rowChart("#tenurevolume");
            tenureVolumeRow();
        }
    }

    //Psf boxplot
    function plotPsfBoxPlot() {
        boxPlotChart
                .width(780)
                .height(220)
                .margins({
                    top: 10,
                    right: 0,
                    bottom: 20,
                    left: 75
                })
                .yAxisLabel("Psf $")
                .dimension(propertyDimension)
                .group(boxPlotPsfGroup)
                .elasticY(true);
    }
    //Psm boxplot
    function plotPsmBoxPlot() {
        boxPlotChart
                .width(780)
                .height(220)
                .margins({
                    top: 10,
                    right: 0,
                    bottom: 20,
                    left: 75
                })
                .yAxisLabel("Psm $")
                .dimension(propertyDimension)
                .group(boxPlotPsmGroup)
                .elasticY(true);
        //.elasticX(true);
    }
    //Price boxplot
    function plotPriceBoxPlot() {
        boxPlotChart
                .width(780)
                .height(220)
                .margins({
                    top: 10,
                    right: 0,
                    bottom: 20,
                    left: 75
                })
                .yAxisLabel("Price $")
                .dimension(propertyDimension)
                .group(boxPlotPriceGroup)
                //.elasticX(true)
                .elasticY(true);
    }

    //Psf histogram
    function plotPsfHistogram() {
        histogram.width(300)
                .height(80)
                .dimension(psfDimension)
                .margins({
                    top: 0,
                    right: 0,
                    bottom: 40,
                    left: 40
                })
                .transitionDuration(0)
                .group(psfGroup)
                .x(d3.scale.linear().domain([psfRange[0], psfRange[1]]).range([0, 10]))
                //.linearColors(["#4575b4", "#ffffbf", "#a50026"])
                .xAxisLabel("Psf $")
                .round(Math.ceil)
                .centerBar(true)
                .clipPadding(10)
                .xUnits(function () {
                    return 50;
                })
                .elasticY(true)
                .xAxis();
    }
    //Price Histogram
    function plotPriceHistogram() {
        histogram.width(300)
                .height(80)
                .dimension(priceDimension)
                .margins({
                    top: 0,
                    right: 0,
                    bottom: 40,
                    left: 40
                })
                .transitionDuration(0)
                .group(priceGroup)
                .x(d3.scale.linear().domain([priceRange[0], priceRange[1]]).range(0, 10))
                .xAxisLabel("Price $")
                .round(Math.ceil)
                .centerBar(true)
                .clipPadding(10)
                .elasticY(true)
                .xAxis()
                .ticks(10);
    }
    //Psm Histogram
    function plotPsmHistogram() {
        histogram.width(320)
                .height(160)
                .dimension(psmDimension)
                .margins({
                    top: 0,
                    right: 0,
                    bottom: 40,
                    left: 40
                })
                .transitionDuration(0)
                .group(psmGroup)
                .x(d3.scale.linear().domain([psmRange[0], psmRange[1]]).range([0, 10]))
                .xAxisLabel("Psm $")
                .round(Math.ceil)
                .centerBar(true)
                .clipPadding(10)
                .xUnits(function () {
                    return 50;
                })
                .elasticY(true)
                .xAxis();
    }

    // composite chart
    function plotPsfLineChart() {
        dc.compositeChart("#linecontrolchart")
                .width(300)
                .height(80)
                .transitionDuration(0)
                .margins({
                    top: 10,
                    right: 0,
                    bottom: 30,
                    left: 50
                })
                .yAxisLabel("Psf $")
                .x(d3.time.scale().domain([minDate, maxDate]))
                .elasticY(true)
                .round(d3.time.month.round)
                .xUnits(d3.time.months)
                .dimension(dateDimension)
                .brushOn(false)
                .legend(dc.legend().x(130).y(300).itemWidth(100).legendWidth(600).horizontal(true))
                .rangeChart(dateVolumeBarChart)
                .shareTitle(false)
                .compose([
                    dc.lineChart(compositeControlChart)
                            .interpolate('linear')
                            .group(datePsfGroup, "Median Psf")
                            //.renderDataPoints({
                                //radius: 5
                            //})
                            .title(function (d) {
                                return dateFormat(d.key) + ": $" + (d.value.median);
                            })
                            .renderTitle(true)
                            .valueAccessor(function (d) {
                                return d.value.median;
                            }


                            ),
                    dc.lineChart(compositeControlChart)
                            .interpolate('linear')
                            .group(datePsfGroup, "Min Psf")
                            //.renderDataPoints({
                                //radius: 5
                            //})
                            .colors("#2ca02c")
                            .title(function (d) {
                                return dateFormat(d.key) + ": $" + (d.value.min);
                            })
                            .renderTitle(true)
                            .valueAccessor(function (d) {
                                return d.value.min;
                            }
                            ),
                    dc.lineChart(compositeControlChart)
                            .interpolate('linear')
                            .group(datePsfGroup, "Max Psf")
                            .colors("#d62728")
                            //.renderDataPoints({
                                //radius: 5
                            //})
                            .title(function (d) {
                                return dateFormat(d.key) + ": $" + (d.value.max);
                            })
                            .renderTitle(true)
                            .valueAccessor(function (d) {
                                return d.value.max;
                            })
                ])
                .xAxis().tickFormat(d3.time.format("%b %y"))
                .ticks(5);
    }
    //Psm Line Chart
    function plotPsmLineChart() {
        //Logic
        dc.compositeChart("#linecontrolchart")
                .width(430)
                .height(130)
                .transitionDuration(0)
                .margins({
                    top: 10,
                    right: 0,
                    bottom: 40,
                    left: 60
                })
                .yAxisLabel("Psm $")
                .x(d3.time.scale().domain([minDate, maxDate]))
                .elasticY(true)
                .round(d3.time.month.round)
                .xUnits(d3.time.months)
                .dimension(dateDimension)
                .brushOn(false)
                .legend(dc.legend().x(130).y(300).itemWidth(100).legendWidth(600).horizontal(true))
                .rangeChart(dateVolumeBarChart)
                .shareTitle(false)
                .compose([
                    dc.lineChart(compositeControlChart)
                            .interpolate('linear')
                            .group(datePsmGroup, "Median Psm")
                            //.renderDataPoints({
                                //radius: 5
                            //})
                            .title(function (d) {
                                return dateFormat(d.key) + ": $" + (d.value.median);
                            })
                            .renderTitle(true)
                            .valueAccessor(function (d) {
                                return d.value.median;
                            }

                            ),
                    dc.lineChart(dc.compositeChart("#linecontrolchart"))
                            .interpolate('linear')
                            .group(datePsmGroup, "Min Psm")
                            //.renderDataPoints({
                                //radius: 5
                            //})
                            .colors("#2ca02c")
                            .title(function (d) {
                                return dateFormat(d.key) + ": $" + (d.value.min);
                            })
                            .renderTitle(true)
                            .valueAccessor(function (d) {
                                return d.value.min;
                            }
                            ),
                    dc.lineChart(dc.compositeChart("#linecontrolchart"))
                            .interpolate('linear')
                            .group(datePsmGroup, "Max Psm")
                            .colors("#d62728")
                            .renderDataPoints({
                                radius: 5
                            })
                            .title(function (d) {
                                return dateFormat(d.key) + ": $" + (d.value.max);
                            })
                            .renderTitle(true)
                            .valueAccessor(function (d) {
                                return d.value.max;
                            })

                ])
                .xAxis().tickFormat(d3.time.format("%b %y"))
                .ticks(5);
    }
    //Price Line Chart
    function plotPriceLineChart() {
        compositeControlChart
                .width(430)
                .height(130)
                .transitionDuration(0)
                .margins({
                    top: 10,
                    right: 0,
                    bottom: 40,
                    left: 60
                })
                .yAxisLabel("Price $")
                .x(d3.time.scale().domain([minDate, maxDate]))
                .elasticY(true)
                .round(d3.time.month.round)
                .xUnits(d3.time.months)
                .dimension(dateDimension)
                .brushOn(false)
                .legend(dc.legend().x(130).y(300).itemWidth(100).legendWidth(600).horizontal(true))
                .rangeChart(dateVolumeBarChart)
                .shareTitle(false)
                .compose([
                    dc.lineChart(dc.compositeChart("#linecontrolchart"))
                            .interpolate('linear')
                            .group(datePriceGroup, "Median Price")
                            //.renderDataPoints({
                                //radius: 5
                            //})
                            .title(function (d) {
                                return dateFormat(d.key) + ": $" + (d.value.median);
                            })
                            .renderTitle(true)
                            .valueAccessor(function (d) {
                                return d.value.median;
                            }
                            ),
                    dc.lineChart(dc.compositeChart("#linecontrolchart"))
                            .interpolate('linear')
                            .group(datePriceGroup, "Min Price")
                            //.renderDataPoints({
                                //radius: 5
                            //})
                            .colors("#2ca02c")
                            .title(function (d) {
                                return dateFormat(d.key) + ": $" + (d.value.min);
                            })
                            .renderTitle(true)
                            .valueAccessor(function (d) {
                                return d.value.min;
                            }
                            ),
                    dc.lineChart(dc.compositeChart("#linecontrolchart"))
                            .interpolate('linear')
                            .group(datePriceGroup, "Max Price")
                            .colors("#d62728")
                            //.renderDataPoints({
                                //radius: 5
                            //})
                            .title(function (d) {
                                return dateFormat(d.key) + ": $" + (d.value.max);
                            })
                            .renderTitle(true)
                            .valueAccessor(function (d) {
                                return d.value.max;
                            })
                ])
                .xAxis().tickFormat(d3.time.format("%b %y"))
                .ticks(5);
    }

    //For the interactivity
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
        $("#bar5").prop("disabled", true);
        $("#bar6").prop("disabled", true);
        $("#bar7").prop("disabled", true);
        $("#bar5").on("click", function () {
            $(this).prop('disabled', true);
            $("#pie5").prop('disabled', false);
            plotPropertyVolumeRow();
            
            dc.renderAll();
        });
        $("#pie5").on("click", function () {
            $(this).prop('disabled', true);
            $("#bar5").prop('disabled', false);
            plotPropertyVolumePie();
            
            dc.renderAll();
        });
        $("#bar6").on("click", function () {
            $(this).prop('disabled', true);
            $("#pie6").prop('disabled', false);
            plotSaleVolumeRow();
            
            dc.renderAll();
        });
        $("#pie6").on("click", function () {
            $(this).prop('disabled', true);
            $("#bar6").prop('disabled', false);
            plotSaleVolumePie();
            
            dc.renderAll();
        });
        $("#bar7").on("click", function () {
            $(this).prop('disabled', true);
            $("#pie7").prop('disabled', false);
            plotTenureVolumeRow();
           
            dc.renderAll();
        });
        $("#pie7").on("click", function () {
            $(this).prop('disabled', true);
            $("#bar7").prop('disabled', false);
            plotTenureVolumePie();
            
            dc.renderAll();
        });
    });
    //Count the number of records 
    dc.dataCount(".dc-data-count")
            .dimension(facts)
            .group(all);
    //Plot the graphs
    plotPsfHistogram();
    plotPropertyVolumeRow();
    plotSaleVolumeRow();
    plotTenureVolumeRow();
    plotPsfBoxPlot();
    plotPsfLineChart();

    dc.renderAll();
   
}






