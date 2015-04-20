/*function plotDataTable(tableName, widthSize, heightSize, dimensionName, tableSize) {

    tableName.width(widthSize)
            .height(heightSize)
            .dimension(dimensionName)
            .group(function () {
                return "";
            })
            .size(tableSize)
            .columns([
                function (d) {
                    return   d.projectName;
                },
                function (d) {
                    return  d.propertyType;
                },
                function (d) {
                    return  d.sale;
                },
                function (d) {
                    return d.address;
                },
                function (d) {
                    return dateFormat(d.date);
                },
                function (d) {
                    return d.areasqm;
                },
                function (d) {
                    return "$" + d.price;
                },
                function (d) {
                    return (d.planningRegion).substring(0, (d.planningRegion).lastIndexOf(" "));
                }
            ])
            .sortBy(function (d) {
                return d.price;
            })
            .order(d3.ascending);
}*/

function plotTable(dimensionName) {
    var dynaTable = $('#dc-table-graph').dynatable({
        features: {
            pushState: false
        },
        dataset: {
            records: dimensionName.top(Infinity),
            perPageDefault: 10,
            perPageOptions: [10, 20, 50, 100]
        },writers: {
            
          
            _attributeWriter: myAttributeWriter
        }
    }).data('dynatable');
    return dynaTable;
}
function myAttributeWriter(record) {
    // `this` is the column object in settings.columns
    // TODO: automatically convert common types, such as arrays and objects, to string
   
    if(this.id==="propertyType"){
        if(record[this.id] === "Terrace House"){
            return "Terrace";
        }else if(record[this.id] === "Executive Condominium"){
            return "E.Condominium";
        }else if(record[this.id] === "Semi-Detached House"){
            return "Semi-Detached";
        }else if(record[this.id] === "Detached House"){
            return "Detached";
        }
    }else if(this.id==="planningRegion"){
        if(record[this.id] === "Central Region"){
            return "Central";
        }else if(record[this.id] === "East Region"){
            return "East";
        }else if(record[this.id] === "North East Region"){
            return "North East";
        }else if(record[this.id] === "West Region"){
            return "West";
        }else{
            return "North";
        }
    }else if(this.id==="date"){
        return dateFormat(record[this.id]);
    }else if(this.id==="price" ){
        return numberFormat(record[this.id]);
    }
    return record[this.id];
 };



 




