function plotDataTable(tableName,widthSize,heightSize,dimensionName,tableSize){
    
    tableName.width(widthSize)
             .height(heightSize)
             .dimension(dimensionName)
             .group(function(){
                return "";
             })
             .size(tableSize)
             .columns([
                function(d) {
                    return   d.projectName;
                },
                function(d) {
                    return  d.propertyType;
                },
                function(d) {
                    return  d.sale;
                },
                function(d) {
                    return d.address;
                },
                function(d){
                    return dateFormat(d.date);
                },
                function(d){
                    return d.areasqm;
                },
                function(d) {
                    return "$"+d.price;
                },
                function(d) {
                   return d.postalDistrict;
                },
                function(d) {
                   return d.postalSector;
                }
                ])
                .sortBy(function(d) {
                        return d.price;
                })
                .order(d3.ascending);
}

