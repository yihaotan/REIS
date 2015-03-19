function getpointswithinpolygon(filtereddata,polygonpoints){
     var pointswithinpolygon=[];
     for(i=0;i<filtereddata.length;i++){  
        var marker=[filtereddata[i].lat,filtereddata[i].lon];
        if(pointinpolygon(marker,polygonpoints)){
            pointswithinpolygon.push(marker);
        }
     }
     return pointswithinpolygon;
}



function pointinpolygon(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i].lat, yi = vs[i].lng;
        var xj = vs[j].lat, yj = vs[j].lng;
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};

function getpointswithincircle(filtereddata,circlecenter,circleradius){
    var pointswithincircle=[];
    for(i=0;i<filtereddata.length;i++){
        var marker=L.latLng(filtereddata[i].lat,filtereddata[i].lon);
        if(marker.distanceTo(circlecenter)<=circleradius){
            pointswithincircle.push(marker);
            
        }
    }
    return pointswithincircle;
}

