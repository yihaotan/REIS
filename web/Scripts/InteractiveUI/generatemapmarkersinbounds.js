function getmapmarkers(bounds,filtereddata){
        var polygonmarkers=getpointsofpolygon(bounds);
        var pointswithinpolygon=[];
        for(i=0;i<filtereddata.length;i++){
          var point=[filtereddata[i].lat,filtereddata[i].lon];
          if(pointinpolygon(point, polygonmarkers)){
              pointswithinpolygon.push(filtereddata[i]);
            }
        }
        return pointswithinpolygon;
}

