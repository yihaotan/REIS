/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


 //helper method
  Array.prototype.contains = function(obj) {
            var i = this.length;
            while (i--) {
                if (this[i].getTime() === obj.getTime()) {
                    return true;
                }
            }
            return false;
    };
    
    //function to convert monthStr to monthStr to monthNum in Str
    function convertToMonthStr(monthNumStr){
      
       var monthMap = {"1":"Jan","2":"Feb","3":"Mar","4":"Apr","5":"May","6":"Jun","7":"Jul","8":"Aug","9":"Sep","10":"Oct","11":"Nov","12":"Dec"};
       return monthMap[monthNumStr];
    }
    
    //function to convert dateStr to dateObject
    function convertToDate(dateStr){
      
      //split the dateStr 16-Sep-14 into 16 Sep 14 
      var dateSplit = dateStr.split("-");
      //Sep 
      var month = dateSplit[1];
      //16
      var date = dateSplit[0];
      //Sep 16
      var convertStr = month+" "+date;
      //14
      var yearStr = dateSplit[2];
      //convert into integer
      var intYear = parseInt(yearStr);
      // condition to test whether to convert to 19 or 20
      if (intYear>80 && intYear<100){
          yearStr = "19"+yearStr;
      }else{
          yearStr = "20"+yearStr;
      }
      //formatDate Sep 14,2014
      var formattedDate = convertStr+","+yearStr;
      //convert to Date object
      var dateObject = new Date(Date.parse(formattedDate));
      // return Date object
      return dateObject;
   }
   
  
   var propertyVolume = {};
   var condoDateArray = [];
   var apartmentDateArray = [];
   var semiDetachedDateArray = [];
   var terraceDateArray =[];
   var executiveCondoDateArray =[];
   var dateArray = [];
   
   //convert the filteredJson into propertyVolume hashmap k => typedate , value => total no. of transactions
   //convert the dateArray into array of date string
   function retrieveAll(filteredJson){
       
       for (var i = 0 ; i<filteredJson.length; i++){
           var type = filteredJson[i].Property_Type;
           var date = filteredJson[i].Contract_Date;
           var typeDate = type+"_"+date;
          
          
           var dateObj = convertToDate(date);
           var day = dateObj.getDate();
           if (typeof dateArray[day - 1] === 'undefined'){
               
             dateArray[day-1] = date;
               
           }if (type === "Condominium"){
                
                if (!(condoDateArray.contains(dateObj))){
                    condoDateArray.push(dateObj);
                }
                if (!(typeDate in propertyVolume)){
                  
                  var volumeNumber = 1;
                  propertyVolume[typeDate] = volumeNumber;
                  
                  
               }else{
                
                   var volumeNumber = propertyVolume[typeDate];
                   volumeNumber = volumeNumber + 1;
                   propertyVolume[typeDate] = volumeNumber;
                                   
               }
           }else if(type === "Apartment" ){
                
               if (!(apartmentDateArray.contains(dateObj))){
                    apartmentDateArray.push(dateObj);
                }
                if (!(typeDate in propertyVolume)){
                 
                   var volumeNumber = 1;
                    propertyVolume[typeDate] = volumeNumber;
                    
               }else{
                   
                   var volumeNumber = propertyVolume[typeDate];
                   volumeNumber = volumeNumber + 1;
                   propertyVolume[typeDate] = volumeNumber;
               };
         
           }else if (type === "Terrace House"){
            
               if (!(terraceDateArray.contains(dateObj))){
                    terraceDateArray.push(dateObj);
               }
               if (!(typeDate in propertyVolume)){
                  
                    var volumeNumber = 1;
                    propertyVolume[typeDate] = volumeNumber;
                    
               }else{
                  
                   var volumeNumber = propertyVolume[typeDate];
                   volumeNumber = volumeNumber + 1;
                   propertyVolume[typeDate] = volumeNumber;
               };
                  
           }else if (type === "Executive Condominium" ){
                
                if (!(executiveCondoDateArray.contains(dateObj))){
                   executiveCondoDateArray.push(dateObj);
                }
                if (!(typeDate in propertyVolume)){
                    
                    var volumeNumber = 1;
                    propertyVolume[typeDate] = volumeNumber;
                    
               }else{
                   
                   var volumeNumber = propertyVolume[typeDate];
                   volumeNumber = volumeNumber + 1;
                   propertyVolume[typeDate] = volumeNumber;
               };   
           }else{
                if (!(semiDetachedDateArray.contains(dateObj))){
                    semiDetachedDateArray.push(dateObj);
                }
                if (!(typeDate in propertyVolume)){
              
                     var volumeNumber = 1;
                     propertyVolume[typeDate] = volumeNumber;
                }else{
                   
                   var volumeNumber = propertyVolume[typeDate];
                   volumeNumber = volumeNumber + 1;
                   propertyVolume[typeDate] = volumeNumber;
               };
           }
   
        }
    }
    
    //split the typedate into type and date
    function splitTypeDate(typeDateStr){
       
      var split = typeDateStr.split("_");
      return split; 
   }
    //array to store the sorted date of transction of each type of housing
    var sortedCondoDateArray = [];
    var sortedApartmentDateArray = [];
    var sortedSemiDetachedDateArray = [];
    var sortedTerraceDateArray = [];
    var sortedExecutiveCondoDateArray = [];
    
    //function to sort the date of all the array
    function sortDate(){
        sortedCondoDateArray = condoDateArray.sort(function(date1,date2){return date1.getTime() - date2.getTime();});
        sortedApartmentDateArray = apartmentDateArray.sort(function(date1,date2){return date1.getTime() - date2.getTime();});
        sortedSemiDetachedDateArray = semiDetachedDateArray.sort(function(date1,date2){return date1.getTime() - date2.getTime();});
        sortedTerraceDateArray = terraceDateArray.sort(function(date1,date2){return date1.getTime() - date2.getTime();});
        sortedExecutiveCondoDateArray = executiveCondoDateArray.sort(function(date1,date2){return date1.getTime() - date2.getTime();});
        sortedTerraceDateArray = sortedTerraceDateArray.sort(function(date1,date2){return date1.getTime() - date2.getTime();});
   }
   //array to store the volume for each type of housing
   var condominiumVolume = [];
   var apartmentVolume = [];
   var executiveCondominiumVolume = [];
   var semiDetachedVolume = [];
   var terraceHouseVolume = [];
  
   //convert the hashmap k to volue array of different types of properties
   function getVolumeForDifferentProperties(propertyVolume){
       
       for (var key in propertyVolume){
           
           var split = splitTypeDate(key);
           var type = split[0];
           var dateStr = split[1];
           var dateObj = convertToDate(dateStr);
           var date = dateObj.getDate();
           var index = date - 1;
           
           if (type === "Condominium"){
               
               if (typeof condominiumVolume[index] === 'undefined'){
                   
                   condominiumVolume[index] = propertyVolume[key];
               }
               
            }else if (type === "Apartment"){
                     
                  if (typeof apartmentVolume[index] === 'undefined'){
                   
                     apartmentVolume[index] = propertyVolume[key];
                  }
               
            }else if(type === "Terrace House"){
                     
                  if (typeof terraceHouseVolume[index] === 'undefined'){
                   
                    terraceHouseVolume[index] = propertyVolume[key];
                  }
                     
            }else if(type === "Executive Condominium"){
               
                  if (typeof executiveCondominiumVolume[index] === 'undefined'){
                   
                    executiveCondominiumVolume[index] = propertyVolume[key];
                  }
               
            }else{
               
                if (typeof semiDetachedVolume[index] === 'undefined'){
                   
                    semiDetachedVolume[index] =  propertyVolume[key];
                }
            }
       }
   }
   
   //remove all the undefined element 
   function removeUndefined(){
        condominiumVolume =  condominiumVolume.filter(function(n){ return n !== undefined;});
        apartmentVolume = apartmentVolume.filter(function(n){ return n !== undefined;});
        executiveCondominiumVolume = executiveCondominiumVolume.filter(function(n){ return n !== undefined;});
        semiDetachedVolume = semiDetachedVolume.filter(function(n){ return n !== undefined;});
        terraceHouseVolume =  terraceHouseVolume.filter(function(n){ return n !== undefined;});
   }
  
    var sortedCondoDateArrayStr = [];
    var sortedApartmentDateArrayStr = [];
    var sortedSemiDetachedDateArrayStr = [];
    var sortedTerraceDateArrayStr  = [];
    var sortedExecutiveCondoDateArrayStr = []; 
    
    //convert dateArray into dateArrayString
    function convertIntoDayArrayStr(){
        
        for (var i = 0 ; i <sortedCondoDateArray.length; i++ ){
            
            var dateStr = sortedCondoDateArray[i].getDate().toString();
            var monthNumStr =  (sortedCondoDateArray[i].getMonth()+1).toString();
            var monthStr =  convertToMonthStr(monthNumStr);
            var yearStr = sortedCondoDateArray[i].getFullYear().toString();
            var yearStr1 = yearStr.substring(2,4);
            var formattedDateStr = dateStr+"-"+monthStr+"-"+yearStr1;
            sortedCondoDateArrayStr.push(formattedDateStr);
        }
        for (var i = 0 ; i <sortedApartmentDateArray.length; i++ ){
            
            var dateStr = sortedApartmentDateArray[i].getDate().toString();
            var monthNumStr =  (sortedApartmentDateArray[i].getMonth()+1).toString();
            var monthStr =  convertToMonthStr(monthNumStr);
            var yearStr = sortedApartmentDateArray[i].getFullYear().toString();
            var yearStr1 = yearStr.substring(2,4);
            var formattedDateStr = dateStr+"-"+monthStr+"-"+yearStr1;
            sortedApartmentDateArrayStr.push(formattedDateStr);
        }
         for (var i = 0 ; i <sortedSemiDetachedDateArray.length; i++ ){
            
            var dateStr = sortedSemiDetachedDateArray[i].getDate().toString();
            var monthNumStr =  (sortedSemiDetachedDateArray[i].getMonth()+1).toString();
            var monthStr =  convertToMonthStr(monthNumStr);
            var yearStr = sortedSemiDetachedDateArray[i].getFullYear().toString();
            var yearStr1 = yearStr.substring(2,4);
            var formattedDateStr = dateStr+"-"+monthStr+"-"+yearStr1;
            sortedSemiDetachedDateArrayStr.push(formattedDateStr);
        }
        for (var i = 0 ; i< sortedTerraceDateArray.length; i++ ){
            
            var dateStr = sortedTerraceDateArray[i].getDate().toString();
            var monthNumStr =  (sortedTerraceDateArray[i].getMonth()+1).toString();
            var monthStr =  convertToMonthStr(monthNumStr);
            var yearStr = sortedTerraceDateArray[i].getFullYear().toString();
            var yearStr1 = yearStr.substring(2,4);
            var formattedDateStr = dateStr+"-"+monthStr+"-"+yearStr1;
            sortedTerraceDateArrayStr.push(formattedDateStr);  
        }
        for (var i = 0 ; i< sortedExecutiveCondoDateArray.length; i++ ){
            
            var dateStr = sortedExecutiveCondoDateArray[i].getDate().toString();
            var monthNumStr =  (sortedExecutiveCondoDateArray[i].getMonth()+1).toString();
            var monthStr =  convertToMonthStr(monthNumStr);
            var yearStr = sortedExecutiveCondoDateArray[i].getFullYear().toString();
            var yearStr1 = yearStr.substring(2,4);
            var formattedDateStr = dateStr+"-"+monthStr+"-"+yearStr1;
            sortedExecutiveCondoDateArrayStr.push(formattedDateStr);  
        }
        
        
    }
    
    //convert into json nicely with all the data 
    var condoResult = [];
    var apartmentResult = [];
    var semiDetachedResult = [];
    var terraceResult = [];
    var executiveCondoResult = [];
    var result = [];
    function convertIntoJson (type,volumeArray, dateArrayStr) {
        
        //the length of the volumeArray and the dateArrayStr are the same 
        for (var i = 0 ; i < volumeArray.length; i++){
         
            var record = {
                "type": type,
                "volume": volumeArray[i],
                "date": dateArrayStr[i]
                };
             if (type === "Condominium"){
                condoResult.push(record);
            }else if(type === "Semi-Detached House"){
                semiDetachedResult.push(record);
            }else if(type === "Terrace House"){
                terraceResult.push(record);
            }else if(type === "Apartment"){
                apartmentResult.push(record);
            }else{
                executiveCondoResult.push(record);
            }
            result.push(record);
        }
       
    }
    
    var allDates = [];
    function getAllDatesData(){
        
        for (var i =0;i<sortedCondoDateArray.length;i++){
            allDates.push(sortedCondoDateArray[i]);
        }
        for (var i =0;i<sortedApartmentDateArray.length;i++){
            allDates.push(sortedApartmentDateArray[i]);
        }
        for (var i =0;i<sortedSemiDetachedDateArray.length;i++){
            allDates.push(sortedSemiDetachedDateArray[i]);
        }
        for (var i =0;i< sortedTerraceDateArray.length;i++){
            allDates.push(sortedTerraceDateArray[i]);
        }
        for (var i =0;i< sortedExecutiveCondoDateArray.length;i++){
            allDates.push(sortedExecutiveCondoDateArray[i]);
        }
        
        allDates.sort(function(date1,date2){return date1.getTime() - date2.getTime();});
    }
    
    //get the min date 
    function getMinDate(){
        return allDates[0];
    }
    //get the max date 
    function getMaxDate(){
        len = allDates.length-1;
        return allDates[len];
    }
    
     function plotBar(propertyType){
             
            var margin = {top: 20, right: 20, bottom: 20, left: 40},
                width = 1300 - margin.left - margin.right,
                height = 600 - margin.top - margin.bottom;

            var parseDate = d3.time.format("%d-%b-%y").parse;
        
            var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
                
            var y = d3.scale.linear().range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .tickFormat(d3.time.format("%d-%b-%y"));
  
            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");
        
            var svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
            
        
            //set the tip
            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function(d) {
                return "<strong>Number of Transactions:</strong> <span style='color:red'>" + d.volume + "</span>";
            });

            svg.call(tip);
      
            propertyType.forEach(function(d) {
                d.date = parseDate(d.date);
                d.volume = +d.volume;
                d.type = d.type;
            
            });
            
            //set the domain
            x.domain(propertyType.map(function(d) { return d.date; }));
            y.domain([0, d3.max(propertyType, function(d) { return d.volume; })]);
                
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .append("text")
                .attr("x",width/2)
                .attr("y",-5)
                .style("text-anchor","middle")
                .text("Date");

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Volume of Transactions");
            
            svg.append("text")
                 .attr("x",width/2)
                 .attr("y" , 0)
                 .attr("text-anchor","middle")
                 .style("font-size","16px")
                 .style("text-decoration","underline")
                 .text("Number of Transactions for "+propertyType[0].type);
            
            
            
            svg.selectAll(".bar")
                .data(propertyType)
                 .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.date); })
                .attr("width", x.rangeBand())
                .attr("y", function(d) { return y(d.volume); })
                .attr("height", function(d) { return height - y(d.volume); })
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide);

           
          

            
      
        }
        
    //Test the graph
     function test(filteredjson){
        retrieveAll(filteredjson);
        getVolumeForDifferentProperties(propertyVolume);
        sortDate();
        removeUndefined();
        convertIntoDayArrayStr();
        convertIntoJson("Condominium",condominiumVolume,sortedCondoDateArrayStr);
        convertIntoJson("Apartment",apartmentVolume,sortedApartmentDateArrayStr);
        convertIntoJson("Executive Condominium",executiveCondominiumVolume,sortedExecutiveCondoDateArrayStr);
        convertIntoJson("Semi-Detached House", semiDetachedVolume , sortedSemiDetachedDateArrayStr);
        convertIntoJson("Terrace House", terraceHouseVolume,sortedTerraceDateArrayStr);
        plotBar(condoResult);
        //plotBar(terraceResult);
       
   
        
        
    
    }
    
   
   
   
   
    
  
    