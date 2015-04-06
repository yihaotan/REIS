 function reinit(chart)
    {
        // Get the div id of the chart requesting to be DataTable'd
        var chart_anchor_id = '#' + chart.anchorName();
        // Destroy the current DataTable (if any)
        t = new $.fn.dataTable.Api($(chart_anchor_id));
        t.destroy();
        // Remove the 'group' as this won't work with DataTables
        $(chart_anchor_id + ' .dc-table-group').remove();
        // Reinit the jQuery dataTable
        $(chart_anchor_id).dataTable({});
    };

function refreshTable(tableName,dimensionName){
    
     dc.events.trigger(function () {
                tableName.settings.dataset.originalRecords = dimensionName.top(Infinity);
                tableName.process();
                
    });
}